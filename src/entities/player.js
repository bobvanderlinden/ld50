import GameObject from '../engine/game-object';
import Vector from '../engine/vector';

export default class Player extends GameObject {
  constructor({ x, y, image }) {
    super({ x, y });
    this.image = image;
    this.velocity = new Vector(0, 0);
    this.position = new Vector(x, y);
  }

  draw(g) {
    g.save();
    g.context.translate(this.position.x, this.position.y);
    g.context.scale(this.flipped ? -1 : 1, 1);
    g.drawCenteredImage(this.image, 0, 0);
    g.restore();
  }

  update(dt) {
    this.position.addV(this.velocity.clone().multiply(dt));
  }

  touch(other) {
  }
}
