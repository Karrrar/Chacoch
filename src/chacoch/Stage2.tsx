'use client';
import { useState, useEffect } from 'react';
import Game from './GameObjects/Game';
import Level from './GameObjects/Level';
import { StageLines } from './StageLines';
import { StageText } from './StageText';
import Chacoch from './GameObjects/Chacoch';
import { default as ChacochComponet } from './ChacochComponat2'
import Obstacle from './GameObjects/Obstacle';

interface StageProps {
  rows: number;
  cols: number;
  speed: number;
  start: boolean;
}

const Stage: React.FC = () => {
  // Fixed SVG width and height
  const level = new Level({ dimensions: { rows: 10, columns: 10 }, goal: { x: 5, y: 7 } })
  level.addObstacle(new Obstacle({ x: 3, y: 6 }));
  level.addObstacle(new Obstacle({ x: 2, y: 7 }));
  level.addObstacle(new Obstacle({ x: 5, y: 5 }));
  level.addObstacle(new Obstacle({ x: 8, y: 1 }));
  level.addObstacle(new Obstacle({ x: 2, y: 8 }));
  level.addObstacle(new Obstacle({ x: 3, y: 4 }));
  const game2 = new Game({ level, chacoch: new Chacoch({ x: 1, y: 1 }) });

  const [chacoch, setChacoch] = useState<Chacoch>(game2.chacoch);
  const [game, setGame] = useState<Game>(game2);
  // const level = new Level({ dimensions: { columns: 10, rows: 10 }, goal: { x: 5, y: 7 } })

  useEffect(() => {
    const level = new Level({ dimensions: { rows: 10, columns: 10 }, goal: { x: 5, y: 7 } })
    const game = new Game({ level, chacoch: new Chacoch() });
    setGame(game);
  }, []);




  return (
    <svg width={500} height={500} viewBox={`0 0 ${level.dimensions.columns} ${level.dimensions.rows}`} xmlns="http://www.w3.org/2000/svg">
      <rect width={level.dimensions.columns} height={level.dimensions.rows} fill={game.isGameOver || game.isComplete ? 'rgba(0, 0, 0, 0.5)' : 'white'} />
      <rect width={0.8} height={0.8} x={level.goal.x + 0.1} y={level.goal.y + 0.1} fill='red' />
      <StageLines rows={level.dimensions.rows} cols={level.dimensions.columns} color={game.isGameOver || game.isComplete ? 'black' : 'rgba(0, 0, 0, 0.5)'} />
      {
        level.obstacles.map((v, i) =>
          <rect key={"o-" + i} width={1} height={1} x={v.position.x - 1} y={v.position.y - 1} />
        )
      }
      <ChacochComponet chacoch={chacoch} />
      <StageText gameOver={game.isGameOver} win={game.isComplete} />
    </svg>
  );
};

export default Stage;
