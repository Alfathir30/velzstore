const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN
const firebaseUrl = process.env.FIREBASE_DATABASE_URL
const jasaOtpApiKey = process.env.JASAOTP_API_KEY

exports.handler = async (event, context) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    }
  }

  try {
    const update = JSON.parse(event.body)

    if (update.message && update.message.text) {
      const chatId = update.message.chat.id
      const text = update.message.text
      const messageId = update.message.message_id

      // Handle different commands
      if (text.startsWith("/start")) {
        await sendTelegramMessage(
          chatId,
          `
🤖 *Selamat datang di Admin Panel Digital Store*

Berikut adalah perintah yang tersedia:

📊 *Monitoring:*
• /balance - Cek saldo OTP
• /orders - Lihat pesanan terbaru
• /stats - Statistik penjualan

📞 *OTP Service:*
• /otp_order - Buat order OTP manual
• /otp_check - Cek OTP dengan Order ID
• /otp_cancel - Cancel order OTP

🔔 *Notifikasi:*
• /announcement - Kirim pengumuman
• /broadcast - Broadcast message

❓ /help - Bantuan lengkap
        `,
        )
      } else if (text === "/balance") {
        await handleBalanceCommand(chatId)
      } else if (text === "/orders") {
        await handleOrdersCommand(chatId)
      } else if (text === "/stats") {
        await handleStatsCommand(chatId)
      } else if (text.startsWith("/otp_order")) {
        await handleOtpOrderCommand(chatId, text)
      } else if (text.startsWith("/otp_check")) {
        await handleOtpCheckCommand(chatId, text)
      } else if (text.startsWith("/otp_cancel")) {
        await handleOtpCancelCommand(chatId, text)
      } else if (text.startsWith("/announcement")) {
        await handleAnnouncementCommand(chatId, text)
      } else if (text === "/help") {
        await sendTelegramMessage(
          chatId,
          `
📖 *Panduan Lengkap Admin Panel*

*Format Perintah:*
• \`/otp_order wa any\` - Buat order WhatsApp operator any
• \`/otp_check 123456\` - Cek OTP dengan order ID
• \`/otp_cancel 123456\` - Cancel order dengan ID
• \`/announcement Promo hari ini!\` - Kirim pengumuman

*Layanan OTP:*
• wa - WhatsApp
• fb - Facebook  
• tg - Telegram
• ig - Instagram
• tw - Twitter
• go - Google

*Operator:*
• any - Semua operator
• telkomsel - Telkomsel
• indosat - Indosat
• axis - Axis
• three - Three
• smartfren - Smartfren
• byu - By.U
        `,
        )
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    }
  } catch (error) {
    console.error("Error handling webhook:", error)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    }
  }
}

async function sendTelegramMessage(chatId, text, parseMode = "Markdown") {
  const response = await fetch(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: text,
      parse_mode: parseMode,
    }),
  })

  return response.json()
}

async function handleBalanceCommand(chatId) {
  try {
    const response = await fetch(`https://api.jasaotp.id/v1/balance.php?api_key=${jasaOtpApiKey}`)
    const data = await response.json()

    if (data.success) {
      await sendTelegramMessage(
        chatId,
        `
💰 *Saldo OTP Service*

💵 Saldo: Rp ${data.data.saldo.toLocaleString("id-ID")}
✅ Status: Aktif
⏰ Cek pada: ${new Date().toLocaleString("id-ID")}
      `,
      )
    } else {
      await sendTelegramMessage(chatId, `❌ Error: ${data.message}`)
    }
  } catch (error) {
    await sendTelegramMessage(chatId, `❌ Error cek saldo: ${error.message}`)
  }
}

async function handleOrdersCommand(chatId) {
  try {
    const response = await fetch(`${firebaseUrl}/transactions.json`)
    const data = await response.json()

    if (data) {
      const recentOrders = Object.entries(data)
        .map(([id, order]) => ({ id, ...order }))
        .filter((order) => order.created_at > new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .slice(0, 10)

      if (recentOrders.length > 0) {
        let message = "📋 *Pesanan 24 Jam Terakhir:*\n\n"
        recentOrders.forEach((order) => {
          message += `🆔 ${order.id}\n`
          message += `📄 ${order.product_name}\n`
          message += `💰 Rp ${order.price.toLocaleString("id-ID")}\n`
          message += `👤 ${order.customer_name}\n`
          message += `📊 ${order.payment_status} / ${order.service_status}\n`
          if (order.otp_order_id) {
            message += `📞 OTP: ${order.otp_phone_number}\n`
          }
          message += `⏰ ${new Date(order.created_at).toLocaleString("id-ID")}\n\n`
        })
        await sendTelegramMessage(chatId, message)
      } else {
        await sendTelegramMessage(chatId, "📋 Tidak ada pesanan dalam 24 jam terakhir")
      }
    } else {
      await sendTelegramMessage(chatId, "📋 Tidak ada data pesanan")
    }
  } catch (error) {
    await sendTelegramMessage(chatId, `❌ Error mengambil pesanan: ${error.message}`)
  }
}

async function handleStatsCommand(chatId) {
  try {
    const response = await fetch(`${firebaseUrl}/transactions.json`)
    const data = await response.json()

    if (data) {
      const orders = Object.values(data)
      const today = new Date().toISOString().split("T")[0]
      const todayOrders = orders.filter((order) => order.created_at.startsWith(today))

      const totalRevenue = todayOrders
        .filter((order) => order.payment_status === "success")
        .reduce((sum, order) => sum + order.price, 0)

      const otpOrders = todayOrders.filter((order) => order.service_code)

      await sendTelegramMessage(
        chatId,
        `
📊 *Statistik Hari Ini*

📈 Total Pesanan: ${todayOrders.length}
✅ Berhasil: ${todayOrders.filter((o) => o.payment_status === "success").length}
⏳ Pending: ${todayOrders.filter((o) => o.payment_status === "pending").length}
❌ Gagal: ${todayOrders.filter((o) => o.payment_status === "failed").length}

💰 Total Revenue: Rp ${totalRevenue.toLocaleString("id-ID")}

📞 OTP Orders: ${otpOrders.length}
🏆 Produk Terlaris: ${getMostSoldProduct(todayOrders)}
      `,
      )
    } else {
      await sendTelegramMessage(chatId, "📊 Tidak ada data statistik")
    }
  } catch (error) {
    await sendTelegramMessage(chatId, `❌ Error mengambil statistik: ${error.message}`)
  }
}

async function handleOtpOrderCommand(chatId, text) {
  const params = text.split(" ")
  if (params.length < 3) {
    await sendTelegramMessage(
      chatId,
      `
❌ Format salah!

*Penggunaan:*
\`/otp_order [service] [operator]\`

*Contoh:*
\`/otp_order wa any\` - WhatsApp dengan operator any
\`/otp_order fb telkomsel\` - Facebook dengan Telkomsel
    `,
    )
    return
  }

  const serviceCode = params[1]
  const operator = params[2]

  try {
    const response = await fetch(
      `https://api.jasaotp.id/v1/order.php?api_key=${jasaOtpApiKey}&negara=6&layanan=${serviceCode}&operator=${operator}`,
    )
    const data = await response.json()

    if (data.success) {
      await sendTelegramMessage(
        chatId,
        `
✅ *Order OTP Berhasil*

📞 Nomor: ${data.data.number}
🆔 Order ID: ${data.data.order_id}
📱 Service: ${serviceCode.toUpperCase()}
📡 Operator: ${operator}

Gunakan \`/otp_check ${data.data.order_id}\` untuk cek OTP
      `,
      )
    } else {
      await sendTelegramMessage(chatId, `❌ Error: ${data.message}`)
    }
  } catch (error) {
    await sendTelegramMessage(chatId, `❌ Error buat order: ${error.message}`)
  }
}

async function handleOtpCheckCommand(chatId, text) {
  const params = text.split(" ")
  if (params.length < 2) {
    await sendTelegramMessage(
      chatId,
      `
❌ Format salah!

*Penggunaan:*
\`/otp_check [order_id]\`

*Contoh:*
\`/otp_check 123456\`
    `,
    )
    return
  }

  const orderId = params[1]

  try {
    const response = await fetch(`https://api.jasaotp.id/v1/sms.php?api_key=${jasaOtpApiKey}&id=${orderId}`)
    const data = await response.json()

    if (data.success && data.data && data.data.otp) {
      await sendTelegramMessage(
        chatId,
        `
✅ *OTP Diterima*

🔢 Kode OTP: \`${data.data.otp}\`
🆔 Order ID: ${orderId}
⏰ Waktu: ${new Date().toLocaleString("id-ID")}
      `,
      )
    } else {
      await sendTelegramMessage(chatId, `⏳ OTP belum diterima untuk Order ID: ${orderId}`)
    }
  } catch (error) {
    await sendTelegramMessage(chatId, `❌ Error cek OTP: ${error.message}`)
  }
}

async function handleOtpCancelCommand(chatId, text) {
  const params = text.split(" ")
  if (params.length < 2) {
    await sendTelegramMessage(
      chatId,
      `
❌ Format salah!

*Penggunaan:*
\`/otp_cancel [order_id]\`

*Contoh:*
\`/otp_cancel 123456\`
    `,
    )
    return
  }

  const orderId = params[1]

  try {
    const response = await fetch(`https://api.jasaotp.id/v1/cancel.php?api_key=${jasaOtpApiKey}&id=${orderId}`)
    const data = await response.json()

    if (data.success) {
      await sendTelegramMessage(
        chatId,
        `
✅ *Order Dibatalkan*

🆔 Order ID: ${data.data.order_id}
💰 Refund: Rp ${data.data.refunded_amount.toLocaleString("id-ID")}
⏰ Waktu: ${new Date().toLocaleString("id-ID")}
      `,
      )
    } else {
      await sendTelegramMessage(chatId, `❌ Error: ${data.message}`)
    }
  } catch (error) {
    await sendTelegramMessage(chatId, `❌ Error cancel order: ${error.message}`)
  }
}

async function handleAnnouncementCommand(chatId, text) {
  const announcement = text.replace("/announcement ", "")
  if (announcement.length < 5) {
    await sendTelegramMessage(
      chatId,
      `
❌ Pengumuman terlalu pendek!

*Penggunaan:*
\`/announcement [pesan]\`

*Contoh:*
\`/announcement Promo spesial hari ini! Diskon 50% untuk semua produk\`
    `,
    )
    return
  }

  try {
    // Save announcement to Firebase
    const announcementData = {
      text: announcement,
      created_at: new Date().toISOString(),
      expiry: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    }

    await fetch(`${firebaseUrl}/announcement.json`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(announcementData),
    })

    await sendTelegramMessage(
      chatId,
      `
✅ *Pengumuman Berhasil Dikirim*

📢 Pesan: ${announcement}
⏰ Berlaku: 24 jam
🌐 Status: Aktif di website
    `,
    )
  } catch (error) {
    await sendTelegramMessage(chatId, `❌ Error kirim pengumuman: ${error.message}`)
  }
}

function getMostSoldProduct(orders) {
  const productCount = {}
  orders.forEach((order) => {
    if (order.payment_status === "success") {
      productCount[order.product_name] = (productCount[order.product_name] || 0) + 1
    }
  })

  const mostSold = Object.entries(productCount).sort((a, b) => b[1] - a[1])[0]

  return mostSold ? `${mostSold[0]} (${mostSold[1]}x)` : "Belum ada"
}
