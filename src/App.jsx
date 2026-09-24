import React,{useEffect,useMemo,useState} from "react";
import {seedFS} from "./core/fs";
import {customApps} from "./core/apt";
import Window from "./desktop/Window";
import Terminal from "./apps/Terminal";
import FileManager from "./apps/FileManager";
import SoftwareCenter from "./apps/SoftwareCenter";
import Settings from "./apps/Settings";
import Browser from "./apps/Browser";
import Notes from "./apps/Notes";
import Calculator from "./apps/Calculator";
import Paint from "./apps/Paint";
import SystemMonitor from "./apps/SystemMonitor";
import VM from "./apps/VM";
import VirusScan from "./apps/VirusScan";
import Idiot from "./apps/Idiot";
import VncGame from "./apps/VncGame";
import VncClient from "./apps/VncClient";
import JsConsole from "./apps/JsConsole";
import CustomAppFrame from "./apps/CustomAppFrame";

const builtinApps=[
 ["terminal","Terminal","▣"],["files","File Manager","📁"],["software","Software Center","▦"],
 ["settings","Settings","⚙"],["browser","Browser","◎"],["notes","Text Editor","📝"],
 ["calculator","Calculator","🧮"],["paint","Paint","🎨"],["monitor","System Monitor","📊"],["vm","VM Manager","💿"],
 ["virusscan","SafeGuard Antivirus","🛡️"],["idiot","You Are An Idiot","🦜"],["vncgame","Remote Desktop Arcade","🖥️"],
 ["vncclient","VNC Client","🖧"],["jsconsole","JS Console","🧑‍💻"]
];
const builtinComponents={
 terminal:Terminal,files:FileManager,software:SoftwareCenter,settings:Settings,browser:Browser,notes:Notes,
 calculator:Calculator,paint:Paint,monitor:SystemMonitor,vm:VM,
 virusscan:VirusScan,idiot:Idiot,vncgame:VncGame,vncclient:VncClient,jsconsole:JsConsole
};

const POPUP_LINES=[
 "You are an idiot.","Still here? Bold choice.","This window means nothing.","Close me if you dare.",
 "01001001 01100100 01101001 01101111 01110100","Nice click. Do it again.","Warning: no actual warning.",
 "This is not a virus. Probably."
];
let popupSeq=1;

export default function App(){
 const [open,setOpen]=useState([]),[launcher,setLauncher]=useState(false),[q,setQ]=useState(""),[theme,setTheme]=useState(localStorage.getItem("webos-theme")||"plasma"),[online,setOnline]=useState(navigator.onLine);
 const [custom,setCustom]=useState([]);
 const [popups,setPopups]=useState([]);

 async function reloadCustomApps(){ setCustom(await customApps()); }

 useEffect(()=>{seedFS();localStorage.setItem("webos-theme",theme)},[theme]);
 useEffect(()=>{reloadCustomApps()},[]);
 useEffect(()=>{const a=()=>setOnline(true),b=()=>setOnline(false);addEventListener("online",a);addEventListener("offline",b);return()=>{removeEventListener("online",a);removeEventListener("offline",b)}},[]);
 // Software Center installs custom apps async elsewhere; poll lightly when the launcher opens
 // so newly installed URL apps show up without a full page reload.
 useEffect(()=>{ if(launcher) reloadCustomApps(); },[launcher]);

 function spawnPopups(n=6){
  const items=Array.from({length:n}).map(()=>({
   id:popupSeq++,
   text:POPUP_LINES[Math.floor(Math.random()*POPUP_LINES.length)],
   top:8+Math.random()*70,
   left:6+Math.random()*70
  }));
  setPopups(p=>[...p,...items]);
 }
 function closePopup(id){ setPopups(p=>p.filter(x=>x.id!==id)); }
 function closeAllPopups(){ setPopups([]); }

 const apps=useMemo(()=>[
  ...builtinApps,
  ...custom.map(c=>[c.id,c.name,c.icon||"🌐"])
 ],[custom]);
 const components=useMemo(()=>{
  const m={...builtinComponents};
  for(const c of custom) m[c.id]=(props)=><CustomAppFrame {...props} url={c.url}/>;
  return m;
 },[custom]);

 const filtered=useMemo(()=>apps.filter(a=>a[1].toLowerCase().includes(q.toLowerCase())),[q,apps]);
 function openApp(id){setOpen(x=>x.includes(id)?x:[...x,id]);setLauncher(false)}
 function close(id){setOpen(x=>x.filter(y=>y!==id))}
 return <main className={"desktop theme-"+theme}>
  <div className="background"><i/><i/><i/></div>
  <header className="topbar"><button onClick={()=>setLauncher(!launcher)}>◉</button><b>Web-linux</b><span className="status">{online?"● Online":"○ Offline"} · {new Date().toLocaleTimeString([], {hour:"2-digit",minute:"2-digit"})}</span></header>
  {launcher&&<aside className="launcher"><input autoFocus placeholder="Search applications..." value={q} onChange={e=>setQ(e.target.value)}/><div className="app-grid">{filtered.map(a=><button key={a[0]} onClick={()=>openApp(a[0])}><strong>{a[2]}</strong><span>{a[1]}</span></button>)}</div></aside>}
  <div className="workspace">{open.map(id=>{const a=apps.find(x=>x[0]===id),C=components[id];return <Window key={id} title={a[1]} icon={a[2]} onClose={()=>close(id)}><C theme={theme} setTheme={setTheme} spawnPopups={spawnPopups}/></Window>})}</div>
  <footer className="taskbar"><button onClick={()=>setLauncher(!launcher)}>◉</button>{open.map(id=>{const a=apps.find(x=>x[0]===id);return <button key={id} onClick={()=>close(id)}>{a[2]} {a[1]}</button>})}</footer>
  {popups.length>0&&<div className="popup-layer">
   {popups.length>1&&<button className="popup-closeall" onClick={closeAllPopups}>Close All ({popups.length})</button>}
   {popups.map(p=>
    <div key={p.id} className="popup-window" style={{top:p.top+"%",left:p.left+"%"}}>
     <div className="popup-titlebar"><span>🦜 You Are An Idiot</span><button onClick={()=>closePopup(p.id)}>×</button></div>
     <div className="popup-body">{p.text}</div>
    </div>
   )}
  </div>}
 </main>
}
