# SlsReport_bot - chat bot


# 🚀 SlsReport Bot

Ini adalah repositori untuk chatbot : [@SlsReport_bot](https://t.me/SlsReport_bot)

«Sales Performance Monitoring Bot built with Bots.Business»

SlsReport Bot adalah bot Telegram yang dirancang untuk membantu monitoring performa toko secara harian, membandingkan pencapaian dengan bulan lalu, menghitung growth, memprediksi closing, dan menyajikan laporan sales secara cepat langsung dari Telegram.

---

# ✨ Features

## 🏪 Store Management

- Registrasi toko
- Penyimpanan data AM & AS
- Target Sales & Target SPD

## 📊 Sales Monitoring

- Input sales harian
- Input struk harian
- Perhitungan APC otomatis

## 📈 Analytics

- Growth SPD
- Growth STD
- Growth APC
- Achievement Target

## 🔮 Closing Prediction

- Prediksi closing bulanan
- GAP terhadap target
- Status Over / Under Target

## 📉 Trend Analysis

- Riwayat SPD bulanan
- Trend naik/turun otomatis

## ⚙️ Admin Panel

- Konfigurasi bot
- Pengaturan target default
- Aktivasi / nonaktif bot
- Pengelolaan hak akses admin

---

# 🏗 System Architecture

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

# 📂 Property Structure

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

# 🧮 Formula Engine

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

# 📋 Commands

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

# 📥 Example Workflow

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

# 🔐 Access Control

## 👨‍💼 Admin

Memiliki akses:

/daftartoko
/target
/inputbl
/inputbl31
/edit
/hapus
/admin

## 👤 User

Memiliki akses:

/input
/rekap
/growth
/cek
/closing
/trend

---

# ⚙️ Admin Panel

Konfigurasi dilakukan melalui:

/config

Field yang tersedia:

Field| Fungsi
ADMIN_ID| ID Telegram Admin
BOT_STATUS| ON / OFF Bot
DEFAULT_TARGET_SALES| Target Sales Default
DEFAULT_TARGET_SPD| Target SPD Default

---

# 📊 Sample Output

Growth

## 📈 GROWTH SALES MTD

KDTK : T001

SPD
Now : Rp.9.200.000
BL  : Rp.8.700.000

Growth : 🟢 +5.74%

---

Closing

## 🎯 CLOSING REPORT

SPD      : Rp.9.200.000
Prediksi : Rp.285.200.000

Target   : Rp.278.796.424

🟢 OVER TARGET

---

# 🛣 Roadmap

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

# 🛠 Built With

- Bots.Business
- Telegram Bot API
- BJS (Bots.Business JavaScript)

---

# 👨‍💻 Author

Gusairi Putra

Sales Analytics & Automation Project

---

# 📄 License

MIT License

Copyright © 2026 Gusairi Putra

## What it is?
This repository can be imported to [Bots.Business](https://bots.business) as a worked chat bot.

[Bots.Business](https://bots.business) - it is probably the first CBPaaS - Chat Bot Platform as a Service.

A CBPaaS is a cloud-based platform that enables developers to create chatbots without needing to build backend infrastructure.

## Create your own bot for Telegram from this Git repo

How to create bot?
1. Create bot with [@BotFather](https://telegram.me/BotFather) and take Secret Token
2. Create bot in App and add Secret Token
3. Add Public Key from App as [Deploy key](https://developer.github.com/v3/guides/managing-deploy-keys/#deploy-keys) with read access (and write access for bot exporting if you need it)
4. Do import for this git repo

Now you can talk with yours new Telegram Bot

See [more](https://help.bots.business/getting-started)

## Commands - in commands folder
File name - it is command name (Bot it can be rewritten in command description)

Command can have: `name`, `help`, `aliases` (second names), `answer`, `keyboard`, `scnarios` (for simple logic) and other options.

### Command description
It is file header:

    /*CMD
      command: /test
      help: this is help for ccommand
      need_reply: [ true or false here ]
      auto_retry_time: [ time in sec ]
      answer: it is example answer for /test command
      keyboard: button1, button2
      aliases: /test2, /test3
    CMD*/

See [more](https://help.bots.business/commands)

### Command body
It is command code in JavaScript.
Use Bot Java Script for logic in command.

For example:
> Bot.sendMessage(2+2);

See [more](https://help.bots.business/scenarios-and-bjs)


## Libraries - in libs folder
You can store common code in the libs folder. File name - it is library name.

For example code in myLib.js:

    function hello(){ Bot.sendMessage("Hello from lib!") }
    function goodbye(name){ Bot.sendMessage("Goodbye, " + name) }

    publish({
      sayHello: hello,
      sayGoodbyeTo: goodbye
    })

then you can run in any bot's command:

    Libs.myLib.hello()
    Libs.myLib.sayGoodbyeTo("Alice")

See [more](https://help.bots.business/git/library)

## Other bots example
See other bots examples in the [github](https://github.com/bots-business?utf8=✓&tab=repositories&q=&type=public&language=javascript) or in the [Bot Store](https://bots.business/)


## Other help
[Help.bots.business](https://help.bots.business)

## API
See [API](https://api.bots.business/docs#/docs/summary)


![](https://bots.business/images/web-logo.png)
