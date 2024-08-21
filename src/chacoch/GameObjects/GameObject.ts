import { Position } from "../types";

export default class GameObject {
  protected _position: Position;

  constructor(position: Position) {
    this._position = position;
  }

  public get position() {
    return this._position;
  }

  // Basic method to check collision with another object
  collidesWith(object: GameObject): boolean {
    return (
      object._position.x === this._position.x &&
      object._position.y === this._position.y
    );
  }
}
