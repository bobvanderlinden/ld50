import CommonObjects from "./commonobjects";
import Kids from "./kids";
import Level4 from "./level4";

export default function Level3({ game }) {
  let amount = 15;

  return {
    panicRate: 2.7,
    objects: [...CommonObjects({ game }), ...Kids({ game, amount })],
    nextLevel: Level4,
    clone: Level3,
  };
}
