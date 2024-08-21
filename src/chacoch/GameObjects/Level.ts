import { Position } from "../types";
import Chacoch from "./Chacoch";
import Obstacle from "./Obstacle";

type LevelProps = {
  dimensions: Dimensions;
  goal: Position;
};

type Dimensions = {
  rows: number;
  columns: number;
};
export default class Level {
  private readonly _obstacles: Obstacle[] = [];
  private readonly _goal: Position;
  private readonly _dimensions: Dimensions;

  constructor({ dimensions, goal }: LevelProps) {
    if (!Number.isInteger(dimensions.rows) || dimensions.rows < 1)
      throw new Error("rows must be a positive integer and greater than 1");
    if (!Number.isInteger(dimensions.columns) || dimensions.columns < 1)
      throw new Error("columns must be a positive integer and greater than 1");
    this._goal = goal;
    this._dimensions = dimensions;
  }

  public get obstacles(): ReadonlyArray<Obstacle> {
    return this._obstacles;
  }

  public get dimensions(): Dimensions {
    return this._dimensions;
  }

  public get goal(): Position {
    return this._goal;
  }

  addObstacle(obstacle: Obstacle): void {
    this._obstacles.push(obstacle);
  }

  isComplete(char: Chacoch): boolean {
    return char.position.x === this._goal.x && char.position.y === this._goal.y;
  }
}
