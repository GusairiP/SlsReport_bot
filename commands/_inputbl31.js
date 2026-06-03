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

if(!params){
 Bot.sendMessage(
  "Format:\n\n/inputbl31 T001"
 )
 return
}

let kdtk =
params.toUpperCase().trim()

let rows =
message.split("\n")

let data =
Bot.getProperty(
 kdtk + "_BL"
)

if(!data){
 data = {}
}

let total = 0

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

 if(
  isNaN(spd) ||
  isNaN(std) ||
  std <= 0
 ){
  continue
 }

 data[tgl] = {
  spd: spd,
  std: std,
  apc: Math.round(spd/std)
 }

 total++
}

Bot.setProperty(
 kdtk + "_BL",
 data,
 "json"
)

Bot.sendMessage(
 "✅ Data bulan lalu berhasil disimpan\n\n"+
 "KDTK : "+kdtk+
 "\nJumlah Hari : "+total
)
