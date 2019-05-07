class Entity {
  constructor(_speed, _foodDetection) {
    // Data variables
    this.energyConsumption = 0;
    this.r = 35;

    let _r = floor(random(drawBounds().length));
    this.pos = createVector(drawBounds()[_r].x, drawBounds()[_r].y);

    // Mutable variables
    this.m_speed = _speed;
    this.m_foodDetection = _foodDetection;

    this.mutChance = 0.4;

    this.energy = 15;
    this.hasEaten = false;
    this.bIsDead = false;

    // Movement variables
    this.target = createVector(random(BOUNDS, width - BOUNDS), random(BOUNDS, height - BOUNDS));
    this.temp = createVector();
    this.bMoveToEdge = false;
  }

  die() {
    if (!bIsDay && (this.energy < 0 || !this.hasEaten))
      return true;
    else 
      return false;
  }

  reproduce() {
    if (((this.energy > 10 && random() < 0.5) || (this.energy > 15)) && this.hasEaten) {
      if (random() < this.mutChance) {
        let speedMut = 1;
        let detectionMut = 1;

        let mut = random();
        if (mut < 0.4) {
          // Mutate only speed
          speedMut = random(0.85, 1.3);
        } else if  (mut > 0.6) {
          // Mutate only detection
          detectionMut = random(0.85, 1.3);
        } else {
          // Mutate both speed and detection
          speedMut = random(0.85, 1.3);
          detectionMut = random(0.85, 1.3);
        }

        entities.push(new Entity(this.m_speed * speedMut, this.m_foodDetection * detectionMut));
      } else {
        entities.push(new Entity(this.m_speed, this.m_foodDetection));
      }
    }
  }

  consumeEnergy() {
    this.energyConsumption = (this.m_speed * this.m_speed) + this.m_foodDetection;
    this.energy -= (this.m_speed * this.m_speed) + (this.m_foodDetection / 1.5);
  }

  reset() {
    this.energy = 15;
    this.hasEaten = false;
    this.target.set(random(BOUNDS, width - BOUNDS), random(BOUNDS, height - BOUNDS));
  }

  move() {
    // Draw a circle around entity with a radius of m_speed * GLOBAL_SPEED
    // and pick a random point on circle to set as temp, once entity reaches
    // point select a new one.

    if (bIsDay && this.energy > -5) {
      this.targetFood();
      this.roam();
    } else {
      this.goToEdge();
    }
  }

  targetFood() {
    if (this.reachedDestination) {
      foods.forEach(food => {
        if (dist(this.pos.x, this.pos.y, food.pos.x, food.pos.y) < this.r * 1.25 * this.m_foodDetection * this.m_foodDetection) {
          this.target.set(food.pos);
        }
      });
    }
  }

  roam() {
    if (!this.reachedDestination()) {
      this.temp.x = this.target.x - this.pos.x;
      this.temp.y = this.target.y - this.pos.y;
      this.temp.setMag(2.5 * this.m_speed);
      this.pos.add(this.temp);
    } else {
      this.selectNewPosition();
      while (this.target.x < this.r || this.target.x > width - this.r || this.target.y < this.r || this.target.y > height - this.r) {
        this.selectNewPosition();
      }
    }
  }

  goToEdge() {
    if (!this.bMoveToEdge) {
      let r = floor(random(drawBounds().length));
      this.target.set(drawBounds()[r].x, drawBounds()[r].y);
      this.bMoveToEdge = true;
    }

    if (!this.reachedDestination()) {
      this.temp.x = this.target.x - this.pos.x;
      this.temp.y = this.target.y - this.pos.y;
      this.temp.setMag(2.5 * this.m_speed);
      this.pos.add(this.temp);
    }
  }

  selectNewPosition() {
    let r = floor(random(drawCircleFromMidpoint(this).length));
    this.target.set(drawCircleFromMidpoint(this)[r].x, drawCircleFromMidpoint(this)[r].y);
  }

  reachedDestination() {
    return (this.pos.x > this.target.x - 10 && this.pos.x < this.target.x + 10 && this.pos.y > this.target.y - 10 && this.pos.y < this.target.y + 10); 
  }

  show() {
    strokeWeight(3);
    stroke(0, 0, 0);
    if (this.m_foodDetection > 0.8) {
      stroke(0, 255, 255);
    } else if (this.m_foodDetection < 0.3) {
      stroke(255, 255, 0);
    }
    fill(255, 255, 255);
    if (this.m_speed > 1.2) {
      fill(0, 255, 0);
    } else if (this.m_speed < 0.8) {
      fill(255, 0, 0);
    }
    ellipse(this.pos.x, this.pos.y, this.r, this.r);
  }

}