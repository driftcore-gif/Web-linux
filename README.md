# WebOS Plasma 🖥️

A browser-based, offline-first desktop environment inspired by KDE Plasma and Linux.

WebOS Plasma runs entirely inside a modern web browser and provides a desktop, window manager, taskbar, launcher, terminal, file manager, software center, settings, browser, calculator, paint app, system monitor, and VM manager.

## ✨ Features

- 🖥️ KDE Plasma-inspired desktop
- 🪟 Window manager
- 📌 Taskbar
- 🚀 Application launcher
- 💻 Linux-style terminal
- 📁 Virtual filesystem
- 💾 IndexedDB persistent storage
- 📦 APT-like package manager
- 🛍️ Software Center
- 🌐 Built-in browser
- ⚙️ Settings
- 📝 Text editor
- 🧮 Calculator
- 🎨 Paint
- 📊 System monitor
- 💿 VM Manager
- 📱 PWA support
- 📡 Offline-first design
- 🌙 Multiple themes
- 🚀 GitHub Pages support
- 📦 No backend server required

## 📂 Project Structure

```text
webos-plasma/
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
│   │   └── README.txt
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
🛠️ Requirements
You need:
Node.js
npm
A modern web browser
Recommended browsers:
Google Chrome
Chromium
Microsoft Edge
Firefox
🚀 Run Locally
Clone the repository:
git clone https://github.com/YOUR_USERNAME/webos-plasma.git
cd webos-plasma
Install dependencies:
npm install
Start the development server:
npm run dev
Open the address shown by Vite, usually:
http://localhost:5173/
📦 Production Build
Build the project:
npm run build
The production files will be generated inside:
dist/
Preview the production build:
npm run preview
🌐 GitHub Pages
WebOS Plasma includes a GitHub Actions workflow for GitHub Pages.
Create a GitHub repository.
Upload the project.
Push it to the main branch.
Open:
Repository → Settings → Pages
Select GitHub Actions as the deployment source.
The workflow is located at:
.github/workflows/pages.yml
GitHub Actions will automatically:
Install dependencies
        ↓
Build WebOS
        ↓
Create dist/
        ↓
Upload the website
        ↓
Deploy to GitHub Pages
💻 Terminal
The built-in terminal provides Linux-like commands.
Supported commands include:
help
clear
pwd
ls
ls /home/user
cat /home/user/example.txt
touch /home/user/test.txt
mkdir /home/user/MyFolder
rm /home/user/test.txt
date
online
neofetch
Package commands:
apt update
apt list
apt search calculator
apt install calculator
apt remove calculator
The terminal operates inside the WebOS virtual environment.
It does NOT execute arbitrary commands on the host computer or phone.
📁 Virtual Filesystem
WebOS has its own browser-based filesystem.
The default filesystem contains:
/
├── home/
│   └── user/
│       ├── Desktop/
│       ├── Documents/
│       ├── Downloads/
│       ├── Music/
│       ├── Pictures/
│       └── Videos/
├── etc/
├── usr/
│   └── bin/
├── var/
└── tmp/
Files are stored using IndexedDB.
This allows files to persist across browser refreshes.
📦 Package Manager
WebOS contains an APT-inspired local package manager.
Example:
apt update
apt list
apt search paint
apt install paint
apt remove paint
Available applications include:
calculator
text-editor
paint
music-player
system-monitor
vm-manager
Important
This is an APT-like WebOS package manager.
It is not Debian's real APT.
It installs WebOS applications rather than native Linux packages.
It cannot install native packages such as:
.deb
gcc
bash
systemd
linux-kernel
sudo
into the host operating system.
🛍️ Software Center
The Software Center provides a graphical interface for WebOS packages.
Applications can be:
Installed
Removed
Searched
The installed state is saved locally in the browser.
📝 Applications
WebOS includes several built-in applications.
Terminal
Linux-inspired terminal interface.
File Manager
Browse and manage the WebOS virtual filesystem.
Text Editor
Create and edit local WebOS files.
Calculator
Basic mathematical calculations.
Paint
Draw using the mouse, touchscreen, or pointer.
Browser
Open web pages inside WebOS.
Some websites may prevent iframe embedding using security headers.
Settings
Change the WebOS appearance and theme.
System Monitor
Displays browser-accessible system information such as:
Online/offline state
Screen resolution
JavaScript memory information
Browser security prevents WebOS from directly reading the host CPU usage, RAM usage, temperatures, or hardware sensors.
🎨 Themes
Available themes include:
Plasma
Midnight
Aurora
Light
Theme settings are stored locally.
📡 Offline Mode
WebOS uses a Service Worker to cache the application.
After the application has been loaded and cached, the main WebOS interface can continue working without an Internet connection.
Offline functionality includes:
Desktop
Window manager
Terminal
File manager
Virtual filesystem
Settings
Calculator
Paint
Notes
Local package manager
Internet-dependent features still require Internet access.
For example:
External websites
Remote resources
Online services
Remote package repositories
📱 PWA
WebOS can be installed as a Progressive Web App on supported browsers.
Use the browser's installation option:
Browser menu → Install WebOS Plasma
The WebOS can then launch as an application.
💿 Virtual Machine
WebOS includes a VM Manager designed for browser-based x86 emulation using v86/WebAssembly.
The VM system is intended to support compatible disk and boot images such as:
.iso
.img
.bin
The VM runs inside the browser rather than directly on the host operating system.
VM Limitations
VM performance depends on:
Browser
CPU
RAM
WebAssembly support
Disk image
Guest operating system
The project does not include proprietary Windows installation images.
If you want to run Windows 95, Windows 98, or another proprietary operating system, you must provide a legally obtained image yourself.
Required v86 firmware/WASM assets must also be provided according to the VM integration configuration.
🔐 Browser Security
WebOS runs inside the browser sandbox.
It cannot directly access:
Linux kernel
Windows kernel
Android system
Host filesystem
Host shell
Host processes
Host hardware
Native device drivers
Web APIs such as these are used instead:
IndexedDB
Service Worker
WebAssembly
File API
Canvas API
Local Storage
💾 Data Storage
WebOS stores its data locally in browser storage.
Examples include:
Virtual files
Settings
Installed package state
Notes
Application data
Clearing the site's browser storage can remove WebOS data.
🧹 Reset WebOS
To reset WebOS, clear the site's storage from your browser.
For Chromium-based browsers:
Site settings → Storage → Clear data
This can remove:
Virtual files
Settings
Notes
Installed package information
Local application data
🧩 Technology Stack
WebOS Plasma is built using:
React
JavaScript
Vite
CSS
IndexedDB
Service Worker
PWA APIs
WebAssembly
v86 integration
🏗️ Architecture
The basic architecture is:
                    Web Browser
                         │
                         ▼
                 ┌───────────────┐
                 │ WebOS Plasma   │
                 └───────┬───────┘
                         │
          ┌──────────────┼──────────────┐
          ▼              ▼              ▼
      Desktop       Applications     Services
          │              │              │
          ▼              ▼              ▼
   Window Manager   Terminal       IndexedDB
   Taskbar          File Manager   Service Worker
   Launcher         Browser        PWA
                    Settings
                    Calculator
                    Paint
                    VM Manager
                         │
                         ▼
                   WebAssembly
                         │
                         ▼
                       v86
📦 Offline Architecture
First Visit
    │
    ▼
Download WebOS
    │
    ▼
Service Worker
    │
    ├── HTML
    ├── CSS
    ├── JavaScript
    ├── Assets
    └── PWA files
    │
    ▼
Browser Cache
    │
    ▼
Offline WebOS
⚠️ Important Limitations
WebOS Plasma is a browser-based desktop environment.
It is not a complete replacement for a native operating system.
It cannot provide native:
Linux processes
Linux kernel modules
systemd
/dev devices
Native drivers
Native GPU drivers
Real Debian APT
Unlimited filesystem access
Direct hardware access
The terminal is a WebOS terminal, not a direct host shell.
The package manager installs WebOS applications, not native Debian packages.
The VM system performs emulation inside the browser and is not equivalent to a native hypervisor.
🔒 Security Notes
Do not assume WebOS has the same security model as a real Linux operating system.
Browser sandboxing provides isolation, but applications running inside WebOS should still be treated as web applications.
Do not enter sensitive credentials into experimental applications.
🔮 Future Development
Potential future improvements include:
[ ] Window resizing
[ ] Window snapping
[ ] Window animations
[ ] Virtual desktops
[ ] Plasma widgets
[ ] Notification center
[ ] Clipboard manager
[ ] Drag-and-drop file manager
[ ] OPFS filesystem backend
[ ] Filesystem import/export
[ ] ZIP application packages
[ ] Local package repository
[ ] Better v86 integration
[ ] VM snapshots
[ ] VM disk management
[ ] Login screen
[ ] Lock screen
[ ] Network settings
[ ] Audio system
[ ] Media player
[ ] Image viewer
[ ] More WebOS applications
[ ] Better mobile UI
🤝 Contributing
Contributions are welcome.
Clone the project:
git clone https://github.com/YOUR_USERNAME/webos-plasma.git
cd webos-plasma
npm install
npm run dev
Make your changes, test them, and submit a pull request.
📜 Licensing
WebOS Plasma source code should use the license selected by the project owner.
Third-party dependencies and assets may have separate licenses.
Always check the licenses for:
React
Vite
v86
WebAssembly components
Third-party libraries
Firmware
Guest operating systems
Other bundled assets
Do not redistribute proprietary operating-system images unless you have the appropriate rights.
🎯 Project Goal
The goal of WebOS Plasma is to create a lightweight, attractive, extensible desktop environment that feels like a Linux desktop while running completely inside a web browser.
                 WEBOS PLASMA
                      │
       ┌──────────────┼──────────────┐
       │              │              │
       ▼              ▼              ▼
    Desktop       Applications    Virtual System
       │              │              │
       ▼              ▼              ▼
   Plasma UI      Web Apps        Filesystem
   Taskbar        Terminal        Package Manager
   Launcher       Browser         VM Manager
   Windows        Settings        Offline Storage
       │              │              │
       └──────────────┼──────────────┘
                      ▼
                 Web Browser
⭐ Final Goal
WebOS Plasma aims to provide a complete Linux-inspired desktop experience using:
HTML
CSS
JavaScript
React
WebAssembly
IndexedDB
Service Workers
PWA
v86
Everything runs from the browser, making the project portable across desktops, laptops, tablets, and phones.
WebOS Plasma: a Linux-inspired desktop environment running in the browser. 🐧🌐
