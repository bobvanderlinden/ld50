import CommonObjects from "./commonobjects";
import Kids from "./kids";

export default function Level3({ game }) {

  let amount = 15;

  return {
    objects: [
      ...CommonObjects({game}),
      ...Kids({game, amount}),
    ],
    clone: Level3,
  };
}
