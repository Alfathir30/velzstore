const fetch = require('node-fetch');
const admin = require('firebase-admin');

// Inisialisasi Firebase Admin SDK hanya sekali
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: 'https://store-velz-default-rtdb.firebaseio.com', // Ganti sesuai project Anda
  });
}

const ATLANTIC_API_KEY = 'atIjCYZqOkNwQf379v0gmmdSpzfJUvHBMW93oQ9dxBqCjilCzvbqGhrn11BRVo3bkceD9adBMXHpt6tC3oWisS3j710deVVbctk1'; // Ganti dengan API KEY Atlantic H2H Anda
const ATLANTIC_BASE_URL = 'https://atlantich2h.com';
const TELEGRAM_TOKEN = '7502786930:AAHs772-MhmbhJDJfFlgrt6BErmLS_roNcY';
const TELEGRAM_CHAT_ID = '1937864089';

exports.handler = async function(event) {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      },
      body: ''
    };
  }
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }
  const params = new URLSearchParams(event.body);
  const uid = params.get('uid');
  const email = params.get('email');
  const amount = parseInt(params.get('amount'));
  if (!uid || !email || !amount || amount < 500) {
    return { statusCode: 400, body: JSON.stringify({ status: 'error', message: 'Data tidak valid' }) };
  }

  try {
    // 1. Buat request deposit ke Atlantic H2H (misal endpoint /deposit/create)
    // --- Ganti sesuai dokumentasi Atlantic H2H Anda ---
    const createRes = await fetch(`${ATLANTIC_BASE_URL}/deposit/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `api_key=${ATLANTIC_API_KEY}&amount=${amount}&method=qris` // atau method lain
    });
    const createData = await createRes.json();
    console.log('Atlantic H2H response:', createData); // Tambahkan log response
    if (!createData.status || !createData.data) {
      return { statusCode: 500, body: JSON.stringify({ status: 'error', message: 'Gagal membuat deposit', atlantic: createData }) };
    }
    const depositId = createData.data.id;
    const qrImageUrl = createData.data.qr_image_url || createData.data.qr_url || '';

    // 2. Kirim info ke Telegram
    const msg = `💸 DEPOSIT BARU\nUser: ${email}\nUID: ${uid}\nNominal: Rp ${amount.toLocaleString('id-ID')}\nID Deposit: ${depositId}`;
    await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: msg })
    });

    // 3. (Opsional) Simpan status deposit ke Firebase (untuk tracking)
    await admin.database().ref(`deposits/${depositId}`).set({
      uid, email, amount, status: 'pending', created_at: Date.now()
    });

    // 4. Return ke frontend (tampilkan QRIS/VA)
    return {
      statusCode: 200,
      body: JSON.stringify({ status: 'success', deposit_id: depositId, qr_image_url: qrImageUrl })
    };

    // 5. Setelah user transfer, Anda perlu webhook/pooling untuk proses /deposit/instant,
    // update saldo user, dan kirim notifikasi ke Telegram jika saldo masuk.
    // (Bisa pakai Netlify Function lain atau cron job)
  } catch (e) {
    console.error('Deposit error:', e);
    return { statusCode: 500, body: JSON.stringify({ status: 'error', message: e.message, stack: e.stack }) };
  }
};
