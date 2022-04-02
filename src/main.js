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
import Player from "./entities/player";
import Child from "./entities/child";
import GameplayState from "./gameplaystate";

var g, game;
var rs = {
  audio: ["test"],
  images: [
    "test",
    "blurred_grass",
    "bush_1",
    "bush_2",
    "bush_3",
    "bushes_1",
    "bushes_2",
    "child_1",
    "child_2",
    "child_3",
    "child_4",
    "child_5",
    "child_6",
    "school",
    "stones",
    "teacher",
    "tiny_tree_1",
    "tiny_tree_2",
    "tree_1",
    "tree_2",
  ],
};

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
  g.objects.lists.draw = g.objects.createIndexList("draw");
  g.objects.lists.update = g.objects.createIndexList("update");

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
    const objs = [...game.objects.lists.draw].sort(
      (a, b) => a.position.y - b.position.y
    );
    for (const o of objs) {
      o.draw(g);
    }
    next(g);
  });

  const player = new Player({ x: 0, y: 0, image: images["test"] });
  game.objects.add(player);

  for (const nr of [1, 2, 3, 4, 5, 6]) {
    game.objects.add(
      new Child({ x: nr * 100, y: 100, image: images[`child_${nr}`] })
    );
  }
  game.changeState(new GameplayState({ game, player }));
  game.start();
  window.game = game;
}
