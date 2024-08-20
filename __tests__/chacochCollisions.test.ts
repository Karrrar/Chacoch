import Chacoch from "@/chacoch/GameObjects/Chacoch";
import GameObject from "@/chacoch/GameObjects/GameObject";
import Obstacle from "@/chacoch/GameObjects/Obstacle";

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
});
