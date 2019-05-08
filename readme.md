# Natural Selection Simulation

This project simulates natural-selection and genetic mutation through dots which travel around a canvas and eat food(smaller green dots). You can view a live demo of my project [here](https://michael0mcc.github.io/natural-selection-simulation/). It is heavily influenced by [Primer's youtube channel](https://www.youtube.com/channel/UCKzJFdi57J53Vr_BkTfN3uQ), I'd definitely recommend checking it out.

## Energy

The dots have energy that goes down every second at amounts determined by the two current traits in the simulation, the speed trait and the food detection trait. Energy can be gained by eating food. The formula that determines the amount of energy loss per second is:

```javascript
energyLoss = (speed * speed) + (foodDetection / 1.5);
```

and the formula that determines the amount of energy given at the start of each day is:

```javascript
baseEnergy = DAY_LENGTH /* In seconds */ / 750;
```

## Death

If a dot's energy is less than -5 it will lose it's ability to move, if it's energy is less than 0 by the end of the day the dot will die. In some scenarios the dots will evolve to lose energy at a rate where it is impossible for them to die, therefore eating at least one piece of food is needed to survive to the next day.

## Reproduction

If a dot survives the day and has at least half of the base energy left, it will have a 50% chance to produce offspring. If a dot has more than the base energy at the end of the day, it will be guaranteed to produce offspring. Each offspring will have a 40% chance to be mutated, if so, it has a 80% chance to mutate either the speed or the food detection traits and a 20% chance to mutate both. Note: mutations will change the value of the traits by between 85% and 130%.

## Traits

Currently the only two mutable traits are speed and food detection. A dot's movement speed is determined by a constant base speed multiplied by the value of the speed trait. As for food detection, the radius is determined by 125% of the dot's radius multiplied by the square of the value of the food detection trait. Note: The dots can only target food once it has finished moving to it's currently targeted position.

Dot's with a faster movement speed will be colored green, dot's with slower speeds will appear red. Dot's with better food detection will have a blue outline around them, one's with a smaller food detection radius will have a yellow outline.

## Movement

The dots roam in the day by drawing a invisible circle around them, using the circle-from-midpoint algorithm, and choosing a random point on the circle's circumference. Then moving to said point. Once the day is over, the dots will choose a point along an invisble line along the edge of the canvas, created using the DDA algorithm, and move to the point.

## Contributing

As this project is fairly new, it still has it's fair share of problems. I would really appreciate it if all issues found could be filed so I can work on fixing them.

Pull requests are welcome. For all changes, please open an issue first to discuss what you would like to change. It could also be something minor like a fix for a bug.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)