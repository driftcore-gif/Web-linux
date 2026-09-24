import {all,put,del} from "./db";

// Custom apps are arbitrary web apps installed by URL, not from the fixed REPO list.
// They render inside a sandboxed iframe window, just like the Browser app.
export async function listCustomApps(){
  return all("customapps");
}

export async function installFromUrl(name,url,icon="🌐"){
  if(!name || !url) throw Error("name and url are required");
  try{ new URL(url); }catch{ throw Error("Invalid URL"); }
  const id="custom-"+name.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"");
  const record={id,name,url,icon,installedAt:Date.now()};
  await put("customapps",record);
  return record;
}

export async function removeCustomApp(id){
  await del("customapps",id);
}
