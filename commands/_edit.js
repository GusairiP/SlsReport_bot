/*CMD
  command: /edit
  help: /edit TXXX 15 9000000 280
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
COMMAND : /edit
MODULE  : DATA CORRECTION
========================================

FUNGSI:
Mengubah data sales harian.

FORMAT:
/edit T001 15 9000000 280

DATA SOURCE:
store_T001

OUTPUT:
Sales
Struk
APC

========================================
*/

// ======================
// ADMIN ACCESS
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
  Bot.sendMessage("Format:\n\n/edit T001 15 9000000 280")

  return
}

let p = params.split(" ")

if (p.length < 4) {
  Bot.sendMessage("Format salah\n\n/edit T001 15 9000000 280")

  return
}

// ======================
// PARSING PARAMETER
// ======================

let kdtk = p[0].toUpperCase()

let tgl = String(p[1])

let sales = parseInt(p[2])

let struk = parseInt(p[3])

if (isNaN(sales) || isNaN(struk)) {
  Bot.sendMessage("❌ Sales dan Struk harus berupa angka")

  return
}

// ======================
// AMBIL DATA STORE
// ======================

let store = Bot.getProperty("store_" + kdtk)

if (!store) {
  Bot.sendMessage("❌ Toko " + kdtk + " tidak ditemukan")

  return
}

// ======================
// SIAPKAN SALES OBJECT
// ======================

if (!store.sales) {
  store.sales = {}
}

// ======================
// UPDATE DATA
// ======================

store.sales[tgl] = {
  sales: sales,

  struk: struk
}

// ======================
// SIMPAN STORE
// ======================

Bot.setProperty("store_" + kdtk, store, "json")

// ======================
// HITUNG APC
// ======================

let apc = 0

if (struk > 0) {
  apc = Math.round(sales / struk)
}

// ======================
// REFRESH DASHBOARD
// ======================

Bot.runCommand("/dashboard_refresh")

// ======================
// OUTPUT
// ======================

Bot.sendMessage(
  "✅ Data berhasil diperbarui\n\n" +
    "🏪 KDTK : " +
    kdtk +
    "\n📅 Tanggal : " +
    tgl +
    "\n💰 Sales : Rp." +
    sales.toLocaleString("id-ID") +
    "\n🧾 Struk : " +
    struk.toLocaleString("id-ID") +
    "\n🔥 APC : Rp." +
    apc.toLocaleString("id-ID")
)
