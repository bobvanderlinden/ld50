import Vector from "./vector.js";

class Camera extends Vector {
  zoom = 1;

  constructor({ game, worldWidth }) {
    super(0, 0);
    this.game = game;
    this.worldWidth = worldWidth ?? game.width;
    this.draw = this.draw.bind(this);

    this.game.chains.draw.camera = this.draw;
    this.game.chains.draw.insertBefore(
      this.draw,
      this.game.chains.draw.objects
    );
    this.reset();
  }

  screenToWorld(screenV, out) {
    var ptm = this.getPixelsPerMeter();
    out.x = screenV.x / ptm + this.game.camera.x;
    out.y = screenV.y / ptm + this.game.camera.y;
  }

  getPixelsPerMeter() {
    const worldWidth = this.worldWidth;
    const screenWidth = this.game.width;
    const fraction = screenWidth / worldWidth;
    return fraction / this.game.camera.zoom;
  }

  reset() {
    this.x = 0;
    this.y = 0;
  }

  draw(g, next) {
    var ptm = this.getPixelsPerMeter();

    // Transform viewport to match camera.
    g.save();
    g.context.scale(ptm, ptm);
    g.context.lineWidth /= ptm;

    // Keep camera X/Y in center of view.
    // g.context.translate(
    //   (this.game.width / ptm) * 0.5,
    //   (this.game.height / ptm) * 0.5
    // );

    g.context.translate(this.x, -this.y);

    next(g);

    g.restore();
  }
}

export default Camera;
