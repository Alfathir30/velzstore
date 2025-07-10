// Product Database - Updated with product types and form requirements
const productDatabase = {
  ebook: [
    {
      id: "ebook-js",
      name: "Ebook JavaScript Complete",
      description: "Panduan lengkap JavaScript dari dasar hingga advanced dengan 300+ halaman",
      price: 75000,
      features: ["300+ Halaman", "Code Examples", "Bonus Cheatsheet", "Update Gratis"],
      icon: "📚",
      badge: "Populer",
      type: "digital",
      hasDirectLink: true,
      formFields: ["basic"], // basic = name + contact + notes
    },
    {
      id: "ebook-python",
      name: "Ebook Python for Beginners",
      description: "Belajar Python dari nol hingga bisa membuat aplikasi web dan data science",
      price: 85000,
      features: ["250+ Halaman", "Project Examples", "Data Science Guide", "Web Development"],
      icon: "🐍",
      badge: "",
      type: "digital",
      hasDirectLink: true,
      formFields: ["basic"],
    },
    {
      id: "ebook-react",
      name: "Ebook React & Next.js",
      description: "Master React dan Next.js untuk membuat aplikasi web modern",
      price: 95000,
      features: ["400+ Halaman", "Real Projects", "Deployment Guide", "Best Practices"],
      icon: "⚛️",
      badge: "Terbaru",
      type: "digital",
      hasDirectLink: true,
      formFields: ["basic"],
    },
  ],
  apk: [
    {
      id: "apk-spotify",
      name: "Spotify Premium APK",
      description: "Spotify Premium dengan fitur lengkap tanpa iklan dan download unlimited",
      price: 25000,
      features: ["No Ads", "Unlimited Download", "High Quality Audio", "Offline Mode"],
      icon: "🎵",
      badge: "Premium",
      type: "service", // Changed to service because needs manual processing
      hasDirectLink: false,
      formFields: ["basic", "apk-premium"], // basic + email/password for premium
    },
    {
      id: "apk-netflix",
      name: "Netflix Premium APK",
      description: "Netflix Premium dengan akses semua konten dan kualitas 4K",
      price: 35000,
      features: ["4K Quality", "All Content", "Multiple Profiles", "Download Feature"],
      icon: "🎬",
      badge: "Premium",
      type: "service",
      hasDirectLink: false,
      formFields: ["basic", "apk-premium"],
    },
    {
      id: "apk-canva",
      name: "Canva Pro APK",
      description: "Canva Pro dengan template premium dan fitur design advanced",
      price: 30000,
      features: ["Premium Templates", "Background Remover", "Brand Kit", "Unlimited Storage"],
      icon: "🎨",
      badge: "Pro",
      type: "service",
      hasDirectLink: false,
      formFields: ["basic", "apk-premium"],
    },
  ],
  "Bug-Wa": [
    {
      id: "crash-andro",
      name: "Bug Carsh Wa Android",
      description: "Membuat Wa Target Crash",
      price: 10000,
      features: ["Tidak Bisa Buka Wa", "Ceklis 1"],
      icon: "🤖",
      badge: "Hot",
      type: "service",
      hasDirectLink: false,
      needsTargetAccount: true,
      formFields: ["basic", "target-account"],
    },
    {
      id: "Crash-ios",
      name: "Bug Crash Ios Ivisible",
      description: "Membuat Wa Target Crash",
      price: 15000,
      features: ["Tidak Bisa Buka Wa", "Ceklis 1"],
      icon: "📱",
      badge: "Eksklusif",
      type: "service",
      hasDirectLink: false,
      needsTargetAccount: true,
      formFields: ["basic", "target-account"],
    },
    {
      id: "Delay-invis",
      name: "Delay Invisible",
      description: "Membuat Wa Target Delay",
      price: 5000,
      features: ["Target Kirim Chat Delay", "Nguras Paket Data"],
      icon: "⏳",
      badge: "Terbaru",
      type: "service",
      hasDirectLink: false,
      needsTargetAccount: true,
      formFields: ["basic", "target-account"],
    },
    {
      id: "MurBug",
      name: "Murid Bug",
      description: "Dapat Akses Bot Bug Telegram TREDICT INVICTUS",
      price: 20000,
      features: ["Tinggal Pakai", "Bug Sepuasnya"],
      icon: "👨‍🎓",
      badge: "Terbaru",
      type: "digital",
      hasDirectLink: true,
      formFields: ["basic"],
    },
  ],
  "suntik-followers": [
    {
      id: "followers-ig",
      name: "Instagram Followers",
      description: "Tambah followers Instagram real dan aktif dengan kualitas terbaik",
      price: 480,
      features: ["Real Followers", "No Drop", "Fast Delivery", "Lifetime Guarantee"],
      icon: "📸",
      badge: "Real",
      type: "service",
      hasDirectLink: false,
      needsTargetAccount: true,
      formFields: ["basic", "target-account"],
    },
    {
      id: "followers-tiktok",
      name: "TikTok Followers",
      description: "Boost followers TikTok dengan akun real dan engagement tinggi",
      price: 380,
      features: ["High Quality", "Fast Process", "No Ban Risk", "24/7 Support"],
      icon: "🎵",
      badge: "Fast",
      type: "service",
      hasDirectLink: false,
      needsTargetAccount: true,
      formFields: ["basic", "target-account"],
    },
    {
      id: "followers-twitter",
      name: "Twitter Followers",
      description: "Increase Twitter followers dengan akun berkualitas dan aktif",
      price: 320,
      features: ["Premium Quality", "Organic Growth", "Safe Method", "Refill Guarantee"],
      icon: "🐦",
      badge: "Premium",
      type: "service",
      hasDirectLink: false,
      needsTargetAccount: true,
      formFields: ["basic", "target-account"],
    },
  ],
  "apk-virus": [
    {
      id: "surxrat",
      name: "Surxrat Private",
      description:
        "Kontrol perangkat Android dari jarak jauh dengan fitur lengkap dan keamanan terjamin Support Sampai Android 15",
      price: 35000,
      features: [
        "Melihat sms lama korban",
        "Melihat daftar kontak yang di-save korban",
        "Melihat riwayat panggilan telepon yang dilakukan oleh korban",
        "Memantau status sistem, seperti penggunaan CPU, memori, dan baterai",
        "Hasil rekaman suara saat korban menginstal aplikasi",
        "Melihat semua email/gmail korban",
        "Melihat semua sms terbaru di korban kalian bisa mengunakannya untuk login ke akun WhatsApp, Telegram, Facebook, Dll (Ambil akun korban melalui otp)",
        "Menghapus semua file di perangkat korban",
        "Play Musik",
        "dll",
      ],
      icon: "👨🏻‍💻",
      badge: "Premium",
      type: "custom",
      hasDirectLink: false,
      needsTargetAccount: false,
      customMessage: "Admin sedang membuatkan akun khusus untuk Anda. Simpan ID transaksi untuk mengecek status.",
      formFields: ["basic", "username-login"],
    },
  ],
  nokos: [
    {
      id: "nokos-whatsapp",
      name: "Nomor WhatsApp OTP",
      description: "Dapatkan nomor virtual Indonesia untuk verifikasi WhatsApp dengan OTP otomatis",
      price: 3000,
      features: ["Nomor Indonesia", "OTP Otomatis", "Instant Delivery", "Support 24/7"],
      icon: "📱",
      badge: "Populer",
      type: "service",
      hasDirectLink: false,
      needsTargetAccount: false,
      service_code: "wa",
      country_id: 6,
      formFields: ["basic", "otp-service"],
    },
    {
      id: "nokos-facebook",
      name: "Nomor Facebook OTP",
      description: "Nomor virtual untuk verifikasi akun Facebook dengan sistem OTP terpercaya",
      price: 4000,
      features: ["Nomor Indonesia", "High Success Rate", "Fast OTP", "Reliable Service"],
      icon: "📘",
      badge: "Terpercaya",
      type: "service",
      hasDirectLink: false,
      needsTargetAccount: false,
      service_code: "fb",
      country_id: 6,
      formFields: ["basic", "otp-service"],
    },
    {
      id: "nokos-telegram",
      name: "Nomor Telegram OTP",
      description: "Nomor virtual Indonesia untuk registrasi dan verifikasi akun Telegram",
      price: 2500,
      features: ["Nomor Indonesia", "Quick Setup", "Auto OTP", "24/7 Available"],
      icon: "✈️",
      badge: "Murah",
      type: "service",
      hasDirectLink: false,
      needsTargetAccount: false,
      service_code: "tg",
      country_id: 6,
      formFields: ["basic", "otp-service"],
    },
    {
      id: "nokos-instagram",
      name: "Nomor Instagram OTP",
      description: "Nomor virtual untuk verifikasi Instagram dengan tingkat keberhasilan tinggi",
      price: 3500,
      features: ["Nomor Indonesia", "High Quality", "Fast Response", "Guaranteed OTP"],
      icon: "📸",
      badge: "Premium",
      type: "service",
      hasDirectLink: false,
      needsTargetAccount: false,
      service_code: "ig",
      country_id: 6,
      formFields: ["basic", "otp-service"],
    },
    {
      id: "nokos-twitter",
      name: "Nomor Twitter/X OTP",
      description: "Nomor virtual untuk verifikasi akun Twitter/X dengan layanan premium",
      price: 4500,
      features: ["Nomor Indonesia", "Premium Quality", "Instant OTP", "Success Guarantee"],
      icon: "🐦",
      badge: "Premium",
      type: "service",
      hasDirectLink: false,
      needsTargetAccount: false,
      service_code: "tw",
      country_id: 6,
      formFields: ["basic", "otp-service"],
    },
    {
      id: "nokos-google",
      name: "Nomor Google OTP",
      description: "Nomor virtual untuk verifikasi akun Google/Gmail dengan sistem terpercaya",
      price: 3000,
      features: ["Nomor Indonesia", "Google Verified", "Quick OTP", "Reliable System"],
      icon: "🔍",
      badge: "Terpercaya",
      type: "service",
      hasDirectLink: false,
      needsTargetAccount: false,
      service_code: "go",
      country_id: 6,
      formFields: ["basic", "otp-service"],
    },
  ],
}

// Global Variables
let currentTransactionId = null
let paymentCheckInterval = null
let currentCategory = "semua"
let selectedProduct = null

// DOM Elements - akan di-set setelah DOM ready
let productGrid = null
let sectionTitle = null
let followersCalculator = null
let purchaseModal = null
let paymentModal = null
let checkStatusModal = null

// Initialize page
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM Content Loaded - Initializing...")

  // Set DOM elements
  productGrid = document.getElementById("productGrid")
  sectionTitle = document.getElementById("sectionTitle")
  followersCalculator = document.getElementById("followersCalculator")
  purchaseModal = document.getElementById("purchaseModal")
  paymentModal = document.getElementById("paymentModal")
  checkStatusModal = document.getElementById("checkStatusModal")

  // Check if elements exist
  if (!productGrid) {
    console.error("productGrid element not found!")
    return
  }

  console.log("Elements found, loading products...")

  // Load initial products
  loadProducts("semua")
  initializeAnimations()

  // Initialize calculator with default values
  setTimeout(() => {
    calculatePrice()
  }, 100)

  console.log("Initialization complete!")

  // Tambahkan dropdown negara NOKOS + search box jika ada grid NOKOS
  const nokosGrid = document.getElementById("nokosProductGrid");
  if (nokosGrid && !document.getElementById("nokosNegaraSelect")) {
    // Container untuk filter
    const filterContainer = document.createElement("div");
    filterContainer.style.display = "flex";
    filterContainer.style.gap = "12px";
    filterContainer.style.marginBottom = "16px";
    filterContainer.style.flexWrap = "wrap";
    filterContainer.style.alignItems = "center";

    // Dropdown negara
    const negaraSelect = document.createElement("select");
    negaraSelect.id = "nokosNegaraSelect";
    negaraSelect.className = "nokos-negara-select";
    negaraSelect.innerHTML = `
      <option value="6">Indonesia</option>
      <option value="1">Rusia</option>
      <option value="2">Ukraina</option>
      <option value="3">Kazakhstan</option>
      <option value="4">China</option>
      <option value="5">India</option>
      <option value="7">Malaysia</option>
      <option value="8">Amerika Serikat</option>
      <option value="9">Inggris</option>
      <option value="10">Vietnam</option>
      <option value="11">Myanmar</option>
      <option value="12">Filipina</option>
      <option value="13">Kamboja</option>
      <option value="14">Laos</option>
      <option value="15">Hong Kong</option>
      <option value="16">Thailand</option>
      <option value="17">Jerman</option>
      <option value="18">Korea Selatan</option>
      <option value="19">Jepang</option>
      <option value="20">Turki</option>
      <option value="21">Prancis</option>
      <option value="22">Spanyol</option>
      <option value="23">Italia</option>
      <option value="24">Polandia</option>
      <option value="25">Rumania</option>
      <option value="26">Bangladesh</option>
      <option value="27">Pakistan</option>
      <option value="28">Mesir</option>
      <option value="29">Arab Saudi</option>
      <option value="30">Brazil</option>
      <option value="31">Argentina</option>
      <option value="32">Meksiko</option>
      <option value="33">Kolombia</option>
      <option value="34">Afrika Selatan</option>
      <option value="35">Nigeria</option>
      <option value="36">Ghana</option>
      <option value="37">Ethiopia</option>
      <option value="38">Australia</option>
      <option value="39">Kanada</option>
      <option value="40">Israel</option>
      <option value="41">Belanda</option>
      <option value="42">Swiss</option>
      <option value="43">Swedia</option>
      <option value="44">Norwegia</option>
      <option value="45">Denmark</option>
      <option value="46">Finlandia</option>
      <option value="47">Ceko</option>
      <option value="48">Slovakia</option>
      <option value="49">Hungaria</option>
      <option value="50">Portugal</option>
    `;
    negaraSelect.onchange = renderNokosLayanan;
    filterContainer.appendChild(negaraSelect);

    // Search box
    const searchInput = document.createElement("input");
    searchInput.type = "text";
    searchInput.id = "nokosSearchInput";
    searchInput.placeholder = "Cari layanan (misal: WhatsApp, Telegram, dll)";
    searchInput.style.padding = "6px 10px";
    searchInput.style.borderRadius = "6px";
    searchInput.style.border = "1px solid #ccc";
    searchInput.style.minWidth = "180px";
    searchInput.oninput = renderNokosLayanan;
    filterContainer.appendChild(searchInput);

    nokosGrid.parentNode.insertBefore(filterContainer, nokosGrid);
  }
})

// Category Functions
function filterProducts(category) {
  console.log("Filtering products for category:", category)

  currentCategory = category

  // Update active tab
  document.querySelectorAll(".category-tab").forEach((tab) => {
    tab.classList.remove("active")
  })

  const activeTab = document.querySelector(`[data-category="${category}"]`)
  if (activeTab) {
    activeTab.classList.add("active")
  }

  // Show/hide followers calculator
  if (category === "suntik-followers") {
    if (followersCalculator) {
      followersCalculator.style.display = "block"
    }
    if (sectionTitle) {
      sectionTitle.textContent = "Layanan Suntik Followers"
    }
    // Recalculate when showing calculator
    setTimeout(() => calculatePrice(), 100)
  } else {
    if (followersCalculator) {
      followersCalculator.style.display = "none"
    }
    if (sectionTitle) {
      sectionTitle.textContent =
        category === "semua"
          ? "Semua Produk Terbaik"
          : category === "ebook"
            ? "E-Book Premium"
            : category === "apk"
              ? "APK Premium"
              : category === "Bug-Wa"
                ? "Jasa Bug Terpercaya"
                : category === "suntik-followers"
                  ? "Layanan Suntik Followers"
                  : category === "apk-virus"
                    ? "APK Hack Premium"
                    : category === "nokos"
                      ? "Layanan Nomor OTP"
                      : "Produk Terbaik"
    }
  }

  loadProducts(category)
}

function loadProducts(category) {
  console.log("Loading products for category:", category)

  let products = []

  if (category === "semua") {
    // Combine all products
    products = [
      ...productDatabase.ebook,
      ...productDatabase.apk,
      ...productDatabase["Bug-Wa"],
      ...productDatabase["suntik-followers"],
      ...productDatabase["apk-virus"],
      // NOKOS products REMOVED from main page
    ]
  } else if (category === "nokos") {
    products = productDatabase.nokos
  } else if (productDatabase[category]) {
    products = productDatabase[category]
  }

  console.log("Found products:", products.length)
  renderProducts(products)
}

function renderProducts(products) {
  if (!productGrid) {
    console.error("productGrid not available!")
    return
  }

  productGrid.innerHTML = ""

  if (products.length === 0) {
    productGrid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: var(--text-secondary);">
        <h3>Tidak ada produk ditemukan</h3>
        <p>Silakan pilih kategori lain</p>
      </div>
    `
    return
  }

  products.forEach((product, index) => {
    const productCard = createProductCard(product, index)
    productGrid.appendChild(productCard)
  })

  console.log("Rendered", products.length, "products")
}

function createProductCard(product, index) {
  const card = document.createElement("div")
  card.className = "product-card animate-slide-up"
  card.style.setProperty("--delay", `${(index + 1) * 0.1}s`)

  const priceDisplay = `Rp ${product.price.toLocaleString()}`

  card.innerHTML = `
    <div class="product-header">
      <div class="product-icon">${product.icon}</div>
      ${product.badge ? `<div class="product-badge ${product.badge.toLowerCase()}">${product.badge}</div>` : ""}
    </div>
    <h3>${product.name}</h3>
    <p class="product-description">${product.description}</p>
    <div class="product-features">
      ${product.features.map((feature) => `<span>✓ ${feature}</span>`).join("")}
    </div>
    <div class="product-price">
      <span class="price-label">Harga</span>
      <span class="price-value">${priceDisplay}</span>
    </div>
    <button class="btn-primary" onclick="selectProduct('${product.id}')">
      <span>Beli Sekarang</span>
      <span class="btn-arrow">→</span>
    </button>
  `

  return card
}

// Followers Calculator - UPDATED VERSION
function calculatePrice() {
  const platformSelect = document.getElementById("platformSelect")
  const followersAmountInput = document.getElementById("followersAmount")
  const calculatedPriceElement = document.getElementById("calculatedPrice")
  const selectedPlatformElement = document.getElementById("selectedPlatform")
  const selectedAmountElement = document.getElementById("selectedAmount")

  // Check if elements exist
  if (
    !platformSelect ||
    !followersAmountInput ||
    !calculatedPriceElement ||
    !selectedPlatformElement ||
    !selectedAmountElement
  ) {
    console.log("Calculator elements not found")
    return
  }

  const platform = platformSelect.value
  let amount = Number.parseInt(followersAmountInput.value) || 1

  // Enforce minimum 1 (changed from 100)
  if (amount < 10) {
    amount = 1
    followersAmountInput.value = 1
  }

  // Price rates per follower (not per 1000 anymore)
  const rates = {
    instagram: 37, // Rp 38 per follower
    tiktok: 38, // Rp 28 per follower
    twitter: 0, // Rp 20 per follower
  }

  const pricePerFollower = rates[platform] || 38
  const totalPrice = amount * pricePerFollower

  // Platform name mapping
  const platformNames = {
    instagram: "Instagram",
    tiktok: "TikTok",
    twitter: "Twitter",
  }

  // Update display elements
  selectedPlatformElement.textContent = platformNames[platform] || "Instagram"
  selectedAmountElement.textContent = `${amount.toLocaleString()} followers`
  calculatedPriceElement.textContent = `Rp ${totalPrice.toLocaleString()}`

  console.log("Calculator updated:", {
    platform: platformNames[platform],
    amount,
    pricePerFollower,
    total: totalPrice,
  })
}

function buyFollowers() {
  const platform = document.getElementById("platformSelect").value
  const amount = Number.parseInt(document.getElementById("followersAmount").value) || 1

  const rates = {
    instagram: 38, // Rp 38 per follower
    tiktok: 28, // Rp 28 per follower
    twitter: 20, // Rp 20 per follower
  }

  const pricePerFollower = rates[platform] || 38
  const totalPrice = amount * pricePerFollower

  const platformNames = {
    instagram: "Instagram",
    tiktok: "TikTok",
    twitter: "Twitter",
  }

  selectedProduct = {
    id: `followers-${platform}`,
    name: `${platformNames[platform]} Followers - ${amount.toLocaleString()}`,
    price: totalPrice,
    type: "followers",
    platform: platform,
    amount: amount,
    formFields: ["basic", "target-account"],
  }

  openPurchaseModal()
}

// Product Selection
function selectProduct(productId) {
  console.log("Selecting product:", productId)

  // Find product in database
  let product = null
  Object.values(productDatabase).forEach((categoryProducts) => {
    const found = categoryProducts.find((p) => p.id === productId)
    if (found) product = found
  })

  if (product) {
    console.log("Product found:", product.name)
    selectedProduct = product
    openPurchaseModal()
  } else {
    console.error("Product not found:", productId)
  }
}

// Purchase Modal Functions
function openPurchaseModal() {
  if (!selectedProduct) {
    console.error("No product selected!")
    return
  }

  if (!purchaseModal) {
    console.error("Purchase modal not found!")
    return
  }

  console.log("Opening purchase modal for:", selectedProduct.name)

  document.getElementById("selectedProductName").textContent = selectedProduct.name
  document.getElementById("selectedProductPrice").textContent = `Rp ${selectedProduct.price.toLocaleString()}`

  // Reset all fields
  hideAllFormFields()

  // Show fields based on product's formFields configuration
  const formFields = selectedProduct.formFields || ["basic"]

  formFields.forEach((fieldType) => {
    switch (fieldType) {
      case "target-account":
        showTargetAccountField()
        break
      case "username-login":
        showUsernameLoginField()
        break
      case "apk-premium":
        showApkPremiumFields()
        break
      case "otp-service":
        showOtpServiceField()
        break
      // "basic" fields (name, contact, notes) are always shown
    }
  })

  purchaseModal.style.display = "flex"
  document.body.style.overflow = "hidden"
}

function hideAllFormFields() {
  // Hide all optional form groups
  const accountInfoGroup = document.getElementById("accountInfoGroup")
  const usernameLoginGroup = document.getElementById("usernameLoginGroup")
  const apkEmailGroup = document.getElementById("apkEmailGroup")
  const apkPasswordGroup = document.getElementById("apkPasswordGroup")
  const otpServiceGroup = document.getElementById("otpServiceGroup")
  const operatorGroup = document.getElementById("operatorGroup")

  if (accountInfoGroup) accountInfoGroup.style.display = "none"
  if (usernameLoginGroup) usernameLoginGroup.style.display = "none"
  if (apkEmailGroup) apkEmailGroup.style.display = "none"
  if (apkPasswordGroup) apkPasswordGroup.style.display = "none"
  if (otpServiceGroup) otpServiceGroup.style.display = "none"
  if (operatorGroup) operatorGroup.style.display = "none"

  // Reset required attributes
  const accountInfo = document.getElementById("accountInfo")
  const usernameLogin = document.getElementById("usernameLogin")
  const apkEmail = document.getElementById("apkEmail")
  const apkPassword = document.getElementById("apkPassword")
  const countrySelect = document.getElementById("countrySelect")
  const operatorSelect = document.getElementById("operatorSelect")

  if (accountInfo) accountInfo.required = false
  if (usernameLogin) usernameLogin.required = false
  if (apkEmail) apkEmail.required = false
  if (apkPassword) apkPassword.required = false
  if (countrySelect) countrySelect.required = false
  if (operatorSelect) operatorSelect.required = false
}

function showTargetAccountField() {
  const accountInfoGroup = document.getElementById("accountInfoGroup")
  const accountInfoLabel = document.getElementById("accountInfoLabel")
  const accountInfoInput = document.getElementById("accountInfo")
  const accountInfoHelp = document.getElementById("accountInfoHelp")

  if (accountInfoGroup) accountInfoGroup.style.display = "block"
  if (accountInfoLabel) accountInfoLabel.textContent = "Akun Target *"
  if (accountInfoInput) {
    accountInfoInput.placeholder = "Username, link sosmed, atau nomor WhatsApp target"
    accountInfoInput.required = true
  }
  if (accountInfoHelp) accountInfoHelp.textContent = "Masukkan akun target yang akan diproses. Pastikan data benar!"
}

function showUsernameLoginField() {
  const usernameLoginGroup = document.getElementById("usernameLoginGroup")
  const usernameLoginInput = document.getElementById("usernameLogin")

  if (usernameLoginGroup) usernameLoginGroup.style.display = "block"
  if (usernameLoginInput) usernameLoginInput.required = true
}

function showApkPremiumFields() {
  const apkEmailGroup = document.getElementById("apkEmailGroup")
  const apkEmailInput = document.getElementById("apkEmail")
  const apkPasswordGroup = document.getElementById("apkPasswordGroup")
  const apkPasswordInput = document.getElementById("apkPassword")

  if (apkEmailGroup) apkEmailGroup.style.display = "block"
  if (apkPasswordGroup) apkPasswordGroup.style.display = "block"
  if (apkEmailInput) apkEmailInput.required = true
  if (apkPasswordInput) apkPasswordInput.required = true
}

function showOtpServiceField() {
  const otpServiceGroup = document.getElementById("otpServiceGroup")
  const operatorGroup = document.getElementById("operatorGroup")
  const countrySelect = document.getElementById("countrySelect")
  const operatorSelect = document.getElementById("operatorSelect")

  if (otpServiceGroup) otpServiceGroup.style.display = "block"
  if (operatorGroup) operatorGroup.style.display = "block"
  if (countrySelect) countrySelect.required = true
  if (operatorSelect) operatorSelect.required = true

  // Set default country to Indonesia
  if (countrySelect && selectedProduct.country_id) {
    countrySelect.value = selectedProduct.country_id
    // Load operators for default country
    loadOperators()
  }
}

function closePurchaseModal() {
  if (purchaseModal) {
    purchaseModal.style.display = "none"
  }
  document.body.style.overflow = "auto"
  clearPurchaseForm()
}

function clearPurchaseForm() {
  const fields = [
    "customerName",
    "customerContact",
    "accountInfo",
    "customerNotes",
    "usernameLogin",
    "apkEmail",
    "apkPassword",
    "countrySelect",
    "operatorSelect",
  ]

  fields.forEach((fieldId) => {
    const field = document.getElementById(fieldId)
    if (field) field.value = ""
  })
}

// Process Purchase
async function processPurchase() {
  const customerName = document.getElementById("customerName")?.value?.trim() || ""
  const customerContact = document.getElementById("customerContact")?.value?.trim() || ""
  const accountInfo = document.getElementById("accountInfo")?.value?.trim() || ""
  const customerNotes = document.getElementById("customerNotes")?.value?.trim() || ""
  const usernameLogin = document.getElementById("usernameLogin")?.value?.trim() || ""
  const apkEmail = document.getElementById("apkEmail")?.value?.trim() || ""
  const apkPassword = document.getElementById("apkPassword")?.value?.trim() || ""
  const countrySelect = document.getElementById("countrySelect")?.value?.trim() || ""
  const operatorSelect = document.getElementById("operatorSelect")?.value?.trim() || ""

  // Basic validation
  if (!customerName || !customerContact) {
    alert("Mohon lengkapi nama dan kontak!")
    return
  }

  // Validate required fields based on product type
  const formFields = selectedProduct.formFields || ["basic"]

  if (formFields.includes("target-account") && !accountInfo) {
    alert("Mohon masukkan akun target!")
    return
  }

  if (formFields.includes("username-login") && !usernameLogin) {
    alert("Mohon masukkan username login yang diinginkan!")
    return
  }

  if (formFields.includes("apk-premium")) {
    if (!apkEmail || !apkPassword) {
      alert("Mohon lengkapi email dan password untuk upgrade premium!")
      return
    }
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(apkEmail)) {
      alert("Format email tidak valid!")
      return
    }
  }

  if (formFields.includes("otp-service")) {
    if (!countrySelect || !operatorSelect) {
      alert("Mohon pilih negara dan operator untuk layanan OTP!")
      return
    }
  }

  // Validate username format for Surxrat
  if (selectedProduct.id === "surxrat" && usernameLogin) {
    const usernameRegex = /^[a-zA-Z0-9_]+$/
    if (!usernameRegex.test(usernameLogin)) {
      alert("Username hanya boleh mengandung huruf, angka, dan underscore!")
      return
    }
  }

  closePurchaseModal()
  openPaymentModal()

  try {
    const formData = new URLSearchParams({
      product_name: selectedProduct.name,
      price: selectedProduct.price,
      customer_name: customerName,
      customer_contact: customerContact,
      account_info: accountInfo,
      customer_notes: customerNotes,
      username_login: usernameLogin,
      apk_email: apkEmail,
      apk_password: apkPassword,
      operator_choice: operatorSelect,
      service_code: selectedProduct.service_code || "",
      country_id: countrySelect || selectedProduct.country_id || 6,
      product_type: selectedProduct.type || "digital",
      has_direct_link: selectedProduct.hasDirectLink || false,
      needs_target_account: selectedProduct.needsTargetAccount || false,
      custom_message: document.getElementById("customerNotes").value || "",
      platform: selectedProduct.platform || "",
      amount: selectedProduct.amount || "",
    })

    const response = await fetch("/.netlify/functions/process-payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData,
    })

    const data = await response.json()

    if (data.status === "success") {
      showQRCode(data)
    } else {
      showError("Gagal membuat QRIS: " + data.message)
    }
  } catch (error) {
    showError("Terjadi kesalahan: " + error.message)
  }
}

// Payment Modal Functions
function openPaymentModal() {
  if (!paymentModal) {
    console.error("Payment modal not found!")
    return
  }

  resetModal()
  paymentModal.style.display = "flex"
  document.body.style.overflow = "hidden"
}

function closeModal() {
  if (paymentModal) {
    paymentModal.style.display = "none"
  }
  document.body.style.overflow = "auto"
  clearInterval(paymentCheckInterval)
  resetModal()
}

function resetModal() {
  const modalTitle = document.getElementById("modalTitle")
  const paymentLoading = document.getElementById("paymentLoading")
  const qrContent = document.getElementById("qrContent")
  const finalContent = document.getElementById("finalContent")

  if (modalTitle) modalTitle.innerText = "Proses Pembayaran QRIS"
  if (paymentLoading) paymentLoading.style.display = "block"
  if (qrContent) qrContent.style.display = "none"
  if (finalContent) finalContent.style.display = "none"
}

function showQRCode(data) {
  const paymentLoading = document.getElementById("paymentLoading")
  const qrContent = document.getElementById("qrContent")
  const qrCodeImage = document.getElementById("qrCodeImage")
  const transactionIdText = document.getElementById("transactionIdText")
  const transactionIdDisplay = document.getElementById("transactionIdDisplay")
  const paymentStatusText = document.getElementById("paymentStatusText")
  const serviceStatusText = document.getElementById("serviceStatusText")
  const cancelPaymentButton = document.getElementById("cancelPaymentButton")

  if (paymentLoading) paymentLoading.style.display = "none"
  if (qrContent) qrContent.style.display = "block"
  if (qrCodeImage) qrCodeImage.src = data.qr_image_url
  if (transactionIdText) transactionIdText.style.display = "block"
  if (transactionIdDisplay) transactionIdDisplay.innerText = data.atlantic_transaction_id
  if (paymentStatusText) paymentStatusText.style.display = "block"
  if (serviceStatusText) serviceStatusText.style.display = "block"
  if (cancelPaymentButton) cancelPaymentButton.style.display = "block"

  currentTransactionId = data.atlantic_transaction_id

  // Start checking payment status
  paymentCheckInterval = setInterval(checkPaymentStatusLoop, 3000)
}

async function checkPaymentStatusLoop() {
  if (!currentTransactionId) return

  try {
    const response = await fetch("/.netlify/functions/check-payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `transaction_id=${currentTransactionId}`,
    })

    const data = await response.json()

    if (data.status === "success") {
      const paymentStatusResult = document.getElementById("paymentStatusResult")
      const serviceStatusResult = document.getElementById("serviceStatusResult")

      if (paymentStatusResult) paymentStatusResult.innerText = data.payment_status
      if (serviceStatusResult) serviceStatusResult.innerText = data.service_status || "Menunggu pembayaran"

      if (data.payment_status === "success") {
        clearInterval(paymentCheckInterval)
        showSuccess()
      }
    }
  } catch (error) {
    console.error("Error checking status:", error)
  }
}

function showSuccess() {
  const modalTitle = document.getElementById("modalTitle")
  const qrContent = document.getElementById("qrContent")
  const finalContent = document.getElementById("finalContent")
  const finalTransactionIdDisplay = document.getElementById("finalTransactionIdDisplay")

  if (modalTitle) modalTitle.innerText = "Pembayaran Berhasil!"
  if (qrContent) qrContent.style.display = "none"
  if (finalContent) finalContent.style.display = "block"
  if (finalTransactionIdDisplay) finalTransactionIdDisplay.innerText = currentTransactionId
}

function showError(message) {
  const paymentLoading = document.getElementById("paymentLoading")
  if (paymentLoading) {
    paymentLoading.innerHTML = `
      <div style="color: #ff6b6b; text-align: center;">
        <div style="font-size: 48px; margin-bottom: 16px;">⚠️</div>
        <p>${message}</p>
      </div>
    `
  }
}

function cancelPayment() {
  if (confirm("Anda yakin ingin membatalkan pembayaran ini?")) {
    clearInterval(paymentCheckInterval)
    closeModal()
    currentTransactionId = null
  }
}

// Check Status Functions
function openCheckStatusModal() {
  if (checkStatusModal) {
    checkStatusModal.style.display = "flex"
    document.body.style.overflow = "hidden"
  }
}

function closeCheckStatusModal() {
  if (checkStatusModal) {
    checkStatusModal.style.display = "none"
  }
  document.body.style.overflow = "auto"
}

async function checkOrderStatus() {
  const transactionIdInput = document.getElementById("inputTransactionIdCheck")
  const transactionId = transactionIdInput?.value?.trim() || ""

  if (!transactionId) {
    alert("Mohon masukkan ID Transaksi!")
    return
  }

  try {
    const response = await fetch("/.netlify/functions/check-payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `transaction_id=${transactionId}`,
    })

    const data = await response.json()
    displayOrderStatus(data)
  } catch (error) {
    console.error("Error:", error)
  }
}

function displayOrderStatus(data) {
  const resultDiv = document.getElementById("orderStatusResult")
  if (!resultDiv) return

  if (data.status === "success") {
    let statusContent = ""

    // Different display based on product type and status
    if (data.product_type === "custom" && data.payment_status === "success" && data.service_status !== "completed") {
      statusContent = `
        <div class="order-status-card custom-product">
          <h3>Status Pesanan Custom</h3>
          <div class="status-info">
            <p><strong>Produk:</strong> ${data.product_name}</p>
            <p><strong>Status Pembayaran:</strong> <span class="status-${data.payment_status}">${data.payment_status}</span></p>
            <p><strong>Status Layanan:</strong> <span class="status-${data.service_status || "processing"}">${data.service_status || "Diproses"}</span></p>
          </div>
          
          <div class="custom-message">
            <div class="info-box">
              <span class="info-icon">ℹ️</span>
              <div>
                <strong>Informasi Penting:</strong>
                <p>${data.status_message || "Admin sedang membuatkan produk khusus untuk Anda. Simpan ID transaksi ini untuk mengecek status."}</p>
              </div>
            </div>
          </div>
          
          <div class="transaction-id-box">
            <p><strong>ID Transaksi Anda:</strong></p>
            <code>${data.transaction_id || "N/A"}</code>
            <small>Simpan ID ini untuk cek status berkala</small>
          </div>
        </div>
      `
    } else {
      statusContent = `
        <div class="order-status-card">
          <h3>Status Pesanan</h3>
          <div class="status-info">
            <p><strong>Produk:</strong> ${data.product_name}</p>
            <p><strong>Status Pembayaran:</strong> <span class="status-${data.payment_status}">${data.payment_status}</span></p>
            <p><strong>Status Layanan:</strong> <span class="status-${data.service_status || "pending"}">${data.service_status || "Menunggu"}</span></p>
          </div>
          
          <div class="progress-tracker">
            <div class="progress-step ${data.payment_status === "success" ? "completed" : "pending"}">
              <span class="step-icon">💳</span>
              <span>Pembayaran</span>
            </div>
            <div class="progress-step ${data.service_status === "processing" ? "active" : data.service_status === "completed" ? "completed" : "pending"}">
              <span class="step-icon">⚙️</span>
              <span>Diproses</span>
            </div>
            <div class="progress-step ${data.service_status === "completed" ? "completed" : "pending"}">
              <span class="step-icon">✅</span>
              <span>Selesai</span>
            </div>
          </div>
          
          ${
            data.service_status === "completed" && data.access_link && data.access_link !== "#"
              ? `<div class="access-link">
                <a href="${data.access_link}" target="_blank" class="btn-success">Akses Produk</a>
              </div>`
              : data.status_message
                ? `<div class="status-message">
                  <p>${data.status_message}</p>
                </div>`
                : ""
          }

          ${
            data.otp_phone_number
              ? `<div class="otp-info">
                <h4>📞 Informasi OTP:</h4>
                <p><strong>Nomor:</strong> ${data.otp_phone_number}</p>
                <p><strong>Order ID:</strong> ${data.otp_order_id}</p>
                <p><em>Gunakan nomor ini untuk verifikasi dan tunggu OTP masuk</em></p>
              </div>`
              : ""
          }
        </div>
      `
    }

    resultDiv.innerHTML = statusContent
  } else {
    resultDiv.innerHTML = `
      <div class="error-message">
        <p>Transaksi tidak ditemukan atau terjadi kesalahan.</p>
      </div>
    `
  }
}

// --- NOKOS DYNAMIC PRODUCT FETCH ---
async function fetchNokosLayanan(negaraId = 6) {
  try {
    // Fetch ke Netlify Function, negaraId bisa diganti sesuai pilihan user
    const res = await fetch(`/.netlify/functions/get-nokos-layanan?negara=${negaraId}`);
    const data = await res.json();
    if (!data[negaraId]) return [];
    return Object.entries(data[negaraId])
      .filter(([_, v]) => v.stok > 0)
      .map(([kode, v]) => ({ kode, ...v }));
  } catch (e) {
    return [];
  }
}

async function renderNokosLayanan() {
  const grid = document.getElementById("nokosProductGrid");
  const negaraSelect = document.getElementById("nokosNegaraSelect");
  const searchInput = document.getElementById("nokosSearchInput");
  let negaraId = 6;
  if (negaraSelect) negaraId = negaraSelect.value;
  if (!grid) return;
  grid.innerHTML = "<div>Loading layanan...</div>";
  let layanan = await fetchNokosLayanan(negaraId);
  // Filter by search
  if (searchInput && searchInput.value.trim()) {
    const q = searchInput.value.trim().toLowerCase();
    layanan = layanan.filter(l => l.layanan.toLowerCase().includes(q));
  }
  if (!layanan.length) {
    grid.innerHTML = "<div style='padding:2em;text-align:center;'>Tidak ada layanan tersedia saat ini.</div>";
    return;
  }
  grid.innerHTML = layanan.map(l => `
    <div class='product-card'>
      <div class='product-icon'>📱</div>
      <div class='product-info'>
        <h3 class='product-title'>${l.layanan}</h3>
        <div class='product-badge'>Stok: ${l.stok}</div>
        <div class='product-price'>Rp ${l.harga.toLocaleString()}</div>
        <button class='btn-primary' onclick="orderNokos('${l.kode}',${l.harga},'${l.layanan}')">Order Sekarang</button>
      </div>
    </div>
  `).join('');
}

window.renderNokosLayanan = renderNokosLayanan;
window.orderNokos = function(kode, harga, nama) {
  alert(`Order: ${nama} (kode: ${kode})\nHarga: Rp ${harga.toLocaleString()}`);
  // TODO: Tampilkan form/modal order NOKOS di sini
};

// Initialize animations
function initializeAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = "running"
      }
    })
  }, observerOptions)

  document.querySelectorAll(".animate-fade-in, .animate-slide-up").forEach((el) => {
    el.style.animationPlayState = "paused"
    observer.observe(el)
  })
}

// Close modals when clicking outside
window.addEventListener("click", (event) => {
  if (event.target === purchaseModal) closePurchaseModal()
  if (event.target === paymentModal) closeModal()
  if (event.target === checkStatusModal) closeCheckStatusModal()
})

// Keyboard shortcuts
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    if (purchaseModal && purchaseModal.style.display === "flex") closePurchaseModal()
    if (paymentModal && paymentModal.style.display === "flex") closeModal()
    if (checkStatusModal && checkStatusModal.style.display === "flex") closeCheckStatusModal()
  }
})

// Debug function to check if everything is working
function debugCheck() {
  console.log("=== DEBUG CHECK ===")
  console.log("Product Database:", productDatabase)
  console.log("Current Category:", currentCategory)
  console.log("Product Grid:", productGrid)
  console.log("Section Title:", sectionTitle)
  console.log("=== END DEBUG ===")
}

// Make functions globally available
window.filterProducts = filterProducts
window.selectProduct = selectProduct
window.calculatePrice = calculatePrice
window.buyFollowers = buyFollowers
window.openPurchaseModal = openPurchaseModal
window.closePurchaseModal = closePurchaseModal
window.processPurchase = processPurchase
window.openPaymentModal = openPaymentModal
window.closeModal = closeModal
window.cancelPayment = cancelPayment
window.openCheckStatusModal = openCheckStatusModal
window.closeCheckStatusModal = closeCheckStatusModal
window.checkOrderStatus = checkOrderStatus
window.debugCheck = debugCheck

// Function to load operators (declared here to fix undeclared variable error)
function loadOperators() {
  // Implementation for loading operators goes here
  console.log("Loading operators...")
}
