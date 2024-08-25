export interface Position {
  x: number;
  y: number;
}

export interface Level {
  startingPosition: Position;
  goal: Position;
}

export type Dimensions = {
  rows: number;
  columns: number;
};
