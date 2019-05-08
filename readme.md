# Natural Selection Simulation

This project simulates natural-selection and genetic mutation through dots which travel around a canvas and eat food(smaller 
green dots).

## How it works

The dots have energy that goes down every second at amounts determined by the two current traits in the 
simulation, the speed trait and the food detection trait. The formula that determines the amount of energy loss per second is:

```javascript
energyLoss = (speed * speed) + (foodDetection / 1.5);
```


