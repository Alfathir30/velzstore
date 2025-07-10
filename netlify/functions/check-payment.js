const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN
const telegramChatId = process.env.TELEGRAM_CHAT_ID
const firebaseUrl = process.env.FIREBASE_DATABASE_URL
const atlanticApiKey = process.env.ATLANTIC_API_KEY
const jasaOtpApiKey = process.env.JASAOTP_API_KEY

exports.handler = async (event, context) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json",
  }

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "" }
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ status: "error", message: "Method not allowed" }),
    }
  }

  try {
    const params = new URLSearchParams(event.body)
    const transactionId = params.get("transaction_id")

    if (!transactionId) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          status: "error",
          message: "Transaction ID is required",
        }),
      }
    }

    // Get transaction from Firebase
    const transactionResponse = await fetch(`${firebaseUrl}/transactions/${transactionId}.json`)
    const transactionData = await transactionResponse.json()

    if (!transactionData) {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({
          status: "error",
          message: "Transaction not found",
        }),
      }
    }

    // Check payment status from Atlantic API
    const atlanticResponse = await fetch(
      `https://atlantich2h.com/api/qris/status/${transactionData.atlantic_transaction_id}`,
      {
        headers: {
          "x-api-key": atlanticApiKey,
        },
      },
    )

    const atlanticData = await atlanticResponse.json()

    if (atlanticData.success && atlanticData.data.status === "paid") {
      // Payment successful, update transaction
      transactionData.payment_status = "success"
      transactionData.service_status = "processing"
      transactionData.updated_at = new Date().toISOString()

      // Handle OTP service orders
      if (transactionData.service_code && transactionData.service_code !== "") {
        try {
          // Create OTP order
          const otpOrderResponse = await fetch(
            `https://api.jasaotp.id/v1/order.php?api_key=${jasaOtpApiKey}&negara=${transactionData.country_id}&layanan=${transactionData.service_code}&operator=${transactionData.operator_choice || "any"}`,
          )
          const otpOrderData = await otpOrderResponse.json()

          if (otpOrderData.success && otpOrderData.code === 200) {
            transactionData.otp_order_id = otpOrderData.data.order_id
            transactionData.otp_phone_number = otpOrderData.data.number
            transactionData.otp_status = "waiting_otp"
            transactionData.service_status = "completed"
            transactionData.status_message = `Nomor OTP: ${otpOrderData.data.number}. Order ID: ${otpOrderData.data.order_id}`
            transactionData.access_link = "#"
          }
        } catch (otpError) {
          console.error("Error creating OTP order:", otpError)
          transactionData.status_message = "Pembayaran berhasil, tapi gagal membuat OTP order. Hubungi admin."
        }
      }

      // Update Firebase
      await fetch(`${firebaseUrl}/transactions/${transactionId}.json`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transactionData),
      })

      // Send Telegram notification
      let telegramMessage = `
✅ *Pembayaran Berhasil*

📄 *Produk:* ${transactionData.product_name}
💰 *Harga:* Rp ${transactionData.price.toLocaleString("id-ID")}
👤 *Customer:* ${transactionData.customer_name}
📞 *Kontak:* ${transactionData.customer_contact}
🆔 *Transaction ID:* ${transactionId}

${transactionData.account_info ? `🎯 *Target:* ${transactionData.account_info}` : ""}
${transactionData.operator_choice ? `📡 *Operator:* ${transactionData.operator_choice}` : ""}
${transactionData.customer_notes ? `📝 *Notes:* ${transactionData.customer_notes}` : ""}
      `

      if (transactionData.otp_order_id) {
        telegramMessage += `
📞 *OTP Order Details:*
- Order ID: ${transactionData.otp_order_id}
- Nomor: ${transactionData.otp_phone_number}
- Service: ${transactionData.service_code}
        `
      }

      await fetch(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: telegramChatId,
          text: telegramMessage,
          parse_mode: "Markdown",
        }),
      })
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        status: "success",
        transaction_id: transactionId,
        payment_status: transactionData.payment_status,
        service_status: transactionData.service_status,
        product_name: transactionData.product_name,
        product_type: transactionData.product_type,
        status_message: transactionData.status_message,
        access_link: transactionData.access_link,
        otp_order_id: transactionData.otp_order_id,
        otp_phone_number: transactionData.otp_phone_number,
      }),
    }
  } catch (error) {
    console.error("Error checking payment:", error)
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        status: "error",
        message: "Error checking payment: " + error.message,
      }),
    }
  }
}
