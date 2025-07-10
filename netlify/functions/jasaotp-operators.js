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

  try {
    const countryId = event.queryStringParameters?.country || "6" // Default Indonesia

    // Get operators via JasaOTP API
    const operatorsUrl = `https://api.jasaotp.id/v1/operator.php?negara=${countryId}`

    const response = await fetch(operatorsUrl)

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
          operators: data.data[countryId] || [],
          country_id: countryId,
          message: "Operators berhasil diambil",
        }),
      }
    } else {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          status: "error",
          message: data.message || "Gagal mengambil operators",
        }),
      }
    }
  } catch (error) {
    console.error("Error in jasaotp-operators:", error)
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        status: "error",
        message: "Error getting operators: " + error.message,
      }),
    }
  }
}
