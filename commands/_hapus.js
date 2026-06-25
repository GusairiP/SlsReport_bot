/*CMD
  command: /hapus
  help: /hapus TXXX 15
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
COMMAND : /hapus
MODULE  : DATA CORRECTION
========================================

FUNGSI:
Menghapus data sales harian.

FORMAT:
/hapus T001 15

DATA SOURCE:
store_T001

AKSI:
Menghapus object sales pada tanggal tertentu.

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
  Bot.sendMessage("Format:\n\n/hapus T001 15")

  return
}

let p = params.split(" ")

if (p.length < 2) {
  Bot.sendMessage("Format salah\n\n/hapus T001 15")

  return
}

let kdtk = p[0].toUpperCase()

let tgl = String(p[1])

// ======================
// AMBIL STORE
// ======================

let store = Bot.getProperty("store_" + kdtk)

if (!store) {
  Bot.sendMessage("❌ Store tidak ditemukan")

  return
}

if (!store.sales || !store.sales[tgl]) {
  Bot.sendMessage("⚠️ Data tanggal " + tgl + " tidak ditemukan")

  return
}

// ======================
// SIMPAN DATA LAMA
// ======================

let sales = Number(store.sales[tgl].sales || 0)

let struk = Number(store.sales[tgl].struk || 0)

// ======================
// HAPUS DATA
// ======================

delete store.sales[tgl]

Bot.setProperty("store_" + kdtk, store, "json")

// ======================
// UPDATE DASHBOARD
// ======================

Bot.runCommand("/dashboard_refresh")

// ======================
// OUTPUT
// ======================

Bot.sendMessage(
  "✅ Data berhasil dihapus\n\n" +
    "🏪 KDTK : " +
    kdtk +
    "\n📅 Tanggal : " +
    tgl +
    "\n💰 Sales : Rp." +
    sales.toLocaleString("id-ID") +
    "\n🧾 Struk : " +
    struk.toLocaleString("id-ID")
)
