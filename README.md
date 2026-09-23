# Web-linux 🐧

A browser-based, offline-first Linux-inspired desktop environment built with modern web technologies.

Web-linux is designed to provide a desktop experience similar to a lightweight Linux/KDE Plasma system while running entirely inside a web browser.

## 👤 Project Information

**Project Name:** Web-linux

**GitHub Username:** `driftcore-gif`

**Repository:** `https://github.com/driftcore-gif/web-linux`

## ✨ Features

- 🖥️ KDE Plasma-inspired desktop
- 🪟 Desktop window manager
- 📌 Taskbar
- 🚀 Application launcher
- 💻 Linux-style terminal
- 📁 Virtual filesystem
- 💾 Persistent browser storage
- 📦 APT-like package manager
- 🛍️ Graphical Software Center
- 🌐 Built-in web browser
- ⚙️ Settings application
- 📝 Text editor
- 🧮 Calculator
- 🎨 Paint application
- 📊 System monitor
- 💿 VM Manager
- 📱 Progressive Web App support
- 📡 Offline-first operation
- 🌙 Multiple desktop themes
- 🧩 WebAssembly support
- 🚀 GitHub Pages deployment

## 🏗️ Technology Stack

Web-linux is built using:

- React
- JavaScript
- Vite
- CSS
- IndexedDB
- Service Workers
- Progressive Web App APIs
- WebAssembly
- v86 integration

## 📂 Project Structure

```text
web-linux/
├── .github/
│   └── workflows/
│       └── pages.yml
├── public/
│   ├── manifest.json
│   └── sw.js
├── src/
│   ├── apps/
│   │   ├── Browser.jsx
│   │   ├── Calculator.jsx
│   │   ├── FileManager.jsx
│   │   ├── Notes.jsx
│   │   ├── Paint.jsx
│   │   ├── Settings.jsx
│   │   ├── SoftwareCenter.jsx
│   │   ├── SystemMonitor.jsx
│   │   ├── Terminal.jsx
│   │   └── VM.jsx
│   ├── assets/
│   ├── core/
│   │   ├── apt.js
│   │   ├── db.js
│   │   ├── fs.js
│   │   └── packages.js
│   ├── desktop/
│   │   └── Window.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── styles.css
├── index.html
├── package.json
├── vite.config.js
├── README.md
└── .gitignore
