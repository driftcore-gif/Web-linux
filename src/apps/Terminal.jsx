import React,{useState} from "react";
import {listDir,readFile,writeFile,mkdir,remove,extractRootfs} from "../core/fs";
import {install,remove as removePkg,search,terminalHelp,installUrl} from "../core/apt";

export default function Terminal(){
 const [lines,setLines]=useState(["Web-linux Terminal","This is a browser sandbox, not a real Linux shell.","Type 'help' for commands."]);
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
   else if(c==="neofetch") out=["Web-linux","React + Vite","IndexedDB virtual rootfs","Offline PWA","v86 VM manager (planned)"];
   else if(c==="extract-rootfs"){const r=await extractRootfs();out=["Extracting virtual rootfs...",`${r.dirs} directories, ${r.files} base files ensured.`,"(simulated - no real Linux kernel/binaries are involved)"]}
   else if(name==="ls"){const x=await listDir(a[1]||"/home/user");out=x.map(v=>(v.type==="dir"?"📁 ":"📄 ")+v.path.split("/").pop())}
   else if(name==="cat"){const x=await readFile(a[1]);out=[x??"cat: file not found"]}
   else if(name==="touch"){await writeFile(a[1],"");out=["created "+a[1]]}
   else if(name==="mkdir"){await mkdir(a[1]);out=["created directory "+a[1]]}
   else if(name==="rm"){await remove(a[1]);out=["removed "+a[1]]}
   else if(name==="run"&&a[1]){
    const code=await readFile(a[1]);
    if(code==null) out=["run: file not found: "+a[1]];
    else{
     const logs=[];
     const fakeConsole={log:(...xs)=>logs.push(xs.map(String).join(" "))};
     try{ new Function("console",code)(fakeConsole); out=logs.length?logs:["(script ran with no output)"]; }
     catch(e){ out=["Uncaught error: "+(e.message||e)]; }
    }
   }
   else if(name==="cc"&&a[1]){
    out=["cc: simulated compiler stub",`"compiling" ${a[1]} ... done (no real C toolchain is bundled)`,"For real JS execution use: run <file.js>"];
   }
   else if(c==="apt update") out=["Reading package lists... Done","Web-linux local repository ready."];
   else if(c==="apt list") out=(await search("")).map(p=>p.id+" "+p.version+" ["+p.category+"]");
   else if(name==="apt"&&a[1]==="search") out=(await search(a.slice(2).join(" "))).map(p=>p.id+" - "+p.description);
   else if(name==="apt"&&a[1]==="install"&&a[2]==="url"){out=["usage: apt install-url <name> <url>"]}
   else if(name==="apt"&&a[1]==="install-url"){
    const appName=a[2],url=a[3];
    if(!appName||!url) out=["usage: apt install-url <name> <url>"];
    else{ const r=await installUrl(appName,url); out=["Installed custom app: "+r.name+" -> "+r.url,"Find it in the launcher."]; }
   }
   else if(name==="apt"&&a[1]==="install"){await install(a[2]);out=["Installed "+a[2]]}
   else if(name==="apt"&&a[1]==="remove"){await removePkg(a[2]);out=["Removed "+a[2]]}
   else out=["Command not found: "+c];
  }catch(e){out=[String(e.message||e)]}
  setLines(x=>[...x,"user@web-linux:~$ "+c,...out]);setCmd("");
 }
 return <div className="terminal">{lines.map((x,i)=><div key={i}>{x}</div>)}<div className="prompt"><span>user@web-linux:~$</span><input autoFocus value={cmd} onChange={e=>setCmd(e.target.value)} onKeyDown={e=>e.key==="Enter"&&run()}/></div></div>
}
