import { Position } from "../types";
import GameObject from "./GameObject";

export default class Chacoch extends GameObject {
  private _direction: number = 90;

  constructor(position: Position = { x: 0, y: 0 }) {
    super(position);
  }
  public get direction() {
    return this._direction;
  }

  public move() {
    this._position = this.nextStep();
  }

  turnRight() {
    this._direction = (this._direction + 90) % 360;
  }

  isWithinBounds(maxX: number, maxY: number) {
    return (
      this.position.x >= 0 &&
      this.position.x <= maxX &&
      this.position.y >= 0 &&
      this.position.y <= maxY
    );
  }

  private nextStep(): Position {
    const radians = (this._direction * Math.PI) / 180;

    return {
      x: Math.round(this._position.x + 1 * Math.sin(radians)) || 0,
      y: Math.round(this._position.y - 1 * Math.cos(radians)) || 0,
    };
  }
}
