/*CMD
  command: /save_toko
  help: 
  need_reply: true
  auto_retry_time: 
  folder: 

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

let d = message.split(",")

if (d.length < 4) {
  Bot.sendMessage("Format salah")
  return
}

let data = {
  kdtk: d[0].trim(),
  toko: d[1].trim(),
  am: d[2].trim(),
  as: d[3].trim(),

  target_sales: 0,
  target_spd: 0,

  bulan_lalu: " ",
  spd_bulan_lalu: 0,
  std_bulan_lalu: 0,
  apc_bulan_lalu: 0,

  sales: {}
}

Bot.setProperty("store_" + data.kdtk, data, "json")

Bot.sendMessage("✅ Toko " + data.kdtk + " berhasil dibuat")

