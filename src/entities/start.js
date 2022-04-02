import GameObject from '../engine/game-object';

export default class Start extends GameObject {
  start = true;
  export = true;
  editorVisible = true;

  drawForeground(g) {
    g.drawCenteredImage(images.test, this.position.x, this.position.y);
  }
}
