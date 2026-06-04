/*CMD
  command: /admin
  help: 
  need_reply: false
  auto_retry_time: 
  folder: Administrator

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

let admin =
AdminPanel.getFieldValue({
 panel_name:"SalesConfig",
 field_name:"ADMIN_ID"
})

if(String(user.telegramid) != String(admin)){
 Bot.sendMessage("⛔ Akses ditolak")
 return
}

Bot.sendInlineKeyboard(
[
 [
  {
   title:"🏪 Tambah Toko",
   command:"/daftartoko"
  }
 ],
 [
  {
   title:"🎯 Set Target",
   command:"/target"
  }
 ],
 [
  {
   title:"✏️ Edit Data",
   command:"/edit"
  },
  {
   title:"🗑 Hapus Data",
   command:"/hapus"
  }
 ],
 [
  {
   title:"📥 Input BL",
   command:"/inputbl"
  },
  {
   title:"📥 Input BL31",
   command:"/inputbl31"
  }
 ]
],
"⚙️ *ADMIN PANEL*\n\nPilih aksi yang ingin dilakukan:"
)
