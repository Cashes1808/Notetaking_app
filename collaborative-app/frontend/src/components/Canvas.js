import React, { useRef, useEffect, useState } from "react";
import styles from "../styles/Canvas.module.css";
import Toolbar from "./Toolbar";
import{drawPen} from "./toolbar-components/PenTool";
import{drawLine} from "./toolbar-components/LineTool";
import{drawArrow} from "./toolbar-components/ArrowTool";
import{drawRectangle} from "./toolbar-components/RectangleTool";

function Canvas() {
  const canvasRef = useRef(null);
  const [tool, setTool] = useState("pen"); // Default tool
  const [color, setColor] = useState("#000000"); // Default color

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    // Event handlers for drawing
    const handleMouseDown = (e) => {
      switch (tool) {
        case "pen":
          drawPen(canvas, context, color, e);
          break;
        case "line":
          drawLine(canvas, context, color, e);
          break;
        case "arrow":
          drawArrow(canvas, context, color, e);
          break;
        case "rectangle":
          drawRectangle(canvas, context, color, e);
          break;
        default:
          console.error("Unknown tool:", tool);
      }
    };

    // Bind event listeners
    canvas.addEventListener("mousedown", handleMouseDown);

    // Cleanup event listeners on tool change
    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
    };
  }, [tool, color]);

  return (
    <div className={styles.canvasWrapper}>
      <Toolbar setTool={setTool} setColor={setColor} />
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        className={styles.canvas}
      ></canvas>
    </div>
  );
}

export default Canvas;
