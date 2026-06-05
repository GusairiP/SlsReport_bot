/*CMD
  command: /rekap
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
COMMAND : /rekap
MODULE  : REPORTING
========================================

FUNGSI:
Menampilkan rekap sales bulanan.

FORMAT:
/rekap T001

SUMBER DATA:
index_T001
T001_sales_x
T001_struk_x
T001_BL

OUTPUT:
Sales Harian
SPD
STD
APC
Growth
Trend

========================================
*/

// ======================
// VALIDASI INPUT
// ======================

if (!params) {
  Bot.sendMessage("Format:\n/rekap KDTK")
  return
}

let kdtk = params.toUpperCase()

// ======================
// AMBIL MASTER TOKO
// ======================

let store = Bot.getProperty("store_" + kdtk)

if (!store) {
  Bot.sendMessage("⚠️ Store tidak ditemukan")
  return
}

let toko = store.nama || "-"

let am = store.am || "-"

let as = store.as || "-"

// ======================
// AMBIL INDEX TANGGAL
// ======================

let salesData = store.sales || {}

let index = Object.keys(salesData)

if (index.length == 0) {
  Bot.sendMessage("⚠️ Belum ada data sales untuk " + kdtk)

  return
}

let list = []
let totalSales = 0
let totalStruk = 0

// ======================
// LOOPING DATA SALES
// ======================

for (let i = 0; i < index.length; i++) {
  let tgl = index[i]

  let data = salesData[tgl]

  if (!data) {
    continue
  }

  let sales = Number(data.sales || 0)

  let struk = Number(data.struk || 0)

  if (!sales || !struk) continue

  let apc = Math.round(sales / struk)

  list.push({
    tgl: tgl,
    sales: sales,
    struk: struk,
    apc: apc
  })

  totalSales += sales
  totalStruk += struk
}

list.sort(function(a, b) {
  return Number(a.tgl) - Number(b.tgl)
})

let now = new Date()
let bulanNama = [
  "",
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember"
]

let bulan = bulanNama[now.getMonth()]
let tahun = now.getFullYear()

let spd = totalSales / list.length

// ======================
// UPDATE HISTORY SPD
// ======================

let history = store.history || {}

if (!history) {
  history = {}
}

let keyHistory = bulanNama[now.getMonth() + 1] + " " + now.getFullYear()

history[keyHistory] = Math.round(spd)

store.history = history

Bot.setProperty("store_" + kdtk, store, "json")

let std = totalStruk / list.length
let apc = totalStruk > 0 ? Math.round(totalSales / totalStruk) : 0

// ======================
// AMBIL DATA BULAN LALU
// ======================

let bl = store.bl || {}

let batasHari = new Date().getDate()

if (!bl) {
  Bot.sendMessage("Data bulan lalu tidak ditemukan")
  return
}

let totalSPDbl = 0
let totalSTDbl = 0
let totalAPCbl = 0
let hariBL = 0

for (let tgl = 1; tgl <= batasHari; tgl++) {
  let d = bl[tgl]

  if (d) {
    totalSPDbl += Number(d.spd || 0)

    totalSTDbl += Number(d.std || 0)

    totalAPCbl += Number(d.apc || 0)

    hariBL++
  }
}

if (hariBL == 0) {
  Bot.sendMessage("Data bulan lalu kosong")
  return
}

let spdBL = totalSPDbl / hariBL

let stdBL = totalSTDbl / hariBL

let apcBL = totalAPCbl / hariBL

// ======================
// HITUNG GROWTH
// ======================

let gSPD = 0
let gSTD = 0
let gAPC = 0

if (hariBL > 0) {
  apcBL = totalSTDbl > 0 ? Math.round(totalSPDbl / totalSTDbl) : 0

  gSPD = spdBL > 0 ? ((spd - spdBL) / spdBL) * 100 : 0

  gSTD = stdBL > 0 ? ((std - stdBL) / stdBL) * 100 : 0

  gAPC = apcBL > 0 ? ((apc - apcBL) / apcBL) * 100 : 0
}

// ======================
// HITUNG ACHIEVEMENT
// ======================

let targetSales = 0
let targetSpd = 0

if (store.target) {
  targetSales = Number(store.target.sales || 0)

  targetSpd = Number(store.target.spd || 0)
}
let ach = 0

if (targetSpd > 0) {
  ach = Math.round((spd / targetSpd) * 100)
}

// ======================
// GENERATE REKAP REPORT
// ======================

let msg =
  "KDTK  : " +
  kdtk +
  "\n" +
  "TOKO :  " +
  toko +
  "\n" +
  "AM     : " +
  am +
  "\n" +
  "AS      : " +
  as +
  "\n\n" +
  "*PERFORMANCE SALES BULAN LALU*\n" +
  "Bulan : " +
  bulan +
  " " +
  tahun +
  "\n" +
  "SPD : Rp." +
  Math.round(spdBL).toLocaleString("id-ID") +
  "\n" +
  "STD : " +
  Math.round(stdBL).toLocaleString("id-ID") +
  "\n" +
  "APC : " +
  Math.round(apcBL).toLocaleString("id-ID") +
  "\n\n" +
  "*LAPORAN SALES HARIAN " +
  bulanNama[now.getMonth() + 1].toUpperCase() +
  " " +
  tahun +
  "*\n\n" +
  "TGL_SALES NET_STRUK_APC\n\n"

for (let i = 0; i < list.length; i++) {
  let d = list[i]

  msg +=
    i +
    1 +
    ".Rp." +
    d.sales.toLocaleString("id-ID") +
    "_" +
    d.struk +
    "_" +
    d.apc.toLocaleString("id-ID") +
    "\n"
}

msg += "\nAKUMULASI SALES :\nRp." + totalSales.toLocaleString("id-ID") + "\n\n"

msg +=
  "Target Sales : Rp." +
  targetSales.toLocaleString("id-ID") +
  "\n" +
  "Target SPD   : Rp." +
  targetSpd.toLocaleString("id-ID") +
  "\n" +
  "Spd                : Rp." +
  Math.round(spd).toLocaleString("id-ID") +
  "\n" +
  "Ach                : " +
  ach +
  "%"

msg +=
  "\n\n*GROWTH SALES VS BULAN LALU*\n" +
  "SPD : " +
  (gSPD > 0 ? "+" : "") +
  gSPD.toFixed(0) +
  "%\n" +
  "STD : " +
  (gSTD > 0 ? "+" : "") +
  gSTD.toFixed(0) +
  "%\n" +
  "APC : " +
  (gAPC > 0 ? "+" : "") +
  gAPC.toFixed(0) +
  "%"

if (!history) {
  Bot.sendMessage("⚠️ Trend belum tersedia untuk " + kdtk)
  return
}

msg += "\n\n*TREND RECORD SPD*\n\n"

for (let bulan in history) {
  msg +=
    "SPD " +
    bulan +
    "\n" +
    "Rp." +
    Number(history[bulan]).toLocaleString("id-ID") +
    "\n\n"
}

Bot.sendMessage(msg)

