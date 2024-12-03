import React, { useState } from "react";
import styles from "../styles/Toolbar.module.css";

function Toolbar({ setTool, setColor }) {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showShapes, setShowShapes] = useState(false);

  return (
    <div className={styles.toolbar}>
      <button onClick={() => setTool("pen")}>
        Pen
      </button>
      <div>
        <button onClick={() => setTool("line")}>
          Line
        </button>
        <button onClick={() => setTool("arrow")}>
          Arrow
        </button>
      </div>
      <div>
        <button onClick={() => setShowShapes(!showShapes)}>
          Rectangle
        </button>
        {showShapes && (
          <div className={styles.extendedToolbar}>
            <button onClick={() => setTool("ellipse")}>Ellipse</button>
            <button onClick={() => setTool("polygon")}>Polygon</button>
          </div>
        )}
      </div>
      <button onClick={() => setShowColorPicker(!showColorPicker)}>
        Color
      </button>
      {showColorPicker && (
        <input
          type="color"
          onChange={(e) => setColor(e.target.value)}
          className={styles.colorPicker}
        />
      )}
    </div>
  );
}

export default Toolbar;
