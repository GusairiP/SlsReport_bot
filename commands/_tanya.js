/*CMD
  command: /tanya
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

// /tanya ...pertanyaan...   →   AI Analis Gemini 2.0 Flash (GRATIS)
const ADMIN = 993046873
const KUNCI_GEMINI = "AQ.Ab8RN6IPg7jPDxY6w0C7vCzMlhGJKDy1AgNMXUWGX4O8CsZBvg" // HANYA DI SINI, JANGAN DI GITHUB
const MODEL = "gemini-2.0-flash"

if (user.telegramid != ADMIN) {
  Bot.sendMessage("⛔ Khusus admin")
  return
}
if (!params) {
  return Bot.sendMessage("Contoh:\n/tanya toko mana yang butuh perhatian?")
}

let stores = Bot.getProperty("STORE_LIST") || []
let data = stores.map(kdtk => {
  let s = Bot.getProperty("store_" + kdtk) || {}
  let hari = 0,
    tot = 0
  for (let t in s.sales || {}) {
    let v = +s.sales[t].sales || 0
    if (v > 0) {
      tot += v
      hari++
    }
  }
  return {
    kdtk,
    nama: s.nama || "-",
    AM: s.am || "-",
    AS: s.as || "-",
    target: +s.target?.spd || 0,
    spd: hari > 0 ? Math.round(tot / hari) : 0,
    ach: +s.target?.spd > 0 ? Math.round((tot / hari / s.target.spd) * 100) : 0
  }
})

let prompt = `Kamu analis penjualan, jawab SINGKAT, Bahasa Indonesia.
Gunakan istilah SPD, Target, Ach%.
Warna: 🟢≥100 🟡90-99 🔴<90.
Akhiri dengan 1–2 saran TINDAKAN nyata.

DATA:
${JSON.stringify(data)}

PERTANYAAN: ${params}`

HTTP.post({
  url:
    "https://generativelanguage.googleapis.com/v1beta/models/" +
    MODEL +
    ":generateContent?key=" +
    KUNCI_GEMINI,
  headers: { "Content-Type": "application/json" },
  body: { contents: [{ parts: [{ text: prompt }] }] },
  success: r =>
    Bot.sendMessage(
      "🤖 *JAWABAN AI*\n\n" +
        (r?.candidates?.[0]?.content?.parts?.[0]?.text || "⚠️ Tidak jawab"),
      { parse_mode: "Markdown" }
    ),
  error: e => Bot.sendMessage("⚠️ Gagal: " + JSON.stringify(e))
})

