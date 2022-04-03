import Vector from "../engine/vector";
import Child from "../entities/child";
import CommonObjects from "./commonobjects";
import Level2 from "./level2";

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
        cry: game.resources.audio.group("cry"),
        happy: game.resources.audio.group("happy"),
        x: position.x,
        y: position.y,
        origin: new Vector(image.width / 2, 0.9 * image.height),
        getRandomPosition: game.getRandomPosition,
      })
    );
  }

  return {
    panicRate: 4,
    objects: [...CommonObjects({ game }), ...kids],
    nextLevel: Level2,
    clone: Level1,
  };
}
