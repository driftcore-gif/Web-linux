import React,{useEffect,useState} from "react";
import {REPO} from "../core/packages";
import {installed,install,remove} from "../core/apt";

export default function SoftwareCenter(){
 const [ins,setIns]=useState([]);
 async function load(){setIns(await installed())}
 useEffect(()=>{load()},[]);
 async function toggle(p){ins.some(x=>x.id===p.id)?await remove(p.id):await install(p.id);load()}
 return <div><h2>Software Center</h2><p className="muted">Local APT-like repository. Packages are web apps stored in IndexedDB.</p>
 <div className="packages">{REPO.map(p=><div className="pkg" key={p.id}><span className="pkgicon">{p.icon}</span><div><b>{p.name}</b><small>{p.id} · {p.description}</small></div><button onClick={()=>toggle(p)}>{ins.some(x=>x.id===p.id)?"Remove":"Install"}</button></div>)}</div></div>
}