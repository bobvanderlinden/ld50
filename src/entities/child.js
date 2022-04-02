import GameObject from "../engine/game-object";
import { lerp } from "../engine/math";
import Vector from "../engine/vector";

export default class Child extends GameObject {
  constructor({ x, y, image }) {
    super({ x, y });
    this.image = image;
    this.velocity = new Vector(0, 0);
    this.position = new Vector(x, y);
    this.state = "Idle";
    this.time = lerp(1, 5, Math.random());
  }

  draw(g) {
    g.save();
    g.context.translate(this.position.x, this.position.y);
    g.context.scale(this.flipped ? -1 : 1, 1);
    g.drawImage(this.image, -this.image.width / 2, -this.image.height);
    g.restore();
  }

  update(dt) {
    this.time -= dt;
    this[`update${this.state}`](dt);

    this.position.addV(this.velocity.clone().multiply(dt));
  }

  updateIdle(dt) {
    if (this.time < 0) {
      this.state = "Walking";
      this.time = lerp(0.5, 2, Math.random());
      this.velocity.set(0, 0);
      return;
    }
  }

  updateWalking(dt) {
    if (this.time < 0) {
      this.state = "Idle";
      this.time = lerp(3, 5, Math.random());
      const speed = lerp(50, 200, Math.random());
      this.velocity.set(speed, 0);
      this.velocity.rotate(Math.random() * Math.PI * 2);
      return;
    }
  }

  touch(other) {}
}
