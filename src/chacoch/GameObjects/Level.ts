import { Dimensions, Position } from "../types";
import Chacoch from "./Chacoch";
import Obstacle from "./Obstacle";

type LevelProps = {
  dimensions: Dimensions;
  goal: Position;
  startingPosition: Position;
};

export default class Level {
  private readonly _obstacles: Obstacle[] = [];
  private readonly _goal: Position;
  private readonly _dimensions: Dimensions;
  private readonly _startingPosition: Position;

  constructor({ dimensions, goal, startingPosition }: LevelProps) {
    if (!Number.isInteger(dimensions.rows) || dimensions.rows < 1)
      throw new Error("rows must be a positive integer and greater than 1");
    if (!Number.isInteger(dimensions.columns) || dimensions.columns < 1)
      throw new Error("columns must be a positive integer and greater than 1");
    this._goal = goal;
    this._dimensions = dimensions;
    this._startingPosition = startingPosition;
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

  public get startingPosition(): Position {
    return this._startingPosition;
  }

  addObstacle(obstacle: Obstacle): void {
    this._obstacles.push(obstacle);
  }

  isGoalReached(char: Chacoch): boolean {
    return char.position.x === this._goal.x && char.position.y === this._goal.y;
  }

  checkCollisions(character: Chacoch): boolean {
    for (let obstacle of this.obstacles) {
      if (obstacle.collidesWith(character)) {
        console.log("Collisions hit");
        return true;
      }
    }
    return false;
  }
}
