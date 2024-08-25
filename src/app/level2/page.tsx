// #region don't touch

/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { StageLines } from "@/chacoch/StageLines";
import { StageText } from "@/chacoch/StageText";
import { useGame } from "@/chacoch/useGame";
import { default as ChacochComponet } from '@/chacoch/ChacochComponat'
import { useEffect } from "react";


export default function Home() {
  const { game, gameOver, isComplete, obstacles, position, direction, move, turnRight } = useGame(2);

  // #endregion

  // Hint: Create a new function to make chacoch turn left
  async function instructions() {
    // type your code
  }

  // #region don't touch
  useEffect(() => {
    instructions();
  }, [])


  return (
    <svg width={700} height={600} viewBox={`0 0 ${game.level.dimensions.columns} ${game.level.dimensions.rows}`} xmlns="http://www.w3.org/2000/svg">
      <rect width={game.level.dimensions.columns} height={game.level.dimensions.rows} fill={gameOver || isComplete ? 'rgba(0, 0, 0, 0.5)' : 'white'} />
      <rect width={0.8} height={0.8} x={game.level.goal.x + 0.1 - 1} y={game.level.goal.y + 0.1 - 1} fill='red' />
      <StageLines rows={game.level.dimensions.rows} cols={game.level.dimensions.columns} color={gameOver || isComplete ? 'black' : 'rgba(0, 0, 0, 0.5)'} />
      {
        obstacles.map((v, i) =>
          <rect key={"o-" + i} width={1} height={1} x={v.position.x - 1} y={v.position.y - 1} />
        )
      }
      <ChacochComponet position={position} direction={direction} />
      <StageText gameOver={gameOver} win={isComplete} />
    </svg>
  );
}
// #endregion