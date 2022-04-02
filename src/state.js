export default class GameplayState {
  constructor({ game, player }) {
    this.game = game;
    this.player = player;
    this.update = this.update.bind(this);
    this.keydown = this.keydown.bind(this);
    this.pingtime = Math.floor(Math.random() * 15);
  }

  enable() {
    this.game.camera.reset();
    this.game.chains.update.push(this.update);
    this.game.on("keydown", this.keydown);
  }

  disable() {
    this.game.chains.update.remove(this.update);
    this.game.removeListener("keydown", this.keydown);
  }

  keydown(key) {
  }

  update(dt) {
    // Update camera
    // this.game.camera.y = Math.min(
    //   this.player.position.y,
    //   end.bottom -
    //     (this.game.height * 0.5) / this.game.camera.getPixelsPerMeter()
    // );
  }
}
