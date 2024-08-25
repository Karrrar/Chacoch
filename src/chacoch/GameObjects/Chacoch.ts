import { BehaviorSubject, Observable } from "rxjs";
import { Position } from "../types";
import GameObject from "./GameObject";
import Level from "./Level";

export default class Chacoch extends GameObject {
  private _canMove: boolean = true;
  private _direction: number;
  private _direction$: BehaviorSubject<number>;

  constructor(position?: Position, direction?: number) {
    super(position ?? { x: 0, y: 0 });
    this._direction = direction ?? 90;
    this._direction$ = new BehaviorSubject<number>(this._direction);
  }
  public get direction(): number {
    return this._direction;
  }

  private set direction(value: number) {
    this._direction = value;
    this._direction$.next(value);
  }

  public get direction$(): Observable<number> {
    return this._direction$.asObservable();
  }

  public get canMove(): boolean {
    return this._canMove;
  }
  public set canMove(value: boolean) {
    this._canMove = value;
  }

  public move() {
    if (!this._canMove) return;
    this.position = this.nextStep();
  }

  turnRight() {
    if (!this._canMove) return;
    this.direction = (this._direction + 90) % 360;
  }
  turnLeft() {
    if (!this._canMove) return;
    let newDirection = (this._direction - 90) % 360;
    if (newDirection < 0) newDirection += 360;
    this.direction = newDirection;
  }

  isCanMoveForward(level: Level) {
    const forwardPosition = this.nextStep();
    const chacochNewPosition = new Chacoch(forwardPosition, this._direction);
    return (
      !level.checkCollisions(chacochNewPosition) &&
      chacochNewPosition.isWithinBounds(
        level.dimensions.columns,
        level.dimensions.rows
      )
    );
  }

  isWithinBounds(maxX: number, maxY: number) {
    return (
      this.position.x > 0 &&
      this.position.x <= maxX &&
      this.position.y > 0 &&
      this.position.y <= maxY
    );
  }

  private nextStep(): Position {
    const radians = (this._direction * Math.PI) / 180;

    return {
      x: Math.round(this.position.x + 1 * Math.sin(radians)) || 0,
      y: Math.round(this.position.y - 1 * Math.cos(radians)) || 0,
    };
  }
}
