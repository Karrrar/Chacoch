import Chacoch from "@/chacoch/GameObjects/Chacoch";
import { Position } from "@/chacoch/types";
import { TestScheduler } from "rxjs/testing";

describe("Chacoch Reactive", () => {
  const testScheduler = new TestScheduler((actual, expected) => {
    expect(actual).toEqual(expected);
  });

  test("Change position will emit the new position", () => {
    const chacoch = new Chacoch();
    testScheduler.run(({ cold, expectObservable }) => {
      const expected = cold<Position>("ab", {
        a: { x: 0, y: 0 },
        b: { x: 1, y: 0 },
      });

      testScheduler.schedule(() => {
        chacoch.move();
      }, 1);

      expectObservable(chacoch.position$).toEqual(expected);
    });
  });

  test("Change direction will emit the new direction", () => {
    const chacoch = new Chacoch();
    testScheduler.run(({ cold, expectObservable }) => {
      const expected = cold<number>("abc", { a: 90, b: 180, c: 270 });
      const source$ = chacoch.direction$;
      testScheduler.schedule(() => {
        chacoch.turnRight();
      }, 1);
      testScheduler.schedule(() => {
        chacoch.turnRight();
      }, 2);
      expectObservable(source$).toEqual(expected);
    });
  });
});
