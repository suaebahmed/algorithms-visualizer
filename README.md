
# Algorithm Visualizer
A react-based visualization of a pathfinder, built without any UI library. You can view live [here]().

## Concepts

Each grid cell represents a node in a implicit graph.
    - Each node has 4 adjacent node
    - The distance between adjecent node is 1 unit

## Features
- [x] Search algorithms
  - [x] Depth-First Search
  - [x] Breadth-First Search
  - [x] Dijkstra Algo
  - [x] A\* Search

- [x] Pattern generation algorithms
  - [x] Basic random
  - [x] Randomized DFS
  - [x] Recursive division
  - [ ] Kruskal's Algorithm
  - [ ] Prim's Algorithm

- [x] Draw your own wall nodes with mouse
- [x] Drag and drop the source and target nodes
- [x] Control animation speed

## Installation

```bash
# To install all dependencies of the project.
> yarn install
> npm install

# To run the app on http://localhost:3000.
> yarn start
> npm run start

# To build the bundled app for production on the `build` folder.
> yarn build
> npm run build
```

## what I revision/learn during doing this project
    1. implementing algorithm to visualize
    2. initialize each cell to object/class
    3. JS Promise to run animation asyncronusly
    4. array destructure (usestate hooks)
    5. reference and copy variable
    6. difference between == and === .For example "false===0" it's false
    7. For only use React state/useState to re-render dom-elememt. 
    otherwise use global variable to access from all corner
    8. writing re-useable code 