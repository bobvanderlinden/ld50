import GameObject from "../engine/game-object";
import Vector from "../engine/vector";
import { lerp } from "../engine/math";

export default class Person extends GameObject {
  constructor({ x, y, image, origin }) {
    super({ x, y });
    if (!origin) origin = new Vector(image.width / 2, image.height - 10);
    this.origin = origin;
    this.image = image;
    this.velocity = new Vector(0, 0);
    this.position = new Vector(x, y);
    this.state = "Idle";
    this.angle = 0;
    this.animationTime = 0;
    this.bobAngle = 0.1;
  }

  draw(g) {
    g.save();
    g.context.translate(this.position.x, this.position.y);
    g.context.scale(this.flipped ? -1 : 1, 1);
    g.context.rotate(this.angle);
    g.drawImage(this.image, -this.origin.x, -this.origin.y);
    g.restore();
  }

  update(dt) {
    this.position.addV(this.velocity.clone().multiply(dt));
    this.walkingAnimation(dt);
  }

  walkingAnimation(dt) {
    this.animationTime += dt;
    switch(this.state) {
      case 'Idle':
        this.angle = 0;
        break;
      case 'Walking':
        this.angle = this.animationTime % 0.5 > 0.2 ? -this.bobAngle : this.bobAngle;
        break;
    }
  }

}
