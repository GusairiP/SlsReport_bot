/*CMD
  command: /store
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
COMMAND : /store
MODULE  : STORE INSPECTOR
========================================

FUNGSI:
Menampilkan seluruh informasi toko
yang tersimpan pada property store_KDTK

CONTOH:
/store T001

========================================
*/

if (!params) {
  Bot.sendMessage("Format:\n/store T001")

  return
}

// ======================
// AMBIL KDTK
// ======================

let kdtk = params.toUpperCase().trim()

// ======================
// AMBIL DATA STORE
// ======================

let store = Bot.getProperty("store_" + kdtk)

if (!store) {
  Bot.sendMessage("⚠️ Store tidak ditemukan")

  return
}

// ======================
// HITUNG DATA SALES
// ======================

let totalHariSales = 0

if (store.sales) {
  totalHariSales = Object.keys(store.sales).length
}

// ======================
// HITUNG DATA BL
// ======================

let totalHariBL = 0

if (store.bl) {
  totalHariBL = Object.keys(store.bl).length
}

// ======================
// TARGET
// ======================

let targetSales = 0
let targetSpd = 0

if (store.target) {
  targetSales = Number(store.target.sales || 0)

  targetSpd = Number(store.target.spd || 0)
}

// ======================
// OUTPUT
// ======================

let msg =
  "🏪 *STORE INFORMATION*\n\n" +
  "📌 KDTK : " +
  kdtk +
  "\n🏬 Nama : " +
  (store.nama || "-") +
  "\n👨‍💼 AM : " +
  (store.am || "-") +
  "\n👤 AS : " +
  (store.as || "-") +
  "\n\n━━━━━━━━━━━━━━" +
  "\n🎯 TARGET" +
  "\n━━━━━━━━━━━━━━" +
  "\n💰 Sales : Rp." +
  targetSales.toLocaleString("id-ID") +
  "\n📈 SPD : Rp." +
  targetSpd.toLocaleString("id-ID") +
  "\n\n━━━━━━━━━━━━━━" +
  "\n📊 DATA RECORD" +
  "\n━━━━━━━━━━━━━━" +
  "\n📝 Sales Hari : " +
  totalHariSales +
  "\n📅 Data BL : " +
  totalHariBL +
  "\n📈 Trend : " +
  (store.history ? Object.keys(store.history).length : 0) +
  " Bulan"

Bot.sendMessage(msg)

