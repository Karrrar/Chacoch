import { LevelBuilder } from "./LevelBuilder";
import Chacoch from "./GameObjects/Chacoch";
import Game from "./GameObjects/Game";

export default class LevelFactory {
  static getLevel(lvl: number) {
    switch (lvl) {
      case 0:
        return this.levelZero();
      case 1:
        return this.levelOne();
      case 2:
        return this.levelTwo();
      case 3:
        return this.levelThree();
      case 4:
        return this.levelFour();
      case 5:
        return this.levelFive();
      default:
        throw new Error("No level found");
    }
  }

  private static levelZero(): Game {
    const level = new LevelBuilder()
      .setDimensions(5, 5)
      .setStartingPosition(1, 1)
      .setGoal(3, 3)
      .addObstacle(2, 3)
      .addObstacle(4, 3)
      .build();
    const chacoch = new Chacoch(level.startingPosition);
    return new Game({ level, chacoch });
  }
  private static levelThree(): Game {
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

  private static levelOne(): Game {
    const lb = new LevelBuilder()
      .setDimensions(5, 5)
      .setGoal(3, 3)
      .setStartingPosition(1, 1);
    for (let i = 1; i <= 5; i++) {
      for (let j = 1; j <= 5; j++) {
        if (i == 1 && j == 1) continue;
        if (i == 2 && j == 1) continue;
        if (i == 3 && j == 1) continue;
        if (i == 3 && j == 2) continue;
        if (i == 3 && j == 3) continue;
        lb.addObstacle(i, j);
      }
    }
    const level = lb.build();
    const chacoch = new Chacoch(level.startingPosition);
    return new Game({ level, chacoch });
  }

  private static levelTwo(): Game {
    const lb = new LevelBuilder()
      .setDimensions(5, 5)
      .setGoal(3, 3)
      .setStartingPosition(1, 5);
    for (let i = 1; i <= 5; i++) {
      for (let j = 1; j <= 5; j++) {
        if (i == 1 && j == 5) continue;
        if (i == 2 && j == 5) continue;
        if (i == 3 && j == 5) continue;
        if (i == 3 && j == 4) continue;
        if (i == 3 && j == 3) continue;
        lb.addObstacle(i, j);
      }
    }
    const level = lb.build();
    const chacoch = new Chacoch(level.startingPosition);
    return new Game({ level, chacoch });
  }

  private static levelFour(): Game {
    const lb = new LevelBuilder()
      .setDimensions(3, 45)
      .setGoal(45, 2)
      .setStartingPosition(1, 2);
    const level = lb.build();
    const chacoch = new Chacoch(level.startingPosition);
    return new Game({ level, chacoch });
  }
  private static levelFive(): Game {
    const lb = new LevelBuilder()
      .setDimensions(5, 10)
      .setGoal(1, 5)
      .setStartingPosition(1, 2);
    for (let i = 1; i < 9; i++) {
      lb.addObstacle(i, 3);
      lb.addObstacle(i, 1);
      lb.addObstacle(i + 1, 5);
      if (i < 6) lb.addObstacle(10, i);
    }
    lb.addObstacle(9, 1);
    const level = lb.build();
    const chacoch = new Chacoch(level.startingPosition);
    return new Game({ level, chacoch });
  }
}
