import React,{useRef,useState} from "react";
import {V86} from "v86";

export default function VM(){
 const screen=useRef(null),[emu,setEmu]=useState(null),[status,setStatus]=useState("Stopped"),[file,setFile]=useState(null);
 async function boot(){
  if(!file){setStatus("Choose a disk/ISO first");return}
  setStatus("Starting v86...");
  try{
   const buffer=await file.arrayBuffer();
   const e=new V86({
    wasm_path:new URL("v86.wasm",import.meta.url).href,
    memory_size:32*1024*1024,
    vga_memory_size:2*1024*1024,
    screen_container:screen.current,
    bios:{url:new URL("../assets/seabios.bin",import.meta.url).href},
    vga_bios:{url:new URL("../assets/vgabios.bin",import.meta.url).href},
    cdrom:{buffer},
    autostart:true
   });
   setEmu(e);setStatus("Running");
  }catch(err){console.error(err);setStatus("Could not start: "+err.message)}
 }
 function stop(){try{emu?.stop();}catch{}setEmu(null);setStatus("Stopped")}
 return <div className="vm"><h2>v86 Virtual Machine</h2><p className="muted">Loads an x86 disk image or ISO locally. Guest systems run inside the browser sandbox.</p><input type="file" accept=".iso,.img,.bin" onChange={e=>setFile(e.target.files?.[0]||null)}/><div className="vm-actions"><button onClick={boot}>Boot</button><button onClick={stop}>Stop</button><span>{status}</span></div><div ref={screen} className="screen-container"><div></div><canvas/></div></div>
}