import GameObject from "../engine/game-object";
import Vector from "../engine/vector";

export default class Thing extends GameObject {
  mass = 1000;

  constructor({ x, y, image, origin, collisionRadius }) {
    super({ x, y, collisionRadius });
    if (!origin) origin = new Vector(image.width / 2, image.height);
    this.image = image;
    this.origin = origin;
    this.velocity = new Vector(0, 0);
    this.collisionRadius = collisionRadius || 80;
  }

  draw(g) {
    g.save();
    g.context.translate(this.position.x, this.position.y);
    g.drawImage(this.image, -this.origin.x, -this.origin.y);
    g.restore();
  }
}
