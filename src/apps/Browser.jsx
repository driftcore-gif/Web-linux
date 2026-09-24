import React,{useState} from "react";

function normalize(u){
 if(!u) return "https://example.com";
 if(/^https?:\/\//i.test(u)) return u;
 if(u.includes(".") && !u.includes(" ")) return "https://"+u;
 return "https://www.google.com/search?q="+encodeURIComponent(u);
}

let nextId=1;
function newTab(url="https://example.com"){
 return {id:nextId++, url, input:url, key:0};
}

export default function Browser(){
 const [tabs,setTabs]=useState([newTab()]);
 const [activeId,setActiveId]=useState(tabs[0].id);
 const active=tabs.find(t=>t.id===activeId)||tabs[0];

 function updateTab(id,patch){
  setTabs(ts=>ts.map(t=>t.id===id?{...t,...patch}:t));
 }
 function addTab(){
  const t=newTab();
  setTabs(ts=>[...ts,t]);
  setActiveId(t.id);
 }
 function closeTab(id){
  setTabs(ts=>{
   const rest=ts.filter(t=>t.id!==id);
   if(!rest.length){const t=newTab();setActiveId(t.id);return [t];}
   if(id===activeId) setActiveId(rest[rest.length-1].id);
   return rest;
  });
 }
 function go(){
  updateTab(active.id,{url:normalize(active.input),input:normalize(active.input)});
 }
 function reload(){
  updateTab(active.id,{key:(active.key||0)+1});
 }

 return <div className="browser chrome-browser">
  <div className="chrome-tabbar">
   {tabs.map(t=>
    <div key={t.id} className={"chrome-tab"+(t.id===activeId?" active":"")} onClick={()=>setActiveId(t.id)}>
     <span className="chrome-tab-title">{t.url.replace(/^https?:\/\//,"").split("/")[0]||"New Tab"}</span>
     <button className="chrome-tab-close" onClick={(e)=>{e.stopPropagation();closeTab(t.id);}}>×</button>
    </div>
   )}
   <button className="chrome-tab-add" onClick={addTab}>+</button>
  </div>
  <div className="chrome-toolbar">
   <button title="Back (not supported across origins)" disabled>←</button>
   <button title="Forward (not supported across origins)" disabled>→</button>
   <button title="Reload" onClick={reload}>⟳</button>
   <div className="chrome-address">
    <span className="chrome-lock">🔒</span>
    <input value={active.input} onChange={e=>updateTab(active.id,{input:e.target.value})} onKeyDown={e=>e.key==="Enter"&&go()} placeholder="Search Google or type a URL"/>
   </div>
   <button className="chrome-go" onClick={go}>Go</button>
  </div>
  <p className="muted">Some sites block being embedded in an iframe (X-Frame-Options). Offline browsing only works for already-cached resources.</p>
  <iframe key={active.id+"-"+(active.key||0)} title="Web-linux Browser" src={active.url}/>
 </div>
}
