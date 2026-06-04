/*CMD
  command: /dashboard_refresh
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

/*
========================================
COMMAND : /dashboard_refresh
MODULE  : DASHBOARD ENGINE
========================================

FUNGSI:
Membangun dashboard admin secara otomatis.

DIPANGGIL OLEH:
- /input
- /target
- /daftartoko
- /edit
- /hapus

========================================
*/

// ======================
// AMBIL STORE LIST
// ======================

let stores =
Bot.getProperty("STORE_LIST")

if(!stores){
 stores = []
}

// ======================
// INISIALISASI
// ======================

let totalSales = 0
let totalSpd = 0
let totalTarget = 0

let overTarget = 0
let underTarget = 0

let ranking = []

// ======================
// LOOPING TOKO
// ======================

for(let i=0;i<stores.length;i++){

 let kdtk = stores[i]

 let sales = 0
 let hari = 0

 for(let tgl=1;tgl<=31;tgl++){

  let s =
  Number(
   Bot.getProperty(
    kdtk+"_sales_"+tgl
   ) || 0
  )

  if(s > 0){
   sales += s
   hari++
  }
 }

 let spd = 0

 if(hari > 0){
  spd =
  Math.round(
   sales / hari
  )
 }

 let target =
 Number(
  Bot.getProperty(
   kdtk+"_target_spd"
  ) || 0
 )

 let ach = 0

 if(target > 0){
  ach =
  Math.round(
   (spd/target)*100
  )
 }

 if(ach >= 100){
  overTarget++
 }else{
  underTarget++
 }

 ranking.push({
  kdtk:kdtk,
  spd:spd,
  target:target,
  ach:ach
 })

 totalSales += sales
 totalSpd += spd
 totalTarget += target
}

// ======================
// SORT RANKING
// ======================

ranking.sort(function(a,b){
 return b.ach - a.ach
})

// ======================
// SUMMARY
// ======================

let avgSpd = 0

if(stores.length > 0){
 avgSpd =
 Math.round(
  totalSpd / stores.length
 )
}

let achArea = 0

if(totalTarget > 0){

 let avgTarget =
 totalTarget / stores.length

 achArea =
 Math.round(
  (avgSpd / avgTarget) * 100
 )
}

//Tambahkan Panel Ringkasan
AdminPanel.setPanel({
 panel_name:"Summary",
 data:{
  title:"📈 Achievement Area",
  description:
   "KDTK : "+stores.length+
   "\nAch : "+achArea+"%"+
   "\nOver : "+overTarget+
   "\nUnder : "+underTarget,
  icon:"leaderboard",
  index:2
 }
})

// ======================
// GENERATE DASHBOARD
// ======================

let desc =

"🏪 Total KDTK : " +
stores.length +

"\n💰 Sales MTD : Rp." +
totalSales.toLocaleString("id-ID") +

"\n📈 Avg SPD : Rp." +
avgSpd.toLocaleString("id-ID") +

"\n🎯 Ach Area : " +
achArea + "%" +

"\n🟢 Over : " +
overTarget +

"\n🔴 Under : " +
underTarget +

"\n\n🏆 TOP 5 STORE\n\n"

let limit =
Math.min(
 ranking.length,
 5
)

for(let i=0;i<limit;i++){

 let d = ranking[i]

 desc +=
 (i+1)+". "+d.kdtk+

 "\nSPD : Rp."+
 d.spd.toLocaleString("id-ID")+

 "\nTarget : Rp."+
 d.target.toLocaleString("id-ID")+

 "\nAch : "+
 d.ach+"%\n\n"
}

// ======================
// UPDATE PANEL
// ======================

AdminPanel.setPanel({
 panel_name:"Dashboard",
 data:{
  title:"📊 Sales Dashboard",
  description:desc,
  icon:"analytics",
  index:1
 }
})
