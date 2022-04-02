"use strict";
import platform from "./platform.js";
import Game from "./game.js";
import Vector from "./vector.js";
import state from "./state.js";
import LevelSystem from "./levelsystem.js";
import collision from "./collision.js";
import keyboard from "./keyboard.js";
import quake from "./quake.js";
import resources from "./resources.js";
import TouchSystem from "./touchsystem.js";
import Camera from "./camera.js";
import AutoRefresh from "./autorefresh.js";
import Mouse from "./mouse.js";
import EditorState from "./editorstate.js";

var rs = {
  audio: [
    "test",
  ],
  images: [
    "test",
  ],
};
var g, game;
platform.once("load", () => {
  var canvas = document.getElementById("main");
  game = g = new Game(startGame, canvas, [
    keyboard,
    resources(rs),
    state,
    collision,
    quake,
  ]);

  game.mouse = new Mouse({ game });

  g.resources.status.on("changed", () => {
    g.graphics.context.clearRect(0, 0, game.width, game.height);
    g.graphics.context.fillStyle = "black";
    g.graphics.context.font = "arial";
    g.graphics.fillCenteredText(
      `Preloading ${g.resources.status.ready} / ${g.resources.status.total}...`,
      400,
      300
    );
  });
});

function startGame(err) {
  if (err) {
    console.error(err);
  }

  var images = g.resources.images;
  // var audio = g.resources.audio;
  g.objects.lists.player = g.objects.createIndexList("player");

  // function pickRandom(arr) {
  //   return arr[(arr.length * Math.random()) | 0];
  // }

  // Auto-refresh
  game.autoRefresh = new AutoRefresh({ game });
  // game.autoRefresh.enable();

  // Camera
  game.camera = new Camera({ game });

  // Touching
  game.touchSystem = new TouchSystem({ game, debug: false });

  game.levelSystem = new LevelSystem({ game });

  game.chains.draw.push((g, next) => {
    g.save();
    g.context.translate(-1024, 0);

    g.context.fillStyle = "#0fb0fe";
    g.context.fillRect(
      0,
      game.camera.y - (game.height / game.camera.getPixelsPerMeter()) * 0.5,
      2048,
      game.height / game.camera.getPixelsPerMeter()
    );

    g.restore();
    next(g);
  });

  (function () {
    game.chains.draw.push((g, next) => {
      // TODO: Draw!
      next(g);
    });
  })();

  //#gameobjects

  class GameObject {
    constructor({ x, y }) {
      this.position = new Vector(x, y);
    }
  }

  class Start extends GameObject {
    start = true;
    export = true;
    editorVisible = true;

    drawForeground(g) {
      g.drawCenteredImage(images.test, this.position.x, this.position.y);
    }
  }

  class Player extends GameObject {
    constructor({ x, y }) {
      super({ x, y });
      this.image = images["test"];
      this.velocity = new Vector(0, 0);
      this.position = new Vector(0, 0);
    }

    drawForeground(g) {
      g.save();
      g.context.translate(this.position.x, this.position.y);
      g.context.scale(this.flipped ? -1 : 1, 1);
      g.drawCenteredImage(this.image, 0, 0);
      g.restore();
    }

    update(dt) {
      this.flipped = moving ? direction < 0 : this.flipped;
      this.velocity.x = this.velocity.x * 0.9 + direction * speed * 0.1;
      this.velocity.y = this.sinkRate;
      this.position.addV(this.velocity.clone().multiply(dt * slowStart));
    }

    touch(other) {
    }
  }

  class GameplayState {
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

  //#states

  // function level_sym1() {
  //   return {
  //     name: "Level 1",
  //     objects: [
  //     ],
  //     clone: level_sym1,
  //     nextLevel: level_sym2,
  //   };
  // }

  const player = new Player({ x: 0, y: 0 });
  game.changeState(new GameplayState({ game, player }));
  game.start();
  window.game = game;
}
