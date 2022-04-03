import LineSegment from "./linesegment";
import Vector from "./vector";

var t = new Vector();
var t2 = new Vector();

export function createBox(points) {
  var lineSegments = [];
  var prevPoint = points[points.length - 1];
  points.forEach(function (point) {
    lineSegments.push(
      new LineSegment(prevPoint.x, prevPoint.y, point.x, point.y)
    );
    prevPoint = point;
  });
  return lineSegments;
}

export function getLineCollisions(o, radius, lineSegments, collisions) {
  for (var i = 0; i < lineSegments.length; i++) {
    var lineSegment = lineSegments[i];
    if (lineSegment.normal.dot(o.velocity.x, o.velocity.y) > 0) {
      continue;
    }
    t.setV(lineSegment.normal);
    t.normalRight();
    var l = lineSegment.start.distanceToV(lineSegment.end);
    t2.set(o.position.x, o.position.y);
    t2.substractV(lineSegment.start);
    var offY = lineSegment.normal.dotV(t2) - radius;
    var offX = t.dotV(t2);
    if (offY < -radius * 2) {
      continue;
    } else if (offY < 0) {
      var d;
      if (offX > 0 && offX < l) {
        offY *= -1;
        collisions.push({
          object: lineSegment,
          normal: lineSegment.normal,
          offset: offY,
        });
      } else if (offX < 0 && offX > -radius) {
        d = lineSegment.start.distanceTo(o.position.x, o.position.y);
        if (d < radius) {
          t.set(o.position.x, o.position.y);
          t.substractV(lineSegment.start);
          t.normalize();
          collisions.push({
            object: lineSegment,
            normal: lineSegment.normal,
            offset: radius - d,
          });
        }
      } else if (offX > l && offX < l + radius) {
        d = lineSegment.end.distanceTo(o.position.x, o.position.y);
        if (d < radius) {
          t.set(o.position.x, o.position.y);
          t.substractV(lineSegment.end);
          t.normalize();
          collisions.push({
            object: lineSegment,
            normal: lineSegment.normal,
            offset: radius - d,
          });
        }
      }
    } else {
      continue;
    }
  }
}

export function offsetComparer(a, b) {
  return b.offset - a.offset;
}

export function handleLineCollision(
  o,
  bounciness,
  collisionlines,
  resultcollisions
) {
  for (var iteration = 0; iteration < 5; iteration++) {
    var collisions = [];

    getLineCollisions(o, o.collisionRadius, collisionlines, collisions);
    if (collisions.length > 0) {
      collisions.sort(offsetComparer);
      var c = collisions[0];
      //offset-=1;
      t.set(o.position.x, o.position.y);
      t.add(c.normal.x * c.offset, c.normal.y * c.offset);
      o.position.x = t.x;
      o.position.y = t.y;
      var vc = c.normal.dot(o.velocity.x, o.velocity.y);

      t.set(o.velocity.x, o.velocity.y);
      t.substract(
        (1 + bounciness) * c.normal.x * vc,
        (1 + bounciness) * c.normal.y * vc
      );
      o.velocity.x = t.x;
      o.velocity.y = t.y;

      resultcollisions.push(collisions[0]);
    } else {
      break;
    }
  }
}

export function handleCircleCollision(pa, pb, bounciness) {
  const massa = pa.mass ?? 1;
  const massb = pb.mass ?? 1;
  const radiusa = pa.collisionRadius;
  const radiusb = pb.collisionRadius;

  t.set(pa.position.x, pa.position.y);
  t.substract(pb.position.x, pb.position.y);
  var l = t.length();
  if (l < radiusa + radiusb) {
    var totalmass = massa + massb;
    t.normalizeOrZero();

    // Reposition
    var penetrationLength = radiusa + radiusb - l - 1;
    pa.position.x += penetrationLength * t.x * (massb / totalmass);
    pa.position.y += penetrationLength * t.y * (massb / totalmass);

    pb.position.x -= penetrationLength * t.x * (massa / totalmass);
    pb.position.y -= penetrationLength * t.y * (massa / totalmass);

    // Bounce
    var d = t.dot(pa.velocity.x - pb.velocity.x, pa.velocity.y - pb.velocity.y);
    if (d < 0) {
      t.multiply(d * (1 + bounciness));
      pa.velocity.x -= t.x * (massb / totalmass);
      pa.velocity.y -= t.y * (massb / totalmass);

      pb.velocity.x += t.x * (massa / totalmass);
      pb.velocity.y += t.y * (massa / totalmass);
    }
    return {
      object: pa,
      normal: t.clone(),
      bounced: d < 0,
    };
  }
  return null;
}

export function handleCollision(collidables, collisionlines) {
  var collidableCollisions = collidables.map(function (collidable) {
    return [collidable, []];
  });
  for (var i = 0; i < 5; i++) {
    // Try to resolve collisions 5 times
    var collisionResolved = true;
    collidableCollisions.forEach(function (collidableCollision) {
      var collidable = collidableCollision[0];
      var collisions = collidableCollision[1];
      var collisionCount = collisions.length;
      handleLineCollision(collidable, 0.0, collisionlines, collisions);

      var pa = collidable;
      collidableCollisions.forEach(function (collidableCollisionB) {
        if (collidableCollision === collidableCollisionB) {
          return;
        }
        var pb = collidableCollisionB[0];
        var collision = handleCircleCollision(pa, pb, 0.0);
        if (collision) {
          collidableCollision[1].push(collision);
          collidableCollisionB[1].push({
            object: pa,
            normal: collision.normal.clone().negate(),
          });
        }
      });

      if (collisionCount !== collisions.length) {
        collisionResolved = false;
      }
    });

    if (collisionResolved) {
      break;
    }
  }
  return collidableCollisions;
}

export function getPlayerCollisions(players, collisionLines) {
  var boxcollisions = {};
  var playercollisions = {};
  var collisions = collision.handleCollision(players, collisionLines);
  collisions.forEach(function (pair) {
    var player = pair[0];
    var playerCollisions = pair[1];
    boxcollisions[player.clientid] = [];
    playercollisions[player.clientid] = [];
    player.onground = playerCollisions.reduce(function (result, collision) {
      if (
        collision.object.box !== undefined &&
        collision.normal.dot(0, 1) < 0
      ) {
        boxcollisions[player.clientid].push(collision.object);
      }
      if (collision.object.clientid !== undefined) {
        playercollisions[player.clientid].push(collision.object.clientid);
      }
      return result || collision.normal.dot(0, 1) < 0;
    }, false);
  });
  return {
    boxcollisions: boxcollisions,
    playercollisions: playercollisions,
  };
}

export function drawDebug(g, next) {
  // Show collisions for debugging
  g.strokeStyle("red");
  for (const collidable of game.objects.lists.collidable) {
    g.strokeCircle(
      collidable.position.x,
      collidable.position.y,
      collidable.collisionRadius
    );
  }
  next(g);
}
