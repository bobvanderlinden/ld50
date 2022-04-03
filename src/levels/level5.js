import CommonObjects from "./commonobjects";
import Kids from "./kids";

export default function Level5({ game }) {

  let amount = 50;

  return {
    objects: [
      ...CommonObjects({game}),
      ...Kids({game, amount}),
    ],
    clone: Level5,
  };
}
