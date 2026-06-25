/*CMD
  command: /alert
  help: 
  need_reply: true
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
COMMAND : /alert
MODULE  : STORE ALERT
========================================

FUNGSI:
Menampilkan toko yang ACH SPD
masih di bawah target.

KRITERIA ALERT:
ACH < 90%

SUMBER DATA:
STORE_LIST
store_<KDTK>

========================================
*/

// ======================
// AMBIL STORE LIST
// ======================

let stores = Bot.getProperty("STORE_LIST") || []

if (stores.length == 0) {
  Bot.sendMessage("⚠️ Belum ada store terdaftar")

  return
}

// ======================
// PROSES ALERT
// ======================

let alertStore = []

for (let i = 0; i < stores.length; i++) {
  let kdtk = stores[i]

  let store = Bot.getProperty("store_" + kdtk)

  if (!store) {
    continue
  }

  let totalSales = 0
  let hari = 0

  if (store.sales) {
    for (let tgl in store.sales) {
      let sales = Number(store.sales[tgl].sales || 0)

      if (sales > 0) {
        totalSales += sales
        hari++
      }
    }
  }

  if (hari == 0) {
    continue
  }

  let spd = Math.round(totalSales / hari)

  let targetSpd = Number((store.target || {}).spd || 0)

  if (targetSpd <= 0) {
    continue
  }

  let ach = Math.round((spd / targetSpd) * 100)

  if (ach < 90) {
    alertStore.push({
      kdtk: kdtk,
      ach: ach,
      spd: spd,
      target: targetSpd
    })
  }
}

// ======================
// SORT ACH TERENDAH
// ======================

alertStore.sort(function(a, b) {
  return a.ach - b.ach
})

// ======================
// OUTPUT
// ======================

if (alertStore.length == 0) {
  Bot.sendMessage(
    "🟢 Tidak ada store alert\n\nSemua store berada di atas target."
  )

  return
}

let txt = "🚨 *STORE ALERT*\n\n"

for (let i = 0; i < alertStore.length; i++) {
  let d = alertStore[i]

  txt +=
    i +
    1 +
    ". 🔴 " +
    d.kdtk +
    "\nACH : " +
    d.ach +
    "%" +
    "\nSPD : Rp." +
    d.spd.toLocaleString("id-ID") +
    "\nTarget : Rp." +
    d.target.toLocaleString("id-ID") +
    "\n\n"
}

txt += "━━━━━━━━━━━━━━\n" + "Total Alert : " + alertStore.length + " Store"

Bot.sendMessage(txt)
