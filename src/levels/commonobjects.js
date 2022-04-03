import Vector from "../engine/vector";
import Blocker from "../entities/blocker";
import Start from "../entities/start";
import Thing from "../entities/thing";

export default function CommonObjects({ game }) {
  const images = game.resources.images;

  return [
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
      collisionRadius: false,
      origin: new Vector(
        images["seesaw"].width / 2,
        0.8 * images["seesaw"].height
      ),
    }),
    new Thing({
      image: images["slide"],
      x: 1800,
      y: 500,
      collisionRadius: false,
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

    new Blocker({ x: 937, y: 882, collisionRadius: 20 }),
    new Blocker({ x: 1008, y: 819, collisionRadius: 20 }),
    new Blocker({ x: 487, y: 832, collisionRadius: 20 }),
    new Blocker({ x: 402, y: 878, collisionRadius: 20 }),
    new Blocker({ x: 1656, y: 573, collisionRadius: 20 }),
    new Blocker({ x: 1723, y: 557, collisionRadius: 20 }),
    new Blocker({ x: 1785, y: 548, collisionRadius: 20 }),
    new Blocker({ x: 1845, y: 535, collisionRadius: 20 }),
    new Blocker({ x: 1890, y: 531, collisionRadius: 20 }),
    new Blocker({ x: 1930, y: 528, collisionRadius: 20 }),
    new Blocker({ x: 1962, y: 528, collisionRadius: 20 }),
    new Blocker({ x: 1227, y: 1231, collisionRadius: 20 }),
    new Blocker({ x: 1290, y: 1228, collisionRadius: 20 }),
    new Blocker({ x: 1338, y: 1226, collisionRadius: 20 }),
    new Blocker({ x: 1392, y: 1226, collisionRadius: 20 }),
    new Blocker({ x: 1470, y: 1219, collisionRadius: 20 }),
    new Blocker({ x: 1544, y: 1212, collisionRadius: 20 }),
    new Blocker({ x: 1609, y: 1201, collisionRadius: 20 }),
    new Blocker({ x: 1678, y: 1201, collisionRadius: 20 }),
    new Blocker({ x: 1733, y: 1201, collisionRadius: 20 }),
    new Blocker({ x: 1757, y: 1209, collisionRadius: 20 }),
    new Blocker({ x: 2020, y: 1408, collisionRadius: 20 }),
    new Blocker({ x: 2171, y: 1392, collisionRadius: 20 }),
    new Blocker({ x: 2395, y: 829, collisionRadius: 20 }),
    new Blocker({ x: 1088, y: 809, collisionRadius: 20 }),
    new Blocker({ x: 1300, y: 816, collisionRadius: 20 }),

    new Blocker({ x: 527, y: 832, collisionRadius: 20 }),
    new Blocker({ x: 598, y: 834, collisionRadius: 20 }),
    new Blocker({ x: 632, y: 834, collisionRadius: 20 }),
    new Blocker({ x: 697, y: 829, collisionRadius: 20 }),
    new Blocker({ x: 745, y: 831, collisionRadius: 20 }),
    new Blocker({ x: 792, y: 831, collisionRadius: 20 }),
    new Blocker({ x: 828, y: 831, collisionRadius: 20 }),
    new Blocker({ x: 871, y: 827, collisionRadius: 20 }),
    new Blocker({ x: 905, y: 822, collisionRadius: 20 }),
    new Blocker({ x: 943, y: 822, collisionRadius: 20 }),
    new Blocker({ x: 966, y: 816, collisionRadius: 20 }),

    new Blocker({ x: 458, y: 873, collisionRadius: 20 }),
    new Blocker({ x: 502, y: 869, collisionRadius: 20 }),
    new Blocker({ x: 597, y: 876, collisionRadius: 20 }),
    new Blocker({ x: 658, y: 870, collisionRadius: 20 }),
    new Blocker({ x: 707, y: 870, collisionRadius: 20 }),
    new Blocker({ x: 752, y: 866, collisionRadius: 20 }),
    new Blocker({ x: 820, y: 866, collisionRadius: 20 }),
    new Blocker({ x: 878, y: 872, collisionRadius: 20 }),

    new Blocker({ x: 1754, y: 547, collisionRadius: 20 }),
  ];
}
