import React,{useEffect,useMemo,useState} from "react";
import {seedFS} from "./core/fs";
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

const apps=[
 ["terminal","Terminal","▣"],["files","File Manager","📁"],["software","Software Center","▦"],
 ["settings","Settings","⚙"],["browser","Browser","◎"],["notes","Text Editor","📝"],
 ["calculator","Calculator","🧮"],["paint","Paint","🎨"],["monitor","System Monitor","📊"],["vm","VM Manager","💿"]
];
const components={terminal:Terminal,files:FileManager,software:SoftwareCenter,settings:Settings,browser:Browser,notes:Notes,calculator:Calculator,paint:Paint,monitor:SystemMonitor,vm:VM};

export default function App(){
 const [open,setOpen]=useState([]),[launcher,setLauncher]=useState(false),[q,setQ]=useState(""),[theme,setTheme]=useState(localStorage.getItem("webos-theme")||"plasma"),[online,setOnline]=useState(navigator.onLine);
 useEffect(()=>{seedFS();localStorage.setItem("webos-theme",theme)},[theme]);
 useEffect(()=>{const a=()=>setOnline(true),b=()=>setOnline(false);addEventListener("online",a);addEventListener("offline",b);return()=>{removeEventListener("online",a);removeEventListener("offline",b)}},[]);
 const filtered=useMemo(()=>apps.filter(a=>a[1].toLowerCase().includes(q.toLowerCase())),[q]);
 function openApp(id){setOpen(x=>x.includes(id)?x:[...x,id]);setLauncher(false)}
 function close(id){setOpen(x=>x.filter(y=>y!==id))}
 return <main className={"desktop theme-"+theme}>
  <div className="background"><i/><i/><i/></div>
  <header className="topbar"><button onClick={()=>setLauncher(!launcher)}>◉</button><b>WebOS Plasma</b><span className="status">{online?"● Online":"○ Offline"} · {new Date().toLocaleTimeString([], {hour:"2-digit",minute:"2-digit"})}</span></header>
  {launcher&&<aside className="launcher"><input autoFocus placeholder="Search applications..." value={q} onChange={e=>setQ(e.target.value)}/><div className="app-grid">{filtered.map(a=><button key={a[0]} onClick={()=>openApp(a[0])}><strong>{a[2]}</strong><span>{a[1]}</span></button>)}</div></aside>}
  <div className="workspace">{open.map(id=>{const a=apps.find(x=>x[0]===id),C=components[id];return <Window key={id} title={a[1]} icon={a[2]} onClose={()=>close(id)}><C theme={theme} setTheme={setTheme}/></Window>})}</div>
  <footer className="taskbar"><button onClick={()=>setLauncher(!launcher)}>◉</button>{open.map(id=>{const a=apps.find(x=>x[0]===id);return <button key={id} onClick={()=>close(id)}>{a[2]} {a[1]}</button>})}</footer>
 </main>
}