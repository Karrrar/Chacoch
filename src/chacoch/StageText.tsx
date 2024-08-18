'use client';
export const StageText: React.FC<{ gameOver: boolean; win: boolean; }> = ({ gameOver, win }) => {
  return (
    <>
      {gameOver && (
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          fill="white"
          fontSize="1"
          fontWeight="bold"
          dy=".3em"
        >
          Game Over
        </text>)}
      {win && (
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          fill="white"
          fontSize="1"
          fontWeight="bold"
          dy=".3em"
        >
          You won
        </text>)}
    </>
  );
};
