import Person from "./person";
import { lerp } from "../engine/math";

export default class Child extends Person {
  constructor({ x, y, image, origin }) {
    super({ x, y, image, origin });
    this.time = lerp(1, 5, Math.random());
  }

  update(dt) {
    super.update(dt);
    this.time -= dt;
    if (this.time > 0) return;
    this[`transitionFrom${this.state}`](dt);
  }

  transitionFromIdle(dt) {
    this.state = 'Walking';
    this.time = lerp(0.5, 2, Math.random());
    const speed = lerp(50, 200, Math.random());
    this.velocity.set(speed, 0);
    this.velocity.rotate(Math.random() * Math.PI * 2);
  }

  transitionFromWalking(dt) {
    this.state = 'Idle';
    this.time = lerp(3, 5, Math.random());
    this.velocity.set(0, 0);
  }

  touch(other) {}
}
