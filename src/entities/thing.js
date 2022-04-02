import GameObject from "../engine/game-object";
import Vector from "../engine/vector";

export default class Thing extends GameObject {
  constructor({ x, y, image, origin }) {
    super({ x, y });
    if (!origin) origin = new Vector(image.width / 2, image.height);
    this.image = image;
    this.origin = origin;
  }

  draw(g) {
    g.save();
    g.context.translate(this.position.x, this.position.y);
    g.drawImage(this.image, -this.origin.x, -this.origin.y);
    g.restore();
  }
}
