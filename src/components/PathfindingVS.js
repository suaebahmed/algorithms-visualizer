import React,{useEffect, useState} from 'react'
import './PathfindingVS.css';
import Astar from '../algorithm/A_star_algo';

/*
Density of primes = n/ln(n);
super(props);// call the super class constructor and pass in the props parameter
*/

var rows = 10;
var cols = 25;

const START_NODE_ROW = 0, START_NODE_COL = 0;
const END_NODE_ROW = rows-1, END_NODE_COL = cols-1;

function App(){
    const [Grid,setGrid] = useState([]);
    const [Path,setPath] = useState([]);
    const [visitedNodes,setVisitedNodes] = useState([]);

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
        setGrid(grid);

        for(let i=0; i<rows; i++){
            for(let j=0; j<cols; j++){
                grid[i][j].getNeighbors(grid);

            }
        }

        var obj = Astar(grid[START_NODE_ROW][START_NODE_COL],grid[END_NODE_ROW][END_NODE_COL]);
        setPath(obj.path);
        setVisitedNodes(obj.close_list);
    }

    // jsx Node of grid (2D array)
    const gridOFNode = (
        Grid.map((R,idx_r)=>{
            return (
                <div key={idx_r} className='ROW'>
                    {
                        R.map((Value,idx_c)=>{
                            
                            // console.log(Value);

                            const {x,y,isStart,isEnd,isObtacle} = Value;
                            return <Node key={idx_c} pv={{x,y,isStart,isEnd,isObtacle}}></Node>
                        })
                    }
                </div>
            )
        })
    )
    // animate the algorithm
    const animateVisitedNodes=(visitedNodes)=>{
        for(let i=0; i<visitedNodes.length; i++){
            const node = visitedNodes[i];
            setTimeout(()=>{
                document.getElementById(`row${node.x}_col${node.y}`).className = "node node-shortest-path";
            },10*i);
        }
    }
    const animateShortestPath=(pathNode)=>{
        for(let i=0; i<pathNode.length; i++){
            const node = pathNode[i];
            setTimeout(()=>{
                document.getElementById(`row${node.x}_col${node.y}`).className = "pathNode";
            },5*i);
        }
    }

    const clickHandle=()=>{
        animateVisitedNodes(visitedNodes);
        console.log('start');
        setTimeout(()=>{
            console.log('end');
            animateShortestPath(Path);
        },2500);
    }

    return (
        <div className='container'>
            <div className='header'>
                <button onClick={clickHandle}>add a square</button>
            </div>
            <div className='grid'>
                {gridOFNode}
            </div>
        </div>
    )
}

class Spot {
    constructor(i, j) {
        this.x = i;
        this.y = j;
        this.f = 1e9;
        this.g = 1e9;
        this.isObtacle = false;
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
    const {x,y,isStart,isEnd,isObtacle} = pv;
    const [obtacle,setObtacle] = useState(isObtacle);

    var classNode = isStart?"START_NODE":isEnd?"END_NODE":"";
    var classObstacle = obtacle && !(isStart || isEnd)?"obtacle":'';

    const clickH = () =>{
        setObtacle(!obtacle) 
        
    }

    return(
        <div onMouseDown={clickH} className={'square '+classNode+''+classObstacle} id={'row'+x+'_col'+y}>
        </div>
    )
}

export default App;