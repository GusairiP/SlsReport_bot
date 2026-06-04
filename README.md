# SlsReport_bot - chat bot
It is repository for chat bot: [@SlsReport_bot](https://t.me/SlsReport_bot)

# 🚀 SlsReport Bot

«Sales Performance Monitoring Bot built with Bots.Business»

SlsReport Bot adalah bot Telegram yang dirancang untuk membantu monitoring performa toko secara harian, membandingkan pencapaian dengan bulan lalu, menghitung growth, memprediksi closing, dan menyajikan laporan sales secara cepat langsung dari Telegram.

---

✨ Features

🏪 Store Management

- Registrasi toko
- Penyimpanan data AM & AS
- Target Sales & Target SPD

📊 Sales Monitoring

- Input sales harian
- Input struk harian
- Perhitungan APC otomatis

📈 Analytics

- Growth SPD
- Growth STD
- Growth APC
- Achievement Target

🔮 Closing Prediction

- Prediksi closing bulanan
- GAP terhadap target
- Status Over / Under Target

📉 Trend Analysis

- Riwayat SPD bulanan
- Trend naik/turun otomatis

⚙️ Admin Panel

- Konfigurasi bot
- Pengaturan target default
- Aktivasi / nonaktif bot
- Pengelolaan hak akses admin

---

🏗 System Architecture

┌─────────────────┐
│ Telegram User   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ SlsReport Bot   │
└────────┬────────┘
         │
 ┌───────┼────────┐
 ▼       ▼        ▼

Store   Sales    Analytics
Data    Data     Engine

 ▼       ▼        ▼

Target  Growth  Closing
Trend   Report  Prediction

---

📂 Property Structure

Master Store

T001_nama
T001_am
T001_as

Target

T001_target_sales
T001_target_spd

Sales Harian

T001_sales_1
T001_sales_2
T001_sales_3

T001_struk_1
T001_struk_2
T001_struk_3

Index Data

index_T001

Bulan Lalu

T001_BL

Trend History

T001_SPD_HISTORY

---

🧮 Formula Engine

APC

APC = Sales ÷ Struk

SPD

SPD = Total Sales ÷ Hari Aktif

STD

STD = Total Struk ÷ Hari Aktif

Achievement

Achievement =
(SPD ÷ Target SPD) × 100%

Growth

Growth =
((Current - Last Month) ÷ Last Month)
× 100%

Closing Prediction

Prediksi Closing =
SPD × 31

---

📋 Commands

Command| Fungsi
/start| Menu utama
/daftartoko| Registrasi toko
/target| Set target toko
/input| Input sales harian
/inputbl| Input bulan lalu
/inputbl31| Import bulan lalu massal
/rekap| Rekap sales
/growth| Analisa growth
/cek| Detail sales harian
/closing| Prediksi closing
/trend| Trend SPD
/edit| Koreksi data
/hapus| Hapus data
/admin| Admin menu

---

📥 Example Workflow

1️⃣ Daftar Toko

/daftartoko T001,IDM LAMPUNG,ARI,DONI

---

2️⃣ Set Target

/target T001 278796424 8993424

---

3️⃣ Input Bulan Lalu

/inputbl T001 1 8500000 275

---

4️⃣ Input Sales Hari Ini

/input T001 15 9300000 298

---

5️⃣ Lihat Growth

/growth T001

---

6️⃣ Lihat Rekap

/rekap T001

---

7️⃣ Prediksi Closing

/closing T001

---

🔐 Access Control

👨‍💼 Admin

Memiliki akses:

/daftartoko
/target
/inputbl
/inputbl31
/edit
/hapus
/admin

👤 User

Memiliki akses:

/input
/rekap
/growth
/cek
/closing
/trend

---

⚙️ Admin Panel

Konfigurasi dilakukan melalui:

/config

Field yang tersedia:

Field| Fungsi
ADMIN_ID| ID Telegram Admin
BOT_STATUS| ON / OFF Bot
DEFAULT_TARGET_SALES| Target Sales Default
DEFAULT_TARGET_SPD| Target SPD Default

---

📊 Sample Output

Growth

📈 GROWTH SALES MTD

KDTK : T001

SPD
Now : Rp.9.200.000
BL  : Rp.8.700.000

Growth : 🟢 +5.74%

---

Closing

🎯 CLOSING REPORT

SPD      : Rp.9.200.000
Prediksi : Rp.285.200.000

Target   : Rp.278.796.424

🟢 OVER TARGET

---

🛣 Roadmap

Version 1.1

- [ ] Export Excel
- [ ] Export PDF
- [ ] Multi Branch Dashboard

Version 1.2

- [ ] Auto Daily Reminder
- [ ] Ranking Store
- [ ] Ranking AM

Version 2.0

- [ ] Web Dashboard
- [ ] REST API
- [ ] Google Sheets Sync

---

🛠 Built With

- Bots.Business
- Telegram Bot API
- BJS (Bots.Business JavaScript)

---

👨‍💻 Author

Ari Putra

Sales Analytics & Automation Project

---

📄 License

MIT License

Copyright © 2026 Ari Putra
