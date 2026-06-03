/*CMD
  command: /growth
  help: /growth KDTK
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

let kdtk = ""

if(params){
 kdtk = params.toString()
  .trim()
  .toUpperCase()
}

if(!kdtk){
 Bot.sendMessage(
  "Format:\n/growth T001"
 )
 return
}

// ======================
// TANGGAL HARI INI
// ======================

let batasHari = new Date().getDate()

// ======================
// BULAN BERJALAN
// ======================

let totalSalesNow = 0
let totalStrukNow = 0
let hariNow = 0

for(let tgl=1; tgl<=batasHari; tgl++){

 let sales = Bot.getProperty(
  kdtk+"_sales_"+tgl
 )

 let struk = Bot.getProperty(
  kdtk+"_struk_"+tgl
 )

 if(
  sales != undefined &&
  struk != undefined &&
  Number(struk) > 0
 ){
  totalSalesNow += Number(sales)
  totalStrukNow += Number(struk)
  hariNow++
 }
}

if(hariNow == 0){
 Bot.sendMessage(
  "Belum ada data bulan berjalan"
 )
 return
}

let spdNow = totalSalesNow / hariNow
let stdNow = totalStrukNow / hariNow
let apcNow = totalSalesNow / totalStrukNow

// ======================
// BULAN LALU (MTD)
// ======================

let bl = Bot.getProperty(
 kdtk + "_BL"
)

if(!bl){
 Bot.sendMessage(
  "Data bulan lalu tidak ditemukan"
 )
 return
}

let totalSPDbl = 0
let totalSTDbl = 0
let totalAPCbl = 0
let hariBL = 0

for(let tgl=1; tgl<=batasHari; tgl++){

 let d = bl[tgl]

 if(d){

  totalSPDbl += Number(d.spd || 0)
  totalSTDbl += Number(d.std || 0)
  totalAPCbl += Number(d.apc || 0)

  hariBL++
 }
}

if(hariBL == 0){
 Bot.sendMessage(
  "Data bulan lalu kosong"
 )
 return
}

let spdBL = totalSPDbl / hariBL
let stdBL = totalSTDbl / hariBL
let apcBL = totalAPCbl / hariBL

// ======================
// GROWTH
// ======================

let gSPD =
spdBL > 0
? ((spdNow - spdBL) / spdBL) * 100
: 0

let gSTD =
stdBL > 0
? ((stdNow - stdBL) / stdBL) * 100
: 0

let gAPC =
apcBL > 0
? ((apcNow - apcBL) / apcBL) * 100
: 0

function trend(v){
 if(v > 0) return "🟢"
 if(v < 0) return "🔴"
 return "⚪"
}

Bot.sendMessage(
"📈 GROWTH SALES MTD\n\n"+

"KDTK : "+kdtk+
"\nPeriode : 1-"+batasHari+

"\n\n🟢 SPD"+
"\nNow : Rp."+
new Intl.NumberFormat('id-ID')
.format(Math.round(spdNow))+

"\nBL : Rp."+
new Intl.NumberFormat('id-ID')
.format(Math.round(spdBL))+

"\nGrowth : "+
trend(gSPD)+" "+
gSPD.toFixed(2)+"%"+

"\n\n🟢 STD"+
"\nNow : "+
new Intl.NumberFormat('id-ID')
.format(Math.round(stdNow))+

"\nBL : "+
new Intl.NumberFormat('id-ID')
.format(Math.round(stdBL))+

"\nGrowth : "+
trend(gSTD)+" "+
gSTD.toFixed(2)+"%"+

"\n\n🟢 APC"+
"\nNow : Rp."+
new Intl.NumberFormat('id-ID')
.format(Math.round(apcNow))+

"\nBL : Rp."+
new Intl.NumberFormat('id-ID')
.format(Math.round(apcBL))+

"\nGrowth : "+
trend(gAPC)+" "+
gAPC.toFixed(2)+"%"
)
