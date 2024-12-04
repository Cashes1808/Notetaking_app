export function drawPen(canvas, color, e) {
  const context = canvas.getContext("2d");
  let isDrawing = false;

  const startDrawing = (e) => {
    isDrawing = true;
    context.strokeStyle = color;
    context.lineWidth = 2;
    context.beginPath();
    context.moveTo(e.offsetX, e.offsetY);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    context.lineTo(e.offsetX, e.offsetY);
    context.stroke();
  };

  const stopDrawing = () => {
    isDrawing = false;
    context.closePath();
  };

  canvas.addEventListener("mousemove", draw);
  canvas.addEventListener("mouseup", stopDrawing);
  canvas.addEventListener("mousedown", startDrawing);

  return () => {
    canvas.removeEventListener("mousemove", draw);
    canvas.removeEventListener("mouseup", stopDrawing);
    canvas.removeEventListener("mousedown", startDrawing);
  };
}
