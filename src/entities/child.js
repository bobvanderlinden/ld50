import Person from "./person";
import { lerp } from "../engine/math";

export default class Child extends Person {
  collisionRadius = 20;
  constructor({ x, y, image, origin, getRandomPosition }) {
    super({ x, y, image, origin });
    this.time = lerp(1, 5, Math.random());
    this.getRandomPosition = getRandomPosition;
  }

  update(dt) {
    super.update(dt);
    this.time -= dt;
    if (this.state === "Walking") {
      this.velocity
        .setV(this.targetPosition)
        .substractV(this.position)
        .normalizeOrZero()
        .multiply(100);
    } else if (this.state === "Idle") {
      this.velocity.set(0, 0);
    }
    if (this.time > 0) return;
    this[`transitionFrom${this.state}`](dt);
  }

  transitionFromIdle(dt) {
    this.state = "Walking";
    this.time = lerp(0.5, 2, Math.random());
    this.targetPosition = this.getRandomPosition();
  }

  transitionFromWalking(dt) {
    this.state = "Idle";
    this.time = lerp(3, 5, Math.random());
    this.velocity.set(0, 0);
  }

  touch(other) {}
}
