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

    // Check SMS/OTP via JasaOTP API
    const smsUrl = `https://api.jasaotp.id/v1/sms.php?api_key=${JASAOTP_API_KEY}&id=${orderId}`

    const response = await fetch(smsUrl)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()

    if (data.success && data.code === 200) {
      if (data.data && data.data.otp) {
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            status: "success",
            otp: data.data.otp,
            order_id: orderId,
            message: "OTP diterima",
          }),
        }
      } else {
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            status: "waiting",
            order_id: orderId,
            message: "OTP belum diterima",
          }),
        }
      }
    } else {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          status: "error",
          message: data.message || "Gagal mengambil OTP",
        }),
      }
    }
  } catch (error) {
    console.error("Error in jasaotp-sms:", error)
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        status: "error",
        message: "Error getting OTP: " + error.message,
      }),
    }
  }
}
