/*CMD
  command: /start
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: hi, halo
  group: 
CMD*/

/*
========================================
COMMAND : /start
MODULE  : MAIN MENU (FIXED)
========================================
*/

// ======================
// CEK STATUS BOT
// ======================

let status = AdminPanel.getFieldValue({
  panel_name: "SalesConfig",
  field_name: "BOT_STATUS"
})

// handle string "false", "0", null, undefined
if (status == "false" || status == "0" || status == false || status == null) {
  Bot.sendMessage("⛔ Bot sedang dinonaktifkan admin")
  return
}

// ======================
// ADMIN DATA
// ======================

let adminId = AdminPanel.getFieldValue({
  panel_name: "SalesConfig",
  field_name: "ADMIN_ID"
})

let isAdmin = String(user.telegramid) == String(adminId)

// ======================
// MESSAGE INTRO
// ======================

let intro =
  "👋 *Selamat datang di BOT SALES*\n\n" +
  "📊 Bot ini digunakan untuk monitoring sales harian, rekap, growth, dan closing report.\n\n" +
  "━━━━━━━━━━━━━━\n" +
  "👨‍💼 *ADMIN SUPPORT*\n" +
  "💬 Hubungi Admin: @gusairiputra\n\n" +
  "━━━━━━━━━━━━━━\n" +
  "⚡ Silakan pilih menu di bawah untuk mulai."

// ======================
// INLINE KEYBOARD MENU
// ======================

let rows = [
  [
    { title: "🏪 Daftar Toko", command: "/daftartoko" },
    { title: "🎯 Target", command: "/target" }
  ],
  [
    { title: "📝 Input Sales", command: "/input" },
    { title: "📥 Input BL", command: "/inputbl" }
  ],
  [
    { title: "📊 Rekap", command: "/rekap" },
    { title: "📈 Growth", command: "/growth" }
  ],
  [
    { title: "🔔 Closing", command: "/closing" },
    { title: "📉 Trend", command: "/trend" }
  ],
  [{ title: "🔍 Cek Harian", command: "/cek" }]
]

// ======================
// ADMIN MENU (OPTIONAL)
// ======================

if (isAdmin) {
  rows.push([{ title: "⚙️ Admin Panel", command: "/admin" }])
}

// ======================
// OUTPUT (ONLY ONCE)
// ======================

Bot.sendInlineKeyboard(rows, "📋 *MENU UTAMA SALES REPORT*\n\n" + intro)

