import React,{useEffect,useState} from "react";
import {REPO} from "../core/packages";
import {installed,install,remove,installUrl,removeUrl,customApps} from "../core/apt";

export default function SoftwareCenter(){
 const [ins,setIns]=useState([]);
 const [custom,setCustom]=useState([]);
 const [name,setName]=useState("");
 const [url,setUrl]=useState("");
 const [msg,setMsg]=useState("");

 async function load(){setIns(await installed());setCustom(await customApps());}
 useEffect(()=>{load()},[]);

 async function toggle(p){ins.some(x=>x.id===p.id)?await remove(p.id):await install(p.id);load()}

 async function addCustom(e){
  e.preventDefault();
  setMsg("");
  try{
   await installUrl(name,url);
   setName("");setUrl("");
   load();
  }catch(err){ setMsg(String(err.message||err)); }
 }
 async function removeCustomApp(id){ await removeUrl(id); load(); }

 const categories=[...new Set(REPO.map(p=>p.category||"Other"))];

 return <div>
  <h2>Software Center</h2>
  <p className="muted">Local package repository - built-in packages are bundled Web-linux apps. You can also install any web app from a URL below (open repo, not a fixed list).</p>

  {categories.map(cat=>
   <div key={cat} className="pkg-category">
    <h3>{cat}</h3>
    <div className="packages">
     {REPO.filter(p=>(p.category||"Other")===cat).map(p=>
      <div className="pkg" key={p.id}>
       <span className="pkgicon">{p.icon}</span>
       <div><b>{p.name}</b><small>{p.id} · {p.description}</small></div>
       <button onClick={()=>toggle(p)}>{ins.some(x=>x.id===p.id)?"Remove":"Install"}</button>
      </div>
     )}
    </div>
   </div>
  )}

  <div className="pkg-category">
   <h3>Install from URL (custom JS apps)</h3>
   <form className="custom-install" onSubmit={addCustom}>
    <input placeholder="App name" value={name} onChange={e=>setName(e.target.value)} required/>
    <input placeholder="https://..." value={url} onChange={e=>setUrl(e.target.value)} required/>
    <button type="submit">Install</button>
   </form>
   {msg&&<p className="muted">{msg}</p>}
   {custom.length>0&&<div className="packages">
    {custom.map(c=>
     <div className="pkg" key={c.id}>
      <span className="pkgicon">{c.icon||"🌐"}</span>
      <div><b>{c.name}</b><small>{c.url}</small></div>
      <button onClick={()=>removeCustomApp(c.id)}>Remove</button>
     </div>
    )}
   </div>}
  </div>
 </div>
}
