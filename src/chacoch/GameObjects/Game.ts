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
  private _isComplete: boolean = false;

  constructor({ level, chacoch }: GameProp) {
    this._level = level;
    this._chacoch = chacoch;
  }

  update() {
    this._isGameOver = !this._chacoch.isWithinBounds(
      this.level.dimensions.rows,
      this.level.dimensions.columns
    );

    this._isComplete = this._level.isComplete(this._chacoch);
  }

  public get isComplete(): boolean {
    return this._isComplete;
  }

  public get chacoch(): Chacoch {
    return this._chacoch;
  }

  public get level(): Level {
    return this._level;
  }

  public get isGameOver(): boolean {
    return this._isGameOver;
  }
}
