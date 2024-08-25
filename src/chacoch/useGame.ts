"use client";
import { useMemo, useState, useEffect, useCallback } from "react";
import Obstacle from "./GameObjects/Obstacle";
import { Position } from "./types";
import LevelFactory from "./LevelFactory";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const useGame = (level: number) => {
  const game = useMemo(() => LevelFactory.getLevel(level), [level]);

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

  const canMoveForward = useCallback(() => {
    return game.chacoch.isCanMoveForward(game.level);
  }, [game]);

  useEffect(() => {
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
    move,
    turnLeft,
    turnRight,
    canMoveForward,
  };
};
