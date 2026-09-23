import React,{useEffect,useState} from "react";
export default function SystemMonitor(){
 const [mem,setMem]=useState(null);
 useEffect(()=>{const f=()=>setMem(performance.memory||null);f();const id=setInterval(f,1000);return()=>clearInterval(id)},[]);
 return <div className="monitor"><h2>System Monitor</h2><p>Online: {navigator.onLine?"yes":"no"}</p><p>CPU: browser sandbox does not expose host CPU usage.</p><p>JS heap: {mem?Math.round(mem.usedJSHeapSize/1048576)+" MB / "+Math.round(mem.jsHeapSizeLimit/1048576)+" MB":"not exposed by this browser"}</p><p>Screen: {innerWidth} × {innerHeight}</p></div>
}