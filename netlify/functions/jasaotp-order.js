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
    // Parse form data
    const params = new URLSearchParams(event.body)
    const serviceCode = params.get("service_code")
    const countryId = params.get("country_id") || "6" // Default Indonesia
    const operator = params.get("operator") || "any"
    const transactionId = params.get("transaction_id")

    if (!serviceCode) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          status: "error",
          message: "Service code is required",
        }),
      }
    }

    // Create order via JasaOTP API
    const orderUrl = `https://api.jasaotp.id/v1/order.php?api_key=${JASAOTP_API_KEY}&negara=${countryId}&layanan=${serviceCode}&operator=${operator}`

    const response = await fetch(orderUrl)

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
          phone_number: data.data.number,
          service: serviceCode,
          operator: operator,
          transaction_id: transactionId,
          message: "Order berhasil dibuat",
        }),
      }
    } else {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          status: "error",
          message: data.message || "Gagal membuat order",
        }),
      }
    }
  } catch (error) {
    console.error("Error in jasaotp-order:", error)
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        status: "error",
        message: "Error creating order: " + error.message,
      }),
    }
  }
}
