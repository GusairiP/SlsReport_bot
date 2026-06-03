/*CMD
  command: /trend
  help: /trend KDTK
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
 Bot.sendMessage("Format:\n/trend KDTK")
 return
}

let kdtk = params.toUpperCase()

let trend =
Bot.getProperty(kdtk + "_SPD_HISTORY")

if(!trend || typeof trend !== "object"){
 Bot.sendMessage("⚠️ Data trend tidak ditemukan untuk " + kdtk)
 return
}

// urutan bulan yang benar
let bulanOrder = {
 "Januari":1, "Februari":2, "Maret":3, "April":4,
 "Mei":5, "Juni":6, "Juli":7, "Agustus":8,
 "September":9, "Oktober":10, "November":11, "Desember":12
}

let list = []

for(let k in trend){

 let val = Number(trend[k])

 if(isNaN(val)) continue

 list.push({
  bulan: k,
  value: val
 })
}

// SORT BERDASARKAN BULAN & TAHUN (aman walau format "Mei 2026")
list.sort(function(a,b){

 let aSplit = a.bulan.split(" ")
 let bSplit = b.bulan.split(" ")

 let aMonth = bulanOrder[aSplit[0]] || 0
 let bMonth = bulanOrder[bSplit[0]] || 0

 let aYear = Number(aSplit[1]) || 0
 let bYear = Number(bSplit[1]) || 0

 if(aYear === bYear){
  return aMonth - bMonth
 }

 return aYear - bYear
})

// ================= OUTPUT ICONIC =================
let txt =
"📊 *TREND RECORD SPD*\n" +
"🏬 KDTK : " + kdtk +
"\n\n━━━━━━━━━━━━━━\n"

for(let i=0;i<list.length;i++){

 let status = ""

 if(i > 0){
  let prev = list[i-1].value
  let curr = list[i].value

  if(curr > prev) status = "🟢"
  else if(curr < prev) status = "🔴"
  else status = "⚪"
 }

 txt +=
 status + " " +
 list[i].bulan + "\n" +
 "💰 Rp." +
 Number(list[i].value).toLocaleString("id-ID") +
 "\n\n"
}

Bot.sendMessage(txt)
