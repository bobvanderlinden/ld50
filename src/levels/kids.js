import Vector from "../engine/vector";
import Child from "../entities/child";

export default function Kids({ game, amount }) {
  const images = game.resources.images;

  const kids = [];
  let amountKids = amount;

  function randomImage() {
    return images[`child_${Math.floor(Math.random() * (6 - 1 + 1) + 1)}`];
  }

  while (amountKids > 0) {
    const image = randomImage();
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
    amountKids--;
  }

  return kids;
}
