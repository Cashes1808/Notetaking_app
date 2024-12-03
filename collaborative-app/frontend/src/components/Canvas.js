import React, { useRef, useEffect, useState } from "react";
import styles from "../styles/Canvas.module.css";
import Toolbar from "./Toolbar";

function Canvas() {
  const canvasRef = useRef(null);
  const [tool, setTool] = useState("pen"); // Default tool
  const [color, setColor] = useState("#FFFFFF"); // Default color

  const handleWheel = (e) => {
    e.preventDefault();
    const scale = e.deltaY > 0 ? 0.9 : 1.1;
    canvasRef.current.style.transform = `scale(${scale})`;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    let drawing = false;

    const startDrawing = (e) => {
      drawing = true;
      const rect = canvas.getBoundingClientRect();
      context.beginPath();
      context.moveTo(
        e.clientX - rect.left - canvas.offsetLeft,
        e.clientY - rect.top - canvas.offsetTop
      );
      context.strokeStyle = color;
    };

    const draw = (e) => {
      if (!drawing) return;
      const rect = canvas.getBoundingClientRect();
      context.lineTo(
        e.clientX - rect.left - canvas.offsetLeft,
        e.clientY - rect.top - canvas.offsetTop
      );
      context.stroke();
    };

    const stopDrawing = () => {
      drawing = false;
      context.closePath();
    };

    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", stopDrawing);

    return () => {
      canvas.removeEventListener("mousedown", startDrawing);
      canvas.removeEventListener("mousemove", draw);
      canvas.removeEventListener("mouseup", stopDrawing);
    };
  }, [color]);

  return (
    <div
      className={styles.canvasContainer}
      onWheel={handleWheel}
    >
      <Toolbar setTool={setTool} setColor={setColor} />
      <canvas ref={canvasRef} width={5000} height={5000} className={styles.canvas}></canvas>
    </div>
  );
}

export default Canvas;
