import { LevelBuilder } from "./LevelBuilder";
import Chacoch from "./GameObjects/Chacoch";
import Game from "./GameObjects/Game";

export default class LevelFactory {
  static getLevel(lvl: number) {
    switch (lvl) {
      case 1:
        return this.levelOne();
      case 2:
        return this.levelTwo();
      case 3:
        return this.levelThree();
      default:
        throw new Error("No level found");
    }
  }
  private static levelOne(): Game {
    const lb = new LevelBuilder()
      .setDimensions(10, 10)
      .setStartingPosition(1, 1)
      .setGoal(8, 7)
      .addObstacle(3, 6)
      .addObstacle(2, 7)
      .addObstacle(5, 5)
      .addObstacle(8, 1)
      .addObstacle(3, 8)
      .addObstacle(5, 10)
      .addObstacle(3, 4)
      .addObstacle(10, 4)
      .addObstacle(9, 4)
      .addObstacle(7, 7)
      .addObstacle(7, 4)
      .addObstacle(6, 3);
    for (let i = 1; i <= 10; i++) lb.addObstacle(i, 9);
    const level = lb.build();
    const chacoch = new Chacoch(level.startingPosition);
    return new Game({ level, chacoch });
  }

  private static levelTwo(): Game {
    const lb = new LevelBuilder()
      .setDimensions(3, 45)
      .setGoal(45, 2)
      .setStartingPosition(1, 2);
    const level = lb.build();
    const chacoch = new Chacoch(level.startingPosition);
    return new Game({ level, chacoch });
  }

  private static levelThree(): Game {
    const level = new LevelBuilder()
      .setDimensions(4, 3)
      .setStartingPosition(1, 1)
      .setGoal(3, 2)
      .addObstacle(3, 1)
      .addObstacle(1, 2)
      .build();
    const chacoch = new Chacoch(level.startingPosition);
    return new Game({ level, chacoch });
  }
}
