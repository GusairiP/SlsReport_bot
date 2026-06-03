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
