import CommonObjects from "./commonobjects";
import Kids from "./kids";
import Level5 from "./level5";

export default function Level4({ game }) {

  let amount = 32;

  return {
    objects: [
      ...CommonObjects({game}),
      ...Kids({game, amount}),
    ],
    clone: Level4,
    nextLevel: Level5,
  };
}
