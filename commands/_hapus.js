/*CMD
  command: /hapus
  help: /hapus TXXX 15
  need_reply: false
  auto_retry_time: 
  folder: 
  answer: contoh format:

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

/*
========================================
COMMAND : /hapus
MODULE  : DATA CORRECTION
========================================

FUNGSI:
Menghapus data sales harian.

FORMAT:
/hapus T001 15

PROPERTY:
T001_sales_15
T001_struk_15

AKSI:
Set value = 0

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

//commad execution 
if(!params){
Bot.sendMessage(
"/hapus KDTK TGL"
)
return
}

let p = params.split(" ")

let kdtk = p[0].toUpperCase()
let tgl = p[1]

Bot.setProperty(
kdtk+"_sales_"+tgl,
0,
"integer"
)

Bot.setProperty(
kdtk+"_struk_"+tgl,
0,
"integer"
)

Bot.sendMessage(
"✅ Data tanggal "+tgl+" dihapus"
)
