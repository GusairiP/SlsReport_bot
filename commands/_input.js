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

if(!params){
Bot.sendMessage(
"Format:\n\n/input TDTK TGL SALES STRUK"
)
return
}

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
// CEK SALES BULAN LALU
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

Bot.setProperty(keySales, sales, "integer")
Bot.setProperty(keyStruk, struk, "integer")

// ======================
// INDEX SYSTEM
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
let salesBL = bl[tgl].sales
let spdBL = bl[tgl].spd
let stdBL = bl[tgl].std
let apcBL = bl[tgl].apc
let apc = 0

if(struk > 0){
apc = Math.round(sales / struk)
}

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
