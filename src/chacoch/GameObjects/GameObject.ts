import { BehaviorSubject, Observable } from "rxjs";
import { Position } from "../types";

export default class GameObject {
  private _position: Position;
  private _position$: BehaviorSubject<Position>;

  constructor(position: Position) {
    this._position = position;
    this._position$ = new BehaviorSubject<Position>(position);
  }

  public get position(): Position {
    return this._position;
  }

  protected set position(value: Position) {
    this._position = value;
    this._position$.next(value);
  }

  public get position$(): Observable<Position> {
    return this._position$.asObservable();
  }

  // Basic method to check collision with another object
  collidesWith(object: GameObject): boolean {
    return (
      object._position.x === this._position.x &&
      object._position.y === this._position.y
    );
  }
}
