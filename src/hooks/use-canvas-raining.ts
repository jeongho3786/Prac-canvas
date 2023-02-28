import type { CanvasSize } from "src/types/canvas-common";
import { useEffect } from "react";

interface RainContainer {
  positionX: number;
  positionY: number;
  length: number;
  slope: number;
  acceleration: number;
}

interface UseCanvasRainingParams {
  canvasContext: CanvasRenderingContext2D | null;
  canvasSize: CanvasSize;
}

const useCanvasRaining = ({
  canvasContext,
  canvasSize,
}: UseCanvasRainingParams) => {
  useEffect(() => {
    if (!canvasContext) return;

    const canvasWidth = canvasSize.width;
    const canvasHeight = canvasSize.height;

    let animationframeId: number;

    // 비 모양
    canvasContext.strokeStyle = "#aec2e0";
    canvasContext.lineWidth = 1;
    canvasContext.lineCap = "round";

    // 초기값 설정
    const quantity = 200;
    let rainContainer: RainContainer[] = [];

    while (rainContainer.length < quantity) {
      rainContainer.push({
        positionX: Math.random() * canvasWidth,
        positionY: Math.random() * canvasHeight,
        length: Math.random(),
        slope: -4 + Math.random() * 4 + 2,
        acceleration: Math.random() * 10 + 10,
      });
    }

    const movePath = () => {
      for (let index = 0; index < rainContainer.length; index++) {
        const rainInfo = rainContainer[index];

        rainInfo.positionX += rainInfo.slope;
        rainInfo.positionY += rainInfo.acceleration;

        // 화면 끝까지 빗줄기가 도달했을 경우
        if (
          rainInfo.positionX > canvasWidth ||
          rainInfo.positionY > canvasHeight
        ) {
          rainInfo.positionX = Math.random() * canvasWidth;
          rainInfo.positionY = -20;
        }
      }
    };

    const drawRain = () => {
      // 그린 빗줄기 삭제
      canvasContext.clearRect(0, 0, canvasWidth, canvasHeight);

      for (let index = 0; index < rainContainer.length; index++) {
        const rain = rainContainer[index];

        canvasContext.beginPath();
        canvasContext.moveTo(rain.positionX, rain.positionY);
        canvasContext.lineTo(
          rain.length * rain.slope + rain.positionX,
          rain.length * rain.acceleration + rain.positionY
        );
        canvasContext.stroke();
      }

      movePath();

      animationframeId = window.requestAnimationFrame(drawRain);
    };

    animationframeId = window.requestAnimationFrame(drawRain);

    return () => {
      window.cancelAnimationFrame(animationframeId);
    };
  }, [canvasContext, canvasSize]);
};

export default useCanvasRaining;
