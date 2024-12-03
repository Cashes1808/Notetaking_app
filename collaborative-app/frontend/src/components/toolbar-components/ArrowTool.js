export function ArrowTool(canvas, color) {
    const context = canvas.getContext("2d");
    let startX, startY;
    let isDrawing = false;
  
    const drawArrow = (x1, y1, x2, y2) => {
      const headLength = 10;
      const angle = Math.atan2(y2 - y1, x2 - x1);
      context.moveTo(x1, y1);
      context.lineTo(x2, y2);
      context.lineTo(
        x2 - headLength * Math.cos(angle - Math.PI / 6),
        y2 - headLength * Math.sin(angle - Math.PI / 6)
      );
      context.moveTo(x2, y2);
      context.lineTo(
        x2 - headLength * Math.cos(angle + Math.PI / 6),
        y2 - headLength * Math.sin(angle + Math.PI / 6)
      );
    };
  
    canvas.addEventListener("mousedown", (e) => {
      isDrawing = true;
      startX = e.offsetX;
      startY = e.offsetY;
    });
  
    canvas.addEventListener("mouseup", (e) => {
      if (!isDrawing) return;
      isDrawing = false;
      const endX = e.offsetX;
      const endY = e.offsetY;
      context.beginPath();
      drawArrow(startX, startY, endX, endY);
      context.strokeStyle = color;
      context.stroke();
    });
  }
  