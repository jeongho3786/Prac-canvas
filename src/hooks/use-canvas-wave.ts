import { useEffect } from "react";

interface PointContainer {
  positionX: number;
  positionY: number;
  fixedPositionY: number;
  maxPositionY: number;
  acceleration: number;
  currentSpeed: number;
}

const useCanvasWave = (
  canvasContext: CanvasRenderingContext2D | null,
  canvas: HTMLCanvasElement | null
) => {
  useEffect(() => {
    if (!canvasContext) return;
    if (!canvas) return;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    // 초기 path 설정
    const quantity = 4;
    let pointContainer: PointContainer[] = [];

    for (let index = 0; index < quantity; index++) {
      const dividedWidth = canvasWidth / (quantity - 1);

      pointContainer.push({
        positionX: dividedWidth * index,
        positionY: (canvasHeight / 2) * Math.sin(index),
        fixedPositionY: canvasHeight / 2,
        maxPositionY: Math.random() * (canvasHeight / 2) * 0.3,
        acceleration: 0.1,
        currentSpeed: index,
      });
    }

    const movePath = () => {
      pointContainer.forEach((point) => {
        point.currentSpeed += point.acceleration;

        point.positionY =
          point.fixedPositionY +
          Math.sin(point.currentSpeed) * point.maxPositionY;
      });
    };

    const drawWave = () => {
      // 초기화
      canvasContext.clearRect(0, 0, canvasWidth, canvasHeight);

      const startPath = pointContainer[0];
      const lastPath = pointContainer[pointContainer.length - 1];

      canvasContext.beginPath();
      canvasContext.moveTo(startPath.positionX, startPath.positionY);

      for (let index = 0; index < pointContainer.length - 1; index++) {
        const currentPoint = pointContainer[index];
        const nextPoint = pointContainer[index + 1];

        // 커브의 경우 현재와 다음 각각의 point의 중간에 연결해야 곡선이 나옴
        const controlPointX =
          (currentPoint.positionX + nextPoint.positionX) / 2;
        const controlPointY =
          (currentPoint.positionY + nextPoint.positionY) / 2;

        canvasContext.quadraticCurveTo(
          currentPoint.positionX,
          currentPoint.positionY,
          controlPointX,
          controlPointY
        );
      }

      // line으로 나머지 영역 채우는 과정
      canvasContext.lineTo(lastPath.positionX, lastPath.positionY);
      canvasContext.lineTo(canvasWidth, canvasHeight);
      canvasContext.lineTo(startPath.positionX, canvasHeight);
      canvasContext.lineTo(startPath.positionX, startPath.positionY);

      canvasContext.fillStyle = "rgba(0, 199, 235, 0.4)";
      canvasContext.fill();
      canvasContext.closePath();

      movePath();

      window.requestAnimationFrame(drawWave);
    };

    window.requestAnimationFrame(drawWave);
  }, [canvasContext, canvas]);
};

export default useCanvasWave;
