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

Bot.setProperty(
kdtk+"_nama",
d[1].trim(),
"string"
)

Bot.setProperty(
kdtk+"_am",
d[2].trim(),
"string"
)

Bot.setProperty(
kdtk+"_as",
d[3].trim(),
"string"
)

Bot.sendMessage(
"✅ Toko "+kdtk+" berhasil dibuat"
)
