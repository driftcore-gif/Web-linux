import React from "react";
// Generic sandboxed window for apps installed from a URL via the open package repo.
export default function CustomAppFrame({url}){
 return <div className="browser custom-app-frame">
  <p className="muted">Installed from URL: {url}</p>
  <iframe title="Custom Web-linux App" src={url}/>
 </div>
}
