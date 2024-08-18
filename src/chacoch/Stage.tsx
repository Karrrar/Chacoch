'use client';
import Chacoch from './Chacoch';
import { StageLines } from './StageLines';
import { StageText } from './StageText';
import { obstacles, useGame } from './game';

interface StageProps {
  rows: number;
  cols: number;
  speed: number;
  start: boolean;
}

const Stage: React.FC<StageProps> = ({ rows, cols, speed, start }) => {
  // Fixed SVG width and height
  const svgWidth = 800;
  const svgHeight = 800;



  const { position, direction, win, gameOver } = useGame();


  return (
    <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${cols} ${rows}`} xmlns="http://www.w3.org/2000/svg">
      <rect width={cols} height={rows} fill={gameOver || win ? 'rgba(0, 0, 0, 0.5)' : 'white'} />
      <rect width={0.8} height={0.8} x={5 + 0.1} y={0 + 0.1} fill='red' />
      <StageLines rows={rows} cols={cols} color={gameOver || win ? 'black' : 'rgba(0, 0, 0, 0.5)'} />
      {
        obstacles.map((v, i) =>
          <rect key={"o-" + i} width={1} height={1} x={v.x - 1} y={v.y - 1} />
        )}
      <Chacoch postion={position} direction={direction} />
      <StageText gameOver={gameOver} win={win} />
    </svg>
  );
};

export default Stage;
