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

let kdtk =
p[0].toUpperCase()

let tgl =
String(p[1])

let sales =
parseInt(p[2])

let struk =
parseInt(p[3])

if(
 isNaN(sales) ||
 isNaN(struk)
){

 Bot.sendMessage(
  "❌ Sales dan Struk harus berupa angka"
 )

 return
}

// ======================
// AMBIL DATA STORE
// ======================

let store =
Bot.getProperty(
 "store_" + kdtk
)

if(!store){

 Bot.sendMessage(
  "❌ Store tidak ditemukan"
 )

 return
}

if(!store.sales){
 store.sales = {}
}

if(!store.bl){
 store.bl = {}
}

// ======================
// VALIDASI DATA BULAN LALU
// ======================

let bl =
store.bl

let keyTgl =
String(tgl)

if(
 Object.keys(bl).length === 0
){

 Bot.sendMessage(
  "❌ Data bulan lalu belum tersedia.\n\n"+
  "Gunakan /inputbl atau /inputbl31 terlebih dahulu."
 )

 return
}

if(!bl[keyTgl]){

 Bot.sendMessage(
  "❌ Data bulan lalu tanggal " +
  keyTgl +
  " belum tersedia."
 )

 return
}

// ======================
// SIMPAN SALES HARIAN
// ======================

store.sales[keyTgl] = {

 sales:sales,
 struk:struk

}

Bot.setProperty(

 "store_"+kdtk,
 store,
 "json"

)

// ======================
// AMBIL DATA BULAN LALU
// ======================

let spdBL =
Number(
 bl[keyTgl].spd || 0
)

let stdBL =
Number(
 bl[keyTgl].std || 0
)

let apcBL =
Number(
 bl[keyTgl].apc || 0
)
,let apc =

struk > 0
? Math.round(sales / struk)
: 0

//update dashboard admin panel
Bot.runCommand("/dashboard_refresh")

// ======================
// GENERATE OUTPUT
// ======================

Bot.sendMessage(

"✅ Data tersimpan\n\n"+

"🏪 KDTK : " + kdtk +
"\n🏬 Toko : " +
(store.nama || "-") +

"\n📅 Tanggal : " + tgl +

"\n💰 Sales : Rp." +
sales.toLocaleString("id-ID") +

"\n🧾 Struk : " +
struk.toLocaleString("id-ID") +

"\n🔥 APC : Rp." +
apc.toLocaleString("id-ID") +

"\n\n━━━━━━━━━━━━━━"+
"\n📉 BULAN LALU"+
"\n━━━━━━━━━━━━━━"+

"\nSPD : Rp." +
spdBL.toLocaleString("id-ID") +

"\nSTD : " +
stdBL.toLocaleString("id-ID") +

"\nAPC : Rp." +
apcBL.toLocaleString("id-ID")

)
