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

if(!params){
 Bot.sendMessage(
  "/cek KDTK TGL"
 )
 return
}

let p = params.split(" ")

let kdtk = p[0].toUpperCase()
let tgl = p[1]

// ======================
// BULAN INI
// ======================
let sales =
Bot.getProperty(
 kdtk + "_sales_" + tgl
)

let struk =
Bot.getProperty(
 kdtk + "_struk_" + tgl
)

if(!sales || !struk){
 Bot.sendMessage("Data bulan ini tidak ditemukan")
 return
}

let apc =
struk > 0
? Math.round(sales / struk)
: 0

// ======================
// BULAN LALU
// ======================
let bl =
Bot.getProperty(
 kdtk + "_BL"
)

let salesBL = 0
let strukBL = 0
let apcBL = 0

let gSales = 0
let gStruk = 0
let gApc = 0

if(bl && bl[tgl]){

 salesBL = Number(bl[tgl].spd || 0)
 strukBL = Number(bl[tgl].std || 0)

 apcBL =
 strukBL > 0
 ? Math.round(salesBL / strukBL)
 : 0

 // ======================
 // GROWTH CALC
 // ======================

 if(salesBL > 0){
  gSales =
  ((sales - salesBL) / salesBL) * 100
 }

 if(strukBL > 0){
  gStruk =
  ((struk - strukBL) / strukBL) * 100
 }

 if(apcBL > 0){
  gApc =
  ((apc - apcBL) / apcBL) * 100
 }
}

// ======================
// OUTPUT
// ======================
let msg =
"📊 *DETAIL SALES HARIAN*\n" +
"🏬 KDTK : " + kdtk +
"\n📅 Tanggal : " + tgl +

"\n\n━━━━━━━━━━━━━━\n" +
"📈 *BULAN INI*\n" +
"━━━━━━━━━━━━━━\n" +
"💰 Sales : Rp." +
new Intl.NumberFormat('id-ID').format(sales) +
"\n🧾 Struk : " + struk +
"\n🔥 APC   : " +
new Intl.NumberFormat('id-ID').format(apc)

// BULAN LALU
msg +=
"\n\n━━━━━━━━━━━━━━\n" +
"📉 *BULAN LALU*\n" +
"━━━━━━━━━━━━━━\n" +
"💰 Sales : Rp." +
new Intl.NumberFormat('id-ID').format(salesBL) +
"\n🧾 Struk : " + strukBL +
"\n🔥 APC   : " +
new Intl.NumberFormat('id-ID').format(apcBL)

// GROWTH
msg +=
"\n\n━━━━━━━━━━━━━━\n" +
"📊 *GROWTH VS BULAN LALU*\n" +
"━━━━━━━━━━━━━━\n" +
"💰 Sales : " +
(gSales > 0 ? "🟢 +" : "🔴 ") +
gSales.toFixed(2) + "%"

msg +=
"\n🧾 Struk : " +
(gStruk > 0 ? "🟢 +" : "🔴 ") +
gStruk.toFixed(2) + "%"

msg +=
"\n🔥 APC   : " +
(gApc > 0 ? "🟢 +" : "🔴 ") +
gApc.toFixed(2) + "%"

Bot.sendMessage(msg)
