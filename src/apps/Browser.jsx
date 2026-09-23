import React,{useState} from "react";
export default function Browser(){
 const [url,setUrl]=useState("https://example.com"),[src,setSrc]=useState("https://example.com");
 return <div className="browser"><div className="browserbar"><input value={url} onChange={e=>setUrl(e.target.value)} onKeyDown={e=>e.key==="Enter"&&setSrc(url)}/><button onClick={()=>setSrc(url)}>Go</button></div><p className="muted">Some websites block iframes. Offline browsing only works for cached resources.</p><iframe title="WebOS Browser" src={src}/></div>
}