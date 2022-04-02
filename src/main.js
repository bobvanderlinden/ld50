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
import Thing from "./entities/thing";
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
    "seesaw",
    "slide",
    "swings",
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
  game.objects.lists.kids = game.objects.createIndexList("kid");

  // function pickRandom(arr) {
  //   return arr[(arr.length * Math.random()) | 0];
  // }

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

  game.chains.draw.push((g, next) => {
    let panicOMeter = 0;
    game.objects.lists.kids.each((k) => (panicOMeter += k.panic ? 1 : 0));
    g.fillStyle("red");
    g.font("50px Tahoma");
    g.fillText(panicOMeter, 2300, -400);
    next(g);
  });

  function getRandomPosition() {
    return new Vector(
      lerp(0, 2800, Math.random()),
      lerp(500, 1575, Math.random())
    );
  }

  const player = new Player({
    x: game.width / 2,
    y: 500,
    image: images["teacher"],
  });
  game.objects.add(player);

  const a = new Vector(550, 460);
  game.objects.add(
    new Thing({ image: images["school"], x: 900 + a.x, y: -100 + a.y })
  );
  game.objects.add(
    new Thing({ image: images["tree_1"], x: 500 + a.x, y: 600 + a.y })
  );
  game.objects.add(
    new Thing({ image: images["tree_2"], x: 2000 + a.x, y: 400 + a.y })
  );
  game.objects.add(
    new Thing({ image: images["tiny_tree_1"], x: -500 + a.x, y: 1000 + a.y })
  );
  game.objects.add(
    new Thing({ image: images["tiny_tree_2"], x: 1700 + a.x, y: 1200 + a.y })
  );
  game.objects.add(
    new Thing({ image: images["bush_1"], x: 600 + a.x, y: 600 + a.y })
  );
  game.objects.add(
    new Thing({ image: images["bush_2"], x: 1900 + a.x, y: 1200 + a.y })
  );
  game.objects.add(
    new Thing({ image: images["bush_3"], x: -400 + a.x, y: 1000 + a.y })
  );
  game.objects.add(
    new Thing({ image: images["bushes_1"], x: -500 + a.x, y: 200 + a.y })
  );
  game.objects.add(
    new Thing({ image: images["bushes_2"], x: 2100 + a.x, y: 500 + a.y })
  );
  game.objects.add(new Thing({ image: images["bush_1"], x: 600, y: 600 }));
  game.objects.add(new Thing({ image: images["bush_2"], x: 1900, y: 1200 }));
  game.objects.add(new Thing({ image: images["bush_3"], x: -400, y: 1000 }));
  game.objects.add(new Thing({ image: images["bushes_1"], x: -500, y: 200 }));
  game.objects.add(new Thing({ image: images["bushes_2"], x: 2100, y: 500 }));
  game.objects.add(new Thing({ image: images["seesaw"], x: 1400, y: 300 }));
  game.objects.add(new Thing({ image: images["slide"], x: 300, y: 1200 }));
  game.objects.add(new Thing({ image: images["swings"], x: 1200, y: 900 }));

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
