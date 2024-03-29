import type { CanvasSize } from "src/types/canvas-common";
import { useEffect } from "react";

interface PointContainer {
  positionX: number;
  positionY: number;
  fixedPositionY: number;
  maxPositionY: number;
  acceleration: number;
  currentSpeed: number;
}

interface UseCanvasWaveParams {
  canvasContext: CanvasRenderingContext2D | null;
  waveNumber: number;
  canvasSize: CanvasSize;
}

const useCanvasWave = ({
  canvasContext,
  waveNumber,
  canvasSize,
}: UseCanvasWaveParams) => {
  useEffect(() => {
    if (!canvasContext) return;

    let animationframeId: number;

    const canvasWidth = canvasSize.width;
    const canvasHeight = canvasSize.height;

    const pathNumber = 4;
    const dividedWidth = canvasWidth / (pathNumber - 1);

    const waveContainer: Array<PointContainer[]> = [];

    for (let index = 0; index < waveNumber; index++) {
      let pointContainer: PointContainer[] = [];

      for (let index = 0; index < pathNumber; index++) {
        pointContainer.push({
          positionX: dividedWidth * index,
          positionY: canvasHeight / 2,
          fixedPositionY: canvasHeight / 2,
          maxPositionY: Math.random() * (canvasHeight / 2) * 0.3,
          acceleration: 0.1,
          currentSpeed: index,
        });
      }

      waveContainer.push(pointContainer);
    }

    const movePath = (pointContainer: PointContainer[]) => {
      pointContainer.forEach((point) => {
        point.currentSpeed += point.acceleration;

        point.positionY =
          point.fixedPositionY +
          Math.sin(point.currentSpeed) * point.maxPositionY;
      });
    };

    const drawWave = (pointContainer: PointContainer[], fillColor: string) => {
      const startPath = pointContainer[0];
      const lastPath = pointContainer[pointContainer.length - 1];

      canvasContext.beginPath();
      canvasContext.moveTo(startPath.positionX, startPath.positionY);

      for (let index = 0; index < pointContainer.length - 1; index++) {
        const controlPoint = pointContainer[index];
        const nextControlPoint = pointContainer[index + 1];

        const nextPointX =
          (controlPoint.positionX + nextControlPoint.positionX) / 2;
        const nextPointY =
          (controlPoint.positionY + nextControlPoint.positionY) / 2;

        // 각 path를 curve point를 잡고 path와 path 사이의 중간 점을 다음 end point로 잡았다.
        canvasContext.quadraticCurveTo(
          controlPoint.positionX,
          controlPoint.positionY,
          nextPointX,
          nextPointY
        );
      }

      // line으로 나머지 영역 채우는 과정
      canvasContext.lineTo(lastPath.positionX, lastPath.positionY);
      canvasContext.lineTo(canvasWidth, canvasHeight);
      canvasContext.lineTo(startPath.positionX, canvasHeight);
      canvasContext.lineTo(startPath.positionX, startPath.positionY);

      canvasContext.fillStyle = fillColor;
      canvasContext.fill();
      canvasContext.closePath();

      movePath(pointContainer);
    };

    const drawWaveContainer = () => {
      canvasContext.clearRect(0, 0, canvasWidth, canvasHeight);

      waveContainer.forEach((pointContainer, index) => {
        drawWave(pointContainer, WAVE_FILL_COLOR[index]);
      });

      animationframeId = window.requestAnimationFrame(drawWaveContainer);
    };

    animationframeId = window.requestAnimationFrame(drawWaveContainer);

    return () => {
      window.cancelAnimationFrame(animationframeId);
    };
  }, [canvasContext, waveNumber, canvasSize]);
};

export default useCanvasWave;

const WAVE_FILL_COLOR = [
  "rgba(0, 199, 235, 0.4)",
  "rgba(0, 146, 199, 0.4)",
  "rgba(0, 87, 158, 0.4)",
];
