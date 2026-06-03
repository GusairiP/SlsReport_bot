/*CMD
  command: /rekap
  help: 
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

if (!params) {
  Bot.sendMessage("Format:\n/rekap KDTK")
  return
}

let kdtk = params.toUpperCase()

let store = Bot.getProperty("store_" + kdtk)

let toko = store ? store.toko : Bot.getProperty(kdtk+"_nama")
let am = store ? store.am : Bot.getProperty(kdtk+"_am")
let as = store ? store.as : Bot.getProperty(kdtk+"_as")

// ambil index tanggal
let index = Bot.getProperty("index_" + kdtk)

if (!index || index.length == 0) {
  Bot.sendMessage("⚠️ Data tidak ditemukan untuk " + kdtk)
  return
}

let list = []
let totalSales = 0
let totalStruk = 0

for (let i = 0; i < index.length; i++) {

  let tgl = index[i]

  let sales = Bot.getProperty(kdtk + "_sales_" + tgl)
  let struk = Bot.getProperty(kdtk + "_struk_" + tgl)

  if (!sales || !struk) continue

  let apc = Math.round(sales / struk)

  list.push({
    tgl: tgl,
    sales: sales,
    struk: struk,
    apc: apc
  })

  totalSales += sales
  totalStruk += struk
}

list.sort(function(a,b){ return a.tgl - b.tgl })

let now = new Date()
let bulanNama = [
  "", "Januari","Februari","Maret","April","Mei","Juni",
  "Juli","Agustus","September","Oktober","November","Desember"
]

let bulan = bulanNama[now.getMonth()]
let tahun = now.getFullYear()

let spd = totalSales / list.length

let history =
Bot.getProperty(
 kdtk + "_SPD_HISTORY"
)

if(!history){
 history = {}
}

let keyHistory =
bulanNama[now.getMonth()+1] + " " + now.getFullYear()

history[keyHistory] = Math.round(spd)

Bot.setProperty(
 kdtk + "_SPD_HISTORY",
 history,
 "json"
)

let std = totalStruk / list.length
let apc = totalStruk > 0 ? Math.round(totalSales / totalStruk) : 0

let bl = Bot.getProperty(
 kdtk + "_BL"
)

let batasHari = new Date().getDate()

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

  totalSPDbl = Number(d.spd || 0)
  totalSTDbl = Number(d.std || 0)
  totalAPCbl = Number(d.apc || 0)

  hariBL++
 }
}

if(hariBL == 0){
 Bot.sendMessage(
  "Data bulan lalu kosong"
 )
 return
}

let spdBL = totalSPDbl
let stdBL = totalSTDbl
let apcBL = totalAPCbl


/*let bl =
Bot.getProperty(
 kdtk + "_BL"
)
*/
let gSPD = 0
let gSTD = 0
let gAPC = 0

/*let spdBL = spd.tgl
let stdBL = std.tgl
let apcBL = apc.tgl*/

/*let totalSPDbl = 0
let totalSTDbl = 0*/
//let hariBL = 0

/*if(bl){

 for(let tgl in bl){

  let d = bl[tgl]

  totalSPDbl += Number(d.spd || 0)
  totalSTDbl += Number(d.std || 0)

  hariBL++
 }
*/
 if(hariBL > 0){

  //spdBL = totalSPDbl / hariBL
  //stdBL = totalSTDbl / hariBL

  apcBL =
  totalSTDbl > 0
  ? Math.round(totalSPDbl / totalSTDbl)
  : 0

  gSPD =
  spdBL > 0
  ? ((spd - spdBL) / spdBL) * 100
  : 0

  gSTD =
  stdBL > 0
  ? ((std - stdBL) / stdBL) * 100
  : 0

  gAPC =
  apcBL > 0
  ? ((apc - apcBL) / apcBL) * 100
  : 0

 }
//}

let targetSales = Bot.getProperty(kdtk + "_target_sales")
let targetSpd = Bot.getProperty(kdtk+"_target_spd")
let ach = Math.round((spd / targetSpd) * 100)

// ================= OUTPUT =================
let msg =
"KDTK  : " + kdtk + "\n" +
"TOKO :  " + toko + "\n" +
"AM     : " + am + "\n" +
"AS      : " + as + "\n\n" +

"*PERFORMANCE SALES BULAN LALU*\n" +
"Bulan : " + bulan + " " + tahun + "\n" +
"SPD : Rp." +
Math.round(spdBL).toLocaleString("id-ID") +
"\n" +
"STD : " +
Math.round(stdBL).toLocaleString("id-ID") +
"\n" +
"APC : " +
Math.round(apcBL).toLocaleString("id-ID") +
"\n\n" +

"*LAPORAN SALES HARIAN " + bulanNama[now.getMonth()+1].toUpperCase() + " " + tahun + "*\n\n" +
"TGL_SALES NET_STRUK_APC\n\n"

for (let i = 0; i < list.length; i++) {
  let d = list[i]

  msg +=
  (i+1) + ".Rp." + d.sales.toLocaleString() +
  "_" + d.struk +
  "_" + d.apc + "\n"
}

msg += "\nAKUMULASI SALES :\nRp." + totalSales.toLocaleString() + "\n\n"

msg +=
"Target Sales : Rp." + targetSales.toLocaleString() + "\n" + "Target SPD   : Rp." + targetSpd.toLocaleString() + "\n" +
"Spd                : Rp." + Math.round(spd).toLocaleString() + "\n" +
"Ach                : " + ach + "%"

msg +=

"\n\n*GROWTH SALES VS BULAN LALU*\n"+

"SPD : " +
(gSPD > 0 ? "+" : "") +
gSPD.toFixed(0) + "%\n"+

"STD : " +
(gSTD > 0 ? "+" : "") +
gSTD.toFixed(0) + "%\n"+

"APC : " +
(gAPC > 0 ? "+" : "") +
gAPC.toFixed(0) + "%" 

if(!history){
 Bot.sendMessage("⚠️ Trend belum tersedia untuk " + kdtk)
 return
}

msg += "\n\n*TREND RECORD SPD*\n\n"

for(let bulan in history){

 msg +=
 "SPD " + bulan + "\n" +
 "Rp." +
 Number(history[bulan]).toLocaleString("id-ID") +
 "\n\n"
}

Bot.sendMessage(msg)
