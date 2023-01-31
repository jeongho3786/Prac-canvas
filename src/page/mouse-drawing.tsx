import type { MouseEventHandler } from "react";
import { useRef, useState, useEffect } from "react";

const MouseDrawing = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [drawContext, setDrawContext] =
    useState<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [fallbackString, setFallbackString] = useState<string>(DEFAULTMESSAGE);

  const handleDrawing: MouseEventHandler<HTMLCanvasElement> = ({
    nativeEvent,
  }) => {
    const { offsetX, offsetY } = nativeEvent;

    if (!drawContext) return;

    if (!isDrawing) {
      drawContext.beginPath();
      drawContext.moveTo(offsetX, offsetY);
      return;
    }

    drawContext.lineTo(offsetX, offsetY);
    drawContext.stroke();
  };

  const handleDrawingStart = () => {
    setIsDrawing(true);
  };

  const handleDrawingFinsih = () => {
    setIsDrawing(false);
  };

  useEffect(() => {
    if (!canvasRef.current) {
      setFallbackString("don't hanve canvas ref");
      return;
    }

    const canvas = canvasRef.current;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - 75; // ?

    const context = canvas.getContext("2d");

    if (!context) {
      setFallbackString("not found canvas context");
    }

    setDrawContext(context);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      onMouseDown={handleDrawingStart}
      onMouseUp={handleDrawingFinsih}
      onMouseLeave={handleDrawingFinsih}
      onMouseMove={handleDrawing}
    >
      {fallbackString}
    </canvas>
  );
};

export default MouseDrawing;

const DEFAULTMESSAGE = "not support canvas sorry";
