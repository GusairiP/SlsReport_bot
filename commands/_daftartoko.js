/*CMD
  command: /daftartoko
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
COMMAND : /daftartoko
MODULE  : MASTER STORE
========================================

FUNGSI:
Mendaftarkan toko baru ke sistem.

FORMAT:
/daftartoko KDTK,NAMA TOKO,AM,AS

CONTOH:
/daftartoko T001,IDM LAMPUNG,ARI,DONI

PROPERTY:
T001_nama
T001_am
T001_as

OUTPUT:
Toko berhasil dibuat

========================================
*/

//admin access
let admin =
AdminPanel.getFieldValue({
 panel_name:"SalesConfig",
 field_name:"ADMIN_ID"
})

if(String(user.telegramid) != String(admin)){
 Bot.sendMessage(
  "⛔ Hanya admin yang dapat menggunakan command ini"
 )
 return
}

//code utama
if(!params){
Bot.sendMessage(
"/daftartoko TXXX,IDM LAMPUNG,AM,AS"
)
return
}

let d =
params.split(",")

let kdtk =
d[0].trim().toUpperCase()

//otomatis isi target saat daftar toko
let targetSales =
AdminPanel.getFieldValue({
 panel_name:"SalesConfig",
 field_name:"DEFAULT_TARGET_SALES"
})

let targetSpd =
AdminPanel.getFieldValue({
 panel_name:"SalesConfig",
 field_name:"DEFAULT_TARGET_SPD"
})

Bot.setProperty(
 kdtk+"_target_sales",
 Number(targetSales),
 "integer"
)

Bot.setProperty(
 kdtk+"_target_spd",
 Number(targetSpd),
 "integer"
)

Bot.setProperty(
kdtk+"_nama",
d[1].trim().toUpperCase(),
"string"
)

Bot.setProperty(
kdtk+"_am",
d[2].trim().toUpperCase(),
"string"
)

Bot.setProperty(
kdtk+"_as",
d[3].trim().toUpperCase(),
"string"
)

//simpan daftar toko /u admin
let stores =
Bot.getProperty("STORE_LIST")

if(!stores){
 stores = []
}

if(
 stores.indexOf(kdtk) == -1
){
 stores.push(kdtk)
}

Bot.setProperty(
 "STORE_LIST",
 stores,
 "json"
)

Bot.sendMessage(
"✅ Toko "+kdtk+" berhasil dibuat"
)
