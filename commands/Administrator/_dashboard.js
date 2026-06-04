/*CMD
  command: /dashboard
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

let stores =
Bot.getProperty("STORE_LIST")

if(!stores){
 stores = []
}

AdminPanel.setPanel({
 panel_name:"Dashboard",
 data:{
  title:"Dashboard Sales",
  description:
   "Jumlah Toko : " +
   stores.length,
  icon:"analytics",
  index:1
 }
})

Bot.sendMessage(
 "✅ Dashboard diperbarui"
)
