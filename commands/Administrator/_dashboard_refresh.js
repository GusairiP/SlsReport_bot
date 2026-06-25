/*CMD
  command: /dashboard_refresh
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
COMMAND : /dashboard_refresh
MODULE  : DASHBOARD ENGINE (FIXED)
========================================
*/

// ======================
// AMBIL LIST TOKO
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

let overTarget = 0
let underTarget = 0

let ranking = []

// ======================
// LOOP TOKO
// ======================

for (let i = 0; i < stores.length; i++) {
  let kdtk = stores[i]

  let store = Bot.getProperty("store_" + kdtk)

  if (!store) continue

  // ======================
  // HITUNG SALES + SPD
  // ======================

  let salesData = store.sales || {}

  let akumulasiSales = 0
  let hariAktif = 0

  for (let tgl in salesData) {
    let val = Number(salesData[tgl]?.sales) || 0

    if (val > 0) {
      akumulasiSales += val
      hariAktif++
    }
  }

  let spd = hariAktif > 0 ? akumulasiSales / hariAktif : 0

  // ======================
  // TARGET (FIXED)
  // ======================

  let targetSpd = Number(store?.target?.spd) || 0
  let targetSales = Number(store?.target?.sales) || 0

  // ======================
  // ACH (SPD BASED)
  // ======================

  let ach = 0

  if (targetSpd > 0) {
    ach = (spd / targetSpd) * 100
  }

  ach = Math.round(ach)

  // ======================
  // STATUS
  // ======================

  let status = ach >= 100 ? "🟢" : "🔴"

  if (ach >= 100) {
    overTarget++
  } else {
    underTarget++
  }

  // ======================
  // TOTAL SUMMARY
  // ======================

  totalSales += akumulasiSales
  totalTarget += targetSales

  // ======================
  // RANKING DATA
  // ======================

  ranking.push({
    kdtk: kdtk,
    nama: store.nama || "-",
    spd: Math.round(spd),
    target: targetSpd,
    ach: ach,
    status: status,
    sales: akumulasiSales
  })
}

// ======================
// SORT RANKING (BEST ACCURACY)
// ======================

ranking.sort((a, b) => b.ach - a.ach)

// ======================
// BUILD DETAIL
// ======================

let detail = ""

let limit = Math.min(ranking.length, 10)

for (let i = 0; i < limit; i++) {
  let r = ranking[i]

  detail +=
    "#" +
    (i + 1) +
    " " +
    r.status +
    " " +
    r.kdtk +
    "\nSPD : Rp." +
    Number(r.spd || 0).toLocaleString("id-ID") +
    "\nACH : " +
    (r.ach || 0) +
    "%\n\n"
}

// ======================
// SAFE FORMAT FUNCTION
// ======================

function format(num) {
  return Number(num || 0).toLocaleString("id-ID")
}

// ======================
// UPDATE PANEL
// ======================

AdminPanel.setPanel({
  panel_name: "Dashboard",
  data: {
    title: "📊 Dashboard Sales",

    description:
      "🏪 Total Toko : " +
      stores.length +
      "\n\n💰 Total Sales : Rp." +
      format(totalSales) +
      "\n🎯 Total Target : Rp." +
      format(totalTarget) +
      "\n🟢 Over Target : " +
      overTarget +
      "\n🔴 Under Target : " +
      underTarget +
      "\n\n🏆 TOP STORE\n\n" +
      detail,

    icon: "analytics",
    index: 1
  }
})

// ======================
// SAVE RANKING
// ======================

Bot.setProperty("STORE_RANKING", ranking, "json")

// ======================
// OUTPUT
// ======================

Bot.sendMessage("✅ Dashboard berhasil diperbarui")

Bot.runCommand("/web"); // opsional: sekalian update data web


