import type { MouseEventHandler } from "react";
import { useState } from "react";

const useCanvasErasing = (canvasContext: CanvasRenderingContext2D | null) => {
  const [isErasing, setIsErasing] = useState<boolean>(false);

  const handleErasing: MouseEventHandler<HTMLCanvasElement> = ({
    nativeEvent,
  }) => {
    const { offsetX, offsetY } = nativeEvent;

    if (!canvasContext) return;

    if (!isErasing) {
      canvasContext.beginPath();
      canvasContext.moveTo(offsetX, offsetY);
      return;
    }

    canvasContext.clearRect(offsetX - 25, offsetY - 25, 50, 50);
  };

  const handleErasingStart = () => {
    setIsErasing(true);
  };

  const handleErasingFinsih = () => {
    setIsErasing(false);
  };

  return { handleErasing, handleErasingStart, handleErasingFinsih };
};

export default useCanvasErasing;
