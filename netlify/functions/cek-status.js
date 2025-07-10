// File: netlify/functions/transfer-ewallet.js
const fetch = require("node-fetch");

const ATLANTIC_API_KEY =
  process.env.ATLANTIC_API_KEY ||
  "atIjCYZqOkNwQf379v0gmmdSpzfJUvHBMW93oQ9dxBqCjilCzvbqGhrn11BRVo3bkceD9adBMXHpt6tC3oWisS3j710deVVbctk1";
const ATLANTIC_API_URL = "https://atlantich2h.com";

const EWALLET_CODES = {
  dana: "dana",
  gopay: "gopay",
  ovo: "ovo",
  shopeepay: "shopeepay",
  linkaja: "linkaja",
};

exports.handler = async (event) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json",
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ status: "error", message: "Method not allowed. Use POST." }),
    };
  }

  try {
    const params = new URLSearchParams(event.body);
    const kodeBank = params.get("kode_bank") || "";
    const nomorAkun = params.get("nomor_akun") || "";
    const namaPemilik = params.get("nama_pemilik") || "";
    const nominal = Number.parseInt(params.get("nominal") || "0");
    const email = params.get("email") || "";
    const note = params.get("note") || "";

    if (!kodeBank || !EWALLET_CODES[kodeBank]) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ status: "error", message: "E-wallet tidak valid." }),
      };
    }

    if (!nomorAkun || nomorAkun.length < 10) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ status: "error", message: "Nomor HP tidak valid." }),
      };
    }

    if (!namaPemilik || namaPemilik.length < 2) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ status: "error", message: "Nama pemilik tidak valid." }),
      };
    }

    if (isNaN(nominal) || nominal < 10000) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ status: "error", message: "Nominal tidak valid." }),
      };
    }

    let formattedPhone = nomorAkun.replace(/\D/g, "");
    if (formattedPhone.startsWith("0")) {
      formattedPhone = "62" + formattedPhone.substring(1);
    } else if (!formattedPhone.startsWith("62")) {
      formattedPhone = "62" + formattedPhone;
    }

    const transferResponse = await fetch(ATLANTIC_API_URL + "/transfer/create", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        api_key: ATLANTIC_API_KEY,
        kode_bank: EWALLET_CODES[kodeBank],
        nomor_akun: formattedPhone,
        nama_pemilik: namaPemilik,
        nominal: nominal.toString(),
        email: email,
        note: note || `Transfer via Digital Store - ${new Date().toLocaleString("id-ID")}`,
      }),
    });

    const transferData = await transferResponse.json();

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
      };
    } else {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          status: "error",
          message: transferData.message || "Gagal memproses transfer.",
          api_response: transferData,
        }),
      };
    }
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        status: "error",
        message: "Terjadi kesalahan sistem.",
        error_details: error.message,
      }),
    };
  }
};


// File: netlify/functions/cek-status.js
const fetch = require("node-fetch");

exports.handler = async (event) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json",
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ status: "error", message: "Use POST method only." }),
    };
  }

  try {
    const params = new URLSearchParams(event.body);
    const id = params.get("id");

    if (!id) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ status: "error", message: "ID transaksi tidak boleh kosong." }),
      };
    }

    const response = await fetch("https://atlantich2h.com/transfer/status", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        api_key: ATLANTIC_API_KEY,
        id: id.trim(),
      }),
    });

    const data = await response.json();

    if (data.status === true) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ status: "success", data: data.data }),
      };
    } else {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ status: "error", message: data.message || "Cek status gagal." }),
      };
    }
  } catch (err) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ status: "error", message: err.message }),
    };
  }
};
