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
  aliases: 
  group: 
CMD*/

Bot.sendKeyboard(
"/daftartoko,/target,/input,/rekap,/growth,/closing,/trend"
)

Bot.sendMessage(
"👋 *Selamat datang di BOT SALES*\n\n"+
"📊 Bot ini digunakan untuk monitoring sales harian, rekap, growth, dan closing report.\n\n"+
"━━━━━━━━━━━━━━\n"+
"👨‍💼 *ADMIN SUPPORT*\n"+
"💬 Hubungi Admin: @gusairiputra\n\n"+
"━━━━━━━━━━━━━━\n"+
"⚡ Gunakan menu atau perintah bot untuk mulai.\n\n" + "Silakan daftarkan toko terlebih dahulu menggunakan perintah /daftartoko"
)
