import React from "react";
export default function Window({title,icon,children,onClose}){
 return <section className="window"><header className="titlebar"><span>{icon} {title}</span><button onClick={onClose}>×</button></header><div className="window-body">{children}</div></section>
}