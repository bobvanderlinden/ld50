"use strict";

import platform from "./engine/platform.js";
import Game from "./engine/game.js";
import state from "./engine/state.js";
import LevelSystem from "./engine/levelsystem.js";
import collision from "./engine/collision.js";
import keyboard from "./engine/keyboard.js";
import resources from "./engine/resources.js";
import TouchSystem from "./engine/touchsystem.js";
import AutoRefresh from "./engine/autorefresh.js";
import Mouse from "./engine/mouse.js";
import Player from "./entities/player";
import GameplayState from "./gameplaystate";
import Vector from "./engine/vector";
import { handleCollision } from "./engine/physics.js";
import { lerp } from "./engine/math.js";
import FailState from "./failstate.js";
import Level1 from "./levels/level1";
import SuccessState from "./successstate.js";

let game;
const rs = {
  audio: [
    "test",
    "bell",
    "fail",
  ],
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
    "seesaw",
    "slide",
    "swings",
    "exclamation",
    "panic_o_meter",
    "needle",
    "failed",
    "tears_1",
    "tears_2",
    "next_level",
    "clock_background",
    "clock_hand",
    "clock_stripes",
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
  game.objects.lists.start = game.objects.createIndexList("start");
  game.objects.lists.player = game.objects.createIndexList("player");
  game.objects.lists.draw = game.objects.createIndexList("draw");
  game.objects.lists.update = game.objects.createIndexList("update");
  game.objects.lists.collidable = game.objects.createIndexList(
    "collisionRadius"
  );
  game.objects.lists.kids = game.objects.createIndexList("kid");

  // Auto-refresh
  game.autoRefresh = new AutoRefresh({ game });
  // game.autoRefresh.enable();

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

  game.chains.draw.insertBefore(drawBackground, game.chains.draw.objects);

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

  // Show collisions for debugging

  // game.chains.draw.push((g, next) => {
  //   g.strokeStyle("red");
  //   for (const collidable of game.objects.lists.collidable) {
  //     g.strokeCircle(
  //       collidable.position.x,
  //       collidable.position.y,
  //       collidable.collisionRadius
  //     );
  //   }
  //   next(g);
  // });

  game.getRandomPosition = function getRandomPosition() {
    return new Vector(
      lerp(0, 2800, Math.random()),
      lerp(500, 1575, Math.random())
    );
  };

  let player;

  game.on("levelchanged", () => {
    // Spawn player on start object.
    for (const start of game.objects.lists.start) {
      player = new Player({
        x: start.position.x,
        y: start.position.y,
        image: images["teacher"],
      });
      game.objects.add(player);
      break;
    }
  });

  function onStart() {
    game.changeState(new GameplayState({ game, player, onFail, onSuccess }));
  }

  function onFail() {
    game.changeState(
      new FailState({
        game,
        player,
        onNext: () => {
          game.levelSystem.restartLevel();
          onStart();
        },
      })
    );
  }

  function onSuccess() {
    game.changeState(
      new SuccessState({
        game,
        player,
        onNext: () => {
          game.levelSystem.nextLevel();
          onStart();
        },
      })
    );
  }

  game.levelSystem.changeLevel(Level1({ game }));
  onStart();

  game.start();
  window.game = game;
}
