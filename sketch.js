const BOUNDS = 100;
const GLOBAL_SPEED = 150;

let entities = [];
let foods = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

  for (let i = 0; i < 3; i++) {
    entities[i] = new Entity(1, 0.5);
  }

  beginDay();
  updateWorld();
}

function draw() {
  background(51);
  entities.forEach(entity => {
    entity.move();
  });
  foods.forEach((food, i) => {
    food.eaten(i);
    food.show();
  });
  entities.forEach(entity => {
    entity.show();
  });
}