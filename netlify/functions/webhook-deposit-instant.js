const fetch = require('node-fetch');
const admin = require('firebase-admin');

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
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }
  let body = {};
  try {
    body = JSON.parse(event.body);
  } catch (e) {
    return { statusCode: 400, body: 'Invalid JSON' };
  }
  const depositId = body.id;
  if (!depositId) {
    return { statusCode: 400, body: 'Missing deposit id' };
  }

  try {
    // 1. Cek status deposit di Atlantic H2H
    const instantRes = await fetch(`${ATLANTIC_BASE_URL}/deposit/instant`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `api_key=${ATLANTIC_API_KEY}&id=${depositId}&action=true`
    });
    const instantData = await instantRes.json();
    if (!instantData.status || !instantData.data) {
      return { statusCode: 500, body: JSON.stringify({ status: 'error', message: 'Gagal pencairan instant' }) };
    }
    const nominal = instantData.data.nominal;
    const diterima = instantData.data.total_diterima;
    // 2. Ambil data user dari Firebase (dari ref deposits)
    const depositSnap = await admin.database().ref(`deposits/${depositId}`).once('value');
    const deposit = depositSnap.val();
    if (!deposit) {
      return { statusCode: 404, body: 'Deposit not found' };
    }
    // 3. Update saldo user
    const saldoRef = admin.database().ref(`users/${deposit.uid}/balance`);
    const saldoSnap = await saldoRef.once('value');
    const saldoLama = saldoSnap.val() || 0;
    await saldoRef.set(saldoLama + diterima);
    // 4. Update status deposit
    await admin.database().ref(`deposits/${depositId}/status`).set('success');
    // 5. Kirim notifikasi ke Telegram
    const msg = `✅ DEPOSIT MASUK\nUser: ${deposit.email}\nUID: ${deposit.uid}\nNominal: Rp ${nominal.toLocaleString('id-ID')}\nDiterima: Rp ${diterima.toLocaleString('id-ID')}\nID Deposit: ${depositId}`;
    await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: msg })
    });
    return { statusCode: 200, body: JSON.stringify({ status: 'success', diterima }) };
  } catch (e) {
    return { statusCode: 500, body: JSON.stringify({ status: 'error', message: e.message }) };
  }
};
