const fetch = require("node-fetch")

// Environment variables
const ATLANTIC_API_KEY =
  process.env.ATLANTIC_API_KEY ||
  "atIjCYZqOkNwQf379v0gmmdSpzfJUvHBMW93oQ9dxBqCjilCzvbqGhrn11BRVo3bkceD9adBMXHpt6tC3oWisS3j710deVVbctk1"
const ATLANTIC_API_URL = "https://atlantich2h.com"

// E-wallet code mapping
const EWALLET_CODES = {
  dana: "dana",
  gopay: "gopay",
  ovo: "ovo",
  shopeepay: "shopeepay",
  linkaja: "linkaja",
}

exports.handler = async (event, context) => {
  // Set CORS headers
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json",
  }

  // Handle preflight requests
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers,
      body: "",
    }
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({
        status: "error",
        message: "Method not allowed. Use POST.",
      }),
    }
  }

  try {
    console.log("Transfer request received:", event.body)

    // Parse form data
    const params = new URLSearchParams(event.body)
    const kodeBank = params.get("kode_bank") || ""
    const nomorAkun = params.get("nomor_akun") || ""
    const namaPemilik = params.get("nama_pemilik") || ""
    const nominal = Number.parseInt(params.get("nominal") || "0")
    const email = params.get("email") || ""
    const note = params.get("note") || ""

    console.log("Parsed data:", {
      kodeBank,
      nomorAkun,
      namaPemilik,
      nominal,
      email,
      note,
    })

    // Validation
    if (!kodeBank || !EWALLET_CODES[kodeBank]) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          status: "error",
          message: "E-wallet tidak valid. Pilih salah satu: DANA, GoPay, OVO, ShopeePay, LinkAja",
        }),
      }
    }

    if (!nomorAkun || nomorAkun.length < 10) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          status: "error",
          message: "Nomor HP tidak valid. Masukkan nomor HP yang benar.",
        }),
      }
    }

    if (!namaPemilik || namaPemilik.length < 2) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          status: "error",
          message: "Nama pemilik tidak valid. Masukkan nama lengkap.",
        }),
      }
    }

    if (isNaN(nominal) || nominal < 10000) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          status: "error",
          message: "Nominal tidak valid. Minimum transfer Rp 10.000",
        }),
      }
    }

    if (nominal > 10000000) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          status: "error",
          message: "Nominal terlalu besar. Maximum transfer Rp 10.000.000",
        }),
      }
    }

    // Format phone number
    let formattedPhone = nomorAkun.replace(/\D/g, "")
    if (formattedPhone.startsWith("0")) {
      formattedPhone = "62" + formattedPhone.substring(1)
    } else if (!formattedPhone.startsWith("62")) {
      formattedPhone = "62" + formattedPhone
    }

    console.log("Sending request to Atlantic API...")

    // Create transfer request to Atlantic Pedia
    const transferResponse = await fetch(ATLANTIC_API_URL + "/transfer/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        api_key: ATLANTIC_API_KEY,
        kode_bank: EWALLET_CODES[kodeBank],
        nomor_akun: formattedPhone,
        nama_pemilik: namaPemilik,
        nominal: nominal.toString(),
        email: email,
        note: note || Transfer via Digital Store - ${new Date().toLocaleString("id-ID")},
      }),
    })

    const transferData = await transferResponse.json()

    console.log("Atlantic API response:", transferData)

    if (transferData.status === true) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          status: "success",
          message: "Transfer berhasil diproses",
          data: {
            id: transferData.data?.id || "N/A",
            status: transferData.data?.status || "success",
            ewallet: kodeBank.toUpperCase(),
            recipient: namaPemilik,
            phone: nomorAkun,
            amount: nominal,
            fee: 2500,
            total: nominal + 2500,
            created_at: new Date().toISOString(),
          },
        }),
      }
    } else {
      console.error("Atlantic API error:", transferData)

      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          status: "error",
          message: transferData.message || "Gagal memproses transfer. Silakan coba lagi.",
          error_code: transferData.error_code || "TRANSFER_FAILED",
          api_response: transferData,
        }),
      }
    }
  } catch (error) {
    console.error("Error in transfer-ewallet:", error)

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        status: "error",
        message: "Terjadi kesalahan sistem. Silakan coba lagi dalam beberapa saat.",
        error_details: error.message,
        timestamp: new Date().toISOString(),
      }),
    }
  }
}
