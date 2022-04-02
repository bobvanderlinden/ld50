import GameObject from '../engine/game-object';

export default class Background extends GameObject {
  constructor({ image, game }) {
    super({ x: 0, y: 0 });
    this.image = image;
    this.game = game;
  }

  draw(g) {
    const halfWidth = this.game.width / 2;
    const halfHeight = this.game.height / 2;
    g.drawImage(this.image,
      0, 0, this.image.width, this.image.height,
      -1 * halfWidth, -1 * halfHeight, this.game.width, this.game.height
    );
  }
}
