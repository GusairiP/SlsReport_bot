/*CMD
  command: /inputbl
  help: /inputbl T001 1 8500000 275
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
"Format:\n\n/inputbl T001 1 8500000 275"
)
return
}

let p = params.split(" ")

if(p.length < 4){
Bot.sendMessage(
"Format salah\n\n/inputbl T001 1 8500000 275"
)
return
}

let kdtk = p[0].toUpperCase()
let tgl = p[1]

let spd = parseInt(p[2])
let std = parseInt(p[3])

if(isNaN(spd) || isNaN(std)){
Bot.sendMessage("SPD dan STD harus berupa angka")
return
}

if(std <= 0){
Bot.sendMessage("STD tidak boleh 0")
return
}

let apc = Math.round(spd / std)

let data = Bot.getProperty(
kdtk + "_BL"
)

if(!data){
data = {}
}

data[tgl] = {
spd: spd,
std: std,
apc: apc
}

Bot.setProperty(
kdtk + "_BL",
data,
"json"
)

Bot.sendMessage(
"✅ Sales bulan lalu tersimpan\n\n"+
"KDTK : "+kdtk+
"\nTanggal : "+tgl+
"\nSPD : Rp."+new Intl.NumberFormat('id-ID').format(spd)+
"\nSTD : "+new Intl.NumberFormat('id-ID').format(std)+
"\nAPC : "+new Intl.NumberFormat('id-ID').format(apc)
)
