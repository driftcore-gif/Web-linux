import React,{useState} from "react";
import {listDir,readFile,writeFile,mkdir,remove} from "../core/fs";
import {install,remove as removePkg,search,terminalHelp} from "../core/apt";

export default function Terminal(){
 const [lines,setLines]=useState(["WebOS Plasma Terminal","Type 'help' for commands."]);
 const [cmd,setCmd]=useState("");
 async function run(){
  const c=cmd.trim(); if(!c)return;
  let out=[];
  const a=c.split(" "); const name=a[0];
  try{
   if(c==="clear"){setLines([]);setCmd("");return}
   if(c==="help") out=terminalHelp();
   else if(c==="pwd") out=["/home/user"];
   else if(c==="date") out=[new Date().toString()];
   else if(c==="online") out=[navigator.onLine?"online":"offline"];
   else if(c==="neofetch") out=["WebOS Plasma","React + Vite","IndexedDB filesystem","Offline PWA","v86 VM manager"];
   else if(name==="ls"){const x=await listDir(a[1]||"/home/user");out=x.map(v=>(v.type==="dir"?"📁 ":"📄 ")+v.path.split("/").pop())}
   else if(name==="cat"){const x=await readFile(a[1]);out=[x??"cat: file not found"]}
   else if(name==="touch"){await writeFile(a[1],"");out=["created "+a[1]]}
   else if(name==="mkdir"){await mkdir(a[1]);out=["created directory "+a[1]]}
   else if(name==="rm"){await remove(a[1]);out=["removed "+a[1]]}
   else if(c==="apt update") out=["Reading package lists... Done","WebOS local repository ready."];
   else if(c==="apt list") out=(await search("")).map(p=>p.id+" "+p.version);
   else if(name==="apt"&&a[1]==="search") out=(await search(a.slice(2).join(" "))).map(p=>p.id+" - "+p.description);
   else if(name==="apt"&&a[1]==="install"){await install(a[2]);out=["Installed "+a[2]]}
   else if(name==="apt"&&a[1]==="remove"){await removePkg(a[2]);out=["Removed "+a[2]]}
   else out=["Command not found: "+c];
  }catch(e){out=[String(e.message||e)]}
  setLines(x=>[...x,"user@webos:~$ "+c,...out]);setCmd("");
 }
 return <div className="terminal">{lines.map((x,i)=><div key={i}>{x}</div>)}<div className="prompt"><span>user@webos:~$</span><input autoFocus value={cmd} onChange={e=>setCmd(e.target.value)} onKeyDown={e=>e.key==="Enter"&&run()}/></div></div>
}