const newShape = {
    id: `shape-${shapes.length + 1}`,
    type: "rectangle",
    x: pointerPosition.x,
    y: pointerPosition.y,
    connections: [], // Track connected shapes
};

  
if (tool === "link") {
    // Handle linking logic
    const newLine = {
      id: `line-${shapes.length + 1}`,
      type: "line",
      points: [startX, startY, endX, endY],
      stroke: "black",
      strokeWidth: 2,
    };
    setShapes([...shapes, newLine]);
}
  