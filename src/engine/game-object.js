import Vector from "./vector.js";

export default class GameObject {
  constructor({ x, y }) {
    this.position = new Vector(x, y);
  }
}
