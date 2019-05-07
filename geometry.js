// DDA Algorithm
drawLine = (x0, y0, x1, y1) => {
  let points = [];

  let dx = x1 - x0;
  let dy = y1 - y0;

  let steps = abs(dx) > abs(dy) ? abs(dx) : abs(dy);

  let incX = dx / steps;
  let incY = dy / steps;

  let X = x0;
  let Y = y0;
  for (let i = 0; i <= steps; i++) {
    points.push({
      x: X,
      y: Y
    });
    X += incX;
    Y += incY;
  }

  return points;
}

drawCircleFromMidpoint = (ent) => {
  let points = [];

  let r = (ent.m_speed * ent.m_speed * GLOBAL_SPEED) + (2 * ent.m_foodDetection * ent.m_foodDetection);
  let x = r, y = 0;

  points.push({
    x: ent.pos.x + x,
    y: ent.pos.y + y
  });

  if (r > 0) {
    points.push({
      x: ent.pos.x + x,
      y: ent.pos.y - y
    });
    points.push({
      x: ent.pos.x + y,
      y: ent.pos.y + x
    });
    points.push({
      x: ent.pos.x - y,
      y: ent.pos.y + x
    });
  }

  let P = 1 - r;
  while (x > y) {

    y++;

    if (P <= 0) {
      P += 2 * y + 1;
    } else {
      x--;
      P += 2 * y - 2 * x + 1;
    }

    if (x < y)
      break;

    points.push({
      x: ent.pos.x + x,
      y: ent.pos.y + y
    });
    points.push({
      x: ent.pos.x - x,
      y: ent.pos.y + y
    });
    points.push({
      x: ent.pos.x + x,
      y: ent.pos.y - y
    });
    points.push({
      x: ent.pos.x - x,
      y: ent.pos.y - y
    });

    if (x != y) {
      points.push({
        x: ent.pos.x + y,
        y: ent.pos.y + x
      });
      points.push({
        x: ent.pos.x - y,
        y: ent.pos.y + x
      });
      points.push({
        x: ent.pos.x + y,
        y: ent.pos.y - x
      });
      points.push({
        x: ent.pos.x - y,
        y: ent.pos.y - x
      });
    }
  }

  return points;
}