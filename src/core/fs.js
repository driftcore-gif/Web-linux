import {all, put, del} from "./db";

const dirs = new Set(["/","/home","/home/user","/home/user/Desktop","/home/user/Documents","/home/user/Downloads","/home/user/Music","/home/user/Pictures","/home/user/Videos","/etc","/usr","/usr/bin","/var","/tmp"]);

export async function seedFS(){
  const existing=await all("files");
  if(existing.length) return;
  for(const path of dirs) await put("files",{path,type:"dir",content:""});
  await put("files",{path:"/home/user/README.txt",type:"file",content:"Welcome to WebOS Plasma!\\nYour browser desktop has its own local filesystem."});
}
export async function listDir(dir="/home/user"){
  const rows=await all("files");
  const prefix=dir.endsWith("/")?dir:dir+"/";
  return rows.filter(x=>x.path.startsWith(prefix) && !x.path.slice(prefix.length).includes("/"));
}
export async function readFile(path){
  const x=(await all("files")).find(v=>v.path===path);
  return x?.content ?? null;
}
export async function writeFile(path,content){
  await put("files",{path,type:"file",content});
}
export async function mkdir(path){
  await put("files",{path,type:"dir",content:""});
}
export async function remove(path){
  const rows=await all("files");
  for(const x of rows) if(x.path===path || x.path.startsWith(path+"/")) await del("files",x.path);
}