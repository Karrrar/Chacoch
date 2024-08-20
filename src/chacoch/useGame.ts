/* eslint-disable react-hooks/exhaustive-deps */
import { Position, Level } from "./types";
import { LevelOne } from "./levelOne";
import { eventBus as bus } from "./EventBus";
import React, { useEffect, useRef, useState } from "react";
import { concatMap, timer, map } from "rxjs";

const level: Level = LevelOne;

const eventBus = bus;
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

export const obstacles: Position[] = [
  { x: 3, y: 3 },
  { x: 4, y: 5 },
  { x: 6, y: 7 },
];
function isCollision(nextPosition: Position): boolean {
  // Check if the position is out of bounds (assuming a grid size)
  const gridSize = { width: 10, height: 10 }; // Example grid size
  if (
    nextPosition.x < 0 ||
    nextPosition.x >= gridSize.width ||
    nextPosition.y < 0 ||
    nextPosition.y >= gridSize.height
  ) {
    return true; // Collision with the grid boundaries
  }

  // Check for collision with obstacles
  for (let obstacle of obstacles) {
    if (obstacle.x === nextPosition.x && obstacle.y === nextPosition.y) {
      console.log(
        `Collision detected with obstacle at (${obstacle.x}, ${obstacle.y})`
      );
      return true; // Collision with an obstacle
    }
  }

  return false; // No collision
}

export const useGame = () => {
  const [position, setPosition] = useState<Position>({ x: 1, y: 3 });
  const [direction, setDirection] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [win, setWin] = useState<boolean>(false);

  // Use refs to keep track of the latest position and direction
  const positionRef = useRef(position);
  const directionRef = useRef(direction);
  const gameOverRef = useRef(gameOver);

  useEffect(() => {
    positionRef.current = position;
  }, [position]);

  useEffect(() => {
    directionRef.current = direction;
  }, [direction]);

  useEffect(() => {
    gameOverRef.current = gameOver;
  }, [gameOver]);
  useEffect(() => {
    const unsubscribe = eventBus.events$
      .pipe(concatMap((value) => timer(400).pipe(map(() => value))))
      .subscribe((event) => {
        console.log("Event: ", event);
        if (gameOverRef.current) return;

        if (event.type === "move") {
          setPosition((prevPosition) => {
            const radians = (directionRef.current * Math.PI) / 180;
            const newPosition = {
              x: Math.round(prevPosition.x + 1 * Math.sin(radians)),
              y: Math.round(prevPosition.y - 1 * Math.cos(radians)),
            };
            if (isCollision(newPosition)) {
              console.log("Game Over! Collision detected.");
              setGameOver(true);
            }
            if (checkGoal(newPosition)) {
              setWin(true);
            }
            return newPosition;
          });
        }

        if (event.type === "turn") {
          setDirection((prevDirection) => {
            let newDirection = prevDirection;
            if (event.data.direction === "right") {
              newDirection = (prevDirection + 90) % 360;
            } else if (event.data.direction === "left") {
              newDirection = (prevDirection - 90 + 360) % 360;
            }
            return newDirection;
          });
        }
      });
    function instructions() {
      Move();
      Move();
      TurnRight();
      Move();
      Move();
      Move();
      Move();
    }
    instructions();
    return () => unsubscribe.unsubscribe();
  }, []);

  return { position, direction, win, gameOver };
};
