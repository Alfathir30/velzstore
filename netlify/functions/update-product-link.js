const fetch = require("node-fetch")

const FIREBASE_DATABASE_URL = process.env.FIREBASE_DATABASE_URL || "https://store-velz-default-rtdb.firebaseio.com"
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || "8111172635:AAG6nTMKB-Mj4aZDEHn4ldC6sjB-FH8-zQs"

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

  try {
    const { transactionId, newLink, adminName, adminId } = JSON.parse(event.body)

    if (!transactionId || !newLink) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          status: "error",
          message: "Transaction ID and new link are required",
        }),
      }
    }

    // Get transaction data from Firebase
    const firebaseUrl = `${FIREBASE_DATABASE_URL}/transactions/${transactionId}.json`
    const firebaseResponse = await fetch(firebaseUrl)
    const transactionData = await firebaseResponse.json()

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

    // Update transaction with new link
    transactionData.access_link = newLink
    transactionData.service_status = "completed"
    transactionData.updated_at = new Date().toISOString()
    transactionData.updated_by = adminName || "Admin"
    transactionData.updated_by_id = adminId || ""

    // Save updated data to Firebase
    await fetch(firebaseUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transactionData),
    })

    // Send confirmation message to customer (optional - via Telegram)
    if (TELEGRAM_BOT_TOKEN && transactionData.customer_contact) {
      const customerMessage = `
🎉 *PESANAN SELESAI!*

📋 *Detail:*
• ID Transaksi: \`${transactionId}\`
• Produk: ${transactionData.product_name}

🔗 *Link Akses Produk:*
${newLink}

✅ *Status:* SELESAI
⏰ *Waktu:* ${new Date().toLocaleString("id-ID")}

Terima kasih telah berbelanja! 🙏
      `

      // Note: This would require the customer's Telegram chat ID
      // For now, we'll just log it
      console.log("Customer notification:", customerMessage)
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        status: "success",
        message: "Product link updated successfully",
        transaction_id: transactionId,
        new_link: newLink,
      }),
    }
  } catch (error) {
    console.error("Error updating product link:", error)
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        status: "error",
        message: "Internal server error: " + error.message,
      }),
    }
  }
}
