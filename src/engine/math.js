export function lerp(a, b, t) {
  return a + (b - a) * t;
}

export function lerpV(a, b, t) {
  return b.clone().subtractV(a).multiply(t).addV(a);
}

export function sign(b) {
  return b ? 1 : 0;
}
