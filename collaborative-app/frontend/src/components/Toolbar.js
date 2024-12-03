import React from "react";
import styles from "../styles/Toolbar.module.css";

function Toolbar({ setTool, setColor }) {
  return (
    <div className={styles.toolbar}>
      <button onClick={() => setTool("pen")}>✏️ Pen</button>
      <button onClick={() => setTool("line")}>📏 Line</button>
      <button onClick={() => setTool("arrow")}>➤ Arrow</button>
      <button onClick={() => setTool("rectangle")}>▭ Rectangle</button>
      <input
        type="color"
        onChange={(e) => setColor(e.target.value)}
        className={styles.colorPicker}
      />
    </div>
  );
}

export default Toolbar;
