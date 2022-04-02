import Person from "./person";
import { lerp } from "../engine/math";
import Player from "./player";

export default class Child extends Person {
  collisionRadius = 20;
  constructor({ x, y, image, exclamation, origin, getRandomPosition }) {
    super({ x, y, image, origin });
    this.exclamation = exclamation;
    this.time = lerp(1, 5, Math.random());
    this.getRandomPosition = getRandomPosition;
    this.kid = true;
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
    } else if (this.state === "Panic") {
      this.velocity.set(0, 0);
    }
    if (this.time > 0) return;
    this[`transitionFrom${this.state}`]();
  }

  transitionFromIdle() {
    this.state = "Walking";
    this.time = lerp(0.5, 2, Math.random());
    this.targetPosition = this.getRandomPosition();
  }

  transitionFromWalking() {
    this.state = "Idle";
    this.time = lerp(3, 5, Math.random());
    this.velocity.set(0, 0);
  }

  transitionFromPanic() {
    // TODO: What should this kid do when it has paniced?
    this.transitionFromIdle();
  }

  touch(other) {
    if (other instanceof Player) {
      this.transitionFromIdle();
    }
  }

  panic() {
    this.state = "Panic";
    this.time = 5;
  }

  draw(g) {
    super.draw(g);

    if (this.state === "Panic") {
      g.drawCenteredImage(
        this.exclamation,
        this.position.x,
        this.position.y - 200
      );
    }
  }
}
