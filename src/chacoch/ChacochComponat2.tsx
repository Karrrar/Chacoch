import React from 'react';
import { default as Cha } from './GameObjects/Chacoch';

interface ChacochProps {
  chacoch: Cha
}

const Chacoch: React.FC<ChacochProps> = ({ chacoch }) => {

  const svgWidth = 500;
  const svgHeight = 500;
  const cellSize = Math.min(svgWidth / 10, svgHeight / 10);

  const width = cellSize * 0.9;
  const height = cellSize * 0.9;

  const points = `0,-${height / 2} ${width / 2},${height / 2} -${width / 2},${height / 2}`;


  // Apply a transform that first translates the triangle and then rotates it around its center
  const transform = `translate(${chacoch.position.x - 0.5}, ${chacoch.position.y - 0.5}) rotate(${chacoch.direction}) scale(${1 / cellSize})`;
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
