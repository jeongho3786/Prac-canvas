import { useEffect, useRef, useState } from "react";

const useCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [canvasContext, setCanvasContext] =
    useState<CanvasRenderingContext2D | null>(null);
  const [fallbackMessage, setFallbackMessage] =
    useState<string>(DEFAULTMESSAGE);

  useEffect(() => {
    if (!canvasRef.current) {
      setFallbackMessage("don't hanve canvas ref");
      return;
    }

    const canvas = canvasRef.current;
    const parent = canvas.parentElement;

    if (parent) {
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
    }

    const context = canvas.getContext("2d");

    if (!context) {
      setFallbackMessage("not found canvas context");
    }

    setCanvasContext(context);
  }, []);

  return { canvasRef, fallbackMessage, canvasContext };
};

export default useCanvas;

const DEFAULTMESSAGE = "not support canvas sorry";
