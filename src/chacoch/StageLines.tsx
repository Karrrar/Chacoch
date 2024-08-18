'use client';
export const StageLines: React.FC<{ cols: number; rows: number; }> = ({ cols, rows }) => {
  return (<>
    {/* Grid Lines */}
    {Array.from({ length: cols + 1 }).map((_, i) => (
      <line key={"v-" + `${i}`} x1={i} y1="0" x2={i} y2={rows} stroke="gray" strokeWidth="0.02" />
    ))}
    {Array.from({ length: rows + 1 }).map((_, i) => (
      <line key={"h-" + `${i}`} x1="0" y1={i} x2={cols} y2={i} stroke="gray" strokeWidth="0.02" />
    ))}
  </>);
};
