import React from "react";

export default function VM() {
  return (
    <div className="vm">
      <h2>VM Manager</h2>
      <p className="muted">
        Browser-based x86 virtual machine support (powered by v86/WebAssembly) is
        planned but not yet implemented. This placeholder keeps the desktop
        buildable while VM integration is finished.
      </p>
      <div className="vm-actions">
        <button disabled>Boot</button>
        <button disabled>Stop</button>
        <span>Coming soon</span>
      </div>
    </div>
  );
}
