import React, { useState } from "react";
import { Stage, Layer, Rect, Circle, Line, Text } from "react-konva";
import MarkdownEditor from "./MarkdownEditor";

function Canvas() {
  const [tool, setTool] = useState("select"); // Current selected tool
  const [shapes, setShapes] = useState([]); // List of all shapes
  const [selectedId, setSelectedId] = useState(null); // Currently selected shape

  const handleMouseDown = (e) => {
    if (tool === "select") return;

    const stage = e.target.getStage();
    const pointerPosition = stage.getPointerPosition();

    if (tool === "rectangle") {
      const newRect = {
        id: `rect-${shapes.length + 1}`,
        type: "rectangle",
        x: pointerPosition.x,
        y: pointerPosition.y,
        width: 100,
        height: 50,
        fill: "blue",
      };
      setShapes([...shapes, newRect]);
    } else if (tool === "circle") {
      const newCircle = {
        id: `circle-${shapes.length + 1}`,
        type: "circle",
        x: pointerPosition.x,
        y: pointerPosition.y,
        radius: 50,
        fill: "green",
      };
      setShapes([...shapes, newCircle]);
    } else if (tool === "markdown") {
      const newMarkdown = {
        id: `markdown-${shapes.length + 1}`,
        type: "markdown",
        x: pointerPosition.x,
        y: pointerPosition.y,
        content: "Start writing in Markdown!",
      };
      setShapes([...shapes, newMarkdown]);
    }
  };

  const handleShapeClick = (id) => {
    setSelectedId(id);
  };

  const renderShapes = () => {
    return shapes.map((shape) => {
      if (shape.type === "rectangle") {
        return (
          <Rect
            key={shape.id}
            x={shape.x}
            y={shape.y}
            width={shape.width}
            height={shape.height}
            fill={shape.fill}
            draggable
            onClick={() => handleShapeClick(shape.id)}
          />
        );
      } else if (shape.type === "circle") {
        return (
          <Circle
            key={shape.id}
            x={shape.x}
            y={shape.y}
            radius={shape.radius}
            fill={shape.fill}
            draggable
            onClick={() => handleShapeClick(shape.id)}
          />
        );
      } else if (shape.type === "markdown") {
        return (
          <MarkdownEditor
            key={shape.id}
            x={shape.x}
            y={shape.y}
            content={shape.content}
            draggable
            onClick={() => handleShapeClick(shape.id)}
          />
        );
      }
    });
  };

  return (
    <div>
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
      >
        <Layer>{renderShapes()}</Layer>
      </Stage>
    </div>
  );
}

export default Canvas;

