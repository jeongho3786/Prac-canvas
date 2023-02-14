import { useEffect } from "react";

interface RainContainer {
  positionX: number;
  positionY: number;
  length: number;
  slope: number;
  acceleration: number;
}

const useCanvasRaining = (
  canvasContext: CanvasRenderingContext2D | null,
  canvas: HTMLCanvasElement | null
) => {
  useEffect(() => {
    if (!canvasContext) return;
    if (!canvas) return;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    // 비 모양
    canvasContext.strokeStyle = "#aec2e0";
    canvasContext.lineWidth = 1;
    canvasContext.lineCap = "round";

    // 초기값 설정
    const quantity = 200;
    let init: RainContainer[] = [];

    while (init.length > quantity) {
      init.push({
        positionX: Math.random() * canvasWidth,
        positionY: Math.random() * canvasHeight,
        length: Math.random(),
        slope: -4 + Math.random() * 4 + 2,
        acceleration: Math.random() * 10 + 10,
      });
    }

    // TODO: 초기 컨테이너 값을 그대로 사용할 수 있지 않을까? + 추가로직
  }, [canvasContext, canvas]);
};

export default useCanvasRaining;
