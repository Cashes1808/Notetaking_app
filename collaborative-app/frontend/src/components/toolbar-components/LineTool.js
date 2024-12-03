export function LineTool(canvas, color) {
    const context = canvas.getContext("2d");
    let startX, startY;
    let isDrawing = false;
  
    canvas.addEventListener("mousedown", (e) => {
      isDrawing = true;
      startX = e.offsetX;
      startY = e.offsetY;
    });
  
    canvas.addEventListener("mousemove", (e) => {
      if (!isDrawing) return;
      const endX = e.offsetX;
      const endY = e.offsetY;
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.beginPath();
      context.moveTo(startX, startY);
      context.lineTo(endX, endY);
      context.strokeStyle = color;
      context.stroke();
    });
  
    canvas.addEventListener("mouseup", () => {
      isDrawing = false;
    });
  }
  