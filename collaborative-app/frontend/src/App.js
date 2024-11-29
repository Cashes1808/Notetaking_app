import React, { useState } from "react";
import Toolbar from "./components/Toolbar";
import Canvas from "./components/Canvas";

function App() {
  const [tool, setTool] = useState("select");

  return (
    <div>
      <Toolbar onSelectTool={(selectedTool) => setTool(selectedTool)} />
      <Canvas tool={tool} />
    </div>
  );
}

export default App;
