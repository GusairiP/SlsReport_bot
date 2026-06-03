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
