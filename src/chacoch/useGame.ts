//#region don't touch
"use client";

import { useMemo, useState, useEffect, useCallback } from "react";
import Chacoch from "./GameObjects/Chacoch";
import Game from "./GameObjects/Game";
import Level from "./GameObjects/Level";
import Obstacle from "./GameObjects/Obstacle";
import { Position } from "./types";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const useGame = () => {
  const game = useMemo(() => {
    const l = new Level({
      dimensions: { rows: 10, columns: 10 },
      goal: { x: 8, y: 7 },
      startingPosition: { x: 1, y: 1 },
    });
    const c = new Chacoch(l.startingPosition);
    return new Game({ level: l, chacoch: c });
  }, []);

  const [position, setPosition] = useState<Position>({ x: 1, y: 1 });
  const [direction, setDirection] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [obstacles, setObstacles] = useState<ReadonlyArray<Obstacle>>([]);

  const move = useCallback(async () => {
    game.chacoch.move();
    game.update();
    await sleep(200);
  }, [game]);

  const turnRight = useCallback(async () => {
    game.chacoch.turnRight();
    game.update();
    await sleep(200);
  }, [game]);

  const turnLeft = useCallback(async () => {
    game.chacoch.turnLeft();
    game.update();
    await sleep(200);
  }, [game]);

  useEffect(() => {
    game.level.addObstacle(new Obstacle({ x: 3, y: 6 }));
    game.level.addObstacle(new Obstacle({ x: 2, y: 7 }));
    game.level.addObstacle(new Obstacle({ x: 5, y: 5 }));
    game.level.addObstacle(new Obstacle({ x: 8, y: 1 }));
    game.level.addObstacle(new Obstacle({ x: 3, y: 8 }));
    game.level.addObstacle(new Obstacle({ x: 3, y: 4 }));
    game.level.addObstacle(new Obstacle({ x: 7, y: 4 }));
    game.level.addObstacle(new Obstacle({ x: 6, y: 3 }));
    for (let i = 1; i < 9; i++)
      game.level.addObstacle(new Obstacle({ x: i, y: 9 }));
    setObstacles(game.level.obstacles);
  }, [game]);

  useEffect(() => {
    const position$ = game.chacoch.position$.subscribe((p) => {
      setPosition(p);
    });

    const direction$ = game.chacoch.direction$.subscribe((d) => {
      setDirection(d);
    });

    const isGameOver$ = game.isGameOver$.subscribe((o) => {
      setGameOver(o);
    });

    const isGameComplete$ = game.isComplete$.subscribe((c) => {
      setIsComplete(c);
    });
    //#endregion

    async function instructions() {
      for (let i = 0; i < 6; i++) await move();
      await turnRight();
      for (let i = 0; i < 2; i++) await move();
      await turnLeft();
      await move();
      await turnRight();
      for (let i = 0; i < 4; i++) await move();
    }

    //#region don't touch
    instructions();
    return () => {
      position$.unsubscribe();
      direction$.unsubscribe();
      isGameOver$.unsubscribe();
      isGameComplete$.unsubscribe();
    };
  }, [game, move, turnRight, turnLeft]);

  return {
    game,
    position,
    direction,
    gameOver,
    isComplete,
    obstacles,
  };
};
//#endregion
