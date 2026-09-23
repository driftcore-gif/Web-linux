import React,{useState} from "react";
export default function Calculator(){
 const [v,setV]=useState("");
 function press(x){setV(y=>y+x)}
 function calc(){try{setV(String(Function("return ("+v+")")()))}catch{setV("Error")}}
 return <div className="calc"><input value={v} readOnly/><div className="calcgrid">{["7","8","9","/","4","5","6","*","1","2","3","-","0",".","(",")","+","C","="].map(x=><button key={x} onClick={()=>x==="="?calc():x==="C"?setV(""):press(x)}>{x}</button>)}</div></div>
}