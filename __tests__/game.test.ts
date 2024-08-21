import Chacoch from "@/chacoch/GameObjects/Chacoch";
import Game from "@/chacoch/GameObjects/Game";
import Level from "@/chacoch/GameObjects/Level";

describe("Game tests", () => {
  function createGame(): Game {
    const level = new Level({
      dimensions: { rows: 3, columns: 3 },
      goal: { x: 2, y: 2 },
    });
    const chacoch = new Chacoch();

    return new Game({ level, chacoch });
  }
  const game = createGame();
  test("should have Chacoch and level", () => {
    // Assert
    expect(game.level).not.toBeNull();
    expect(game.chacoch).not.toBeNull();
    expect(game).not.toBeNull();
  });

  test("Game should start with isGameOver false", () => {
    expect(game.isGameOver).toBeFalsy();
  });

  test("Game should start with isComplete false", () => {
    expect(game.isComplete).toBeFalsy();
  });

  test("Chacoch can move right in map bounds in x", () => {
    // Arrange
    const chacoch = new Chacoch();

    chacoch.move();
    chacoch.move();

    // Act
    const isWithinBounds = chacoch.isWithinBounds(
      game.level.dimensions.rows,
      game.level.dimensions.columns
    );

    expect(isWithinBounds).toBeTruthy();
  });

  test("Chacoch can move down in map bounds", () => {
    // Arrange
    const chacoch = new Chacoch();
    chacoch.turnRight();
    chacoch.move();
    chacoch.move();
    chacoch.move();

    // Act
    const isWithinBounds = chacoch.isWithinBounds(
      game.level.dimensions.rows,
      game.level.dimensions.columns
    );

    expect(isWithinBounds).toBeTruthy();
  });

  test("Chacoch  moving right will fail of the map when it out of map bounds", () => {
    // Arrange
    const chacoch = new Chacoch();
    chacoch.move();
    chacoch.move();
    chacoch.move();
    chacoch.move();

    // Act
    const isWithinBounds = chacoch.isWithinBounds(
      game.level.dimensions.rows,
      game.level.dimensions.columns
    );

    expect(isWithinBounds).toBeFalsy();
  });

  test("Chacoch  moving right will fail of the map when it out of map bounds", () => {
    // Arrange
    const chacoch = new Chacoch();
    chacoch.turnRight();
    chacoch.turnRight();
    chacoch.move();

    // Act
    const isWithinBounds = chacoch.isWithinBounds(
      game.level.dimensions.rows,
      game.level.dimensions.columns
    );

    expect(isWithinBounds).toBeFalsy();
  });

  test("Chacoch moving down will fail of the map when it out of map bounds", () => {
    // Arrange
    const chacoch = new Chacoch();
    chacoch.turnRight();
    chacoch.move();
    chacoch.move();
    chacoch.move();
    chacoch.move();

    // Act
    const isWithinBounds = chacoch.isWithinBounds(
      game.level.dimensions.rows,
      game.level.dimensions.columns
    );

    expect(isWithinBounds).toBeFalsy();
  });

  test("Chacoch moving up will fail of the map when it out of map bounds", () => {
    // Arrange
    const chacoch = new Chacoch();
    chacoch.turnRight();
    chacoch.turnRight();
    chacoch.turnRight();
    chacoch.move();

    // Act
    const isWithinBounds = chacoch.isWithinBounds(
      game.level.dimensions.rows,
      game.level.dimensions.columns
    );

    expect(isWithinBounds).toBeFalsy();
  });

  test("When Chacoch fail of the map the is game over ", () => {
    // Arrange
    const game = createGame();

    //Act
    game.chacoch.turnRight();
    game.chacoch.turnRight();
    game.chacoch.move();

    game.update();

    // Assert
    expect(game.isGameOver).toBeTruthy();
  });

  test("When Chacoch reach the goal game is complete", () => {
    // Arrange
    const game = createGame();

    //Act
    game.chacoch.move();
    game.chacoch.move();
    game.chacoch.turnRight();
    game.chacoch.move();
    game.chacoch.move();

    game.update();

    // Assert
    expect(game.isComplete).toBeTruthy();
  });
});
