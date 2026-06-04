/*CMD
  command: /edit
  help: /edit TXXX 15 9000000 280
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
COMMAND : /edit
MODULE  : DATA CORRECTION
========================================

FUNGSI:
Mengubah data sales harian.

FORMAT:
/edit T001 15 9000000 280

PROPERTY:
T001_sales_15
T001_struk_15

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

//command execution
if(!params){
Bot.sendMessage(
"/edit KDTK TGL SALES STRUK"
)
return
}

let p = params.split(" ")

let kdtk = p[0].toUpperCase()
let tgl = p[1]

Bot.setProperty(
kdtk+"_sales_"+tgl,
parseInt(p[2]),
"integer"
)

Bot.setProperty(
kdtk+"_struk_"+tgl,
parseInt(p[3]),
"integer"
)

Bot.sendMessage(
"✅ Data berhasil diubah"
)
