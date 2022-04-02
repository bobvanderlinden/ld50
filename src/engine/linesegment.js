import Vector from "./vector.js";
export default class LineSegment {
  constructor(startx, starty, endx, endy) {
    this.start = new Vector(startx, starty);
    this.end = new Vector(endx, endy);
    this.normal = new Vector(0, 0);
    this.recalculate();
  }
  recalculate() {
    var n = this.normal;
    n.setV(this.end);
    n.substractV(this.start);
    this.length = n.length();
    n.normalize();
    n.normalLeft();
  }
}
