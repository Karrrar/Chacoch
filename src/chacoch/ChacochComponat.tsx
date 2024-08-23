'use client';

import React from 'react';
import { Position } from './types';

interface ChacochProps {
  position: Position;
  direction: number;
}

const Chacoch: React.FC<ChacochProps> = ({ position, direction }) => {

  const svgWidth = 500;
  const svgHeight = 500;
  const cellSize = Math.min(svgWidth / 10, svgHeight / 10);

  const width = cellSize * 0.9;
  const height = cellSize * 0.9;

  const points = `0,-${height / 2} ${width / 2},${height / 2} -${width / 2},${height / 2}`;


  // Apply a transform that first translates the triangle and then rotates it around its center
  const transform = `translate(${position.x - 0.5}, ${position.y - 0.5}) rotate(${direction}) scale(${1 / cellSize})`;
  console.log("Translate: ", transform)
  return (
    <polygon
      points={points}
      fill="blue"
      transform={transform}
    />
  );
};

export default Chacoch;
