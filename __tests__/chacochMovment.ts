import Chacoch from "@/chacoch/GameObjects/Chacoch";

describe("Chacoch movement", () => {
  test("Starting position must be at x:0, y:0", () => {
    // Arrange
    const chacoch = new Chacoch();

    // Assert
    expect(chacoch.position).toEqual({ x: 0, y: 0 });
  });

  test("Starting direction must be 90", () => {
    // Arrange
    const chacoch = new Chacoch();

    // Assert
    expect(chacoch.direction).toBe(90);
  });

  describe("Turn right", () => {
    test("Move will change the position x by 1", () => {
      // Arrange
      const chacoch = new Chacoch();

      // Act
      chacoch.move();

      // Assert
      expect(chacoch.position).toEqual({ x: 1, y: 0 });
    });

    test("Turn right will change direction to 180", () => {
      // Arrange
      const chacoch = new Chacoch();

      // Act
      chacoch.turnRight();

      // Assert
      expect(chacoch.direction).toBe(180);
    });

    test("Turn right twice will change direction to 270", () => {
      // Arrange
      const chacoch = new Chacoch();

      // Act
      chacoch.turnRight();
      chacoch.turnRight();

      // Assert
      expect(chacoch.direction).toBe(270);
    });

    test("Turn right three times will change direction to 0", () => {
      // Arrange
      const chacoch = new Chacoch();

      // Act
      chacoch.turnRight();
      chacoch.turnRight();
      chacoch.turnRight();

      // Assert
      expect(chacoch.direction).toBe(0);
    });

    test("Turn right four times will change direction to 90", () => {
      // Arrange
      const chacoch = new Chacoch();

      // Act
      chacoch.turnRight();
      chacoch.turnRight();
      chacoch.turnRight();
      chacoch.turnRight();

      // Assert
      expect(chacoch.direction).toBe(90);
    });
  });

  describe("Turn left", () => {
    test("Turn left will change direction to 0", () => {
      // Arrange
      const chacoch = new Chacoch();

      // Act
      chacoch.turnLeft();

      // Assert
      expect(chacoch.direction).toBe(0);
    });

    test("Turn left twice will change direction to 270", () => {
      // Arrange
      const chacoch = new Chacoch();

      // Act
      chacoch.turnLeft();
      chacoch.turnLeft();

      // Assert
      expect(chacoch.direction).toBe(270);
    });

    test("Turn left 3 times will change direction to 180", () => {
      // Arrange
      const chacoch = new Chacoch();

      // Act
      chacoch.turnLeft();
      chacoch.turnLeft();
      chacoch.turnLeft();

      // Assert
      expect(chacoch.direction).toBe(180);
    });

    test("Turn left 3 times will change direction to 90", () => {
      // Arrange
      const chacoch = new Chacoch();

      // Act
      chacoch.turnLeft();
      chacoch.turnLeft();
      chacoch.turnLeft();
      chacoch.turnLeft();

      // Assert
      expect(chacoch.direction).toBe(90);
    });
  });

  test("Turn right then move and repeat three times will change position to x:1, y:1", () => {
    // Arrange
    const chacoch = new Chacoch();

    // Act
    chacoch.move();
    chacoch.turnRight();
    chacoch.move();
    chacoch.turnRight();
    chacoch.move();

    // Assert
    expect(chacoch.position).toEqual({ x: 0, y: 1 });
  });

  test("Move three time will change the position to x: 3, y:0", () => {
    // Arrange
    const chacoch = new Chacoch();

    // Act
    chacoch.move();
    chacoch.move();
    chacoch.move();

    // Assert
    expect(chacoch.position).toEqual({ x: 3, y: 0 });
  });
});
