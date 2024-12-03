import React from "react";
import styles from "../../styles/toolbar-styles/ShapeTool.module.css";

export function ShapeTool({ setTool, showShapes, setShowShapes }) {
  return (
    <div className={styles.shapeTool}>
      <button onClick={() => setShowShapes(!showShapes)} className={styles.mainButton}>
        ◼️ Shapes
      </button>
      {showShapes && (
        <div className={styles.extendedToolbar}>
          <button onClick={() => setTool("ellipse")} className={styles.toolButton}>
            Ellipse
          </button>
          <button onClick={() => setTool("polygon")} className={styles.toolButton}>
            Polygon
          </button>
        </div>
      )}
    </div>
  );
}


