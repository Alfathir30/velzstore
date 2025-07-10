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
    // Get countries via JasaOTP API
    const countriesUrl = `https://api.jasaotp.id/v1/negara.php`

    const response = await fetch(countriesUrl)

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
          countries: data.data,
          message: "Countries berhasil diambil",
        }),
      }
    } else {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          status: "error",
          message: data.message || "Gagal mengambil countries",
        }),
      }
    }
  } catch (error) {
    console.error("Error in jasaotp-countries:", error)
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        status: "error",
        message: "Error getting countries: " + error.message,
      }),
    }
  }
}
