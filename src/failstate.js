export default class FailState {
  constructor({ game, onNext }) {
    this.game = game;
    this.onNext = onNext;
    this.update = this.update.bind(this);
    this.draw = this.draw.bind(this);
    this.keydown = this.keydown.bind(this);
  }

  enable() {
    this.game.chains.draw.insertBefore(
      this.draw,
      this.game.chains.draw.objects
    );
    this.game.chains.update.unshift(this.update);
    this.game.on("keydown", this.keydown);
  }

  disable() {
    this.game.chains.draw.remove(this.draw);
    this.game.chains.update.remove(this.update);
    this.game.removeListener("keydown", this.keydown);
  }

  keydown(key) {
    console.log(key);
    if (key === "space") {
      this.onNext();
    }
  }

  update(dt, next) {}

  draw(g, next) {
    g.drawImage(this.game.resources.images["failed"], 0, 0);
  }
}
