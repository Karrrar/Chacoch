import { Position } from "../types";
import Chacoch from "./Chacoch";
import Obstacle from "./Obstacle";

interface LevelProps {
  dimensions: { rows: number; cols: number };
  goal: Position;
}
export default class Level {
  private readonly obstacles: Obstacle[] = [];
  private readonly goal: Position;
  private readonly dimensions: { rows: number; cols: number };
  constructor({ dimensions, goal }: LevelProps) {
    if (!Number.isInteger(dimensions.rows) || dimensions.rows < 1)
      throw new Error("rows must be a positive integer and greater than 1");
    if (!Number.isInteger(dimensions.cols) || dimensions.cols < 1)
      throw new Error("columns must be a positive integer and greater than 1");
    this.goal = goal;
    this.dimensions = dimensions;
  }

  public get Obstacles() {
    return this.obstacles as ReadonlyArray<Obstacle>;
  }
  public get Dimensions() {
    return this.dimensions;
  }

  public get Goal() {
    return this.goal;
  }

  addObstacle(obstacle: Obstacle) {
    this.obstacles.push(obstacle);
  }

  isComplete(char: Chacoch) {
    return char.Position.x === this.goal.x && char.Position.y === this.goal.y;
  }
}
