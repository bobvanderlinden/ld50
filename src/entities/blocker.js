import GameObject from "../engine/game-object";
import Vector from "../engine/vector";

export default class Blocker extends GameObject {
  mass = 1000;

  constructor({ x, y, collisionRadius }) {
    super({ x, y });
    this.velocity = new Vector(0, 0);
    this.collisionRadius = collisionRadius;
  }
}
