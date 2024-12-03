export function drawLine(canvas, context, color, e) {
  let startX = e.offsetX;
  let startY = e.offsetY;

  const draw = (event) => {
    const endX = event.offsetX;
    const endY = event.offsetY;
    context.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
    context.beginPath();
    context.moveTo(startX, startY);
    context.lineTo(endX, endY);
    context.strokeStyle = color;
    context.stroke();
  };

  const stopDrawing = () => {
    canvas.removeEventListener("mousemove", draw);
    canvas.removeEventListener("mouseup", stopDrawing);
  };

  canvas.addEventListener("mousemove", draw);
  canvas.addEventListener("mouseup", stopDrawing);
}
