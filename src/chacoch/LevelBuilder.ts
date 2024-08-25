import Level from "./GameObjects/Level";
import Obstacle from "./GameObjects/Obstacle";
import { Dimensions, Position } from "./types";

export class LevelBuilder {
  private _startingPosition?: Position;
  private _dimensions?: Dimensions;
  private _goal?: Position;
  private _obstacles?: Obstacle[] = [];

  addObstacle(x: number, y: number): this {
    this._obstacles?.push(new Obstacle({ x, y }));
    return this;
  }

  setStartingPosition(x: number, y: number): this {
    this._startingPosition = { x, y };
    return this;
  }

  setDimensions(rows: number, columns: number): this {
    this._dimensions = { rows, columns };
    return this;
  }

  setGoal(x: number, y: number): this {
    this._goal = { x, y };
    return this;
  }

  build() {
    const startingPosition = this._startingPosition ?? { x: 1, y: 1 };
    const dimensions = this._dimensions ?? { rows: 10, columns: 10 };
    const goal = this._goal ?? { x: 1, y: 1 };
    const level = new Level({ dimensions, startingPosition, goal });
    this.fillObstacles(level);
    return level;
  }

  private fillObstacles(level: Level) {
    this._obstacles?.forEach((o) => level.addObstacle(o));
  }
}
