/*CMD
  command: /inputbl31

  <<HELP
📥 INPUT DATA SALES BULAN LALU

Format:

/inputbl31 KDTK

Lalu kirim data dengan format:

TGL,SPD,STD

Contoh:

1,8500000,275
2,9200000,290
3,8750000,280
4,9100000,285
5,8900000,278

Keterangan:

- TGL = Tanggal (1-31)
- SPD = Sales per hari
- STD = Struk per hari
- APC dihitung otomatis dari SPD ÷ STD

Format angka:

- Tidak perlu menggunakan "Rp"
- Boleh tanpa pemisah ribuan
- Disarankan tanpa titik atau koma pada nilai SPD

Contoh benar:

1,8500000,275

Contoh salah:

1,Rp.8.500.000,275
  HELP
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
COMMAND : /inputbl31
MODULE  : BULAN LALU MASSAL
========================================

FUNGSI:
Import data bulan lalu sekaligus.

FORMAT:
/inputbl31 T001

1,8500000,275
2,9200000,288
3,8700000,270

KETERANGAN:
Tanggal,SPD,STD

PROPERTY:
T001_BL

OUTPUT:
Jumlah hari tersimpan

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
// VALIDASI KDTK
// ======================

if(!params){
 Bot.sendMessage(
  "Format:\n/inputbl31 T001"
 )
 return
}

let kdtk =
params
.replace(/\n/g," ")
.split(" ")[0]
.trim()
.toUpperCase()

// ======================
// AMBIL DATA MULTILINE
// ======================

let rows =
message.split("\n")

let propertyName =
kdtk + "_BL"

// ======================
// AMBIL PROPERTY BULAN LALU
// ======================

let data =
Bot.getProperty(propertyName)

if(!data){
 data = {}
}


let total = 0

// ======================
// LOOPING SETIAP BARIS DATA
// ======================

for(let i=0;i<rows.length;i++){

 let row =
 rows[i].trim()

 if(!row){
  continue
 }

 // lewati baris command
 if(row.indexOf("/inputbl31") == 0){
  continue
 }

// ======================
// PARSING FORMAT CSV
// ======================

 let r = row.split(",")

 if(r.length < 3){
  continue
 }

 let tgl =
 r[0].trim()

 let spd =
 parseInt(
  r[1].replace(/\./g,"")
 )

 let std =
 parseInt(
  r[2].replace(/\./g,"")
 )

// ======================
// VALIDASI SPD DAN STD
// ======================

 if(
  isNaN(spd) ||
  isNaN(std) ||
  std <= 0
 ){
  continue
 }

// ======================
// SIMPAN DATA KE OBJECT
// ======================
  
 data[tgl] = {
  spd: spd,
  std: std,
  apc: Math.round(spd/std)
 }

 total++
}

// ======================
// SIMPAN KE PROPERTY
// ======================

Bot.setProperty(
 propertyName,
 data,
 "json"
)

// ======================
// GENERATE OUTPUT
// ======================

Bot.sendMessage(
 "✅ Data bulan lalu berhasil disimpan\n\n"+
 "KDTK : "+kdtk+
 "\nJumlah Hari : "+total
)
