export function PenTool(canvas, color) {
    const context = canvas.getContext("2d");
    let isDrawing = false;
  
    canvas.addEventListener("mousedown", (e) => {
      isDrawing = true;
      context.strokeStyle = color;
      context.lineWidth = 2; // Default width
      context.beginPath();
      context.moveTo(e.offsetX, e.offsetY);
    });
  
    canvas.addEventListener("mousemove", (e) => {
      if (!isDrawing) return;
      context.lineTo(e.offsetX, e.offsetY);
      context.stroke();
    });
  
    canvas.addEventListener("mouseup", () => {
      isDrawing = false;
      context.closePath();
    });
  }
  