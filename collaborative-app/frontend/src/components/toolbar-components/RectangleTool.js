export function RectangleTool(canvas, color) {
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
      const width = endX - startX;
      const height = endY - startY;
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.strokeStyle = color;
      context.strokeRect(startX, startY, width, height);
    });
  
    canvas.addEventListener("mouseup", () => {
      isDrawing = false;
    });
  }
  