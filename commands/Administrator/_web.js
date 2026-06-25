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
// /web  —  TELEGRAM WEB APP  •  VERSI ANTI CRASH
// ==========================================
const ADMIN_ID = "993046873";
// ✅ GANTI DI BAWAH INI DENGAN URL GITHUB PAGES KAMU
const URL_WEB  = "https://GusairiP.github.io/SlsReport_bot/webapp/index.html";

// ======================
// 🔧 BASE64 — AMAN 100% UNTUK BOT.BUSINESS
// ======================
function base64_encode(str) {
  const map = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  let out = "", i = 0;
  str = String(str);
  while (i < str.length) {
    let a = str.charCodeAt(i++);
    let b = i < str.length ? str.charCodeAt(i++) : NaN;
    let c = i < str.length ? str.charCodeAt(i++) : NaN;
    out += map[a >> 2];
    out += map[((a & 3) << 4) | (isNaN(b) ? 0 : b >> 4)];
    out += isNaN(b) ? "=" : map[((b & 15) << 2) | (isNaN(c) ? 0 : c >> 6)];
    out += isNaN(c) ? "=" : map[c & 63];
  }
  return out;
}

// ======================
// 🛡️ SELURUH LOGIKA DI DALAM TRY — TIDAK CRASH LAGI
// ======================
try {

  // 🔐 CEK ADMIN DULU
  if (String(user.telegramid) !== ADMIN_ID) {
    Bot.sendMessage("⛔ Perintah ini KHUSUS ADMIN");
    return;
  }

  // 📦 AMBIL DATA DASAR
  let stores = Bot.getProperty("STORE_LIST") || [];
  if (!Array.isArray(stores)) stores = [];

  if (stores.length === 0) {
    Bot.sendMessage("⚠️ Belum ada toko terdaftar, jalankan dulu /storelist");
    return;
  }

  // 📊 HITUNG — DIPERMUDAH & DIAMANKAN
  let totalSales = 0, totalTarget = 0, totalSpd = 0;
  let over = 0, under = 0, ranking = [];

  for (let i = 0; i < stores.length; i++) {
    let kdtk = String(stores[i]).trim().toUpperCase();
    let s = Bot.getProperty("store_" + kdtk) || {};

    let hari = 0, akum = 0;
    let salesData = s.sales || {};
    for (let tgl in salesData) {
      let v = Number(salesData[tgl]?.sales || 0);
      if (v > 0) { akum += v; hari++; }
    }

    let spd   = hari > 0 ? Math.round(akum / hari) : 0;
    let tSpd  = Number((s.target || {}).spd || 0);
    let ach   = tSpd > 0 ? Math.round((spd / tSpd) * 100) : 0;

    ach >= 100 ? over++ : under++;
    totalSales  += akum;
    totalTarget += tSpd;
    totalSpd    += spd;

    // ✅ HANYA KIRIM YANG DIPAKAI → PERKECIL UKURAN
    ranking.push({
      k: kdtk,
      n: String(s.nama || "-").substring(0,20), // batas nama
      a: String(s.am   || "-").substring(0,15),
      s: spd,
      t: tSpd,
      p: ach
    });
  }

  // 🏆 URUTKAN & BATAS MAKS 20 TOKO → URL AMAN
  ranking.sort((x,y) => y.p - x.p);
  ranking = ranking.slice(0, 20);

  let nToko = stores.length;
  let paket = {
    totalStore : nToko,
    totalSales : totalSales,
    avgSpd     : nToko > 0 ? Math.round(totalSpd / nToko) : 0,
    achArea    : totalTarget > 0 ? Math.round((totalSpd/nToko) / (totalTarget/nToko) * 100) : 0,
    over       : over,
    under      : under,
    ranking    : ranking
  };

  // 📦 KEMAS DATA — AMAN
  let json   = JSON.stringify(paket);
  let aman   = encodeURIComponent(json);
  let data64 = base64_encode(aman);
  let url    = URL_WEB + "?d=" + data64;

  // ⚠️ CEK PANJANG URL — BATAS TELEGRAM ~2000
  if (url.length > 1900) {
    Bot.sendMessage("⚠️ Data terlalu besar, hanya dikirim ringkasan\nPanjang: " + url.length);
    // KIRIM VERSI MINI
    paket.ranking = ranking.slice(0,10);
    json   = JSON.stringify(paket);
    data64 = base64_encode(encodeURIComponent(json));
    url    = URL_WEB + "?d=" + data64;
  }

  // ✅ KIRIM TOMBOL — BERHASIL
  Bot.sendKeyboard(
    [[{ text: "📊 BUKA DASHBOARD", web_app: { url: url } }]],
    "✅ Data berhasil dihitung (" + nToko + " toko)\nTekan tombol di bawah → laporan terbuka DI DALAM Telegram."
  );

}
// 🛡️ JIKA ADA SALAH APA PUN → KASIH TAHU, TIDAK LAPOR BUG
catch (err) {
  Bot.sendMessage(
    "⚠️ Terjadi kendali di /web\n" +
    "Pesan: " + String(err.message || err) + "\n" +
    "Baris: " + (err.lineNumber || "-")
  );
}

