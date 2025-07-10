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

  const JASAOTP_API_KEY = process.env.JASAOTP_API_KEY || "988a3ee34744f4970e51fd1a3eca612f"

  try {
    const params = new URLSearchParams(event.body)
    const orderId = params.get("order_id")

    if (!orderId) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          status: "error",
          message: "Order ID is required",
        }),
      }
    }

    // Cancel order via JasaOTP API
    const cancelUrl = `https://api.jasaotp.id/v1/cancel.php?api_key=${JASAOTP_API_KEY}&id=${orderId}`

    const response = await fetch(cancelUrl)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()

    if (data.success && data.code === 200) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          status: "success",
          order_id: data.data.order_id,
          refunded_amount: data.data.refunded_amount,
          message: "Order berhasil dibatalkan",
        }),
      }
    } else {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          status: "error",
          message: data.message || "Gagal membatalkan order",
        }),
      }
    }
  } catch (error) {
    console.error("Error in jasaotp-cancel:", error)
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        status: "error",
        message: "Error cancelling order: " + error.message,
      }),
    }
  }
}
