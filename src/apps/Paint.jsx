import React,{useEffect,useRef} from "react";
export default function Paint(){
 const ref=useRef(null),down=useRef(false);
 useEffect(()=>{const c=ref.current,ctx=c.getContext("2d");ctx.fillStyle="#fff";ctx.fillRect(0,0,c.width,c.height);ctx.lineWidth=4;ctx.lineCap="round";},[]);
 function pos(e){const r=ref.current.getBoundingClientRect();return [e.clientX-r.left,e.clientY-r.top]}
 return <div className="paint"><button onClick={()=>{const c=ref.current,ctx=c.getContext("2d");ctx.fillStyle="#fff";ctx.fillRect(0,0,c.width,c.height)}}>Clear</button><canvas ref={ref} width="800" height="450" onPointerDown={e=>{down.current=true;const [x,y]=pos(e);const c=ref.current.getContext("2d");c.beginPath();c.moveTo(x,y)}} onPointerUp={()=>down.current=false} onPointerMove={e=>{if(!down.current)return;const [x,y]=pos(e);const c=ref.current.getContext("2d");c.lineTo(x,y);c.stroke()}}/></div>
}