const fetch = require("node-fetch")

const FIREBASE_DATABASE_URL = process.env.FIREBASE_DATABASE_URL || "https://store-velz-default-rtdb.firebaseio.com"

// Rate limiting for anti-DDoS
const rateLimitMap = new Map()
const RATE_LIMIT_WINDOW = 1000 // 1 minute
const MAX_REQUESTS_PER_WINDOW = 10 // Max 10 requests per minute per IP

// Anti-DDoS rate limiting function
function checkRateLimit(identifier) {
  const now = Date.now()
  const windowStart = now - RATE_LIMIT_WINDOW

  if (!rateLimitMap.has(identifier)) {
    rateLimitMap.set(identifier, [])
  }

  const requests = rateLimitMap.get(identifier)

  // Remove old requests outside the window
  const validRequests = requests.filter((timestamp) => timestamp > windowStart)
  rateLimitMap.set(identifier, validRequests)

  // Check if limit exceeded
  if (validRequests.length >= MAX_REQUESTS_PER_WINDOW) {
    return false
  }

  // Add current request
  validRequests.push(now)
  rateLimitMap.set(identifier, validRequests)

  return true
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
      body: JSON.stringify({ status: "error", message: "Method not allowed" }),
    }
  }

  // Anti-DDoS: Rate limiting based on IP
  const clientIP = event.headers["x-forwarded-for"] || event.headers["x-real-ip"] || "unknown"
  if (!checkRateLimit(clientIP)) {
    console.log(`Rate limit exceeded for IP: ${clientIP}`)
    return {
      statusCode: 429,
      headers,
      body: JSON.stringify({ status: "error", message: "Too many requests. Please try again later." }),
    }
  }

  try {
    const params = new URLSearchParams(event.body)
    const announcementText = params.get("text")
    const announcementDuration = params.get("duration") || "3600" // Default 1 hour

    if (!announcementText) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ status: "error", message: "Announcement text is required" }),
      }
    }

    // Validate announcement text (anti-spam)
    if (announcementText.length > 500) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ status: "error", message: "Announcement text too long (max 500 characters)" }),
      }
    }

    // Save announcement to Firebase
    const firebaseUrl = `${FIREBASE_DATABASE_URL}/announcement.json`

    const duration = Number.parseInt(announcementDuration)
    const expiry = Date.now() + duration * 1000

    await fetch(firebaseUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: announcementText,
        timestamp: new Date().toISOString(),
        expiry: expiry,
      }),
    })

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ status: "success", message: "Announcement sent to website!" }),
    }
  } catch (error) {
    console.error("Error sending announcement:", error)
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ status: "error", message: "Internal server error: " + error.message }),
    }
  }
}
