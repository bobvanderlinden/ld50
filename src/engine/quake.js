function rnd() {
  return (Math.random() - 0.5) * 2;
}
export default function (g) {
  function quake(time, magnitude) {
    quake.step = magnitude / time;
    quake.magnitude = magnitude;
  }
  g.chains.draw.unshift((g, next) => {
    g.save();
    g.context.translate(rnd() * quake.magnitude, rnd() * quake.magnitude);
    next(g);
    g.restore();
  });
  g.chains.update.unshift((dt, next) => {
    if (quake.magnitude > 0) {
      quake.magnitude -= quake.step * dt;
      if (quake.magnitude < 0) {
        quake.magnitude = 0;
      }
    }
    next(dt);
  });

  g.quake = quake;
}
