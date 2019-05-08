let entities = [];
let foods = [];

function setup() {
  createCanvas(WINDOW_WIDTH, WINDOW_HEIGHT);

  for (let i = 0; i < STARTING_ENTITIES; i++) {
    entities[i] = new Entity(1, 0.5);
  }

  beginDay();
  updateWorld();
}

function draw() {
  background(51);

  if (foods.length == 0) {
    bIsDay = false;
  }

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