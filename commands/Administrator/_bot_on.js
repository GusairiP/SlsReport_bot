/*CMD
  command: /bot_on
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
COMMAND : /bot_on
MODULE  : SYSTEM CONTROL
========================================

FUNGSI:
Mengaktifkan bot sales.

ADMIN ONLY

FIELD:
SalesConfig.BOT_STATUS

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
  Bot.sendMessage("⛔ Hanya admin yang dapat menggunakan command ini")

  return
}

// ======================
// CEK STATUS BOT
// ======================

let status = AdminPanel.getFieldValue({
  panel_name: "SalesConfig",
  field_name: "BOT_STATUS"
})

if (status) {
  Bot.sendMessage("ℹ️ Bot sudah dalam kondisi aktif")

  return
}

// ======================
// AKTIFKAN BOT
// ======================

AdminPanel.setFieldValue({
  panel_name: "SalesConfig",
  field_name: "BOT_STATUS",
  value: true
})

// ======================
// UPDATE DASHBOARD
// ======================

Bot.runCommand("/dashboard_refresh")

// ======================
// OUTPUT
// ======================

let now = new Date()

Bot.sendMessage(
  "🟢 *BOT DIAKTIFKAN*\n\n" +
    "Status : AKTIF" +
    "\nTanggal : " +
    now.toLocaleDateString("id-ID") +
    "\nJam : " +
    now.toLocaleTimeString("id-ID") +
    "\n\n✅ Semua command kembali dapat digunakan."
)

