/* eslint-disable react-hooks/exhaustive-deps */
import { Position, Level } from "./types";
import { LevelOne } from "./levelOne";
import { EventBus } from "./EventBus";
import React, { useCallback, useEffect, useState } from "react";

const level: Level = LevelOne;
let direction: number = 0;
let position: Position = { x: 0, y: 0 };

const eventBus = new EventBus();

function checkGoal(value: Position) {
  if (level.goal.x == value.x && level.goal.y == value.y) {
    return true;
  }
  return false;
}

export function Move() {
  eventBus.emit({
    type: "move",
    data: {
      steps: 1,
    },
  });
}

export function TurnRight() {
  eventBus.emit({
    type: "turn",
    data: {
      direction: "right",
    },
  });
}

export const useGame = () => {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [direction, setDirection] = useState<number>(90);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [win, setWin] = useState<boolean>(false);

  const move = useCallback(() => {
    const radians = (direction * Math.PI) / 180;
    const newPosition = {
      x: Math.round(position.x + 1 * Math.sin(radians)),
      y: Math.round(position.y - 1 * Math.cos(radians)),
    };
    setPosition(newPosition);
  }, []);

  const turn = useCallback((degree: number) => {
    let newDirection = degree + direction;
    if (direction < 0) newDirection += 360;
    setDirection(newDirection);
  }, []);

  useEffect(() => {
    eventBus.events$.subscribe((event) => {
      switch (event.type) {
        case "move":
          console.log(`Moving ${event.data.steps} steps`);
          move();
          break;

        case "turn":
          console.log(`Turning ${event.data.direction}`);
          if (event.data.direction == "right") turn(90);
          else if (event.data.direction == "left") turn(-90);
          break;
      }
      if (checkGoal(position)) setWin(true);
    });
  }, []);

  return { position, direction, win };
};
