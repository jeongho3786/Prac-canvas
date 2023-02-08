import type { MouseEventHandler } from "react";
import { useState } from "react";

const useCanvasDrawing = (canvasContext: CanvasRenderingContext2D | null) => {
  const [isDrawing, setIsDrawing] = useState<boolean>(false);

  const handleDrawing: MouseEventHandler<HTMLCanvasElement> = ({
    nativeEvent,
  }) => {
    const { offsetX, offsetY } = nativeEvent;

    if (!canvasContext) return;

    if (!isDrawing) {
      canvasContext.beginPath();
      canvasContext.moveTo(offsetX, offsetY);
      return;
    }

    canvasContext.lineTo(offsetX, offsetY);
    canvasContext.stroke();
  };

  const handleDrawingStart = () => {
    setIsDrawing(true);
  };

  const handleDrawingFinsih = () => {
    setIsDrawing(false);
  };

  return { handleDrawing, handleDrawingStart, handleDrawingFinsih };
};

export default useCanvasDrawing;
