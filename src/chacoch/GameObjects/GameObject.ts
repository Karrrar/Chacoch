import { Position } from "../types";

export default class GameObject {
  protected position: Position;

  constructor(position: Position) {
    this.position = position;
  }

  public get Position() {
    return this.position;
  }

  // Basic method to check collision with another object
  collidesWith(object: GameObject): boolean {
    return (
      object.position.x === this.position.x &&
      object.position.y === this.position.y
    );
  }
}
