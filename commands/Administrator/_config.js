/*CMD
  command: /config
  help: 
  need_reply: false
  auto_retry_time: 
  folder: Administrator

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

/*
========================================
COMMAND : /config
MODULE  : BOT CONFIGURATION
========================================

FUNGSI:
Pusat konfigurasi sistem BOT SALES.

FITUR:
- Status Bot
- Admin Aktif
- Total Store
- Default Target
- Shortcut Menu Admin

========================================
*/

// ======================
// VALIDASI ADMIN
// ======================

let admin = AdminPanel.getFieldValue({
  panel_name: "SalesConfig",
  field_name: "ADMIN_ID"
})

if (String(user.telegramid) != String(admin)) {
  Bot.sendMessage("⛔ Akses ditolak")
  return
}

// ======================
// AMBIL CONFIG
// ======================

let status = AdminPanel.getFieldValue({
  panel_name: "SalesConfig",
  field_name: "BOT_STATUS"
})

let defaultSales = Number(
  AdminPanel.getFieldValue({
    panel_name: "SalesConfig",
    field_name: "DEFAULT_TARGET_SALES"
  }) || 0
)

let defaultSpd = Number(
  AdminPanel.getFieldValue({
    panel_name: "SalesConfig",
    field_name: "DEFAULT_TARGET_SPD"
  }) || 0
)

// ======================
// DATA STORE
// ======================

let stores = Bot.getProperty("STORE_LIST") || []

// ======================
// GENERATE MENU
// ======================

Bot.sendInlineKeyboard(
  [
    [
      {
        title: status ? "🔴 Nonaktifkan Bot" : "🟢 Aktifkan Bot",

        command: status ? "/bot_off" : "/bot_on"
      }
    ],

    [
      {
        title: "📊 Refresh Dashboard",
        command: "/dashboard_refresh"
      }
    ],

    [
      {
        title: "🏪 Store List",
        command: "/storelist"
      },
      {
        title: "📈 Ranking",
        command: "/ranking"
      }
    ],

    [
      {
        title: "🚨 Alert Store",
        command: "/alert"
      }
    ],

    [
      {
        title: "👨‍💼 Admin Center",
        command: "/admin"
      }
    ]
  ],

  "⚙️ *BOT CONFIGURATION*\n\n" +
    "━━━━━━━━━━━━━━\n" +
    "🤖 *SYSTEM INFO*\n" +
    "━━━━━━━━━━━━━━\n" +
    "Status Bot : " +
    (status ? "🟢 Aktif" : "🔴 Nonaktif") +
    "\nAdmin ID : " +
    admin +
    "\nTotal Store : " +
    stores.length +
    "\n\n━━━━━━━━━━━━━━\n" +
    "🎯 *DEFAULT TARGET*\n" +
    "━━━━━━━━━━━━━━\n" +
    "Sales : Rp." +
    defaultSales.toLocaleString("id-ID") +
    "\nSPD : Rp." +
    defaultSpd.toLocaleString("id-ID") +
    "\n\n━━━━━━━━━━━━━━\n" +
    "⚡ Gunakan tombol di bawah untuk mengelola sistem."
)

