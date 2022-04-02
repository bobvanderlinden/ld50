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
    "exclamation",
    "panic_o_meter",
    "needle",
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
  game.objects.lists.collidable =
    game.objects.createIndexList("collisionRadius");
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

  let panicOMeterValue = 0;
  game.chains.draw.push((g, next) => {
    // Get amount of panic
    let panicOMeter = 0;
    game.objects.lists.kids.each(
      (k) => (panicOMeter += k.state == "Panic" ? 1 : 0)
    );
    if (panicOMeter > panicOMeterValue) panicOMeterValue += 0.01;
    if (panicOMeter < panicOMeterValue) panicOMeterValue -= 0.01;

    // Show it on the Panic'O'Meter™️
    const panic = images["panic_o_meter"];
    const needle = images["needle"];
    g.drawCenteredImage(panic, 2650, 100);
    g.save();
    g.context.translate(2648, 155);
    g.context.rotate(
      lerp(-0.9 * Math.PI, -0.1 * Math.PI, panicOMeterValue / 5)
    );
    g.drawImage(needle, -134, -11);
    g.restore();
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

  game.objects.add(
    new Thing({
      image: images["school"],
      x: 1400,
      y: 250,
      collisionRadius: 100,
      origin: new Vector(
        images["school"].width / 2,
        0.7 * images["school"].height
      ),
    })
  );
  game.objects.add(
    new Thing({
      image: images["tree_1"],
      x: 400,
      y: 1200,
      collisionRadius: 100,
      origin: new Vector(
        images["tree_1"].width / 2,
        0.7 * images["tree_1"].height
      ),
    })
  );
  game.objects.add(
    new Thing({
      image: images["tree_2"],
      x: 2400,
      y: 700,
      collisionRadius: 110,
      origin: new Vector(
        images["tree_2"].width / 2,
        0.7 * images["tree_2"].height
      ),
    })
  );
  game.objects.add(
    new Thing({
      image: images["tiny_tree_1"],
      x: 500,
      y: 550,
      collisionRadius: 50,
      origin: new Vector(
        images["tiny_tree_1"].width / 2,
        0.9 * images["tiny_tree_1"].height
      ),
    })
  );
  game.objects.add(
    new Thing({
      image: images["tiny_tree_2"],
      x: 2300,
      y: 1300,
      collisionRadius: 50,
      origin: new Vector(
        images["tiny_tree_2"].width / 2,
        0.9 * images["tiny_tree_2"].height
      ),
    })
  );
  game.objects.add(
    new Thing({
      image: images["bush_1"],
      x: 400,
      y: 600,
      collisionRadius: 70,
      origin: new Vector(
        images["bush_1"].width / 2,
        0.7 * images["bush_1"].height
      ),
    })
  );
  game.objects.add(
    new Thing({
      image: images["bush_2"],
      x: 2100,
      y: 1400,
      collisionRadius: 50,
      origin: new Vector(
        images["bush_2"].width / 2,
        0.7 * images["bush_2"].height
      ),
    })
  );
  game.objects.add(
    new Thing({
      image: images["bush_3"],
      x: 600,
      y: 1250,
      collisionRadius: 50,
      origin: new Vector(
        images["bush_3"].width / 2,
        0.7 * images["bush_3"].height
      ),
    })
  );
  game.objects.add(
    new Thing({
      image: images["bushes_1"],
      x: 1200,
      y: 800,
      collisionRadius: 80,
      origin: new Vector(
        images["bushes_1"].width / 2,
        0.7 * images["bushes_1"].height
      ),
    })
  );

  game.objects.add(
    new Thing({
      image: images["bushes_2"],
      x: 2500,
      y: 800,
      collisionRadius: 80,
      origin: new Vector(
        images["bushes_2"].width / 2,
        0.6 * images["bushes_2"].height
      ),
    })
  );

  game.objects.add(
    new Thing({
      image: images["seesaw"],
      x: 1500,
      y: 1200,
      collisionRadius: 30,
      origin: new Vector(
        images["seesaw"].width / 2,
        0.8 * images["seesaw"].height
      ),
    })
  );

  game.objects.add(
    new Thing({
      image: images["slide"],
      x: 1800,
      y: 500,
      collisionRadius: 70,
      origin: new Vector(
        images["slide"].width / 2,
        0.7 * images["slide"].height
      ),
    })
  );
  game.objects.add(
    new Thing({
      image: images["swings"],
      x: 700,
      y: 900,
      collisionRadius: false,
    })
  );

  for (const nr of [1, 2, 3, 4, 5, 6]) {
    const image = images[`child_${nr}`];
    const position = getRandomPosition();
    game.objects.add(
      new Child({
        image,
        exclamation: images["exclamation"],
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
