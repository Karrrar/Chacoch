import GameObject from "./GameObject";

export default class Chacoch extends GameObject {
  private direction: number = 90;

  /**
   *
   */
  constructor() {
    super({ x: 0, y: 0 });
  }
  public get Direction() {
    return this.direction;
  }

  public move() {
    const radians = (this.direction * Math.PI) / 180;
    const newPosition = {
      x: Math.round(this.position.x + 1 * Math.sin(radians)) || 0,
      y: Math.round(this.position.y - 1 * Math.cos(radians)) || 0,
    };
    this.position = newPosition;
  }

  turnRight() {
    this.direction = (this.direction + 90) % 360;
  }
}
