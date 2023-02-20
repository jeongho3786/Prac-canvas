import { useEffect } from "react";
import useCanvas from "src/hooks/use-canvas";
import styled from "styled-components";

interface PointContainer {
  positionX: number;
  positionY: number;
  fixedPositionY: number;
  maxPositionY: number;
  acceleration: number;
  currentSpeed: number;
}

const WaveEffectPage = () => {
  const { canvasRef, fallbackMessage, canvasContext } = useCanvas();

  useEffect(() => {
    if (!canvasContext) return;
    if (!canvasRef.current) return;

    const canvasWidth = canvasRef.current.width;
    const canvasHeight = canvasRef.current.height;

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

    const draw = () => {
      // 초기화
      canvasContext.clearRect(0, 0, canvasWidth, canvasHeight);

      const startPath = pointContainer[0];
      const lastPath = pointContainer[pointContainer.length - 1];

      canvasContext.beginPath();
      canvasContext.moveTo(startPath.positionX, startPath.positionY);

      for (let index = 0; index < pointContainer.length - 1; index++) {
        const currentPoint = pointContainer[index];
        const nextPoint = pointContainer[index + 1];

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

      // line으로 영역 채우는 과정
      canvasContext.lineTo(lastPath.positionX, lastPath.positionY);
      canvasContext.lineTo(canvasWidth, canvasHeight);
      canvasContext.lineTo(startPath.positionX, canvasHeight);
      canvasContext.lineTo(startPath.positionX, startPath.positionY);

      canvasContext.fillStyle = "blue";
      canvasContext.fill();
      canvasContext.closePath();

      movePath();

      window.requestAnimationFrame(draw);
    };

    window.requestAnimationFrame(draw);
  }, [canvasRef, canvasContext]);

  return (
    <Container>
      <canvas ref={canvasRef}>{fallbackMessage}</canvas>
    </Container>
  );
};

export default WaveEffectPage;

const Container = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 9px;
  overflow: hidden;
`;

// rgba(0, 199, 235, 0.4), rgba(0, 146, 199, 0.4), rgba(0, 87, 158, 0.4);
