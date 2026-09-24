const DB_NAME="webos-plasma";
const VERSION=2;
let dbPromise;

function openDB(){
  if(dbPromise) return dbPromise;
  dbPromise=new Promise((resolve,reject)=>{
    const r=indexedDB.open(DB_NAME,VERSION);
    r.onupgradeneeded=()=>{
      const db=r.result;
      if(!db.objectStoreNames.contains("files")) db.createObjectStore("files",{keyPath:"path"});
      if(!db.objectStoreNames.contains("packages")) db.createObjectStore("packages",{keyPath:"id"});
      if(!db.objectStoreNames.contains("settings")) db.createObjectStore("settings",{keyPath:"key"});
      if(!db.objectStoreNames.contains("vm")) db.createObjectStore("vm",{keyPath:"id"});
      if(!db.objectStoreNames.contains("customapps")) db.createObjectStore("customapps",{keyPath:"id"});
    };
    r.onsuccess=()=>resolve(r.result);
    r.onerror=()=>reject(r.error);
  });
  return dbPromise;
}
export async function put(store,value){const db=await openDB();return new Promise((res,rej)=>{const t=db.transaction(store,"readwrite");t.objectStore(store).put(value);t.oncomplete=res;t.onerror=()=>rej(t.error);});}
export async function get(store,key){const db=await openDB();return new Promise((res,rej)=>{const t=db.transaction(store);const r=t.objectStore(store).get(key);r.onsuccess=()=>res(r.result);r.onerror=()=>rej(r.error);});}
export async function all(store){const db=await openDB();return new Promise((res,rej)=>{const t=db.transaction(store);const r=t.objectStore(store).getAll();r.onsuccess=()=>res(r.result);r.onerror=()=>rej(r.error);});}
export async function del(store,key){const db=await openDB();return new Promise((res,rej)=>{const t=db.transaction(store,"readwrite");t.objectStore(store).delete(key);t.oncomplete=res;t.onerror=()=>rej(t.error);});}
