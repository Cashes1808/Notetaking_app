import React, { useState } from "react";
import { Html } from "react-konva";
import ReactMarkdown from "react-markdown";

function MarkdownEditor({ x, y, content }) {
  const [isEditing, setIsEditing] = useState(false);
  const [markdownContent, setMarkdownContent] = useState(content);

  return (
    <Html x={x} y={y}>
      {isEditing ? (
        <textarea
          value={markdownContent}
          onChange={(e) => setMarkdownContent(e.target.value)}
          onBlur={() => setIsEditing(false)}
          style={{
            width: "200px",
            height: "100px",
            resize: "none",
            borderRadius: "8px",
            padding: "10px",
            border: "1px solid #ccc",
          }}
        />
      ) : (
        <div
          onClick={() => setIsEditing(true)}
          style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "10px",
            cursor: "pointer",
            width: "200px",
            minHeight: "100px",
            background: "#f8f8f8",
          }}
        >
          <ReactMarkdown>{markdownContent}</ReactMarkdown>
        </div>
      )}
    </Html>
  );
}

export default MarkdownEditor;
