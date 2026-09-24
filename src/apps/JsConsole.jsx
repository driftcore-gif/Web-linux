import React,{useState} from "react";

export default function JsConsole(){
 const [history,setHistory]=useState(["Web-linux JS Console - real in-browser JavaScript interpreter.","Type an expression and press Enter."]);
 const [code,setCode]=useState("");

 function runCode(){
  const c=code.trim(); if(!c){return}
  let out;
  try{
   // eslint-disable-next-line no-new-func
   const result=new Function(`"use strict"; return (${c});`)();
   out=typeof result==="undefined"?"undefined":JSON.stringify(result);
  }catch(e){
   try{
    // fall back to statement execution (no implicit return)
    // eslint-disable-next-line no-new-func
    new Function(c)();
    out="(executed)";
   }catch(e2){ out="Error: "+(e2.message||e2); }
  }
  setHistory(h=>[...h,"js> "+c,String(out)]);
  setCode("");
 }

 return <div className="jsconsole">
  <h2>🧑‍💻 JS Console</h2>
  <div className="terminal jsc-output">{history.map((x,i)=><div key={i}>{x}</div>)}</div>
  <div className="prompt"><span>js&gt;</span><input autoFocus value={code} onChange={e=>setCode(e.target.value)} onKeyDown={e=>e.key==="Enter"&&runCode()}/></div>
 </div>
}
