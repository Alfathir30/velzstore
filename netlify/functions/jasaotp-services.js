exports.handler = async (event, context) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Content-Type": "application/json",
  }

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "" }
  }

  if (event.httpMethod !== "GET") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ status: "error", message: "Method not allowed" }),
    }
  }

  const JASAOTP_API_KEY = process.env.JASAOTP_API_KEY || "988a3ee34744f4970e51fd1a3eca612f"

  try {
    const countryId = event.queryStringParameters?.country || "6" // Default Indonesia

    // Get services via JasaOTP API
    const servicesUrl = `https://api.jasaotp.id/v1/layanan.php?negara=${countryId}`

    const response = await fetch(servicesUrl)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        status: "success",
        services: data[countryId] || {},
        country_id: countryId,
        message: "Services berhasil diambil",
      }),
    }
  } catch (error) {
    console.error("Error in jasaotp-services:", error)
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        status: "error",
        message: "Error getting services: " + error.message,
      }),
    }
  }
}
