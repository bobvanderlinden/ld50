export default class GameplayState {
  constructor({ game, player }) {
    this.game = game;
    this.player = player;
    this.update = this.update.bind(this);
    this.keydown = this.keydown.bind(this);
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

  update(dt, next) {
    function sign(b) {
      return b ? 1 : 0;
    }
    const keys = this.game.keys;
    const x = sign(keys.d) - sign(keys.a);
    const y = sign(keys.s) - sign(keys.w);
    this.player.movement.set(x, y);

    next(dt);
  }
}
