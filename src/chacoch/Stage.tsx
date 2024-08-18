'use client';
import { useCallback, useEffect, useState } from 'react';
import { of, concatMap, timer, map, Subject, BehaviorSubject } from 'rxjs';
import Chacoch from './Chacoch';
import { Position } from './types';
import { StageLines } from './StageLines';
import useChacochState from './useChacochState';
import { LevelOne } from './levelOne';
import { StageText } from './StageText';

interface StageProps {
  rows: number;
  cols: number;
  speed: number;
  start: boolean;
}

const Stage: React.FC<StageProps> = ({ rows, cols, speed, start }) => {
  // Fixed SVG width and height
  const svgWidth = 500;
  const svgHeight = 500;


  const { position, setPosition } = useChacochState();
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [win, setWin] = useState<boolean>(false);


  function checkGoal(value: Position) {
    if (LevelOne.goal.x == value.x && LevelOne.goal.y == value.y) {
      setWin(true);
      return true;
    }
    return false;
  }
  useEffect(() => {
    const $source = new BehaviorSubject<Position>(LevelOne.startingPosition);
    $source.pipe(
      concatMap(value => timer(speed).pipe(map(() => value)))
    ).subscribe(value => {
      setPosition(value);
      checkGoal(value)
    });


    function insteractions() {
      setGameOver(false);
      move();
      move();
      move();
      move();
      move();
    }

    function move() {
      const currectPostion = $source.value;
      $source.next({ ...currectPostion, x: currectPostion.x + 1 })
    }
    insteractions();
  }, [speed, start])



  return (
    <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${cols} ${rows}`} xmlns="http://www.w3.org/2000/svg">
      <rect width={cols} height={rows} fill={gameOver || win ? 'rgba(0, 0, 0, 0.5)' : 'white'} />
      <rect width={0.8} height={0.8} x={5 + 0.1} y={0 + 0.1} fill='red' />
      <StageLines rows={rows} cols={cols} />
      <Chacoch postion={position} direction={90} />
      <StageText gameOver={gameOver} win={win} />
    </svg>
  );
};

export default Stage;
