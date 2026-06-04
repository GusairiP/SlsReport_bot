/*CMD
  command: /target
  help: /target TXXX 278796424 8993424
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
COMMAND : /target
MODULE  : TARGET SETTING
========================================

FUNGSI:
Menyimpan target sales dan target SPD.

FORMAT:
/target KDTK TARGETSALES TARGETSPD

CONTOH:
/target T001 278796424 8993424

PROPERTY:
T001_target_sales
T001_target_spd

OUTPUT:
Target tersimpan

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

// command execution
if(!params){
Bot.sendMessage(
"Format:\n\n/target KDTK TOTALTARGET TARGETSPD"
)
return
}

let p = params.split(" ")

if(p.length < 3){
Bot.sendMessage(
"Format salah\n\n/target TXXX 278796424 8993424"
)
return
}

let kdtk = p[0].toUpperCase()

Bot.setProperty(
kdtk+"_target_sales",
parseInt(p[1]),
"integer"
)

Bot.setProperty(
kdtk+"_target_spd",
parseInt(p[2]),
"integer"
)

Bot.sendMessage(
"✅ Target tersimpan\n\n"+
"KDTK : "+kdtk+
"\nTarget Sales : Rp."+new Intl.NumberFormat('id-ID').format(p[1])+
"\nTarget SPD : Rp."+new Intl.NumberFormat('id-ID').format(p[2])
)
