import "../styles/PathfindingVS.css";
import React, { useEffect, useState } from "react";
import Astar from "../algorithm/path/A_star_algo";
import basicMaze from "../algorithm/maze/basic-maze";
import BFS from "../algorithm/path/bfs";
import DFS from "../algorithm/path/dfs";
import Dijkstra from "../algorithm/path/dijkstra";
import Randomized_dfs from "../algorithm/maze/randomized_dfs";
import recursiveDivision from "../algorithm/maze/recursive_division";
import Navbar from "../components/Navbar";
// import Modal from "../components/Modal";
import { KruskalAlgorithm } from "../algorithm/maze/kruskal-algorithm";
import { PrimsAlgorithm } from "../algorithm/maze/prim's-algorithm";
import { CostomCheckBox } from "../components/Costom-checkbox.tsx";
import { Button } from "../components/Btn.tsx";

/*
super(props);// call the super class constructor and pass in the props parameter
*/
var rows = 13;
var cols = 31;
const CELL_SIZE = 30;
const PADDING_Y = 200;
const PADDING_X = 300;

rows = Math.floor((window.innerHeight - PADDING_Y) / CELL_SIZE);
if (rows > 50) rows = 51; // Rows = [13, 50]
cols = Math.floor((window.innerWidth - PADDING_X) / CELL_SIZE);
if (cols > 50) cols = 51; // cols = [31, 50]

var START_NODE_ROW = 4,
  START_NODE_COL = 6;
var END_NODE_ROW = rows - 6,
  END_NODE_COL = cols - 6;
var INIT_START_ROW = START_NODE_ROW,
  INIT_START_COL = START_NODE_COL;
var INT_END_ROW = END_NODE_ROW,
  INIT_END_COL = END_NODE_COL;

const FAST = 5;
const AVERAGE = 30;
const SLOW = 80;
var SPEED = AVERAGE; // default
// old value: 8,35,80

function App() {
  const [Grid, setGrid] = useState([]); // array destructuring
  const [isMousePress, setIsMousePress] = useState(false);
  const [animateType, setAnimateTimeType] = useState(2);
  const [cellSize, setCellSize] = useState(CELL_SIZE); // [20, 35]
  const [mazeID, setMazeID] = useState(2);
  const [pathID, setPathID] = useState(0);

  useEffect(() => {
    gridInitialize();
  }, [cellSize]);

  const gridInitialize = () => {
    var grid = new Array(rows);
    for (let i = 0; i < rows; i++) grid[i] = new Array(cols);

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        grid[i][j] = new Spot(i, j);
      }
    }
    /* -- add neighbors of each node ---
        for(let i=0; i<rows; i++){
            for(let j=0; j<cols; j++){
                grid[i][j].getNeighbors(grid);
            }
        } */
    setGrid(grid);
  };
  // animate the algorithm
  async function animateVisitedNodes(visitedNodes) {
    for (let i = 0; i < visitedNodes.length; i++) {
      const node = visitedNodes[i];
      await waitForAnimate(SPEED);
      document.getElementById(
        `row${node.x}_col${node.y}`
      ).style.width = `${cellSize}px`;
      document.getElementById(
        `row${node.x}_col${node.y}`
      ).style.height = `${cellSize}px`;

      if (node.x === START_NODE_ROW && node.y === START_NODE_COL)
        document.getElementById(`row${node.x}_col${node.y}`).className =
          "node-visited START_NODE cursor-grab";
      else if (node.x === END_NODE_ROW && node.y === END_NODE_COL)
        document.getElementById(`row${node.x}_col${node.y}`).className =
          "node-visited END_NODE cursor-grab";
      else
        document.getElementById(`row${node.x}_col${node.y}`).className =
          "node-visited";
    }
  }
  async function animateShortestPath(pathNode) {
    pathNode.reverse();
    for (let i = 0; i < pathNode.length; i++) {
      const node = pathNode[i];
      await waitForAnimate(SPEED);
      document.getElementById(
        `row${node.x}_col${node.y}`
      ).style.width = `${cellSize}px`;
      document.getElementById(
        `row${node.x}_col${node.y}`
      ).style.height = `${cellSize}px`;

      if (i === 0)
        document.getElementById(`row${node.x}_col${node.y}`).className =
          "shortestPath START_NODE cursor-grab";
      else if (i + 1 === pathNode.length)
        document.getElementById(`row${node.x}_col${node.y}`).className =
          "shortestPath END_NODE cursor-grab";
      else
        document.getElementById(`row${node.x}_col${node.y}`).className =
          "shortestPath";
    }
  }

  const pathFinding = async () => {
    var btns = document.getElementsByClassName("btn-selector");
    document.getElementsByTagName("select")[0].disabled = true;
    document.getElementsByTagName("select")[1].disabled = true;
    for (let i = 0; i < btns.length; i++) {
      btns[i].disabled = true;
    }

    var startNode = Grid[START_NODE_ROW][START_NODE_COL];
    var endNode = Grid[END_NODE_ROW][END_NODE_COL];

    switch (pathID) {
      case 1:
        var obj = BFS(Grid, startNode, endNode, rows, cols);
        await animateVisitedNodes(obj.visitedNodes);
        await animateShortestPath(obj.path);
        break;
      case 2:
        obj = DFS(Grid, startNode, endNode, rows, cols);
        await animateVisitedNodes(obj.visitedNodes);
        await animateShortestPath(obj.path);
        break;
      case 3:
        obj = Dijkstra(Grid, startNode, endNode, rows, cols);
        await animateVisitedNodes(obj.visitedNodes);
        await animateShortestPath(obj.path);
        break;
      default:
        obj = Astar(Grid, startNode, endNode, rows, cols);
        await animateVisitedNodes(obj.close_list);
        await animateShortestPath(obj.path);
        break;
    }
    document.getElementsByTagName("select")[0].disabled = false;
    document.getElementsByTagName("select")[1].disabled = false;
    for (let i = 0; i < btns.length; i++) {
      btns[i].disabled = false;
    }
  };

  const mazeGenerator = async (ar) => {
    for (var i = 0; i < ar.length; i++) {
      if (
        (ar[i].r === START_NODE_ROW && ar[i].c === START_NODE_COL) ||
        (ar[i].r === END_NODE_ROW && ar[i].c === END_NODE_COL)
      )
        continue;
      await waitForAnimate(SPEED);
      createWall(ar[i].r, ar[i].c);
    }
  };
  const makeAllCellAsAWall = () => {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (
          !(
            (i === START_NODE_ROW && j === START_NODE_COL) ||
            (i === END_NODE_ROW && j === END_NODE_COL)
          )
        ) {
          createWall(i, j);
        }
      }
    }
  };
  const mazeHandle = async () => {
    // clear all walls and disable all buttons when maze is generating

    var btns = document.getElementsByClassName("btn-selector");
    document.getElementsByTagName("select")[0].disabled = true;
    document.getElementsByTagName("select")[1].disabled = true;
    for (let i = 0; i < btns.length; i++) {
      btns[i].disabled = true;
    }

    var arr = [];
    switch (mazeID) {
      case 1:
        arr = basicMaze(rows, cols);
        await mazeGenerator(arr);
        break;
      case 2:
        makeAllCellAsAWall();
        arr = Randomized_dfs(rows, cols);
        await mazeGenerator(arr);
        break;
      case 3: // recursive division
        arr = recursiveDivision(rows, cols);
        await mazeGenerator(arr);
        break;
      case 4:
        arr = KruskalAlgorithm(rows, cols);
        await mazeGenerator(arr);
        break;
      case 5:
        arr = PrimsAlgorithm(rows, cols);
        await mazeGenerator(arr);
        break;
      default:
    }

    // enable all buttons when maze is generated
    document.getElementsByTagName("select")[0].disabled = false;
    document.getElementsByTagName("select")[1].disabled = false;
    for (let i = 0; i < btns.length; i++) {
      btns[i].disabled = false;
    }
  };
  const clearPathHandle = () => {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (i === START_NODE_ROW && j === START_NODE_COL) {
          document.getElementById(`row${i}_col${j}`).className =
            "square START_NODE cursor-grab";
        } else if (i === END_NODE_ROW && j === END_NODE_COL) {
          document.getElementById(`row${i}_col${j}`).className =
            "square END_NODE cursor-grab";
        } else if (!Grid[i][j].isWall)
          document.getElementById(`row${i}_col${j}`).className = "square";
      }
    }
  };

  const createWall = (row, col) => {
    /*
     ********* the concept should be known array reference and copy *****
     */
    var newGrid = [...Grid]; // array copy
    var node = newGrid[row][col];
    node.isWall = !node.isWall;
    newGrid[row][col] = node;
    setGrid(newGrid);
  };

  const onMouseDown = (row, col) => {
    if (isValid(row, col)) {
      setIsMousePress(true);
      createWall(row, col);
    }
  };
  const onMouseEnter = (row, col) => {
    if (isMousePress === true && isValid(row, col)) {
      createWall(row, col);
    }
  };
  const onMouseUp = () => {
    setIsMousePress(() => false);
  };
  const animationTimeHandle = (type) => {
    if (type === 1) SPEED = FAST;
    else if (type === 2) SPEED = AVERAGE;
    else SPEED = SLOW;
    setAnimateTimeType(type);
    console.log(SPEED);
  };

  const setStartEndNode = (id, r, c) => {
    if (id === 1) {
      let newGrid = [...Grid]; // array copy
      let preStartNode = newGrid[START_NODE_ROW][START_NODE_COL];
      let curStartNode = newGrid[r][c];
      preStartNode.isStart = !preStartNode.isStart;
      curStartNode.isStart = !curStartNode.isStart;
      setGrid(newGrid);

      START_NODE_ROW = r;
      START_NODE_COL = c;
    } else {
      let newGrid = [...Grid]; // array copy
      let preEndNode = newGrid[END_NODE_ROW][END_NODE_COL];
      let curEndNode = newGrid[r][c];
      preEndNode.isEnd = !preEndNode.isEnd;
      curEndNode.isEnd = !curEndNode.isEnd;
      setGrid(newGrid);

      END_NODE_ROW = r;
      END_NODE_COL = c;
    }
  };

  const rangeValueHandle = (event) => {
    let value = parseInt(event.target.value); // [0, 15]
    setCellSize(value + 20); // [20, 35]

    rows = Math.floor((window.innerHeight - PADDING_Y) / (value + 20));
    if (rows > 50) rows = 50; // Rows = [13, 50]
    cols = Math.floor((window.innerWidth - PADDING_X) / (value + 20));
    if (cols > 50) cols = 50; // cols = [31, 50]
    (END_NODE_ROW = rows - 6), (END_NODE_COL = cols - 6);
  };

  return (
    <>
      {/* <Modal className="border border-slate-600">
        <h3 className="text-xl text-slate-800 text-center mb-3">
          Video Tutorial
        </h3>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <iframe
            width="90%"
            height="300px"
            src="https://www.youtube.com/embed/iK95rIRVbMo?autoplay=1&mute=1"
            title="myVideo"
          ></iframe>
        </div>
      </Modal> */}

      <div id="Container-blur" className="/active">
        <Navbar msg="Path Finder Visualizer"></Navbar>
        <div className="my-[10px] pb-[10px] flex flex-col justify-center items-center">
          <div className="max-w-[950px] w-full flex justify-around  pb-[10px] mb-4">
            <div>
              <div className="flex justify-end my-[12px] gap-3">
                <Button
                  className="btn-selector"
                  onClick={pathFinding}
                  label="Find the possible path"
                  // isBgColor
                />
                <select
                  className="form-select"
                  value={pathID}
                  onChange={(e) => {
                    setPathID(parseInt(e.target.value));
                  }}
                >
                  <option value="0">A-Star Search</option>
                  <option value="1">Breadth-First Search</option>
                  <option value="2">Depth-First Search</option>
                  <option value="3">Dijkstra</option>
                </select>
              </div>
              <div className="flex gap-3 items-center mt-[6px]">
                <div className="-m-1 flex flex-row flex-wrap">
                  <CostomCheckBox
                    checked={animateType == 1}
                    onClick={() => animationTimeHandle(1)}
                    label="Fast"
                  />
                  <CostomCheckBox
                    checked={animateType == 2}
                    onClick={() => animationTimeHandle(2)}
                    label="Average"
                  />
                  <CostomCheckBox
                    checked={animateType == 3}
                    onClick={() => animationTimeHandle(3)}
                    label="Slow"
                  />
                </div>
                <div className="st-speed-range">
                  <div>
                    <input
                      type="range"
                      onChange={rangeValueHandle}
                      name="range1"
                      id="range1"
                      value={cellSize - 20}
                      min="0"
                      max="15"
                      step="1"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="flex justify-end my-[12px] gap-3">
                <select
                  className="form-select"
                  value={mazeID}
                  onChange={(e) => {
                    setMazeID(parseInt(e.target.value));
                  }}
                >
                  <option value="1">Random basic maze</option>
                  <option value="2">Randomized_dfs</option>
                  <option value="3">Recursive division</option>
                  <option value="4">Kruskal algorithm</option>
                  <option value="5">Prim's algorithm</option>
                </select>
                <Button
                  className="btn-selector END-maze-btn"
                  onClick={mazeHandle}
                  label="Generate Maze"
                  isBgColor
                />
                <Button
                  className="btn-selector !border-red-500 !text-red-500 hover:!bg-red-500 hover:!text-white"
                  onClick={() => {
                    START_NODE_ROW = INIT_START_ROW;
                    START_NODE_COL = INIT_START_COL;
                    END_NODE_ROW = INT_END_ROW;
                    END_NODE_COL = INIT_END_COL;
                    clearPathHandle();
                    gridInitialize();
                  }}
                  label="Reset board"
                />
              </div>
              <div className="flex gap-3 justify-end">
                <Button
                  className="btn-selector"
                  onClick={gridInitialize}
                  label="Clear walls"
                />
                <Button
                  className="btn-selector"
                  onClick={clearPathHandle}
                  label="Clear path"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <div
              onMouseLeave={() => {
                setIsMousePress(false);
              }}
            >
              {/* JSX Node Of Grid (2D Array) */}
              {Grid.map((R, idx_r) => {
                return (
                  <div key={idx_r} className="flex">
                    {R.map((Value, idx_c) => {
                      const { x, y, isStart, isEnd, isWall } = Value;
                      return (
                        <Node
                          key={idx_c}
                          pv={{
                            x,
                            y,
                            isStart,
                            isEnd,
                            isWall,
                            onMouseDown,
                            onMouseEnter,
                            onMouseUp,
                            setStartEndNode,
                          }}
                          cellSize={cellSize}
                        />
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

class Spot {
  constructor(i, j) {
    this.x = i;
    this.y = j;
    this.isWall = false;
    this.isStart = i === START_NODE_ROW && j === START_NODE_COL;
    this.isEnd = i === END_NODE_ROW && j === END_NODE_COL;

    /*
        ----  below information we don't use after 16 number of commits in github ---
        this.f = 1e9;
        this.g = 1e9;
        this.previous = undefined;
        this.neighbors = [];
        this.getNeighbors = function(grid){
            if(i > 0) this.neighbors.push(grid[i-1][j]); // up
            if(j > 0) this.neighbors.push(grid[i][j-1]); // left

            if(i+1<rows) this.neighbors.push(grid[i+1][j]); // down
            if(j+1<cols) this.neighbors.push(grid[i][j+1]); // right
        }
        */
  }
}

function Node({ pv, cellSize }) {
  const {
    x,
    y,
    isStart,
    isEnd,
    isWall,
    onMouseDown,
    onMouseEnter,
    onMouseUp,
    setStartEndNode,
  } = pv;
  const allowDrop = (e) => {
    e.preventDefault();
  };
  const drag = (e) => {
    e.dataTransfer.setData("myID", e.target.id);
  };
  const drop = (e) => {
    e.preventDefault();
    var data = e.dataTransfer.getData("myID");
    var dom = document.getElementById(data);
    var id = parseInt(dom.attributes.data_type.value);
    if (
      e.target.attributes.data_type.value !== "3" ||
      e.target.attributes.wall.value === "true"
    )
      return;

    // call the function
    var r = parseInt(e.target.attributes.data_x.value);
    var c = parseInt(e.target.attributes.data_y.value);
    setStartEndNode(id, r, c);
  };
  const START_NODE = "START_NODE bg-contain bg-center cursor-grab";
  const END_NODE = "END_NODE bg-contain bg-center cursor-grab";
  var classNode = isStart
    ? START_NODE
    : isEnd
    ? END_NODE
    : isWall
    ? "obtacle"
    : "";
  var typeId = isStart ? "1" : isEnd ? "2" : "3";

  if (isStart || isEnd) {
    return (
      <div
        className={classNode}
        style={{
          width: `${cellSize}px`,
          height: `${cellSize}px`,
          outline: "1px solid #afd8f8",
          backgroundColor: "#fff",
        }}
        id={"row" + x + "_col" + y}
        data_x={x}
        data_y={y}
        data_type={typeId}
        wall="false"
        draggable="true"
        onDragStart={drag}
        onDrop={drop}
        onDragOver={allowDrop}
      />
    );
  } else {
    return (
      <div
        onMouseDown={(e) => {
          e.preventDefault(); // it is necessary
          onMouseDown(x, y);
        }}
        onMouseEnter={(e) => {
          e.preventDefault();
          onMouseEnter(x, y);
        }}
        onMouseUp={(e) => {
          e.preventDefault();
          onMouseUp();
        }}
        className={classNode}
        style={{
          width: `${cellSize}px`,
          height: `${cellSize}px`,
          outline: "1px solid #afd8f8",
          backgroundColor: "#fff",
        }}
        id={"row" + x + "_col" + y}
        data_x={x}
        data_y={y}
        data_type={typeId}
        wall={isWall.toString()}
        onDrop={drop}
        onDragOver={allowDrop}
      />
    );
  }
}

async function waitForAnimate(sp) {
  sp = sp < 5 ? 5 : sp;
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("");
    }, sp);
  });
}
const isValid = (r, c) => {
  if (
    (r === START_NODE_ROW && c === START_NODE_COL) ||
    (r === END_NODE_ROW && c === END_NODE_COL)
  )
    return 0;
  else return 1;
};
export default App;
