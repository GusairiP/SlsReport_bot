/*CMD
  command: /ranking
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
COMMAND : /ranking
MODULE  : STORE RANKING
========================================
*/

// ======================
// AMBIL RANKING
// ======================

let ranking = Bot.getProperty("STORE_RANKING")

if (!ranking || ranking.length == 0) {
  Bot.sendMessage(
    "⚠️ Ranking belum tersedia.\n\n" + "Jalankan /dashboard terlebih dahulu."
  )

  return
}

// ======================
// OUTPUT
// ======================

let txt = "🏆 *RANKING STORE*\n\n"

for (let i = 0; i < ranking.length; i++) {
  let medal = ""

  if (i == 0) {
    medal = "🥇"
  } else if (i == 1) {
    medal = "🥈"
  } else if (i == 2) {
    medal = "🥉"
  } else {
    medal = i + 1 + "."
  }

  let status = "🔴"

  if (ranking[i].ach >= 100) {
    status = "🟢"
  } else if (ranking[i].ach >= 90) {
    status = "🟡"
  }

  txt +=
    medal + " " + ranking[i].kdtk + " " + status + " " + ranking[i].ach + "%\n"

  txt +=
    "SPD : Rp." +
    ranking[i].spd.toLocaleString("id-ID") +
    "\nTarget : Rp." +
    ranking[i].target.toLocaleString("id-ID") +
    "\n\n"
}

txt += "━━━━━━━━━━━━━━\n" + "Total Store : " + ranking.length

Bot.sendMessage(txt)

