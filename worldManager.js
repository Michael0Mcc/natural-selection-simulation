// World settings
const WINDOW_WIDTH = 1100;
const WINDOW_HEIGHT = 760;
const BOUNDS = 100;
const GLOBAL_SPEED = 150;
const DAY_LENGTH = 20000 // 20 seconds

// Entity settings
const STARTING_ENTITIES = 4;
const ENTITY_RADIUS = 35;
const MUTATION_CHANCE = 0.4;
const BASE_ENERGY = (DAY_LENGTH / 750);

// Food settings
const FOOD_PER_DAY = 78;
const FOOD_RADIUS = 25;

let bIsDay = true;
let day = 0;

function beginDay() {
  // Beginning of day
  day++;
  bIsDay = true;
  console.log("-----------");
  console.log("Time: DAY");

  placeFood(FOOD_PER_DAY);

  entities.forEach(entity => {
    entity.reset();
  });

  setTimeout(() => {
    // Begining of night
    bIsDay = false;
    console.log("Time: NIGHT");
    console.log("-----------");

    let t = entities.length;
    let d = 0;
    entities.forEach((entity, i) => {
      entity.bMoveToEdge = false;
      if (entity.die()) {
        entities.splice(i, 1);
        d += 1;
      }

      entity.reproduce();
    });

    console.log(`Day ${day}`);
    console.log(`Survived: ${t - d}`);
    console.log(`Created: ${entities.length + d - t}`);
    console.log(`Died: ${d}`);
    console.log(`Total: ${entities.length}`);

    setTimeout(() => {
      beginDay();
    }, DAY_LENGTH / 2);

  }, DAY_LENGTH);
}

function updateWorld() {
  setTimeout(() => {
    if (bIsDay) {
      entities.forEach(e => {
        e.consumeEnergy();
      });
    }
    updateWorld();
  }, 1000);
}

function placeFood(amount) {
  foods = [];
  for (let i = 0; i < amount; i++) {
    foods.push(new Food(random(BOUNDS, width - BOUNDS), random(BOUNDS, height - BOUNDS)));
  }
}

function drawBounds() {
  let points = [];

  drawLine(BOUNDS / 2, BOUNDS / 2, width - (BOUNDS / 2), BOUNDS / 2).forEach(point => {
    points.push(point); // Top
  });
  drawLine(width - (BOUNDS / 2), BOUNDS / 2, width - (BOUNDS / 2), height - (BOUNDS / 2)).forEach(point => {
    points.push(point); // Right
  });
  drawLine(BOUNDS / 2, height - (BOUNDS / 2), width - (BOUNDS / 2), height - (BOUNDS / 2)).forEach(point => {
    points.push(point); // Bottom
  });
  drawLine(BOUNDS / 2, BOUNDS / 2, BOUNDS / 2, height - (BOUNDS / 2)).forEach(point => {
    points.push(point); // Left
  });

  return points;
}