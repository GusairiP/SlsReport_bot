/*CMD
  command: /start
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: hi, halo
  group: 
CMD*/

/*
========================================
COMMAND : /start
MODULE  : MAIN MENU
========================================

FUNGSI:
Menampilkan menu utama bot.

AKSES:
Semua user

OUTPUT:
Menu navigasi bot

========================================
*/

//admin access
let status =
AdminPanel.getFieldValue({
 panel_name:"SalesConfig",
 field_name:"BOT_STATUS"
})

if(!status){
 Bot.sendMessage(
  "⛔ Bot sedang dinonaktifkan admin"
 )
 return
}

/*Bot.sendKeyboard(
"/daftartoko,/target,/input,/rekap,/growth,/closing,/trend"
)*/

// ======================
// TAMPILKAN INFORMASI BOT
// ======================
Bot.sendMessage(
"👋 *Selamat datang di BOT SALES*\n\n"+
"📊 Bot ini digunakan untuk monitoring sales harian, rekap, growth, dan closing report.\n\n"+
"━━━━━━━━━━━━━━\n"+
"👨‍💼 *ADMIN SUPPORT*\n"+
"💬 Hubungi Admin: @gusairiputra\n\n"+
"━━━━━━━━━━━━━━\n"+
"⚡ Gunakan menu atau perintah bot untuk mulai.\n\n" + "Silakan daftarkan toko terlebih dahulu menggunakan perintah /daftartoko atau menu berikut."
)

// ======================
// SUSUN MENU USER
// ======================

let rows = [
 [
  {
   title:"🏪 Daftar Toko",
   command:"/daftartoko"
  },
  {
   title:"🎯 Target",
   command:"/target"
  }
 ],
 [
  {
   title:"📝 Input Sales",
   command:"/input"
  },
  {
   title:"📥 Input BL",
   command:"/inputbl"
  }
 ],
 [
  {
   title:"📊 Rekap",
   command:"/rekap"
  },
  {
   title:"📈 Growth",
   command:"/growth"
  }
 ],
 [
  {
   title:"🔔 Closing",
   command:"/closing"
  },
  {
   title:"📉 Trend",
   command:"/trend"
  }
 ],
 [
  {
   title:"🔍 Cek Harian",
   command:"/cek"
  }
 ]
]

// ======================
// CEK HAK AKSES ADMIN
// ======================

// tampilkan tombol admin hanya untuk admin
let admin =
AdminPanel.getFieldValue({
 panel_name:"SalesConfig",
 field_name:"ADMIN_ID"
})

if(String(user.telegramid) == String(admin)){
  
// ======================
// TAMPILKAN MENU
// ======================
  
 rows.push([
  {
   title:"⚙️ Admin Panel",
   command:"/admin"
  }
 ])
}

// ======================
// CEK STATUS BOT
// ======================
Bot.sendInlineKeyboard(
 rows,
 "📋 *MENU UTAMA SALES REPORT*\n\n"+
 "Pilih menu yang ingin digunakan:"
)
