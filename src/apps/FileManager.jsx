import React,{useEffect,useState} from "react";
import {listDir,readFile,writeFile,mkdir,remove} from "../core/fs";

export default function FileManager(){
 const [dir,setDir]=useState("/home/user"),[rows,setRows]=useState([]),[selected,setSelected]=useState(null),[text,setText]=useState("");
 async function refresh(){setRows(await listDir(dir));}
 useEffect(()=>{refresh()},[dir]);
 async function open(x){if(x.type==="dir")setDir(x.path);else{setSelected(x);setText(await readFile(x.path)||"")}}
 async function save(){if(selected){await writeFile(selected.path,text);await refresh()}}
 async function newFile(){const p=dir+"/NewFile.txt";await writeFile(p,"");await refresh()}
 async function newDir(){await mkdir(dir+"/NewFolder");await refresh()}
 async function del(){if(selected){await remove(selected.path);setSelected(null);await refresh()}}
 return <div className="fm">
  <div className="toolbar"><button onClick={()=>setDir(dir.substring(0,dir.lastIndexOf("/"))||"/")}>⬆</button><span>{dir}</span><button onClick={newFile}>New file</button><button onClick={newDir}>New folder</button></div>
  <div className="fm-main"><div className="file-list">{rows.map(x=><button className="file-row" key={x.path} onDoubleClick={()=>open(x)} onClick={()=>setSelected(x)}>{x.type==="dir"?"📁":"📄"} {x.path.split("/").pop()}</button>)}</div>
  {selected&&selected.type==="file"&&<div className="editor"><textarea value={text} onChange={e=>setText(e.target.value)}/><div><button onClick={save}>Save</button><button onClick={del}>Delete</button></div></div>}</div>
 </div>
}