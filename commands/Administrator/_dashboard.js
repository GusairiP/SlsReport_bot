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

/*
========================================
COMMAND : /dashboard
MODULE  : EXECUTIVE DASHBOARD
========================================
*/

// ======================
// AMBIL STORE LIST
// ======================

let stores = Bot.getProperty("STORE_LIST")

if (!Array.isArray(stores)) {
  stores = []
}

// ======================
// INISIALISASI
// ======================

let totalSales = 0
let totalTarget = 0
let totalSpd = 0

let overTarget = 0
let underTarget = 0

let ranking = []

// ======================
// LOOPING TOKO
// ======================

for (let i = 0; i < stores.length; i++) {
  let kdtk = stores[i]

  let sales = 0
  let hari = 0

  for (let tgl = 1; tgl <= 31; tgl++) {
    let s = Number(Bot.getProperty(kdtk + "_sales_" + tgl)) || 0

    if (s > 0) {
      sales += s
      hari++
    }
  }

  let spd = hari > 0 ? Math.round(sales / hari) : 0

  let target = Number(Bot.getProperty(kdtk + "_target_spd")) || 0

  let ach = 0
  if (target > 0) {
    ach = Math.round((spd / target) * 100)
  }

  if (ach >= 100) {
    overTarget++
  } else {
    underTarget++
  }

  ranking.push({
    kdtk: kdtk,
    spd: spd,
    target: target,
    ach: ach
  })

  totalSales += sales
  totalTarget += target
  totalSpd += spd
}

// ======================
// SORT RANKING
// ======================

ranking.sort((a, b) => b.ach - a.ach)

// ======================
// SUMMARY SAFE CALC
// ======================

let avgSpd = stores.length > 0 ? Math.round(totalSpd / stores.length) : 0

let avgTarget = stores.length > 0 ? totalTarget / stores.length : 0

let achArea = 0

if (avgTarget > 0) {
  achArea = Math.round((avgSpd / avgTarget) * 100)
}

// ======================
// FORMAT NUMBER HELPER
// ======================

function format(num) {
  return (Number(num) || 0).toLocaleString("id-ID")
}

// ======================
// GENERATE DASHBOARD
// ======================

let desc =
  "🏪 Total KDTK : " +
  stores.length +
  "\n💰 Sales MTD : Rp." +
  format(totalSales) +
  "\n📈 Avg SPD : Rp." +
  format(avgSpd) +
  "\n🎯 Ach Area : " +
  achArea +
  "%" +
  "\n🟢 Over Target : " +
  overTarget +
  "\n🔴 Under Target : " +
  underTarget +
  "\n\n🏆 TOP STORE\n\n"

// ======================
// TOP 5 STORE
// ======================

let limit = Math.min(ranking.length, 5)

for (let i = 0; i < limit; i++) {
  let d = ranking[i]

  desc +=
    i +
    1 +
    ". " +
    d.kdtk +
    "\nSPD : Rp." +
    format(d.spd) +
    "\nTarget : Rp." +
    format(d.target) +
    "\nAch : " +
    (d.ach || 0) +
    "%" +
    "\n\n"
}

// ======================
// UPDATE PANEL
// ======================

AdminPanel.setPanel({
  panel_name: "Dashboard",
  data: {
    title: "📊 Sales Dashboard",
    description: desc,
    icon: "analytics",
    index: 1
  }
})

// ======================
// OUTPUT
// ======================

Bot.runCommand("/dashboard_refresh")

Bot.sendMessage("✅ Dashboard berhasil diperbarui")

