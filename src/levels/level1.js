import Vector from "../engine/vector";
import Blocker from "../entities/blocker";
import Child from "../entities/child";
import Start from "../entities/start";
import Thing from "../entities/thing";

export default function Level1({ game }) {
  const images = game.resources.images;

  const kids = [];
  for (const nr of [1, 2, 3, 4, 5, 6]) {
    const image = images[`child_${nr}`];
    const position = game.getRandomPosition();
    kids.push(
      new Child({
        image,
        exclamation: images["exclamation"],
        tears: [images.tears_1, images.tears_2],
        x: position.x,
        y: position.y,
        origin: new Vector(image.width / 2, 0.9 * image.height),
        getRandomPosition: game.getRandomPosition,
      })
    );
  }

  return {
    objects: [
      new Start({ x: 700, y: 500 }),
      new Thing({
        image: images["school"],
        x: 1400,
        y: 250,
        collisionRadius: 100,
        origin: new Vector(
          images["school"].width / 2,
          0.7 * images["school"].height
        ),
      }),
      new Thing({
        image: images["tree_1"],
        x: 400,
        y: 1200,
        collisionRadius: 100,
        origin: new Vector(
          images["tree_1"].width / 2,
          0.7 * images["tree_1"].height
        ),
      }),
      new Thing({
        image: images["tree_2"],
        x: 2400,
        y: 700,
        collisionRadius: 110,
        origin: new Vector(
          images["tree_2"].width / 2,
          0.7 * images["tree_2"].height
        ),
      }),
      new Thing({
        image: images["tiny_tree_1"],
        x: 500,
        y: 550,
        collisionRadius: 50,
        origin: new Vector(
          images["tiny_tree_1"].width / 2,
          0.9 * images["tiny_tree_1"].height
        ),
      }),
      new Thing({
        image: images["tiny_tree_2"],
        x: 2300,
        y: 1300,
        collisionRadius: 50,
        origin: new Vector(
          images["tiny_tree_2"].width / 2,
          0.9 * images["tiny_tree_2"].height
        ),
      }),
      new Thing({
        image: images["bush_1"],
        x: 400,
        y: 600,
        collisionRadius: 70,
        origin: new Vector(
          images["bush_1"].width / 2,
          0.7 * images["bush_1"].height
        ),
      }),
      new Thing({
        image: images["bush_2"],
        x: 2100,
        y: 1400,
        collisionRadius: 50,
        origin: new Vector(
          images["bush_2"].width / 2,
          0.7 * images["bush_2"].height
        ),
      }),
      new Thing({
        image: images["bush_3"],
        x: 600,
        y: 1250,
        collisionRadius: 50,
        origin: new Vector(
          images["bush_3"].width / 2,
          0.7 * images["bush_3"].height
        ),
      }),
      new Thing({
        image: images["bushes_1"],
        x: 1200,
        y: 800,
        collisionRadius: 80,
        origin: new Vector(
          images["bushes_1"].width / 2,
          0.7 * images["bushes_1"].height
        ),
      }),
      new Thing({
        image: images["bushes_2"],
        x: 2500,
        y: 800,
        collisionRadius: 80,
        origin: new Vector(
          images["bushes_2"].width / 2,
          0.6 * images["bushes_2"].height
        ),
      }),
      new Thing({
        image: images["seesaw"],
        x: 1500,
        y: 1200,
        collisionRadius: 30,
        origin: new Vector(
          images["seesaw"].width / 2,
          0.8 * images["seesaw"].height
        ),
      }),
      new Thing({
        image: images["slide"],
        x: 1800,
        y: 500,
        collisionRadius: 70,
        origin: new Vector(
          images["slide"].width / 2,
          0.7 * images["slide"].height
        ),
      }),
      new Thing({
        image: images["swings"],
        x: 700,
        y: 900,
        collisionRadius: false,
      }),

      new Blocker({ x: 560, y: 532, collisionRadius: 10 }),
      new Blocker({ x: 602, y: 491, collisionRadius: 10 }),

      new Blocker({ x: 293, y: 500, collisionRadius: 10 }),
      new Blocker({ x: 240, y: 521, collisionRadius: 10 }),

      new Blocker({ x: 1005, y: 336, collisionRadius: 10 }),
      new Blocker({ x: 1038, y: 334, collisionRadius: 10 }),
      new Blocker({ x: 1079, y: 326, collisionRadius: 10 }),
      new Blocker({ x: 1116, y: 324, collisionRadius: 10 }),
      new Blocker({ x: 1141, y: 323, collisionRadius: 10 }),
      new Blocker({ x: 1166, y: 320, collisionRadius: 10 }),

      new Blocker({ x: 736, y: 735, collisionRadius: 10 }),
      new Blocker({ x: 777, y: 735, collisionRadius: 10 }),
      new Blocker({ x: 812, y: 733, collisionRadius: 10 }),
      new Blocker({ x: 847, y: 731, collisionRadius: 10 }),
      new Blocker({ x: 881, y: 729, collisionRadius: 10 }),
      new Blocker({ x: 905, y: 729, collisionRadius: 10 }),
      new Blocker({ x: 937, y: 728, collisionRadius: 10 }),
      new Blocker({ x: 966, y: 728, collisionRadius: 10 }),
      new Blocker({ x: 1005, y: 725, collisionRadius: 10 }),
      new Blocker({ x: 1034, y: 725, collisionRadius: 10 }),
      new Blocker({ x: 1055, y: 725, collisionRadius: 10 }),

      ...kids,
    ],
    next: Level1,
    clone: Level1,
  };
}
