import { Subject, Observable } from "rxjs";
import { AppEvent, AllAppEvents, EventTypeMap, Position, Level } from "./types";
import { LevelOne } from "./levelOne";

class EventBus {
  private eventSubject = new Subject<AllAppEvents>();

  public emit<K extends keyof EventTypeMap>(event: AppEvent<K>): void {
    this.eventSubject.next(event as AllAppEvents);
  }

  public get events$(): Observable<AllAppEvents> {
    return this.eventSubject.asObservable();
  }
}

const level: Level = LevelOne;

export function checkGoal(value: Position) {
  if (level.goal.x == value.x && level.goal.y == value.y) {
    return true;
  }
  return false;
}
