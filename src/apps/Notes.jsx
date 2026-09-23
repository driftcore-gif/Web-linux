import React,{useEffect,useState} from "react";
export default function Notes(){
 const [v,setV]=useState(localStorage.getItem("webos-note")||"WebOS Plasma notes");
 useEffect(()=>localStorage.setItem("webos-note",v),[v]);
 return <textarea className="notes" value={v} onChange={e=>setV(e.target.value)}/>
}