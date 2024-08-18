export type EventTypeMap = {
  move: { steps: number };
  turn: { direction: "left" | "right" | "up" | "bottom" };
  gameOver: {};
  waitUntil: {};
};

export type AppEvent<K extends keyof EventTypeMap> = {
  type: K;
  data: EventTypeMap[K];
};

export type AllAppEvents = {
  [K in keyof EventTypeMap]: AppEvent<K>;
}[keyof EventTypeMap];

export interface Position {
  x: number;
  y: number;
}

export interface Level {
  startingPosition: Position;
  goal: Position;
}
