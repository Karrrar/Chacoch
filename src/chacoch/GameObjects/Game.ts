import { BehaviorSubject, Observable } from "rxjs";
import Chacoch from "./Chacoch";
import Level from "./Level";

interface GameProp {
  level: Level;
  chacoch: Chacoch;
}

export default class Game {
  private _level: Level;
  private _chacoch: Chacoch;
  private _isGameOver: boolean = false;
  private _isGameOver$: BehaviorSubject<boolean>;
  private _isComplete: boolean = false;
  private _isComplete$: BehaviorSubject<boolean>;

  constructor({ level, chacoch }: GameProp) {
    this._level = level;
    this._chacoch = chacoch;
    this._isComplete$ = new BehaviorSubject(false);
    this._isGameOver$ = new BehaviorSubject(false);
  }

  update() {
    if (this._isComplete || this._isGameOver) return;

    this.isGameOver =
      !this._chacoch.isWithinBounds(
        this.level.dimensions.columns,
        this.level.dimensions.rows
      ) || this.level.checkCollisions(this.chacoch);

    this.isComplete = this._level.isGoalReached(this._chacoch);
    this.chacoch.canMove = !this.isComplete && !this._isGameOver;
  }

  public get chacoch(): Chacoch {
    return this._chacoch;
  }

  public get level(): Level {
    return this._level;
  }

  public get isComplete(): boolean {
    return this._isComplete;
  }

  private set isComplete(value: boolean) {
    this._isComplete = value;
    this._isComplete$.next(value);
  }

  public get isComplete$(): Observable<boolean> {
    return this._isComplete$.asObservable();
  }

  public get isGameOver(): boolean {
    return this._isGameOver;
  }

  private set isGameOver(value: boolean) {
    console.log("isGameOver", value);
    this._isGameOver = value;
    this._isGameOver$.next(value);
  }

  public get isGameOver$(): Observable<boolean> {
    return this._isGameOver$.asObservable();
  }
}
