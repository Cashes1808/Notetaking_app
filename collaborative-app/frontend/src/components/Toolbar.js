import React from "react";
import "./Toolbar.css"; // Add styles for the toolbar

function Toolbar({ onSelectTool }) {
  return (
    <div className="toolbar">
      <button onClick={() => onSelectTool("select")}>Select</button>
      <button onClick={() => onSelectTool("rectangle")}>Rectangle</button>
      <button onClick={() => onSelectTool("circle")}>Circle</button>
      <button onClick={() => onSelectTool("line")}>Line</button>
      <button onClick={() => onSelectTool("text")}>Text</button>
      <button onClick={() => onSelectTool("markdown")}>Markdown Editor</button>
    </div>
  );
}

export default Toolbar;

