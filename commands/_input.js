/*CMD
  command: /input
  help: /input TXXX 15 8500000 275
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
COMMAND : /input
MODULE  : SALES HARIAN
========================================

FUNGSI:
Menyimpan sales harian bulan berjalan.

FORMAT:
/input T001 15 8500000 275

KETERANGAN:
KDTK TGL SALES STRUK

PROPERTY:
T001_sales_15
T001_struk_15
index_T001

OUTPUT:
Sales
Struk
APC
Data bulan lalu

========================================
*/

// ======================
// VALIDASI FORMAT INPUT
// ======================

if(!params){
Bot.sendMessage(
"Format:\n\n/input TDTK TGL SALES STRUK"
)
return
}

// ======================
// PARSING PARAMETER
// ======================

let p = params.split(" ")

if(p.length < 4){
Bot.sendMessage(
"Format salah\n\n/input TXXX 15 8500000 275"
)
return
}

let kdtk = p[0].toUpperCase()
let tgl = p[1]

let sales = parseInt(p[2])
let struk = parseInt(p[3])

// ======================
// VALIDASI DATA BULAN LALU
// ======================

let bl = Bot.getProperty(
kdtk + "_BL"
)

if(!bl){
Bot.sendMessage(
"❌ Data bulan lalu belum tersedia.\n\n" +
"Input terlebih dahulu menggunakan /inputbl"
)
return
}

if(!bl[tgl]){
Bot.sendMessage(
"❌ Data bulan lalu tanggal " +
tgl +
" belum diinput."
)
return
}

let keySales = kdtk + "_sales_" + tgl
let keyStruk = kdtk + "_struk_" + tgl

// ======================
// SIMPAN SALES HARIAN
// ======================

Bot.setProperty(keySales, sales, "integer")
Bot.setProperty(keyStruk, struk, "integer")

// ======================
// UPDATE INDEX TANGGAL
// ======================

let index = Bot.getProperty("index_" + kdtk)

if(!index){
index = []
}

if(index.indexOf(tgl) == -1){
index.push(tgl)
}

Bot.setProperty(
  "index_" + kdtk,
  index,
  "json"
)

// ======================
// AMBIL DATA BULAN LALU
// ======================

let salesBL = bl[tgl].sales
let spdBL = bl[tgl].spd
let stdBL = bl[tgl].std
let apcBL = bl[tgl].apc
let apc = 0

if(struk > 0){
apc = Math.round(sales / struk)
}

//update dashboard admin panel
Bot.runCommand("/dashboard_refresh")

// ======================
// GENERATE OUTPUT
// ======================

Bot.sendMessage(
"✅ Data tersimpan\n\n" +
"KDTK : " + kdtk +
"\nTanggal : " + tgl +
"\nSales : Rp." +
new Intl.NumberFormat('id-ID').format(sales) +
"\nStruk : " + struk +
"\nAPC : " +
new Intl.NumberFormat('id-ID').format(apc) + "\n\n=== BULAN LALU ===" +
"\nSPD : Rp." + new Intl.NumberFormat('id-ID').format(spdBL) +
"\nSTD : " + new Intl.NumberFormat('id-ID').format(stdBL) +
"\nAPC : " + new Intl.NumberFormat('id-ID').format(apcBL)
)
