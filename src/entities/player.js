import Person from "./person";
import Vector from "../engine/vector";

export default class Player extends Person {
  collisionRadius = 40;
  touchable = true;
  touchRadius = 41;
  constructor({ x, y, image, origin }) {
    super({ x, y, image, origin });
    this.movement = new Vector(0, 0);
    this.bobAngle = 0.05;
  }

  update(dt) {
    super.update(dt);
    this.velocity.setV(this.movement.clone().multiply(100));

    if (this.movement.x != 0 || this.movement.y != 0) this.state = "Walking";
    else this.state = "Idle";
  }

  touch(other) {}
}
