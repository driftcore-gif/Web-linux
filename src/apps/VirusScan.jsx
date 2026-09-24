import React,{useState} from "react";

const FAKE_FILES=[
 "/home/user/Documents/resume.txt","/home/user/Downloads/setup.exe.txt","/usr/bin/webos-shell",
 "/etc/passwd","/home/user/Pictures/vacation.png","/var/log/webos.log","/home/user/Desktop/notes.txt",
 "/usr/share/doc/README","/home/user/Music/track1.mp3","/tmp/cache.dat"
];

export default function VirusScan(){
 const [scanning,setScanning]=useState(false);
 const [progress,setProgress]=useState(0);
 const [current,setCurrent]=useState("");
 const [done,setDone]=useState(false);

 function scan(){
  setScanning(true);setDone(false);setProgress(0);
  let i=0;
  const id=setInterval(()=>{
   i++;
   setCurrent(FAKE_FILES[i%FAKE_FILES.length]);
   setProgress(Math.min(100,Math.round((i/FAKE_FILES.length/2)*100)));
   if(i>=FAKE_FILES.length*2){
    clearInterval(id);setScanning(false);setDone(true);setProgress(100);
   }
  },160);
 }

 return <div className="virusscan">
  <h2>🛡️ SafeGuard Antivirus 3.1</h2>
  <p className="muted">A harmless, fully fake virus scanner - pure late-90s nostalgia. It never reads your real device files.</p>
  {!scanning&&!done&&<button onClick={scan}>Start Full System Scan</button>}
  {scanning&&<>
   <div className="scanbar"><div className="scanfill" style={{width:progress+"%"}}/></div>
   <p>Scanning: {current}</p>
  </>}
  {done&&<div className="scanresult">
   <p>✅ Scan complete. 0 threats found.</p>
   <p className="muted">(Because there's nothing to scan - this is a simulated browser app.)</p>
   <button onClick={scan}>Scan Again</button>
  </div>}
 </div>
}
