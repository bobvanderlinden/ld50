"use strict";
import platform from "./engine/platform.js";
import Game from "./engine/game.js";
import state from "./engine/state.js";
import LevelSystem from "./engine/levelsystem.js";
import collision from "./engine/collision.js";
import keyboard from "./engine/keyboard.js";
import quake from "./engine/quake.js";
import resources from "./engine/resources.js";
import TouchSystem from "./engine/touchsystem.js";
import Camera from "./engine/camera.js";
import AutoRefresh from "./engine/autorefresh.js";
import Mouse from "./engine/mouse.js";
import EditorState from "./engine/editorstate.js";
import Player from './entities/player';

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

  const player = new Player({ x: 0, y: 0, sprite: images["test"] });
  game.changeState(new GameplayState({ game, player }));
  game.start();
  window.game = game;
}
