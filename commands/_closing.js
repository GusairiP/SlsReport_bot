/*CMD
  command: /closing
  help: 
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
COMMAND : /closing
MODULE  : CLOSING REPORT
========================================

FUNGSI:
Menghitung prediksi closing bulan.

FORMAT:
/closing T001

DATA SOURCE:
store_T001

OUTPUT:
Total Sales
SPD
Prediksi Closing
Gap Target
Status Target

========================================
*/

// ======================
// VALIDASI INPUT
// ======================

if (!params) {
  Bot.sendMessage("Format:\n\n/closing T001")
  return
}

let kdtk = params.toUpperCase().trim()

// ======================
// AMBIL DATA TOKO
// ======================

let store = Bot.getProperty("store_" + kdtk)

if (!store) {
  Bot.sendMessage("❌ Toko " + kdtk + " tidak ditemukan")
  return
}

// ======================
// VALIDASI DATA SALES
// ======================

if (!store.sales || Object.keys(store.sales).length == 0) {
  Bot.sendMessage("⚠️ Belum ada data sales untuk " + kdtk)
  return
}

// ======================
// AKUMULASI SALES
// ======================

let totalSales = 0
let hari = 0

for (let tgl in store.sales) {
  let sales = Number(store.sales[tgl].sales || 0)

  if (sales > 0) {
    totalSales += sales
    hari++
  }
}

if (hari == 0) {
  Bot.sendMessage("⚠️ Belum ada data sales")
  return
}

// ======================
// HITUNG SPD
// ======================

let spd = totalSales / hari

// jumlah hari bulan berjalan
let now = new Date()

let jumlahHariBulan = new Date(
  now.getFullYear(),
  now.getMonth() + 1,
  0
).getDate()

let prediksi = spd * jumlahHariBulan

// ======================
// TARGET SALES
// ======================

let target = Number(store.target.sales || 0)

let gap = target - prediksi

// ======================
// ACHIEVEMENT
// ======================

let ach = 0

if (target > 0) {
  ach = Math.round((prediksi / target) * 100)
}

// ======================
// STATUS TARGET
// ======================

let status = "⚪ ON TARGET"

if (gap > 0) {
  status = "🔴 UNDER TARGET"
}

if (gap < 0) {
  status = "🟢 OVER TARGET"
}

// ======================
// GENERATE REPORT
// ======================

let msg =
  "🎯 *CLOSING REPORT*\n\n" +
  "🏬 KDTK : " +
  kdtk +
  "\n🏪 TOKO : " +
  store.nama +
  "\n\n━━━━━━━━━━━━━━" +
  "\n📊 *SUMMARY SALES*" +
  "\n━━━━━━━━━━━━━━" +
  "\n📦 Total Sales : Rp." +
  totalSales.toLocaleString("id-ID") +
  "\n📅 Hari Aktif : " +
  hari +
  "\n📈 SPD : Rp." +
  Math.round(spd).toLocaleString("id-ID") +
  "\n🔮 Prediksi Closing : Rp." +
  Math.round(prediksi).toLocaleString("id-ID") +
  "\n\n━━━━━━━━━━━━━━" +
  "\n🎯 *TARGET*" +
  "\n━━━━━━━━━━━━━━" +
  "\n🎯 Target Sales : Rp." +
  target.toLocaleString("id-ID") +
  "\n🏆 Achievement : " +
  ach +
  "%" +
  "\n📉 GAP : Rp." +
  Math.abs(Math.round(gap)).toLocaleString("id-ID") +
  "\n\n" +
  status

Bot.sendMessage(msg)

