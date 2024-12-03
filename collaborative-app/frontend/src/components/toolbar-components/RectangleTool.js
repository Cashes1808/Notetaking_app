export function drawRectangle(canvas, context, color, e) {
  let startX = e.offsetX;
  let startY = e.offsetY;
  let isDrawing = true;

  const draw = (event) => {
    if (!isDrawing) return;
    const endX = event.offsetX;
    const endY = event.offsetY;
    const width = endX - startX;
    const height = endY - startY;

    // Clear the canvas and redraw
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.strokeStyle = color;
    context.beginPath();
    context.strokeRect(startX, startY, width, height);
  };

  const stopDrawing = () => {
    isDrawing = false;
    canvas.removeEventListener("mousemove", draw);
    canvas.removeEventListener("mouseup", stopDrawing);
  };

  canvas.addEventListener("mousemove", draw);
  canvas.addEventListener("mouseup", stopDrawing);
}
