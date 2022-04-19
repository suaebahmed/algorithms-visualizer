import React,{useEffect, useState} from 'react'
import './PathfindingVS.css';
import Astar from '../algorithm/path/A_star_algo';
import basicMaze from '../algorithm/maze/basic-maze';
import BFS from '../algorithm/path/bfs';
import DFS from '../algorithm/path/dfs';
import Dijkstra from '../algorithm/path/dijkstra';

/*
super(props);// call the super class constructor and pass in the props parameter
*/

var rows = 12;
var cols = 20;

var START_NODE_ROW = 3, START_NODE_COL = 4;
var END_NODE_ROW = rows-5, END_NODE_COL = cols-5;
var animateTime = 35; // 8,35,80

function App(){
    const [Grid,setGrid] = useState([]);  // array destructuring
    const [isMousePress,setIsMousePress] = useState(false);
    const [mazeID,setMazeID] = useState(0);
    const [pathID,setPathID] = useState(0);


    useEffect(()=>{
        gridInitialize();
    },[])

    const gridInitialize =()=>{
        var grid = new Array(rows);
        for(let i=0; i<rows; i++) grid[i] = new Array(cols);

        for(let i=0; i<rows; i++){
            for(let j=0; j<cols; j++){
                grid[i][j] = new Spot(i,j);
            }
        }
        /* -- add neighbors of each node ---
        for(let i=0; i<rows; i++){
            for(let j=0; j<cols; j++){
                grid[i][j].getNeighbors(grid);
            }
        } */
        setGrid(grid);
    }
    // animate the algorithm
    async function animateVisitedNodes(visitedNodes){
        for(let i=0; i<visitedNodes.length; i++){
            const node = visitedNodes[i];
            await waitForAnimatoin(animateTime);
            if(node.x === START_NODE_ROW && node.y === START_NODE_COL)
            document.getElementById(`row${node.x}_col${node.y}`).className = "node-visited START_NODE";

            else if(node.x === END_NODE_ROW && node.y === END_NODE_COL)
            document.getElementById(`row${node.x}_col${node.y}`).className = "node-visited END_NODE";

            else document.getElementById(`row${node.x}_col${node.y}`).className = "node-visited";
        }
    }
    async function animateShortestPath(pathNode){
        pathNode.reverse();
        for(let i=0; i<pathNode.length; i++){
            const node = pathNode[i];
            await waitForAnimatoin(animateTime);
            if(i===0) 
            document.getElementById(`row${node.x}_col${node.y}`).className = "shortestPath START_NODE";
            else if(i+1 === pathNode.length) 
            document.getElementById(`row${node.x}_col${node.y}`).className = "shortestPath END_NODE";
            else document.getElementById(`row${node.x}_col${node.y}`).className = "shortestPath";
        }
    }

    const pathFinding = async () =>{
        var startNode = Grid[START_NODE_ROW][START_NODE_COL];
        var endNode = Grid[END_NODE_ROW][END_NODE_COL];

        switch(pathID){
            case 1:
                var obj = BFS(Grid,startNode,endNode,rows,cols);
                await animateVisitedNodes(obj.visitedNodes);
                animateShortestPath(obj.path);
            break;
            case 2:
                obj = DFS(Grid,startNode,endNode,rows,cols);
                await animateVisitedNodes(obj.visitedNodes);
                animateShortestPath(obj.path);
            break;
            case 3:
                obj = Dijkstra(Grid,startNode,endNode,rows,cols);
                await animateVisitedNodes(obj.visitedNodes);
                animateShortestPath(obj.path);
            break;
            default:
                obj = Astar(Grid,startNode,endNode,rows,cols);
                await animateVisitedNodes(obj.close_list);
                animateShortestPath(obj.path);
            break;
        }
    }

    const mazeHandle = async () =>{
        // if(maze == 1) basic;
        
        var ar = basicMaze(rows,cols);
        for(var i=0; i<ar.length; i++){
            if((ar[i].r===START_NODE_ROW && ar[i].c===START_NODE_COL) || 
            (ar[i].r===END_NODE_ROW && ar[i].c===END_NODE_COL)) continue;
                await waitForAnimatoin(animateTime);
                createWall(ar[i].r,ar[i].c);
        }
    }
    const clearPathHandle = () =>{
        for(let i=0; i<rows; i++){
            for(let j=0; j<cols; j++){
                if(i===START_NODE_ROW && j===START_NODE_COL){
                    document.getElementById(`row${i}_col${j}`).className = "square START_NODE";
                }
                else if(i===END_NODE_ROW && j===END_NODE_COL){
                    document.getElementById(`row${i}_col${j}`).className = "square END_NODE";
                }
                else if(!Grid[i][j].isWall)
                document.getElementById(`row${i}_col${j}`).className = "square";
            }
        }
    }

    const createWall=(row,col)=>{
        /*
            ********* the concept should be known array reference and copy *****
        */
        var newGrid = [...Grid] // array copy
        var node = newGrid[row][col];
        node.isWall = !node.isWall;
        newGrid[row][col] = node;
        setGrid(newGrid);
    }

    const onMouseDown = (row,col)=>{
        if(isValid(row,col)){
            setIsMousePress(true);
            createWall(row,col);
        }
    }
    const onMouseEnter = (row,col)=>{
        if(isMousePress === true && isValid(row,col)){
            createWall(row,col);
        }
    }
    const onMouseUp = ()=>{
        setIsMousePress(()=>false);
    }
    const animationTimeHandle = (type) =>{
        if(type === 1) animateTime = 8;
        else if(type === 2) animateTime = 35;
        else animateTime = 80;
    }
    const SET_START_END_NODE = (id, r, c) =>{
        if(id === 0){
            START_NODE_ROW = r;
            START_NODE_COL = c;
        }
        else{
            END_NODE_ROW = r;
            END_NODE_COL = c;
        } 
    }
    // jsx Node of grid (2D array)
    const gridOFNode = (
        Grid.map((R,idx_r)=>{
            return (
                <div key={idx_r} className='ROW'>
                    {
                        R.map((Value,idx_c)=>{
                            // console.log(Value);
                            const {x,y,isStart,isEnd,isWall} = Value;
                            return <Node key={idx_c} 
                            pv={{x,y,isStart,isEnd,isWall,onMouseDown,onMouseEnter,onMouseUp,SET_START_END_NODE}}>
                            </Node>
                        })
                    }
                </div>
            )
        })
    )

    return (
        <div className='container'>
            <div className='header'>
                <div>
                    <button onClick={pathFinding}>Find the shortest path</button>
                    <select value={pathID} onChange={(e)=>{setPathID(parseInt(e.target.value))}} id="num" name="num">
                        <option value="0">A-Star Search</option>
                        <option value="1">Breadth-First Search</option>
                        <option value="2">Depth-First Search</option>
                        <option value="3">Dijkstra</option>
                    </select>
                    <select value={mazeID} onChange={(e)=>{setMazeID(()=>{parseInt(e.target.value)})}} id="num2" name="num2">
                        <option disabled value="0">Select maze</option>
                        <option value="1">Random basic maze</option>
                        <option value="2">Recursive maze</option>
                        <option value="3">Prim's algorithm</option>
                        <option value="4">Other</option>
                    </select>
                    <button onClick={mazeHandle}>Create Maze</button>
                    <button onClick={gridInitialize}>Clear walls</button>
                    <button onClick={clearPathHandle}>Clear path</button>
                    <button onClick={()=>{clearPathHandle();gridInitialize()}}>Reset board</button>
                </div>
                <div>
                    <button onClick={()=>animationTimeHandle(1)}>Fast</button>
                    <button onClick={()=>animationTimeHandle(2)}>Average</button>
                    <button onClick={()=>animationTimeHandle(3)}>Slow</button>
                </div>
            </div>
            <div className='grid' onMouseLeave={()=>{setIsMousePress(false)}}>
                {gridOFNode}
            </div>
        </div>
    )
}

class Spot {
    constructor(i, j) {
        this.x = i;
        this.y = j;
        this.isWall = false;
        this.isStart = (i===START_NODE_ROW && j===START_NODE_COL);
        this.isEnd = (i===END_NODE_ROW && j===END_NODE_COL);
        
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

function Node({pv}){
    const {x,y,isStart,isEnd,isWall,onMouseDown,onMouseEnter,onMouseUp,SET_START_END_NODE} = pv;
    const allowDrop=(e)=>{e.preventDefault();}
    const drag=(e)=>{e.dataTransfer.setData("myID", e.target.id);}
    const drop=(e)=>{
        e.preventDefault();
        var data = e.dataTransfer.getData("myID");
        var dom = document.getElementById(data);

        if(data === e.target.id) return;
        // e.target.appendChild(dom);

        let x = e.target.attributes.data_x.value;
        let y = e.target.attributes.data_y.value;
        console.log(x,y,dom.nodeValue);

        // SET_START_END_NODE()
    }

    var classNode = isWall?"obtacle":'';
    var element = isStart?(<div id='ID_175' data_type="0" draggable="true" onDragStart={drag} className='START_NODE square'></div>):isEnd?(
    <div id='ID_176' data_type="1" draggable="true" onDragStart={drag} className='END_NODE square'></div>):'';

    return(
        <div data_x={x} data_y={y} onMouseDown={()=>{onMouseDown(x,y)}} onMouseEnter={()=>{onMouseEnter(x,y)}}
        onMouseUp={()=>{onMouseUp()}} onDrop={drop} onDragOver={allowDrop} className={'square '+classNode} id={'row'+x+'_col'+y}>
            {element}
        </div>
    )
}

async function waitForAnimatoin(time){
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve('');
        },time)
    })
}
const isValid = (r,c) =>{
    if((r===START_NODE_ROW && c===START_NODE_COL) || (r===END_NODE_ROW && c===END_NODE_COL)) return 0;
    else return 1;
}
export default App;