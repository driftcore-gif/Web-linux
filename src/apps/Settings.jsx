import React from "react";
export default function Settings({theme,setTheme}){
 return <div className="settings"><h2>System Settings</h2><h3>Appearance</h3><div className="theme-row">{["plasma","midnight","aurora","light"].map(x=><button className={theme===x?"active":""} onClick={()=>setTheme(x)} key={x}>{x}</button>)}</div><h3>Storage</h3><p>IndexedDB virtual filesystem · service-worker cache</p><h3>Network</h3><p>{navigator.onLine?"Online":"Offline"} · WebOS itself does not require a server.</p></div>
}