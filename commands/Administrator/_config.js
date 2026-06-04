/*CMD
  command: /config
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

var panel = {
 title: "Sales Report Config",
 description: "Konfigurasi utama bot sales",
 index: 0,
 icon: "stats-chart",
 button_title: "SIMPAN",

 fields: [

  {
   name: "ADMIN_ID",
   title: "Telegram Admin ID",
   type: "string",
   icon: "person"
  },

  {
   name: "ADMIN_USERNAME",
   title: "Username Admin",
   type: "string",
   icon: "chatbubble"
  },

  {
   name: "DEFAULT_TARGET_SPD",
   title: "Default Target SPD",
   type: "integer",
   icon: "cash"
  },

  {
   name: "DEFAULT_TARGET_SALES",
   title: "Default Target Sales",
   type: "integer",
   icon: "trending-up"
  },

  {
   name: "BOT_STATUS",
   title: "Aktifkan Bot",
   type: "checkbox",
   icon: "power",
   value: true
  }
 ]
}

AdminPanel.setPanel({
 panel_name: "SalesConfig",
 data: panel
})

Bot.sendMessage("✅ Admin Panel berhasil dibuat")
