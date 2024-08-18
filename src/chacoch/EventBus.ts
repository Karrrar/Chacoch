import { Subject, Observable, concatMap, map, timer } from "rxjs";
import { AllAppEvents, EventTypeMap, AppEvent } from "./types";

class EventBus {
  private eventSubject = new Subject<AllAppEvents>();

  public emit<K extends keyof EventTypeMap>(event: AppEvent<K>): void {
    this.eventSubject.next(event as AllAppEvents);
  }

  public get events$(): Observable<AllAppEvents> {
    return this.eventSubject.asObservable();
  }
}
//

const eventBus = new EventBus();
export { eventBus };
