import type { CanvasSize } from "src/types/canvas-common";
import { useEffect, useRef, useState } from "react";

const useCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [canvasContext, setCanvasContext] =
    useState<CanvasRenderingContext2D | null>(null);
  const [fallbackMessage, setFallbackMessage] =
    useState<string>(DEFAULTMESSAGE);
  const [canvasSize, setCanvasSize] = useState<CanvasSize>({
    width: 500,
    height: 500,
  });

  useEffect(() => {
    const initCanvas = () => {
      if (!canvasRef.current) {
        setFallbackMessage("don't hanve canvas ref");
        return;
      }

      const canvas = canvasRef.current;
      const parent = canvas.parentElement;

      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;

        setCanvasSize({
          width: parent.clientWidth,
          height: parent.clientHeight,
        });
      }

      const context = canvas.getContext("2d");

      if (!context) {
        setFallbackMessage("not found canvas context");
      }

      setCanvasContext(context);
    };

    initCanvas();

    window.addEventListener("resize", initCanvas);

    return () => {
      window.removeEventListener("resize", initCanvas);
    };
  }, []);

  return { canvasRef, fallbackMessage, canvasContext, canvasSize };
};

export default useCanvas;

const DEFAULTMESSAGE = "not support canvas sorry";
