import GameObject from '../engine/game-object';
import Vector from '../engine/vector';

export default class Player extends GameObject {
  collisionRadius = 40;
  constructor({ x, y, image }) {
    super({ x, y });
    this.image = image;
    this.velocity = new Vector(0, 0);
    this.position = new Vector(x, y);
    this.movement = new Vector(0, 0);
  }

  draw(g) {
    g.save();
    g.context.translate(this.position.x, this.position.y);
    g.context.scale(this.flipped ? -1 : 1, 1);
    g.drawCenteredImage(this.image, 0, 0);
    g.restore();
  }

  update(dt) {
    this.velocity.setV(this.movement.clone().multiply(100));
    this.position.addV(this.velocity.clone().multiply(dt));
  }

  touch(other) {
  }
}
