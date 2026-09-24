import React,{useEffect,useRef,useState} from "react";

// A real VNC client (uses the actual noVNC/RFB protocol implementation - this is not a
// simulation). It connects over WebSocket, which is the only kind of socket a browser
// can open. Most VNC servers only speak raw TCP, so this can only reach a server that is
// exposed through a WebSocket bridge (e.g. `websockify host:5900`, or a server/proxy that
// natively terminates WebSocket, like most VNC-in-browser setups such as noVNC/Proxmox/
// oVirt web consoles use). Plain "host:port" VNC with no such bridge is unreachable from a
// browser tab - that's a browser platform limitation, not something this app can bypass.
// It works with any VNC server exporting an X11 desktop (TigerVNC, x11vnc, TightVNC, etc.)
// exactly the same as a Windows/macOS one - VNC already carries the remote framebuffer, so
// there's no separate "X11 mode" needed.
//
// The @novnc/novnc library is loaded lazily (dynamic import) on first connect attempt,
// not at app startup - one of its feature-detection checks can throw on some browsers,
// and importing it eagerly at the top of the bundle would take down the whole desktop.
let rfbModulePromise;
function loadRFB(){
 if(!rfbModulePromise) rfbModulePromise=import("@novnc/novnc").then(m=>m.default||m);
 return rfbModulePromise;
}

export default function VncClient(){
 const screenRef=useRef(null);
 const rfbRef=useRef(null);
 const [host,setHost]=useState("");
 const [port,setPort]=useState("6080");
 const [path,setPath]=useState("");
 const [secure,setSecure]=useState(location.protocol==="https:");
 const [customUrl,setCustomUrl]=useState("");
 const [useCustomUrl,setUseCustomUrl]=useState(false);
 const [password,setPassword]=useState("");
 const [status,setStatus]=useState("disconnected");
 const [log,setLog]=useState(["VNC Client ready. Enter a WebSocket-reachable VNC endpoint and connect."]);

 function addLog(l){ setLog(x=>[...x.slice(-40),l]); }

 function buildUrl(){
  if(useCustomUrl) return customUrl.trim();
  if(!host) throw Error("Host is required");
  const scheme=secure?"wss":"ws";
  const p=path.trim().replace(/^\/+/,"");
  return `${scheme}://${host}:${port}${p?"/"+p:""}`;
 }

 async function connect(){
  let url;
  try{ url=buildUrl(); }catch(e){ addLog("Error: "+e.message); return; }
  if(!/^wss?:\/\//i.test(url)){ addLog("Error: URL must start with ws:// or wss://"); return; }
  disconnect();
  setStatus("connecting");
  addLog("Loading VNC client library...");
  let RFB;
  try{ RFB=await loadRFB(); }
  catch(e){ setStatus("disconnected"); addLog("Failed to load VNC library in this browser: "+(e.message||e)); return; }
  addLog("Connecting to "+url+" ...");
  try{
   const rfb=new RFB(screenRef.current,url,{credentials:{password}});
   rfb.scaleViewport=true;
   rfb.resizeSession=false;
   rfb.addEventListener("connect",()=>{ setStatus("connected"); addLog("Connected."); });
   rfb.addEventListener("disconnect",(e)=>{
    setStatus("disconnected");
    addLog(e.detail && e.detail.clean===false ? "Disconnected (connection error / server closed it)." : "Disconnected.");
   });
   rfb.addEventListener("credentialsrequired",()=>{
    addLog("Server requires credentials. Enter a password above and reconnect.");
   });
   rfb.addEventListener("securityfailure",(e)=>{
    addLog("Security/auth failure: "+(e.detail && (e.detail.reason||e.detail.status)));
   });
   rfb.addEventListener("desktopname",(e)=>{ addLog("Remote desktop name: "+e.detail.name); });
   rfbRef.current=rfb;
  }catch(e){
   setStatus("disconnected");
   addLog("Failed to start connection: "+(e.message||e));
  }
 }

 function disconnect(){
  if(rfbRef.current){ try{ rfbRef.current.disconnect(); }catch{} rfbRef.current=null; }
 }

 useEffect(()=>()=>disconnect(),[]);

 return <div className="vncclient">
  <h2>🖧 VNC Client</h2>
  <p className="muted">Real noVNC-based client, not a simulation - but browsers can only open WebSocket connections, so the target VNC server must be reachable via a WebSocket bridge (e.g. websockify) or a natively WebSocket-capable VNC endpoint. Works with X11 (Linux), Windows and macOS VNC servers alike.</p>

  {!useCustomUrl?<div className="vnc-fields">
   <input placeholder="Host or IP" value={host} onChange={e=>setHost(e.target.value)}/>
   <input placeholder="Port" value={port} onChange={e=>setPort(e.target.value)} style={{maxWidth:90}}/>
   <input placeholder="Path (optional, e.g. websockify)" value={path} onChange={e=>setPath(e.target.value)}/>
   <label className="vnc-secure"><input type="checkbox" checked={secure} onChange={e=>setSecure(e.target.checked)}/> wss (secure)</label>
  </div>:
   <input className="vnc-customurl" placeholder="wss://host:port/path" value={customUrl} onChange={e=>setCustomUrl(e.target.value)}/>
  }
  <div className="vnc-fields">
   <input type="password" placeholder="Password (if required)" value={password} onChange={e=>setPassword(e.target.value)}/>
   <label className="vnc-secure"><input type="checkbox" checked={useCustomUrl} onChange={e=>setUseCustomUrl(e.target.checked)}/> use custom WebSocket URL instead</label>
  </div>

  <div className="vnc-actions">
   <button onClick={connect} disabled={status==="connecting"}>Connect</button>
   <button onClick={disconnect} disabled={status==="disconnected"}>Disconnect</button>
   <span className={"vnc-status vnc-"+status}>{status}</span>
  </div>

  <div ref={screenRef} className="vnc-screen"/>
  <div className="vnclog vnc-loglines">{log.map((l,i)=><div key={i}>{l}</div>)}</div>
 </div>
}
