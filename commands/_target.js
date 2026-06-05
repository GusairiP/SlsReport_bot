/*CMD
  command: /target
  help: /target TXXX 278796424 8993424
  need_reply: false
  auto_retry_time: 
  folder: 

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

/*
========================================
COMMAND : /target
MODULE  : TARGET SETTING
========================================

FUNGSI:
Mengatur target sales dan SPD toko.

FORMAT:
/target T001 278796424 8993424

DATA SOURCE:
store_T001.target

OUTPUT:
Target Sales
Target SPD

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
// VALIDASI INPUT
// ======================

if (!params) {
  Bot.sendMessage("Format:\n\n/target T001 278796424 8993424")

  return
}

let p = params.split(" ")

if (p.length < 3) {
  Bot.sendMessage("Format salah\n\n/target T001 278796424 8993424")

  return
}

// ======================
// PARSING PARAMETER
// ======================

let kdtk = p[0].toUpperCase()

let targetSales = parseInt(p[1])

let targetSpd = parseInt(p[2])

if (isNaN(targetSales) || isNaN(targetSpd)) {
  Bot.sendMessage("❌ Target harus berupa angka")

  return
}

if (targetSales <= 0 || targetSpd <= 0) {
  Bot.sendMessage("❌ Target harus lebih besar dari 0")

  return
}

// ======================
// AMBIL DATA TOKO
// ======================

let store = Bot.getProperty("store_" + kdtk)

if (!store) {
  Bot.sendMessage("❌ Toko " + kdtk + " tidak ditemukan")

  return
}

// ======================
// UPDATE TARGET
// ======================

store.target = {
  sales: targetSales,

  spd: targetSpd
}

Bot.setProperty("store_" + kdtk, store, "json")

// ======================
// REFRESH DASHBOARD
// ======================

Bot.runCommand("/dashboard_refresh")

// ======================
// OUTPUT
// ======================

Bot.sendMessage(
  "🎯 *TARGET BERHASIL DIPERBARUI*\n\n" +
    "🏪 KDTK : " +
    kdtk +
    "\n🏬 TOKO : " +
    (store.nama || "-") +
    "\n\n💰 Target Sales : Rp." +
    targetSales.toLocaleString("id-ID") +
    "\n📈 Target SPD : Rp." +
    targetSpd.toLocaleString("id-ID")
)

