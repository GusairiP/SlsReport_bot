/*CMD
  command: /daftartoko
  help: 
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
COMMAND : /daftartoko
MODULE  : MASTER STORE
========================================

FUNGSI:
Mendaftarkan toko baru ke sistem.

FORMAT:
/daftartoko KDTK,NAMA TOKO,AM,AS

CONTOH:
/daftartoko T001,IDM LAMPUNG,ARI,DONI

PROPERTY:
T001_nama
T001_am
T001_as

OUTPUT:
Toko berhasil dibuat

========================================
*/

//admin access
let admin = AdminPanel.getFieldValue({
  panel_name: "SalesConfig",
  field_name: "ADMIN_ID"
})

if (String(user.telegramid) != String(admin)) {
  Bot.sendMessage("⛔ Hanya admin yang dapat menggunakan command ini")
  return
}

//code utama
if (!params) {
  Bot.sendMessage("/daftartoko TXXX,IDM LAMPUNG,AM,AS")
  return
}

let d = params.split(",")

// ======================
// VALIDASI PARAMETER
// ======================

if (d.length < 4) {
  Bot.sendMessage("Format salah\n\n" + "/daftartoko T001,IDM LAMPUNG,ARI,DONI")

  return
}

let kdtk = d[0].trim().toUpperCase()

let nama = d[1].trim().toUpperCase()

let am = d[2].trim().toUpperCase()

let as = d[3].trim().toUpperCase()

// ======================
// CEK DUPLIKAT
// ======================

let oldStore = Bot.getProperty("store_" + kdtk)

if (oldStore) {
  Bot.sendMessage("⚠️ KDTK " + kdtk + " sudah terdaftar")

  return
}

// ======================
// TARGET DEFAULT
// ======================

let targetSales = Number(
  AdminPanel.getFieldValue({
    panel_name: "SalesConfig",
    field_name: "DEFAULT_TARGET_SALES"
  }) || 0
)

let targetSpd = Number(
  AdminPanel.getFieldValue({
    panel_name: "SalesConfig",
    field_name: "DEFAULT_TARGET_SPD"
  }) || 0
)

// ======================
// OBJECT STORE
// ======================

let store = {
  kdtk: kdtk,

  nama: nama,

  am: am,

  as: as,

  target: {
    sales: targetSales,

    spd: targetSpd
  },

  sales: {},

  bl: {},

  history: {},

  created_at: new Date().toISOString()
}

// ======================
// SIMPAN STORE
// ======================

Bot.setProperty("store_" + kdtk, store, "json")

//simpan daftar toko /u admin
let stores = Bot.getProperty("STORE_LIST")

if (!stores) {
  stores = []
}

if (stores.indexOf(kdtk) == -1) {
  stores.push(kdtk)
}

Bot.setProperty("STORE_LIST", stores, "json")

//update dashboard admin panel
Bot.runCommand("/dashboard_refresh")

Bot.sendMessage(
  "✅ Toko berhasil dibuat\n\n" +
    "🏪 KDTK : " +
    kdtk +
    "\n📍 Nama : " +
    nama +
    "\n👨 AM : " +
    am +
    "\n👨 AS : " +
    as +
    "\n\n🎯 Target Sales : Rp." +
    targetSales.toLocaleString("id-ID") +
    "\n📈 Target SPD : Rp." +
    targetSpd.toLocaleString("id-ID")
)
