import GameObject from "./GameObject";
import { Position } from "../types";

export default class Obstacle extends GameObject {
  constructor(position: Position) {
    super(position);
  }
}
