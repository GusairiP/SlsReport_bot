/*CMD
  command: /web
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

// ==========================================
// /web  →  Buka Telegram Web App (FIXED)
// ==========================================
const ADMIN = 993046873
const URL_WEB = "https://gusairip.github.io/SlsReport_bot/webapp/index.html" // GANTI MILIKMU

// ✅ FUNGSI BASE64 PENGGANTI btoa() — KHUSUS BOT.BUSINESS
function btoa_bjs(str) {
  var chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
  var out = "",
    i = 0,
    len = str.length,
    c1,
    c2,
    c3
  while (i < len) {
    c1 = str.charCodeAt(i++)
    c2 = str.charCodeAt(i++)
    c3 = str.charCodeAt(i++)
    out +=
      chars.charAt(c1 >> 2) +
      chars.charAt(((c1 & 3) << 4) | (c2 >> 4)) +
      chars.charAt(isNaN(c2) ? 64 : ((c2 & 15) << 2) | (c3 >> 6)) +
      chars.charAt(isNaN(c3) ? 64 : c3 & 63)
  }
  return out
}

// ✅ VALIDASI ADMIN
if (user.telegramid != ADMIN) {
  Bot.sendMessage("⛔ Khusus admin")
  return
}

// ✅ HITUNG DATA — SAMA PERSIS SEBELUMNYA
let stores = Bot.getProperty("STORE_LIST") || []
let totalSales = 0,
  totalTarget = 0,
  totalSpd = 0,
  over = 0,
  under = 0,
  ranking = []

for (let kdtk of stores) {
  let s = Bot.getProperty("store_" + kdtk)
  if (!s) continue
  let hari = 0,
    akum = 0
  for (let t in s.sales || {}) {
    let v = +s.sales[t].sales || 0
    if (v > 0) {
      akum += v
      hari++
    }
  }
  let spd = hari > 0 ? Math.round(akum / hari) : 0
  let tSpd = +(s.target || {}).spd || 0
  let ach = tSpd > 0 ? Math.round((spd / tSpd) * 100) : 0
  ach >= 100 ? over++ : under++
  totalSales += akum
  totalTarget += tSpd
  totalSpd += spd
  ranking.push({
    kdtk,
    nama: s.nama || "-",
    am: s.am || "-",
    spd,
    target: tSpd,
    ach
  })
}
ranking.sort((a, b) => b.ach - a.ach)

let paket = {
  totalStore: stores.length,
  totalSales,
  avgSpd: stores.length ? Math.round(totalSpd / stores.length) : 0,
  achArea: totalTarget
    ? Math.round(
        (totalSpd / stores.length / (totalTarget / stores.length)) * 100
      )
    : 0,
  over,
  under,
  ranking
}

// ✅ BAGIAN YANG DIPERBAIKI — TIDAK PAKAI btoa() LAGI
let jsonStr = encodeURIComponent(JSON.stringify(paket))
let url = URL_WEB + "?d=" + btoa_bjs(jsonStr)

// ✅ KIRIM TOMBOL WEB APP
Bot.sendKeyboard(
  [[{ text: "📊 BUKA DASHBOARD", web_app: { url } }]],
  "✅ Tekan tombol di bawah — laporan langsung terbuka DI DALAM Telegram."
)

