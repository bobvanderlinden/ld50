import Vector from "./vector.js";

class Mouse extends Vector {
  over = false;
  buttons = {};
  constructor({ game, debug }) {
    super(0, 0);
    this.game = game;

    this.mouseup = this.mouseup.bind(this);
    this.mousedown = this.mousedown.bind(this);
    this.mousemove = this.mousemove.bind(this);
    this.mousewheel = this.mousewheel.bind(this);
    this.DOMMouseScroll = this.DOMMouseScroll.bind(this);

    this.game.canvas.addEventListener("pointerup", this.mouseup, true);
    this.game.canvas.addEventListener("pointerdown", this.mousedown, true);
    this.game.canvas.addEventListener("pointermove", this.mousemove, true);
    this.game.canvas.addEventListener("mousewheel", this.mousewheel, true);
    this.game.canvas.addEventListener(
      "DOMMouseScroll",
      this.DOMMouseScroll,
      true
    );

    if (debug) {
      game.chains.draw.push(this.drawDebug);
    }
  }

  getMousePosition(event) {
    const boundingRect = this.game.canvas.getBoundingClientRect();
    const boundingWidth = boundingRect.right - boundingRect.left;
    const boundingHeight = boundingRect.bottom - boundingRect.top;

    const result = new Vector(
      event.pageX - boundingRect.x,
      event.pageY - boundingRect.y
    );

    // Transform coords to game coords.
    result.x *= this.game.width / boundingWidth;
    result.y *= this.game.height / boundingHeight;

    return result;
  }

  mouseup(event) {
    if (this.game.mouse.buttons[event.button]) {
      this.setV(this.getMousePosition(event));

      delete this.buttons[event.button];
      this.game.emit("mouseup", event.button, this.x, this.y);
    }
    return false;
  }

  mousedown(event) {
    if (!this.buttons[event.button]) {
      this.setV(this.getMousePosition(event));

      this.buttons[event.button] = true;
      this.game.emit("mousedown", event.button, this.x, this.y);
    }
    return false;
  }

  mousemove(event) {
    this.setV(this.getMousePosition(event));

    this.game.emit("mousemove", this.x, this.y);
  }

  mousewheel(event) {
    this.setV(this.getMousePosition(event));

    this.game.emit("mousewheel", event.deltaY, this.x, this.y);
  }

  DOMMouseScroll(event) {
    this.setV(this.getMousePosition(event));

    this.game.emit("mousewheel", -event.detail);
  }

  drawDebug(g, next) {
    g.fillStyle(this.buttons.length ? "red" : "blue");
    const worldPos = new Vector();
    this.game.camera.screenToWorld(this, worldPos);
    g.fillCircle(worldPos.x, worldPos.y, 20);

    next(g);
  }
}

export default Mouse;
