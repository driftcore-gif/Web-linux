import React,{useEffect,useRef,useState} from "react";

const GRID=25;
const LOG_LINES=[
 "Initializing fake VNC client...",
 "Resolving arcade.web-linux.local ...",
 "Connecting to remote framebuffer ...",
 "Handshake OK (simulated, no real network connection is made)",
 "Session established. Loading remote desktop..."
];

export default function VncGame(){
 const [connecting,setConnecting]=useState(true);
 const [log,setLog]=useState([]);
 const [active,setActive]=useState(0);
 const [score,setScore]=useState(0);
 const [best,setBest]=useState(Number(localStorage.getItem("webos-vncgame-best")||0));
 const timer=useRef(null);

 useEffect(()=>{
  let i=0;
  const id=setInterval(()=>{
   setLog(l=>[...l,LOG_LINES[i]]);
   i++;
   if(i>=LOG_LINES.length){clearInterval(id);setConnecting(false);}
  },380);
  return ()=>clearInterval(id);
 },[]);

 useEffect(()=>{
  if(connecting) return;
  timer.current=setInterval(()=>{
   setActive(Math.floor(Math.random()*GRID));
  },900);
  return ()=>clearInterval(timer.current);
 },[connecting]);

 function hit(i){
  if(i!==active) return;
  setScore(s=>{
   const ns=s+1;
   if(ns>best){setBest(ns);localStorage.setItem("webos-vncgame-best",String(ns));}
   return ns;
  });
  setActive(Math.floor(Math.random()*GRID));
 }

 return <div className="vncgame">
  <h2>🖥️ Remote Desktop Arcade</h2>
  <p className="muted">A fake VNC viewer that "connects" to a tiny retro arcade game running entirely in your browser.</p>
  {connecting?
   <div className="vnclog">{log.map((l,i)=><div key={i}>{l}</div>)}</div>
  :
   <>
    <p>Byte Catcher - click the lit tile as fast as you can. Score: <b>{score}</b> · Best: <b>{best}</b></p>
    <div className="vncgrid">
     {Array.from({length:GRID}).map((_,i)=>
      <button key={i} className={"vnctile"+(i===active?" lit":"")} onClick={()=>hit(i)}/>
     )}
    </div>
   </>
  }
 </div>
}
