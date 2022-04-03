import Person from "./person";
import { lerp } from "../engine/math";
import Player from "./player";
import Vector from "../engine/vector";

export default class Child extends Person {
  kid = true;
  collisionRadius = 20;
  touchable = true;
  touchRadius = 21;
  bobAngle = 0.1;
  areaRadius = 500;

  constructor({ x, y, image, exclamation, tears, origin }) {
    super({ x, y, image, origin });
    this.exclamation = exclamation;
    this.tears = tears;
    this.time = lerp(1, 5, Math.random());
    this.areaCenter = new Vector(x, y);
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
      this.angle = 0;
    }
    if (this.time > 0) return;
    this[`transitionFrom${this.state}`]();
  }

  transitionFromIdle() {
    this.state = "Walking";
    this.time = lerp(0.5, 2, Math.random());
    this.targetPosition = new Vector(this.areaRadius, 0)
      .rotate(Math.random() * Math.PI * 2)
      .addV(this.areaCenter);
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
    this.time = 99999;
  }

  draw(g) {
    super.draw(g);

    if (this.state === "Panic") {
      const tears = this.tears[(this.time * 3) % this.tears.length | 0];
      g.drawCenteredImage(tears, this.position.x, this.position.y - 113);

      g.drawCenteredImage(
        this.exclamation,
        this.position.x,
        this.position.y - 200
      );
    }
  }

  drawDebug(g) {
    g.strokeStyle("blue");
    g.strokeCircle(this.areaCenter.x, this.areaCenter.y, this.areaRadius);

    if (this.targetPosition) {
      g.strokeCross(this.targetPosition.x, this.targetPosition.y, 20);
    }
  }
}
