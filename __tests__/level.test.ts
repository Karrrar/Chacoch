import Chacoch from "@/chacoch/GameObjects/Chacoch";
import Level from "@/chacoch/GameObjects/Level";
import Obstacle from "@/chacoch/GameObjects/Obstacle";
describe("Level test", () => {
  const level = new Level({
    dimensions: { rows: 2, columns: 2 },
    goal: { x: 2, y: 2 },
    startingPosition: { x: 1, y: 1 },
  });
  test("should have obstacles", () => {
    // Arrange
    expect(level.obstacles).not.toBeNull();
  });

  test("should have starting position", () => {
    // Arrange
    expect(level.startingPosition).toEqual({ x: 1, y: 1 });
  });

  test("Add Obstacle to level", () => {
    // Arrange

    // Act
    level.addObstacle(new Obstacle({ x: 1, y: 1 }));

    // Assert
    expect(level.obstacles.length).toBe(1);
    expect(level.obstacles[0].position).toEqual({ x: 1, y: 1 });
  });

  test("should have rows and cols greater than 2x2", () => {
    // Arrange
    const dim00 = { rows: 0, columns: 0 };
    const dim04 = { rows: 0, columns: 0 };
    const dim30 = { rows: 0, columns: 0 };
    const startingPosition = { x: 0, y: 0 };
    const goal = { x: 2, y: 2 };

    // Assert
    expect(
      () => new Level({ dimensions: dim00, goal, startingPosition })
    ).toThrow();
    expect(
      () => new Level({ dimensions: dim04, goal, startingPosition })
    ).toThrow();
    expect(
      () => new Level({ dimensions: dim30, goal, startingPosition })
    ).toThrow();
  });

  test("should have goal", () => {
    // Assert
    const goal = { x: 3, y: 4 };
    const startingPosition = { x: 0, y: 0 };

    // Act
    const level = new Level({
      dimensions: { rows: 3, columns: 3 },
      goal,
      startingPosition,
    });

    // Assert
    expect(level.goal.x).toBe(3);
    expect(level.goal.y).toBe(4);
  });

  test("Level isComplete will be true when Chacoch reach the goal", () => {
    // Arrange
    const char = new Chacoch();
    const goal = { x: 2, y: 0 };
    const startingPosition = { x: 0, y: 0 };
    const level = new Level({
      dimensions: { rows: 3, columns: 3 },
      goal,
      startingPosition,
    });
    // Move Chacoch to the goal
    char.move();
    char.move();

    // Act
    const isComplete = level.isGoalReached(char);

    //Assert
    expect(isComplete).toBeTruthy();
  });
});
