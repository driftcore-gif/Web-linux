// Built-in package repository. These install/uninstall a bundled app (state tracked in IndexedDB).
// For arbitrary third-party web apps not in this fixed list, see core/customapps.js
// ("apt install-url" in the terminal, or the "Install from URL" box in Software Center).
export const REPO=[
 {id:"calculator",name:"Calculator",version:"1.0",icon:"🧮",category:"Utilities",description:"Offline calculator web app"},
 {id:"text-editor",name:"Text Editor",version:"1.0",icon:"📝",category:"Utilities",description:"Local text editor"},
 {id:"paint",name:"Paint",version:"1.0",icon:"🎨",category:"Graphics",description:"Canvas drawing app"},
 {id:"music-player",name:"Music Player",version:"1.0",icon:"🎵",category:"Multimedia",description:"Local audio player"},
 {id:"system-monitor",name:"System Monitor",version:"1.0",icon:"📊",category:"System",description:"Browser resource monitor"},
 {id:"vm-manager",name:"VM Manager",version:"1.0",icon:"💿",category:"System",description:"v86 x86 virtual machine manager (planned)"},
 {id:"virus-scanner",name:"SafeGuard Antivirus",version:"3.1",icon:"🛡️",category:"Joke/Retro",description:"A fake, harmless virus scanner. Pure nostalgia, no real scanning."},
 {id:"you-are-an-idiot",name:"You Are An Idiot",version:"1.0",icon:"🦜",category:"Joke/Retro",description:"Classic late-90s joke program. Purely for laughs."},
 {id:"vnc-viewer",name:"Remote Desktop Arcade",version:"1.0",icon:"🖥️",category:"Joke/Retro",description:"A fake VNC client that 'connects' to a retro arcade game."},
 {id:"js-console",name:"JS Console",version:"1.0",icon:"🧑‍💻",category:"Dev Tools",description:"Real in-browser JavaScript REPL/interpreter."},
];
