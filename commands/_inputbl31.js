/*CMD
  command: /inputbl31

  <<HELP
📥 INPUT DATA SALES BULAN LALU

Format:

/inputbl31 KDTK

Lalu kirim data dengan format:

TGL,SPD,STD

Contoh:

1,8500000,275
2,9200000,290
3,8750000,280
4,9100000,285
5,8900000,278

Keterangan:

- TGL = Tanggal (1-31)
- SPD = Sales per hari
- STD = Struk per hari
- APC dihitung otomatis dari SPD ÷ STD

Format angka:

- Tidak perlu menggunakan "Rp"
- Boleh tanpa pemisah ribuan
- Disarankan tanpa titik atau koma pada nilai SPD

Contoh benar:

1,8500000,275

Contoh salah:

1,Rp.8.500.000,275
  HELP
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
COMMAND : /inputbl31
MODULE  : BULAN LALU MASSAL
========================================

FUNGSI:
Import data bulan lalu sekaligus.

FORMAT:
/inputbl31 T001

1,8500000,275
2,9200000,288
3,8700000,270

KETERANGAN:
Tanggal,SPD,STD

DATA TERSIMPAN:
store_T001.bl

OUTPUT:
Jumlah hari tersimpan

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
// VALIDASI KDTK
// ======================

if (!params) {
  Bot.sendMessage("Format:\n\n/inputbl31 T001")
  return
}

let kdtk = params
  .split(" ")[0]
  .trim()
  .toUpperCase()

// ======================
// CEK STORE
// ======================

let store = Bot.getProperty("store_" + kdtk)

if (!store) {
  Bot.sendMessage("❌ Store " + kdtk + " tidak ditemukan")
  return
}

// ======================
// INISIALISASI DATA BL
// ======================

if (!store.bl) {
  store.bl = {}
}

// ======================
// AMBIL DATA MULTILINE
// ======================

let rows = message.split("\n")

let total = 0
let skip = 0

// ======================
// LOOPING DATA
// ======================

for (let i = 0; i < rows.length; i++) {
  let row = rows[i].trim()

  if (!row) {
    continue
  }

  // Lewati baris command
  if (row.indexOf("/inputbl31") === 0) {
    continue
  }

  let r = row.split(",")

  if (r.length < 3) {
    skip++
    continue
  }

  let tgl = String(r[0].trim())

  let spd = Number(r[1].trim().replace(/\./g, ""))

  let std = Number(r[2].trim().replace(/\./g, ""))

  // ======================
  // VALIDASI DATA
  // ======================

  if (isNaN(spd) || isNaN(std) || std <= 0) {
    skip++
    continue
  }

  // ======================
  // SIMPAN DATA
  // ======================

  store.bl[tgl] = {
    spd: spd,
    std: std,
    apc: Math.round(spd / std)
  }

  total++
}

// ======================
// SIMPAN STORE
// ======================

Bot.setProperty("store_" + kdtk, store, "json")

// ======================
// UPDATE DASHBOARD
// ======================

Bot.runCommand("/dashboard_refresh")

// ======================
// OUTPUT
// ======================

Bot.sendMessage(
  "✅ Import data bulan lalu selesai\n\n" +
    "🏪 KDTK : " +
    kdtk +
    "\n📅 Data Tersimpan : " +
    total +
    "\n⚠️ Data Dilewati : " +
    skip +
    "\n\nData tersimpan ke:\nstore_" +
    kdtk +
    ".bl"
)
