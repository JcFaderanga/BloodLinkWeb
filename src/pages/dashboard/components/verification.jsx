import { useState } from "react";

export default function ResizableDiv() {
  const [width, setWidth] = useState(200);
  const [height, setHeight] = useState(150);
  const [mouseDown, setMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);

  const handleMouseDown = (e) => {
    setMouseDown(true);
    setStartX(e.clientX);
    setStartY(e.clientY);
  };

  const handleMouseMove = (e) => {
    if (!mouseDown) return;

    const dx = e.clientX - startX;
    const dy = e.clientY - startY;

    setWidth((prevWidth) => Math.max(50, prevWidth + dx)); // Prevent too small width
    setHeight((prevHeight) => Math.max(50, prevHeight + dy)); // Prevent too small height

    setStartX(e.clientX);
    setStartY(e.clientY);
  };

  const handleMouseUp = () => {
    setMouseDown(false);
  };

  return (
    <div
      className="relative"
      style={{
        width: width + "px",
        height: height + "px",
        backgroundColor: "lightblue",
        cursor: "se-resize", // This cursor indicates resizing from the bottom-right corner
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      Resize me!
    </div>
  );
}
