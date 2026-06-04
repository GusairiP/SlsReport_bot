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

/*
========================================
COMMAND : /inputbl
MODULE  : BULAN LALU
========================================

FUNGSI:
Input data bulan lalu per tanggal.

FORMAT:
/inputbl T001 1 8500000 275

KETERANGAN:
TGL SPD STD

PROPERTY:
T001_BL

STRUKTUR:
{
 "1":{
   spd:8500000,
   std:275,
   apc:30909
 }
}

OUTPUT:
SPD
STD
APC

========================================
*/

// ======================
// VALIDASI ADMIN
// ======================

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

// ======================
// VALIDASI FORMAT INPUT
// ======================

//command execution
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

// ======================
// PARSING PARAMETER
// ======================

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

// ======================
// HITUNG APC BULAN LALU
// ======================

let apc = Math.round(spd / std)

// ======================
// AMBIL DATA PROPERTY
// ======================

let data = Bot.getProperty(
kdtk + "_BL"
)

if(!data){
data = {}
}

// ======================
// UPDATE DATA BULAN LALU
// ======================

data[tgl] = {
spd: spd,
std: std,
apc: apc
}

// ======================
// SIMPAN PROPERTY
// ======================

Bot.setProperty(
kdtk + "_BL",
data,
"json"
)

// ======================
// GENERATE OUTPUT
// ======================

Bot.sendMessage(
"✅ Sales bulan lalu tersimpan\n\n"+
"KDTK : "+kdtk+
"\nTanggal : "+tgl+
"\nSPD : Rp."+new Intl.NumberFormat('id-ID').format(spd)+
"\nSTD : "+new Intl.NumberFormat('id-ID').format(std)+
"\nAPC : "+new Intl.NumberFormat('id-ID').format(apc)
)
