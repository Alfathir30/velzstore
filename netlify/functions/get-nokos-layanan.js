// netlify/functions/get-nokos-layanan.js
const fetch = require('node-fetch');

exports.handler = async function(event) {
  // Ambil negara dari query string, default ke 6 (Indonesia)
  const negara = event.queryStringParameters && event.queryStringParameters.negara ? event.queryStringParameters.negara : '6';
  const url = `https://api.jasaotp.id/v1/layanan.php?negara=${negara}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Gagal mengambil data layanan NOKOS', detail: e.message }),
    };
  }
};
