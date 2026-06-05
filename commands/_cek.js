/*CMD
  command: /cek
  help: /cek TXXX 15
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
COMMAND : /cek
MODULE  : DAILY CHECK
========================================

FUNGSI:
Melihat detail sales harian dan growth.

FORMAT:
/cek T001 15

DATA SOURCE:
store_T001

OUTPUT:
Sales
Struk
APC

VS BULAN LALU:
Growth Sales
Growth Struk
Growth APC

========================================
*/

// ======================
// VALIDASI INPUT
// ======================

if (!params) {
  Bot.sendMessage("Format:\n\n/cek T001 15")

  return
}

let p = params.split(" ")

if (p.length < 2) {
  Bot.sendMessage("Format salah\n\n/cek T001 15")

  return
}

let kdtk = p[0].toUpperCase()

let tgl = String(p[1])

// ======================
// AMBIL DATA TOKO
// ======================

let store = Bot.getProperty("store_" + kdtk)

if (!store) {
  Bot.sendMessage("❌ Toko tidak ditemukan")

  return
}

// ======================
// DATA BULAN INI
// ======================

if (!store.sales || !store.sales[tgl]) {
  Bot.sendMessage("⚠️ Data tanggal " + tgl + " tidak ditemukan")

  return
}

let sales = Number(store.sales[tgl].sales || 0)

let struk = Number(store.sales[tgl].struk || 0)

let apc = struk > 0 ? Math.round(sales / struk) : 0

// ======================
// DATA BULAN LALU
// ======================

let bl = store.bl || {}

let salesBL = 0
let strukBL = 0
let apcBL = 0

let gSales = 0
let gStruk = 0
let gApc = 0

if (bl[tgl]) {
  salesBL = Number(bl[tgl].spd || 0)

  strukBL = Number(bl[tgl].std || 0)

  apcBL = Number(bl[tgl].apc || 0)

  // ======================
  // GROWTH
  // ======================

  if (salesBL > 0) {
    gSales = ((sales - salesBL) / salesBL) * 100
  }

  if (strukBL > 0) {
    gStruk = ((struk - strukBL) / strukBL) * 100
  }

  if (apcBL > 0) {
    gApc = ((apc - apcBL) / apcBL) * 100
  }
}

// ======================
// ICON TREND
// ======================

function trend(v) {
  if (v > 0) {
    return "🟢 +"
  }

  if (v < 0) {
    return "🔴 "
  }

  return "⚪ "
}

// ======================
// OUTPUT
// ======================

let msg =
  "📊 *DETAIL SALES HARIAN*\n\n" +
  "🏪 KDTK : " +
  kdtk +
  "\n🏬 TOKO : " +
  (store.nama || "-") +
  "\n📅 Tanggal : " +
  tgl +
  "\n\n━━━━━━━━━━━━━━" +
  "\n📈 *BULAN INI*" +
  "\n━━━━━━━━━━━━━━" +
  "\n💰 Sales : Rp." +
  sales.toLocaleString("id-ID") +
  "\n🧾 Struk : " +
  struk.toLocaleString("id-ID") +
  "\n🔥 APC : Rp." +
  apc.toLocaleString("id-ID")

// ======================
// BULAN LALU
// ======================

msg +=
  "\n\n━━━━━━━━━━━━━━" +
  "\n📉 *BULAN LALU*" +
  "\n━━━━━━━━━━━━━━" +
  "\n💰 Sales : Rp." +
  salesBL.toLocaleString("id-ID") +
  "\n🧾 Struk : " +
  strukBL.toLocaleString("id-ID") +
  "\n🔥 APC : Rp." +
  apcBL.toLocaleString("id-ID")

// ======================
// GROWTH
// ======================

msg +=
  "\n\n━━━━━━━━━━━━━━" +
  "\n📊 *GROWTH VS BULAN LALU*" +
  "\n━━━━━━━━━━━━━━" +
  "\n💰 Sales : " +
  trend(gSales) +
  gSales.toFixed(2) +
  "%"

msg += "\n🧾 Struk : " + trend(gStruk) + gStruk.toFixed(2) + "%"

msg += "\n🔥 APC : " + trend(gApc) + gApc.toFixed(2) + "%"

Bot.sendMessage(msg)

