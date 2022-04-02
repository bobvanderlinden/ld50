import GameObject from '../engine/game-object';
import Vector from '../engine/vector';

export default class Player extends GameObject {
  constructor({ x, y, sprite }) {
    super({ x, y });
    this.image = sprite;
    this.velocity = new Vector(0, 0);
    this.position = new Vector(0, 0);
  }

  drawForeground(g) {
    g.save();
    g.context.translate(this.position.x, this.position.y);
    g.context.scale(this.flipped ? -1 : 1, 1);
    g.drawCenteredImage(this.image, 0, 0);
    g.restore();
  }

  update(dt) {
    this.flipped = moving ? direction < 0 : this.flipped;
    this.velocity.x = this.velocity.x * 0.9 + direction * speed * 0.1;
    this.velocity.y = this.sinkRate;
    this.position.addV(this.velocity.clone().multiply(dt * slowStart));
  }

  touch(other) {
  }
}
