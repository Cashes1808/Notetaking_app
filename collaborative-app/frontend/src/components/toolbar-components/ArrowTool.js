export function drawArrow(canvas, context, color, e) {
  let startX = e.offsetX;
  let startY = e.offsetY;

  const draw = (event) => {
    const endX = event.offsetX;
    const endY = event.offsetY;
    const headLength = 10; // Arrowhead length
    const angle = Math.atan2(endY - startY, endX - startX);

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.beginPath();
    context.moveTo(startX, startY);
    context.lineTo(endX, endY);
    context.lineTo(
      endX - headLength * Math.cos(angle - Math.PI / 6),
      endY - headLength * Math.sin(angle - Math.PI / 6)
    );
    context.moveTo(endX, endY);
    context.lineTo(
      endX - headLength * Math.cos(angle + Math.PI / 6),
      endY - headLength * Math.sin(angle + Math.PI / 6)
    );
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
