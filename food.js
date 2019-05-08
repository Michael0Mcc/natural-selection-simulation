class Food {
  constructor(_x, _y) {
    this.pos = createVector(_x, _y);
    this.r = FOOD_RADIUS;
  }

  eaten(i) {
    entities.forEach(e => {
      if (dist(this.pos.x, this.pos.y, e.pos.x, e.pos.y) < e.r) {
        e.energy += 5;
        if (!e.hasEaten) {
          e.hasEaten = true;
        }
        foods.splice(i, 1);
      }
    });
  }

  show() {
    noStroke();
    fill(0, 100, 0);
    ellipse(this.pos.x, this.pos.y, this.r, this.r);
  }
}