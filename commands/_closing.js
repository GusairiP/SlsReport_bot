/*CMD
  command: /closing
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

if(!params){
 Bot.sendMessage(
  "/closing KDTK"
 )
 return
}

let kdtk =
params.toUpperCase()

let totalSales = 0
let hari = 0

for(let i=1;i<=31;i++){

 let sales =
 Bot.getProperty(
  kdtk + "_sales_" + i
 ) || 0

 sales = Number(sales)

 if(sales > 0){
  totalSales += sales
  hari++
 }
}

if(hari == 0){
 Bot.sendMessage("⚠️ Belum ada data sales")
 return
}

let spd = totalSales / hari
let prediksi = spd * 31

let target =
Number(
 Bot.getProperty(
  kdtk + "_target_sales"
 ) || 0
)

let gap = target - prediksi

// ================= OUTPUT ICONIC =================
let msg =
"🎯 *CLOSING REPORT*\n" +
"🏬 KDTK : " + kdtk +

"\n\n━━━━━━━━━━━━━━\n" +
"📊 *SUMMARY SALES*\n" +
"━━━━━━━━━━━━━━\n" +
"📦 Total Sales : Rp." +
new Intl.NumberFormat('id-ID').format(totalSales) +
"\n📅 Hari Aktif : " + hari +
"\n📈 SPD        : Rp." +
new Intl.NumberFormat('id-ID').format(Math.round(spd)) +
"\n🔮 Prediksi   : Rp." +
new Intl.NumberFormat('id-ID').format(Math.round(prediksi)) +

"\n\n━━━━━━━━━━━━━━\n" +
"🎯 *TARGET vs REALITY*\n" +
"━━━━━━━━━━━━━━\n" +
"🎯 Target : Rp." +
new Intl.NumberFormat('id-ID').format(target) +
"\n📉 GAP    : Rp." +
new Intl.NumberFormat('id-ID').format(Math.round(gap))

// STATUS GAP
if(gap > 0){
 msg += "\n\n🔴 *UNDER TARGET*"
}else if(gap < 0){
 msg += "\n\n🟢 *OVER TARGET*"
}else{
 msg += "\n\n⚪ *ON TARGET*"
}

Bot.sendMessage(msg)
