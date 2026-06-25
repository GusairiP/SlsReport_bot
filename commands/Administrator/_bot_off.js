/*CMD
  command: /bot_off
  help: 
  need_reply: false
  auto_retry_time: 
  folder: Administrator
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

/*
========================================
COMMAND : /bot_off
MODULE  : SYSTEM CONTROL
========================================

FUNGSI:
Menonaktifkan bot sales.

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

if (!status) {
  Bot.sendMessage("ℹ️ Bot sudah dalam kondisi nonaktif")

  return
}

// ======================
// NONAKTIFKAN BOT
// ======================

AdminPanel.setFieldValue({
  panel_name: "SalesConfig",
  field_name: "BOT_STATUS",
  value: false
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
  "🔴 *BOT DINONAKTIFKAN*\n\n" +
    "Status : NONAKTIF" +
    "\nTanggal : " +
    now.toLocaleDateString("id-ID") +
    "\nJam : " +
    now.toLocaleTimeString("id-ID") +
    "\n\n⛔ Command pengguna tidak dapat digunakan sampai bot diaktifkan kembali."
)
