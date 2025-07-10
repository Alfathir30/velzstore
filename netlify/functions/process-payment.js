const atlanticApiKey = process.env.ATLANTIC_API_KEY
const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN
const telegramChatId = process.env.TELEGRAM_CHAT_ID
const firebaseUrl = process.env.FIREBASE_DATABASE_URL

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
    const productName = params.get("product_name")
    const price = Number.parseInt(params.get("price"))
    const customerName = params.get("customer_name")
    const customerContact = params.get("customer_contact")
    const accountInfo = params.get("account_info") || ""
    const customerNotes = params.get("customer_notes") || ""
    const usernameLogin = params.get("username_login") || ""
    const apkEmail = params.get("apk_email") || ""
    const apkPassword = params.get("apk_password") || ""
    const operatorChoice = params.get("operator_choice") || ""
    const serviceCode = params.get("service_code") || ""
    const countryId = params.get("country_id") || "6"
    const productType = params.get("product_type") || "digital"
    const hasDirectLink = params.get("has_direct_link") === "true"
    const needsTargetAccount = params.get("needs_target_account") === "true"

    // Generate transaction ID
    const transactionId = "TRX" + Date.now() + Math.random().toString(36).substr(2, 5).toUpperCase()

    // Create QRIS payment via Atlantic API
    const atlanticResponse = await fetch("https://atlantich2h.com/api/qris/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": atlanticApiKey,
      },
      body: JSON.stringify({
        amount: price,
        external_id: transactionId,
        description: `Pembelian ${productName} - ${customerName}`,
        callback_url: `${process.env.NETLIFY_URL}/.netlify/functions/payment-callback`,
      }),
    })

    const atlanticData = await atlanticResponse.json()

    if (!atlanticData.success) {
      throw new Error(atlanticData.message || "Failed to create QRIS payment")
    }

    // Save transaction to Firebase
    const transactionData = {
      id: transactionId,
      atlantic_transaction_id: atlanticData.data.id,
      product_name: productName,
      product_type: productType,
      price: price,
      customer_name: customerName,
      customer_contact: customerContact,
      account_info: accountInfo,
      customer_notes: customerNotes,
      username_login: usernameLogin,
      apk_email: apkEmail,
      apk_password: apkPassword,
      operator_choice: operatorChoice,
      service_code: serviceCode,
      country_id: countryId,
      has_direct_link: hasDirectLink,
      needs_target_account: needsTargetAccount,
      payment_status: "pending",
      service_status: "pending",
      qr_image_url: atlanticData.data.qr_image_url,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    await fetch(`${firebaseUrl}/transactions/${transactionId}.json`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transactionData),
    })

    // Send Telegram notification
    const telegramMessage = `
🛒 *Pesanan Baru*

📄 *Produk:* ${productName}
💰 *Harga:* Rp ${price.toLocaleString("id-ID")}
👤 *Customer:* ${customerName}
📞 *Kontak:* ${customerContact}
🆔 *Transaction ID:* ${transactionId}

${accountInfo ? `🎯 *Target:* ${accountInfo}` : ""}
${operatorChoice ? `📡 *Operator:* ${operatorChoice}` : ""}
${serviceCode ? `📱 *Service:* ${serviceCode}` : ""}
${customerNotes ? `📝 *Notes:* ${customerNotes}` : ""}

💳 *Status:* Menunggu Pembayaran
    `

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

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        status: "success",
        transaction_id: transactionId,
        atlantic_transaction_id: atlanticData.data.id,
        qr_image_url: atlanticData.data.qr_image_url,
        amount: price,
        message: "Payment created successfully",
      }),
    }
  } catch (error) {
    console.error("Error processing payment:", error)
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        status: "error",
        message: "Error processing payment: " + error.message,
      }),
    }
  }
}
