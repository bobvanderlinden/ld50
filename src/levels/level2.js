import CommonObjects from "./commonobjects";
import Kids from './kids';
import Level3 from './level3';

export default function Level2({ game }) {
  let amount = 10;

  return {
    objects: [
      ...CommonObjects({game}),
      ...Kids({game, amount}),
    ],
    nextLevel: Level3,
    clone: Level2,
  };
}
