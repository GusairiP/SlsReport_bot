/*CMD
  command: /trend
  help: /trend KDTK
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
COMMAND : /trend
MODULE  : TREND ANALYSIS
========================================

FUNGSI:
Menampilkan histori SPD bulanan.

FORMAT:
/trend T001

DATA SOURCE:
store_T001.history

OUTPUT:
Trend SPD per bulan

========================================
*/

// ======================
// VALIDASI INPUT
// ======================

if(!params){

 Bot.sendMessage(
  "Format:\n\n/trend T001"
 )

 return
}

let kdtk =
params.toUpperCase().trim()

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

// ======================
// AMBIL HISTORY SPD
// ======================

let history =
store.history || {}

if(
 Object.keys(history).length === 0
){

 Bot.sendMessage(
  "⚠️ Data trend belum tersedia untuk " +
  kdtk
 )

 return
}

// ======================
// MASTER BULAN
// ======================

let bulanOrder = {

 "Januari":1,
 "Februari":2,
 "Maret":3,
 "April":4,
 "Mei":5,
 "Juni":6,
 "Juli":7,
 "Agustus":8,
 "September":9,
 "Oktober":10,
 "November":11,
 "Desember":12

}

// ======================
// KONVERSI KE ARRAY
// ======================

let list = []

for(let bulan in history){

 let value =
 Number(history[bulan])

 if(isNaN(value)){
  continue
 }

 list.push({

  bulan:bulan,
  value:value

 })

}

if(list.length === 0){

 Bot.sendMessage(
  "⚠️ Data trend kosong"
 )

 return
}

// ======================
// SORT BULAN & TAHUN
// ======================

list.sort(function(a,b){

 let aSplit =
 a.bulan.split(" ")

 let bSplit =
 b.bulan.split(" ")

 let aMonth =
 bulanOrder[aSplit[0]] || 0

 let bMonth =
 bulanOrder[bSplit[0]] || 0

 let aYear =
 Number(aSplit[1]) || 0

 let bYear =
 Number(bSplit[1]) || 0

 if(aYear === bYear){

  return aMonth - bMonth

 }

 return aYear - bYear

})

// ======================
// GENERATE REPORT
// ======================

let txt =

"📊 *TREND RECORD SPD*\n\n"+

"🏪 KDTK : " + kdtk +
"\n🏬 TOKO : " +
(store.nama || "-") +

"\n📅 Periode : " +
list.length +
" Bulan"+

"\n\n━━━━━━━━━━━━━━\n"

// ======================
// LOOP HISTORY
// ======================

for(let i=0;i<list.length;i++){

 let status = "⚪"

 if(i > 0){

  let prev =
  list[i-1].value

  let curr =
  list[i].value

  if(curr > prev){

   status = "🟢"

  }else if(curr < prev){

   status = "🔴"

  }

 }

 txt +=

 status + " " +
 list[i].bulan +

 "\n💰 Rp." +
 Number(
  list[i].value
 ).toLocaleString("id-ID") +

 "\n\n"

}

// ======================
// OUTPUT
// ======================

Bot.sendMessage(txt)
