'use client';
import { StageLines } from './StageLines';
import { StageText } from './StageText';
import { default as ChacochComponet } from './ChacochComponat'
import { useGame } from './GameObjects/useGame';
import { memo } from 'react';

interface StageProps {
  rows: number;
  cols: number;
  speed: number;
  start: boolean;
}

const Stage: React.FC = () => {

  const { game, gameOver, isComplete, obstacles, position, direction } = useGame();


  return (
    <svg width={500} height={500} viewBox={`0 0 ${game.level.dimensions.columns} ${game.level.dimensions.rows}`} xmlns="http://www.w3.org/2000/svg">
      <rect width={game.level.dimensions.columns} height={game.level.dimensions.rows} fill={gameOver || isComplete ? 'rgba(0, 0, 0, 0.5)' : 'white'} />
      <rect width={0.8} height={0.8} x={game.level.goal.x + 0.1 - 1} y={game.level.goal.y + 0.1 - 1} fill='red' />
      <StageLines rows={game.level.dimensions.rows} cols={game.level.dimensions.columns} color={gameOver || isComplete ? 'black' : 'rgba(0, 0, 0, 0.5)'} />
      {
        obstacles.map((v, i) =>
          <rect key={"o-" + i} width={1} height={1} x={v.position.x - 1} y={v.position.y - 1} />
        )
      }
      <ChacochComponet postion={position} direction={direction} />
      <StageText gameOver={gameOver} win={isComplete} />
    </svg>
  );
};

export default memo(Stage);
