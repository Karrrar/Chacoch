import Chacoch from "@/chacoch/GameObjects/Chacoch";
import GameObject from "@/chacoch/GameObjects/GameObject";
import Level from "@/chacoch/GameObjects/Level";
import Obstacle from "@/chacoch/GameObjects/Obstacle";
import { LevelBuilder } from "@/chacoch/LevelBuilder";

describe("Chacoch collisions", () => {
  test("collide with an game object should return true", () => {
    // Arrange
    const chacoch = new Chacoch();
    const obstacle = new GameObject({ x: 0, y: 0 });

    // Act
    const isCollided = chacoch.collidesWith(obstacle);

    // Assert
    expect(isCollided).toBeTruthy();
  });

  test("collide with an obstacle should return true", () => {
    // Arrange
    const chacoch = new Chacoch();
    const obstacle = new Obstacle({ x: 0, y: 0 });

    // Act
    const isCollided = chacoch.collidesWith(obstacle);

    // Assert
    expect(isCollided).toBeTruthy();
  });

  describe("Check forward", () => {
    const level = new LevelBuilder()
      .setDimensions(4, 3)
      .setStartingPosition(1, 1)
      .setGoal(4, 3)
      .addObstacle(3, 1)
      .addObstacle(1, 2)
      .build();
    const chacoch = new Chacoch(level.startingPosition);

    test("Chacoch check forward is true when no obstacle in front of it", () => {
      // Arrange
      // Act
      const isClear = chacoch.isCanMoveForward(level);

      // Assert
      expect(isClear).toBeTruthy();
    });

    test("Chacoch can not move forward if obstacle in front of it", () => {
      // Arrange
      chacoch.move();
      // Act
      const isClear = chacoch.isCanMoveForward(level);

      // Assert
      expect(isClear).toBeFalsy();
    });
    test("Chacoch can not move forward if wall in front of it", () => {
      // Arrange
      chacoch.turnLeft();
      // Act
      const isClear = chacoch.isCanMoveForward(level);

      // Assert
      expect(isClear).toBeFalsy();
    });
  });
});
