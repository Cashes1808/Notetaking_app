import React, { useState } from "react";
import { Stage, Layer, Rect, Text } from "react-konva";
//import ReactMarkdown from "react-markdown";

function MarkdownEditor({ x, y, content }) {
  const [isEditing, setIsEditing] = useState(false);
  const [markdownContent, setMarkdownContent] = useState(content);

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Rect
          x={x}
          y={y}
          width={200}
          height={100}
          fill="#f8f8f8"
          stroke="#ccc"
          strokeWidth={1}
          cornerRadius={8}
          onClick={() => setIsEditing(true)}
        />
        {isEditing ? (
          <textarea
            value={markdownContent}
            onChange={(e) => setMarkdownContent(e.target.value)}
            onBlur={() => setIsEditing(false)}
            style={{
              position: "absolute",
              left: `${x}px`,
              top: `${y}px`,
              width: "200px",
              height: "100px",
              resize: "none",
              borderRadius: "8px",
              padding: "10px",
              border: "1px solid #ccc",
            }}
          />
        ) : (
          <Text
            x={x}
            y={y}
            text={markdownContent}
            onClick={() => setIsEditing(true)}
            width={200}
            height={100}
            padding={10}
            fontStyle="normal"
            align="left"
            verticalAlign="top"
          />
        )}
      </Layer>
    </Stage>
  );
}

export default MarkdownEditor;
