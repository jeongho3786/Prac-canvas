import type { EditMode } from "src/types/mouse-drawing-page";
import { useState } from "react";

import useCanvasDrawing from "src/hooks/use-canvas-drawing";
import useCanvasErasing from "src/hooks/use-canvas-erasing";
import useCanvas from "src/hooks/use-canvas";

import FunctionButtons from "src/components/mouse-drawing-page/function-buttons";

const MouseDrawingPage = () => {
  const { canvasRef, fallbackMessage, canvasContext } = useCanvas();
  const { handleDrawing, handleDrawingStart, handleDrawingFinsih } =
    useCanvasDrawing(canvasContext);
  const { handleErasing, handleErasingStart, handleErasingFinsih } =
    useCanvasErasing(canvasContext);

  const [editMode, setEditMode] = useState<EditMode>("draw");

  const handleEditMode = (mode: EditMode) => {
    setEditMode(mode);
  };

  return (
    <>
      <canvas
        ref={canvasRef}
        onMouseDown={
          editMode === "draw" ? handleDrawingStart : handleErasingStart
        }
        onMouseUp={
          editMode === "draw" ? handleDrawingFinsih : handleErasingFinsih
        }
        onMouseLeave={
          editMode === "draw" ? handleDrawingFinsih : handleErasingFinsih
        }
        onMouseMove={editMode === "draw" ? handleDrawing : handleErasing}
      >
        {fallbackMessage}
      </canvas>

      <FunctionButtons editMode={editMode} onClick={handleEditMode} />
    </>
  );
};

export default MouseDrawingPage;
