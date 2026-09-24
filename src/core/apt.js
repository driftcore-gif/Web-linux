import {all,put,del} from "./db";
import {REPO} from "./packages";
import {installFromUrl,listCustomApps,removeCustomApp} from "./customapps";

export async function installed(){return all("packages");}
export async function install(id){
 const p=REPO.find(x=>x.id===id); if(!p) throw Error("Package not found");
 await put("packages",{...p,installedAt:Date.now()});
 return p;
}
export async function remove(id){await del("packages",id);}
export async function search(q=""){return REPO.filter(p=>(p.name+" "+p.id+" "+p.description).toLowerCase().includes(q.toLowerCase()));}

// Open repo: install any web app by URL, not just the fixed built-in list.
export async function installUrl(name,url){return installFromUrl(name,url);}
export async function removeUrl(id){return removeCustomApp(id);}
export async function customApps(){return listCustomApps();}

export function terminalHelp(){return [
 "help","clear","pwd","ls [path]","cat <file>","touch <file>","mkdir <dir>","rm <path>",
 "apt update","apt list","apt search <term>","apt install <package>","apt remove <package>",
 "apt install-url <name> <url>   (install any web app from a URL, not just the fixed repo)",
 "run <file.js>   (executes a .js file from the virtual filesystem, real JS interpreter)",
 "cc <file.c>     (simulated compiler stub - real native compilation is not implemented in-browser)",
 "extract-rootfs  (re-seed the virtual Linux-style rootfs)",
 "online","date","neofetch"
];}
