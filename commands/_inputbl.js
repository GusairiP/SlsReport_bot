/*CMD
  command: /inputbl
  help: /inputbl T001 1 8500000 275
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
COMMAND : /inputbl
MODULE  : BULAN LALU
========================================

FUNGSI:
Input data bulan lalu per tanggal.

FORMAT:
/inputbl T001 1 8500000 275

KETERANGAN:
KDTK TGL SPD STD

DATA TERSIMPAN:
store_T001.bl

STRUKTUR:
{
  "1":{
    spd:8500000,
    std:275,
    apc:30909
  }
}

OUTPUT:
SPD
STD
APC

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
// VALIDASI FORMAT
// ======================

if (!params) {
  Bot.sendMessage("Format:\n\n/inputbl T001 1 8500000 275")
  return
}

let p = params.trim().split(" ")

if (p.length < 4) {
  Bot.sendMessage("Format salah\n\n/inputbl T001 1 8500000 275")
  return
}

// ======================
// PARSING DATA
// ======================

let kdtk = p[0].toUpperCase()
let tgl = String(p[1])

let spd = Number(p[2].replace(/\./g, ""))

let std = Number(p[3].replace(/\./g, ""))

// ======================
// VALIDASI ANGKA
// ======================

if (isNaN(spd) || isNaN(std)) {
  Bot.sendMessage("❌ SPD dan STD harus berupa angka")
  return
}

if (std <= 0) {
  Bot.sendMessage("❌ STD tidak boleh 0")
  return
}

// ======================
// CEK STORE
// ======================

let store = Bot.getProperty("store_" + kdtk)

if (!store) {
  Bot.sendMessage("❌ Store " + kdtk + " tidak ditemukan")
  return
}

// ======================
// HITUNG APC
// ======================

let apc = Math.round(spd / std)

// ======================
// INISIALISASI DATA BL
// ======================

if (!store.bl) {
  store.bl = {}
}

// ======================
// SIMPAN DATA BL
// ======================

store.bl[tgl] = {
  spd: spd,
  std: std,
  apc: apc
}

Bot.setProperty("store_" + kdtk, store, "json")

// ======================
// UPDATE DASHBOARD
// ======================

Bot.runCommand("/dashboard_refresh")

// ======================
// OUTPUT
// ======================

Bot.sendMessage(
  "✅ Data bulan lalu berhasil disimpan\n\n" +
    "🏪 KDTK : " +
    kdtk +
    "\n📅 Tanggal : " +
    tgl +
    "\n💰 SPD : Rp." +
    spd.toLocaleString("id-ID") +
    "\n🧾 STD : " +
    std.toLocaleString("id-ID") +
    "\n🔥 APC : Rp." +
    apc.toLocaleString("id-ID")
)

