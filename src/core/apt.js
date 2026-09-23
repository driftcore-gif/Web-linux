import {all,put,del} from "./db";
import {REPO} from "./packages";

export async function installed(){return all("packages");}
export async function install(id){
 const p=REPO.find(x=>x.id===id); if(!p) throw Error("Package not found");
 await put("packages",{...p,installedAt:Date.now()});
 return p;
}
export async function remove(id){await del("packages",id);}
export async function search(q=""){return REPO.filter(p=>(p.name+" "+p.id+" "+p.description).toLowerCase().includes(q.toLowerCase()));}
export function terminalHelp(){return [
 "help","clear","pwd","ls [path]","cat <file>","touch <file>","mkdir <dir>","rm <path>",
 "apt update","apt list","apt search <term>","apt install <package>","apt remove <package>",
 "online","date","neofetch"
];}