
# Algorithms Visualizer
A react-based algorithms visualizer, built without any UI library. You can view live [here](https://suaebahmed.github.io/algorithms-visualizer/).

# *** This project has 3 sub-project ***
  - [Path Finding](https://github.com/suaebahmed/algorithms-visualizer#1-Path-Finding)
  - [Sorting](https://github.com/suaebahmed/algorithms-visualizer#2-Sorting)
  - [Spiral Prime](https://github.com/suaebahmed/algorithms-visualizer#3-Spiral-Prime)
  - [N Queen Problem]()

# 1. Path Finding

## Concepts
Each grid cell represents a node in a implicit graph.
  - Each node has 4 adjacent node
  - The distance between adjecent node is 1 unit

## Features
- [x] Search algorithms
  - [x] Depth-First Search
  - [x] Breadth-First Search
  - [x] A\* Search
  - [x] Dijkstra
  
- [x] Pattern generation algorithms
  - [x] Basic random
  - [x] Randomized DFS
  - [x] Recursive division
  - [ ] Kruskal's Algorithm
  - [ ] Prim's Algorithm

- [x] Draw your own wall nodes with mouse
- [x] Drag and drop the source and target nodes
- [x] Control animation speed

# 2. Sorting

## Concepts
Each bar represent a positive integer value and we compare two value to sort in ascending order 

## Features
- [x] Sorting Algorithms
  - [x] Bubble sort
  - [x] Selection sort
  - [x] Insertion sort
  - [x] Quick sort
  - [x] Merge sort

- [x] Control size of bars
- [x] Generate new random bars
- [x] Control animation speed

# 3. Spiral Prime

## Concepts
Each grid represent a positive interger number 
  - we check the number is prime or not
  - if the number is prime then mark as a circle

## Features
 - [x] Count the total of prime numbers
 - [x] Creating Spiral from the center of grid

## Installation

```bash
# To install all dependencies of the project.
> npm install

# To run the app on http://localhost:3000.
> npm run start

# To build the bundled app for production on the `build` folder.
> npm run build
> npm run deploy
```
### Acknowledge

I took inspirations from the following sources for some of the segments.

- `Pathfinder` : [This Projects That Got Me Into Google](https://youtu.be/n4t_-NjY_Sg)
- `Sorting` : [Sorting Visualizer Tutorial (software engineering project)](https://youtu.be/pFXYym4Wbkc)
- `Spiral of Primes` : [Coding a Spiral of Primes](https://youtu.be/a35KWEjRvc0)
- `N-Queen Problem` : [Algorithm Visualizer](https://github.com/TamimEhsan/AlgorithmVisualizer)

## What I revision/learn during doing this project
    1. implementing algorithm to visualize
    2. initialize each cell to object/class
    3. JS Promise to run animation asyncronusly
    4. array destructure (usestate hooks)
    5. reference and copy variable
    6. difference between == and === .For example "false===0" it's false
    7. For only use React state/useState to re-render dom-elememt. 
    otherwise use global variable to access from all corner
    8. writing re-useable code 
