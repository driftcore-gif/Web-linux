import React,{useState} from "react";

const LINES=[
 "You call THAT a mouse click?",
 "Beep boop. That was a mediocre click, human.",
 "Have you tried turning yourself off and on again?",
 "Impressive. For a beginner.",
 "Error 404: Talent not found. Just kidding, click again.",
 "I've seen better clicking from a Roomba.",
 "Ten out of ten for effort, three out of ten for style.",
 "Legend says this app has said something nice. Today is not that day.",
 "You are, statistically, an above-average clicker. Barely.",
 "This message was generated entirely to waste your time. Mission accomplished."
];

export default function Idiot(){
 const [line,setLine]=useState(LINES[0]);
 const [count,setCount]=useState(0);
 function poke(){
  setCount(c=>c+1);
  setLine(LINES[Math.floor(Math.random()*LINES.length)]);
 }
 return <div className="idiot">
  <h2>🦜 You Are An Idiot</h2>
  <p className="muted">A completely pointless, purely-for-laughs joke program in the spirit of old shareware CDs. No offense intended - it insults everyone equally.</p>
  <div className="idiot-bubble">{line}</div>
  <button onClick={poke}>Poke it</button>
  <p className="muted">Pokes: {count}</p>
 </div>
}
