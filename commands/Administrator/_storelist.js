/*CMD
  command: /storelist
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
COMMAND : /storelist
MODULE  : MASTER STORE
========================================

FUNGSI:
Menampilkan seluruh toko yang terdaftar.

FORMAT:
/storelist

DATA SOURCE:
STORE_LIST
store_TXXX

OUTPUT:
KDTK
Nama Toko
AM
AS
Jumlah Store

========================================
*/

// ======================
// AMBIL DAFTAR STORE
// ======================

let stores = Bot.getProperty("STORE_LIST") || []

if (stores.length === 0) {
  Bot.sendMessage("⚠️ Belum ada toko terdaftar")

  return
}

// ======================
// GENERATE REPORT
// ======================

let txt =
  "🏪 *STORE LIST*\n\n" +
  "━━━━━━━━━━━━━━\n" +
  "📊 Total Store : " +
  stores.length +
  "\n━━━━━━━━━━━━━━\n\n"

// ======================
// LOOP STORE
// ======================

for (let i = 0; i < stores.length; i++) {
  let kdtk = stores[i]

  let store = Bot.getProperty("store_" + kdtk) || {}

  let jumlahHari = 0

  if (store.sales) {
    jumlahHari = Object.keys(store.sales).length
  }

  txt +=
    i +
    1 +
    ". 🏪 " +
    kdtk +
    "\n🏬 " +
    (store.nama || "-") +
    "\n👨‍💼 AM : " +
    (store.am || "-") +
    "\n👨‍💻 AS : " +
    (store.as || "-") +
    "\n📅 Data Sales : " +
    jumlahHari +
    " Hari\n\n"
}

// ======================
// OUTPUT
// ======================

Bot.sendMessage(txt)

