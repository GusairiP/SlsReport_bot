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

/*
========================================
COMMAND : /admin
MODULE  : ADMIN CENTER
========================================

FUNGSI:
Pusat kontrol administrator.

FITUR:
- Dashboard
- Konfigurasi Bot
- Manajemen Store
- Ranking Store
- Monitoring Alert
- Maintenance

========================================
*/

// ======================
// VALIDASI ADMIN
// ======================

let admin =
AdminPanel.getFieldValue({
 panel_name:"SalesConfig",
 field_name:"ADMIN_ID"
})

if(
 String(user.telegramid)
 !=
 String(admin)
){

 Bot.sendMessage(
  "⛔ Akses ditolak"
 )

 return
}

// ======================
// AMBIL DATA SISTEM
// ======================

let stores =
Bot.getProperty(
 "STORE_LIST"
)

if(!stores){
 stores = []
}

let botStatus =
AdminPanel.getFieldValue({
 panel_name:"SalesConfig",
 field_name:"BOT_STATUS"
})

let statusText =
botStatus
? "🟢 AKTIF"
: "🔴 NONAKTIF"

// ======================
// MENU ADMIN
// ======================

Bot.sendInlineKeyboard(

[
 [
  {
   title:"📊 Dashboard",
   command:"/dashboard_refresh"
  },
  {
   title:"⚙️ Config",
   command:"/config"
  }
 ],

 [
  {
   title:"🏪 Store",
   command:"/storelist"
  },
  {
   title:"➕ Tambah Store",
   command:"/daftartoko"
  }
 ],

 [
  {
   title:"🏆 Ranking",
   command:"/ranking"
  },
  {
   title:"🚨 Alert",
   command:"/alert"
  }
 ],

 [
  {
   title:"🎯 Target",
   command:"/target"
  },
  {
   title:"📈 Growth",
   command:"/growth"
  }
 ],

 [
  {
   title:"🔄 Refresh",
   command:"/dashboard_refresh"
  }
 ],
  [
  {
   title:"🌐 Web Dashboard",
   command:"/web"
  }
 ]
],

"👨‍💼 *ADMIN CENTER*\n\n"+

"━━━━━━━━━━━━━━\n"+

"🤖 Status Bot : " +
statusText +

"\n🏪 Total Store : " +
stores.length +

"\n👤 Admin ID : " +
admin +

"\n\n━━━━━━━━━━━━━━\n"+

"📊 Monitoring Sales\n"+
"⚙️ Konfigurasi Sistem\n"+
"🏆 Ranking Performance\n"+
"🚨 Alert Target\n\n"+

"Pilih menu yang ingin digunakan:"
)
