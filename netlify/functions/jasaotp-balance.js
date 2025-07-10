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
    const response = await fetch(`https://api.jasaotp.id/v1/balance.php?api_key=${JASAOTP_API_KEY}`)

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
          balance: data.data.saldo,
          message: "Saldo berhasil diambil",
        }),
      }
    } else {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          status: "error",
          message: data.message || "Gagal mengambil saldo",
        }),
      }
    }
  } catch (error) {
    console.error("Error in jasaotp-balance:", error)
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        status: "error",
        message: "Error connecting to JasaOTP API: " + error.message,
      }),
    }
  }
}
