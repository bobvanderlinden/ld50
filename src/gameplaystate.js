import { lerp, pickRandom } from "./engine/math";

export default class GameplayState {
  constructor({ game, player, onFail, onSuccess }) {
    this.game = game;
    this.player = player;
    this.panicOMeterValue = 0;
    this.time = 30;
    this.onFail = onFail;
    this.onSuccess = onSuccess
    this.draw = this.draw.bind(this);
    this.update = this.update.bind(this);
    this.keydown = this.keydown.bind(this);
    this.resetPanicCountdown();
  }

  enable() {
    this.game.chains.update.push(this.update);
    this.game.chains.draw.push(this.draw);
    this.game.on("keydown", this.keydown);
  }

  disable() {
    this.game.chains.update.remove(this.update);
    this.game.chains.draw.remove(this.draw);
    this.game.removeListener("keydown", this.keydown);
  }

  keydown(key) {}

  update(dt, next) {
    this.updateMovement(dt);
    this.updatePanicKids(dt);
    this.updatePanicOMeter(dt);
    this.time -= dt;
    if (this.time <= 0) {
      this.onSuccess();
    }
    next(dt);
  }

  updateMovement(dt) {
    function sign(b) {
      return b ? 1 : 0;
    }
    const keys = this.game.keys;
    const x = sign(keys.d) - sign(keys.a);
    const y = sign(keys.s) - sign(keys.w);
    this.player.movement.set(x, y);
  }

  updatePanicKids(dt) {
    this.panicCountdown -= dt;
    if (this.panicCountdown <= 0) {
      this.panicChild();
    }
  }

  updatePanicOMeter(dt) {
    // Get amount of panic
    let panicOMeter = 0;
    for (const kid of this.game.objects.lists.kids) {
      panicOMeter += kid.state == "Panic" ? 1 : 0;
    }
    panicOMeter = panicOMeter / 5;

    if (panicOMeter > this.panicOMeterValue) this.panicOMeterValue += dt;
    if (panicOMeter < this.panicOMeterValue) this.panicOMeterValue -= dt;

    if (this.panicOMeterValue >= 1) {
      this.onFail();
    }
  }

  draw(g, next) {
    // Recess Timer
    this.drawClock(g);
    // Show it on the Panic'O'Meter™️
    const panic = this.game.resources.images["panic_o_meter"];
    const needle = this.game.resources.images["needle"];
    g.drawCenteredImage(panic, 2650, 100);
    g.save();
    g.context.translate(2648, 155);
    g.context.rotate(
      lerp(-0.9 * Math.PI, -0.1 * Math.PI, this.panicOMeterValue)
    );
    g.drawImage(needle, -134, -11);
    g.restore();
    next(g);
  }

  panicChild() {
    const kids = [...this.game.objects.lists.kids].filter(
      (kid) => kid.state !== "Panic"
    );
    const kid = pickRandom(kids);

    kid.panic();

    this.resetPanicCountdown();
  }

  drawClock(g) {
    const clockBackground = this.game.resources.images["clock_background"];
    g.drawCenteredImage(clockBackground, 200, 200);
    g.fillStyle('#7CFC00');
    g.fillLoading(200, 200, 130, -this.time/30)
    const clockStripes = this.game.resources.images["clock_stripes"];
    g.drawCenteredImage(clockStripes, 200, 200);
    const clockHand = this.game.resources.images["clock_hand"]
    g.rotate(200, 200, -this.time/30*Math.PI*2-0.5*Math.PI, ()=>{
      g.drawCenteredImage(clockHand, 200, 200);
    } )
  }

  resetPanicCountdown() {
    this.panicCountdown = lerp(10, 15, Math.random());
  }
}
