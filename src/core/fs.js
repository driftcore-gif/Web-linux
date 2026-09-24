import {all, put, del} from "./db";

// A virtual, browser-only filesystem loosely modeled on a minimal Linux rootfs layout.
// Nothing here is a real Linux kernel/rootfs - there are no real ELF binaries or a real
// busybox. Paths and a few representative files are seeded so the desktop/terminal feel
// like a real Linux tree, entirely inside IndexedDB.
const rootfsDirs = [
  "/","/bin","/sbin","/lib","/lib64","/boot","/dev","/proc","/root",
  "/etc","/etc/init.d","/etc/skel",
  "/usr","/usr/bin","/usr/sbin","/usr/lib","/usr/share","/usr/share/doc","/usr/local","/usr/local/bin",
  "/var","/var/log","/var/tmp","/var/www",
  "/opt","/tmp","/mnt","/media","/srv",
  "/home","/home/user","/home/user/Desktop","/home/user/Documents","/home/user/Downloads",
  "/home/user/Music","/home/user/Pictures","/home/user/Videos"
];

const rootfsFiles = {
  "/etc/os-release":
`NAME="Web-linux"
PRETTY_NAME="Web-linux (virtual rootfs)"
ID=web-linux
VERSION="0.1"
HOME_URL="https://github.com/driftcore-gif/Web-linux"
`,
  "/etc/hostname": "web-linux\n",
  "/etc/passwd": "root:x:0:0:root:/root:/bin/sh\nuser:x:1000:1000:user:/home/user:/bin/sh\n",
  "/etc/motd": "Welcome to Web-linux - a browser-based, Linux-inspired desktop.\nThis is a simulated filesystem, not a real kernel or shell.\n",
  "/usr/share/doc/README": "Web-linux virtual rootfs.\nAll paths here live in IndexedDB in your browser - nothing touches your real device filesystem.\n",
  "/bin/sh": "#!/bin/sh\n# placeholder - the Web-linux terminal is a simulated shell, not a real /bin/sh\n",
  "/var/log/webos.log": "[boot] Web-linux desktop started\n",
  "/home/user/README.txt": "Welcome to Web-linux!\nYour browser desktop has its own local filesystem, seeded from a minimal virtual Linux rootfs (/etc, /usr, /var, /bin ...).\n"
};

export async function seedFS(){
  const existing=await all("files");
  if(existing.length) return;
  await extractRootfs();
}

// Re-creates the base rootfs structure/files without touching anything else the user
// created. Safe to call repeatedly (e.g. via the "extract-rootfs" terminal command).
export async function extractRootfs(){
  for(const path of rootfsDirs) await put("files",{path,type:"dir",content:""});
  for(const [path,content] of Object.entries(rootfsFiles)){
    const existing=(await all("files")).find(v=>v.path===path);
    if(!existing) await put("files",{path,type:"file",content});
  }
  return {dirs:rootfsDirs.length,files:Object.keys(rootfsFiles).length};
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
