"use strict";

import platform from "./engine/platform.js";
import Game from "./engine/game.js";
import state from "./engine/state.js";
import LevelSystem from "./engine/levelsystem.js";
import collision from "./engine/collision.js";
import keyboard from "./engine/keyboard.js";
import resources from "./engine/resources.js";
import TouchSystem from "./engine/touchsystem.js";
import Camera from "./engine/camera.js";
import AutoRefresh from "./engine/autorefresh.js";
import Mouse from "./engine/mouse.js";
import EditorState from "./engine/editorstate.js";
import Player from "./entities/player";
import Child from "./entities/child";
import GameplayState from "./gameplaystate";
import Vector from "./engine/vector";
import { handleCollision } from "./engine/physics.js";
import { lerp } from "./engine/math.js";

let game;
const rs = {
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
  const canvas = document.getElementById("main");
  game = new Game(startGame, canvas, [
    keyboard,
    resources(rs),
    state,
    collision,
  ]);

  game.mouse = new Mouse({ game });

  game.resources.status.on("changed", () => {
    game.graphics.context.clearRect(0, 0, game.width, game.height);
    game.graphics.context.fillStyle = "black";
    game.graphics.context.font = "arial";
    game.graphics.fillCenteredText(
      `Preloading ${game.resources.status.ready} / ${game.resources.status.total}...`,
      400,
      300
    );
  });
});

function startGame(err) {
  if (err) {
    console.error(err);
  }

  const images = game.resources.images;
  // var audio = game.resources.audio;
  game.objects.lists.player = game.objects.createIndexList("player");
  game.objects.lists.draw = game.objects.createIndexList("draw");
  game.objects.lists.update = game.objects.createIndexList("update");
  game.objects.lists.collidable = game.objects.createIndexList(
    "collisionRadius"
  );

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

  function drawBackground(g, next) {
    g.fillStyle("lightgray");
    g.fillRectangle(0, 0, game.width, game.height);
    const scaling = game.width / 2800;
    g.scale(0, 0, scaling, scaling, () => {
      g.drawImage(images["stones"], 0, 0);
      g.drawImage(images["blurred_grass"], 0, 0);
      next(g);
    });
  }

  game.chains.draw.insertBefore(drawBackground, game.chains.draw.camera);

  game.chains.draw.push((g, next) => {
    const objs = [...game.objects.lists.draw].sort(
      (a, b) => a.position.y - b.position.y
    );
    for (const o of objs) {
      o.draw(g);
    }
    next(g);
  });

  game.chains.update.push((dt, next) => {
    handleCollision([...game.objects.lists.collidable], []);
    next(dt);
  });

  game.chains.draw.push((g, next) => {
    g.strokeStyle("red");
    for (const collidable of game.objects.lists.collidable) {
      g.strokeCircle(
        collidable.position.x,
        collidable.position.y,
        collidable.collisionRadius
      );
    }
    next(g);
  });

  function getRandomPosition() {
    return new Vector(
      lerp(0, 2800, Math.random()),
      lerp(500, 1575, Math.random())
    );
  }

  const player = new Player({ x: 0, y: 0, image: images["teacher"] });
  game.objects.add(player);

  for (const nr of [1, 2, 3, 4, 5, 6]) {
    const image = images[`child_${nr}`];
    const position = getRandomPosition();
    game.objects.add(
      new Child({
        image,
        x: position.x,
        y: position.y,
        origin: new Vector(image.width / 2, 0.9 * image.height),
        getRandomPosition,
      })
    );
  }
  game.changeState(new GameplayState({ game, player }));
  game.start();
  window.game = game;
}
