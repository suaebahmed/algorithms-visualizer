import React,{useEffect, useState} from 'react'
import './PathfindingVS.css';
import Astar from '../algorithm/A_star_algo';

/*
super(props);// call the super class constructor and pass in the props parameter
*/

var rows = 10;
var cols = 20;

const START_NODE_ROW = 0, START_NODE_COL = 0;
const END_NODE_ROW = rows-1, END_NODE_COL = cols-1;

async function waitForAnimatoin(animation_time){
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve('');
        },animation_time)
    })
}

function App(){
    const [Grid,setGrid] = useState([]);
    const [isMousePress,setIsMousePress] = useState(false);

    useEffect(()=>{
        gridInitialize();
    },[])

    const gridInitialize =()=>{
        var grid = new Array(rows);
        for(let i=0; i<rows; i++) grid[i] = new Array(cols);

        for(let i=0; i<rows; i++){
            for(let j=0; j<cols; j++){
                grid[i][j] = new Spot(i,j,false);
            }
        }
        //add neighbors of each node
        for(let i=0; i<rows; i++){
            for(let j=0; j<cols; j++){
                grid[i][j].getNeighbors(grid);

            }
        }
        setGrid(grid);
    }
    // animate the algorithm
    async function animateVisitedNodes(visitedNodes){
        for(let i=0; i<visitedNodes.length; i++){
            const node = visitedNodes[i];
            await waitForAnimatoin(30);
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
            await waitForAnimatoin(30);
            if(i===0) 
            document.getElementById(`row${node.x}_col${node.y}`).className = "shortestPath START_NODE";
            else if(i+1 === pathNode.length) 
            document.getElementById(`row${node.x}_col${node.y}`).className = "shortestPath END_NODE";
            else document.getElementById(`row${node.x}_col${node.y}`).className = "shortestPath";
        }
    }

    async function  startAStar(){
        var startNode = Grid[START_NODE_ROW][START_NODE_COL];
        var endNode = Grid[END_NODE_ROW][END_NODE_COL];
        var obj = Astar(startNode,endNode);

        await animateVisitedNodes(obj.close_list);
        animateShortestPath(obj.path);
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
        setIsMousePress(true);
        createWall(row,col);
    }
    const onMouseEnter = (row,col)=>{
        if(isMousePress === true){
            createWall(row,col);
        }
    }
    const onMouseUp = ()=>{
        setIsMousePress(false);
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
                            pv={{x,y,isStart,isEnd,isWall,onMouseDown,onMouseEnter,onMouseUp}}>
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
                <button onClick={startAStar}>Find the shortest path</button>
            </div>
            <div className='grid'>
                {gridOFNode}
            </div>
        </div>
    )
}

class Spot {
    constructor(i, j,bool) {
        this.x = i;
        this.y = j;
        this.f = 1e9;
        this.g = 1e9;
        this.isWall = bool;
        this.isStart = (i===START_NODE_ROW && j===START_NODE_COL);
        this.isEnd = (i===END_NODE_ROW && j===END_NODE_COL);
        this.previous = undefined;
        this.neighbors = [];
        this.getNeighbors = function(grid){
            if(i > 0) this.neighbors.push(grid[i-1][j]); // up
            if(j > 0) this.neighbors.push(grid[i][j-1]); // left

            if(i+1<rows) this.neighbors.push(grid[i+1][j]); // down
            if(j+1<cols) this.neighbors.push(grid[i][j+1]); // right
        }
    }
}

function Node({pv}){
    const {x,y,isStart,isEnd,isWall,onMouseDown,onMouseEnter,onMouseUp} = pv;
    var classNode = isStart?"START_NODE":isEnd?"END_NODE":isWall?"obtacle":'';

    return(
        <div onMouseDown={()=>{onMouseDown(x,y)}} onMouseEnter={()=>{onMouseEnter(x,y)}}
        onMouseUp={()=>{onMouseUp()}} className={'square '+classNode} id={'row'+x+'_col'+y}>
        </div>
    )
}

export default App;