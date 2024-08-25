import { LevelBuilder } from "@/chacoch/LevelBuilder";

describe("Level builder", () => {
  test("should add starting position", () => {
    // Arrange
    const lb = new LevelBuilder();

    // Act
    lb.setStartingPosition(2, 5);
    const lvl = lb.build();

    // Assert
    expect(lvl.startingPosition).toEqual({ x: 2, y: 5 });
  });

  test("should add obstacles", () => {
    // Arrange
    const lb = new LevelBuilder();

    // Act
    lb.addObstacle(3, 4).addObstacle(3, 5);
    const lvl = lb.build();

    // Assert
    expect(lvl.obstacles.length).toBe(2);
  });

  test("should set dimensions", () => {
    // Arrange
    const lb = new LevelBuilder();

    // Act
    lb.setDimensions(5, 6);
    const lvl = lb.build();

    // Assert
    expect(lvl.dimensions).toEqual({ rows: 5, columns: 6 });
  });

  test("should set goal and dimension", () => {
    // Arrange
    const lb = new LevelBuilder();

    // Act
    lb.setDimensions(5, 6).setGoal(1, 2);
    const lvl = lb.build();

    // Assert
    expect(lvl.dimensions).toEqual({ rows: 5, columns: 6 });
    expect(lvl.goal).toEqual({ x: 1, y: 2 });
  });
});
