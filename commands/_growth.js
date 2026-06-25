/*CMD
  command: /growth
  help: /growth KDTK
  need_reply: false
  auto_retry_time: 
  folder: 
  answer: 
  keyboard: 
  aliases: 
  group: 
CMD*/

/*
========================================
COMMAND : /growth
MODULE  : ANALYTICS
========================================

FUNGSI:
Menghitung growth MTD vs bulan lalu.

FORMAT:
/growth T001

DATA SOURCE:
store_T001

OUTPUT:
SPD Growth
STD Growth
APC Growth

========================================
*/

// ======================
// VALIDASI INPUT
// ======================

if (!params) {
  Bot.sendMessage("Format:\n\n/growth T001")

  return
}

let kdtk = params.toUpperCase().trim()

// ======================
// AMBIL DATA TOKO
// ======================

let store = Bot.getProperty("store_" + kdtk)

if (!store) {
  Bot.sendMessage("❌ Toko tidak ditemukan")

  return
}

// ======================
// VALIDASI SALES
// ======================

if (!store.sales || Object.keys(store.sales).length == 0) {
  Bot.sendMessage("⚠️ Belum ada data sales bulan berjalan")

  return
}

// ======================
// BULAN BERJALAN
// ======================

let totalSalesNow = 0
let totalStrukNow = 0
let hariNow = 0

for (let tgl in store.sales) {
  let sales = Number(store.sales[tgl].sales || 0)

  let struk = Number(store.sales[tgl].struk || 0)

  if (struk > 0) {
    totalSalesNow += sales
    totalStrukNow += struk

    hariNow++
  }
}

if (hariNow == 0) {
  Bot.sendMessage("⚠️ Belum ada data sales valid")

  return
}

// ======================
// KPI BULAN BERJALAN
// ======================

let spdNow = totalSalesNow / hariNow

let stdNow = totalStrukNow / hariNow

let apcNow = totalStrukNow > 0 ? totalSalesNow / totalStrukNow : 0

// ======================
// BULAN LALU
// ======================

let bl = store.bl

if (!bl || Object.keys(bl).length == 0) {
  Bot.sendMessage("⚠️ Data bulan lalu belum tersedia")

  return
}

let totalSPDbl = 0
let totalSTDbl = 0
let totalAPCbl = 0
let hariBL = 0

for (let tgl in bl) {
  let d = bl[tgl]

  totalSPDbl += Number(d.spd || 0)

  totalSTDbl += Number(d.std || 0)

  totalAPCbl += Number(d.apc || 0)

  hariBL++
}

if (hariBL == 0) {
  Bot.sendMessage("⚠️ Data bulan lalu kosong")

  return
}

let spdBL = totalSPDbl / hariBL

let stdBL = totalSTDbl / hariBL

let apcBL = totalAPCbl / hariBL

// ======================
// HITUNG GROWTH
// ======================

let gSPD = spdBL > 0 ? ((spdNow - spdBL) / spdBL) * 100 : 0

let gSTD = stdBL > 0 ? ((stdNow - stdBL) / stdBL) * 100 : 0

let gAPC = apcBL > 0 ? ((apcNow - apcBL) / apcBL) * 100 : 0

// ======================
// ICON TREND
// ======================

function trend(v) {
  if (v > 0) {
    return "🟢"
  }

  if (v < 0) {
    return "🔴"
  }

  return "⚪"
}

// ======================
// OUTPUT
// ======================

let msg =
  "📈 *GROWTH SALES MTD*\n\n" +
  "🏪 KDTK : " +
  kdtk +
  "\n🏬 TOKO : " +
  store.nama +
  "\n\n📅 Hari Data : " +
  hariNow +
  "\n\n📊 *SPD*" +
  "\nNow : Rp." +
  Math.round(spdNow).toLocaleString("id-ID") +
  "\nBL : Rp." +
  Math.round(spdBL).toLocaleString("id-ID") +
  "\nGrowth : " +
  trend(gSPD) +
  " " +
  gSPD.toFixed(2) +
  "%" +
  "\n\n📊 *STD*" +
  "\nNow : " +
  Math.round(stdNow).toLocaleString("id-ID") +
  "\nBL : " +
  Math.round(stdBL).toLocaleString("id-ID") +
  "\nGrowth : " +
  trend(gSTD) +
  " " +
  gSTD.toFixed(2) +
  "%" +
  "\n\n📊 *APC*" +
  "\nNow : Rp." +
  Math.round(apcNow).toLocaleString("id-ID") +
  "\nBL : Rp." +
  Math.round(apcBL).toLocaleString("id-ID") +
  "\nGrowth : " +
  trend(gAPC) +
  " " +
  gAPC.toFixed(2) +
  "%"

Bot.sendMessage(msg)
