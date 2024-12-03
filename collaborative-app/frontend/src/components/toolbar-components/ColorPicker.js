export function ColorPicker(setColor) {
    return (
      <input
        type="color"
        onChange={(e) => setColor(e.target.value)}
        style={{ cursor: "pointer", marginTop: "10px" }}
      />
    );
  }
  