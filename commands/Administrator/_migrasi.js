/*CMD
  command: /migrasi
  help: 
  need_reply: false
  auto_retry_time: 
  folder: Administrator

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

/*
========================================
COMMAND : /migrasi
MODULE  : DATA MIGRATION
========================================

FUNGSI:
Menggabungkan property lama menjadi
1 property store_KDTK

CONTOH:
/migrasi T001

========================================
*/

// ======================
// VALIDASI PARAMETER
// ======================

if(!params){

 Bot.sendMessage(
  "Format:\n/migrasi T001"
 )

 return
}

let kdtk =
params.toUpperCase().trim()

// ======================
// AMBIL DATA LAMA
// ======================

let nama =
Bot.getProperty(
 kdtk+"_nama"
)

let am =
Bot.getProperty(
 kdtk+"_am"
)

let as =
Bot.getProperty(
 kdtk+"_as"
)

let targetSales =
Bot.getProperty(
 kdtk+"_target_sales"
)

let targetSpd =
Bot.getProperty(
 kdtk+"_target_spd"
)

let history =
Bot.getProperty(
 kdtk+"_SPD_HISTORY"
)

let bl =
Bot.getProperty(
 kdtk+"_BL"
)

let existing =
Bot.getProperty(
 "store_"+kdtk
)

if(existing){

 Bot.sendMessage(
  "⚠️ Store sudah dimigrasikan"
 )

 return
}

// ======================
// BANGUN OBJECT STORE
// ======================

let store = {

 nama:nama || "",

 am:am || "",

 as:as || "",

 target:{
  sales:Number(
   targetSales || 0
  ),

  spd:Number(
   targetSpd || 0
  )
 },

 sales:{},

 history:
 history || {},

 bl:
 bl || {}
}

// ======================
// MIGRASI SALES HARIAN
// ======================

for(let tgl=1;tgl<=31;tgl++){

 let sales =
 Bot.getProperty(
  kdtk+"_sales_"+tgl
 )

 let struk =
 Bot.getProperty(
  kdtk+"_struk_"+tgl
 )

 if(
  sales &&
  struk
 ){

  store.sales[tgl] = {

   sales:Number(
    sales
   ),

   struk:Number(
    struk
   )
  }
 }
}

// ======================
// SIMPAN PROPERTY BARU
// ======================

Bot.setProperty(
 "store_"+kdtk,
 store,
 "json"
)

// ======================
// OUTPUT
// ======================

Bot.sendMessage(

 "✅ Migrasi berhasil\n\n"+

 "KDTK : "+kdtk+

 "\nNama : "+
 store.nama+

 "\nAM : "+
 store.am+

 "\nAS : "+
 store.as+

 "\n\nTarget Sales : Rp."+
 store.target.sales
 .toLocaleString("id-ID")+

 "\nTarget SPD : Rp."+
 store.target.spd
 .toLocaleString("id-ID")+

 "\n\nData Sales : "+
 Object.keys(
  store.sales
 ).length+

 " Hari"

)
