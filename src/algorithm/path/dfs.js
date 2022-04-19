
var dx = [+1,-1,0,0]
var dy = [0,0,+1,-1]

var grid = [];
var visitedNodes = [];
var path = [];

function dfs(r,c,endNode,Grid,N,M){
    grid[r][c].visited = 1;
    visitedNodes.push({x: r, y: c});

    for(let i=0; i<4; i++){
        let x = r + dx[i];
        let y = c + dy[i];
        if(x===endNode.x && y===endNode.y){
            visitedNodes.push({x,y});
            grid[x][y].x = r;
            grid[x][y].y = c;
            return 1; // if we reach the goal then we immediately back
        }
        else if(x>=0 && y>=0 && x<N && y<M && !Grid[x][y].isWall && !grid[x][y].visited){
            grid[x][y].x = r;
            grid[x][y].y = c;
            if(dfs(x,y,endNode,Grid,N,M)) return 1;
        }
    }
    return 0;
}

function DFS(Grid,startNode,endNode,N,M){
    path = []; // make empty for repeated DFS runnig
    visitedNodes = []; 
    grid = new Array(N);

    for(let i=0; i<N; i++){
        let arr = [];
        for(let j=0; j<M; j++){
            arr.push({x: -1, y: -1, visited: 0});
        }
        grid[i] = arr;
    }
    dfs(startNode.x,startNode.y,endNode,Grid,N,M);

    // -------   path  ---------------
    if(grid[endNode.x][endNode.y].x===-1 && grid[endNode.x][endNode.y].y===-1){
        return {path,visitedNodes,error:"path is not found"};
    }
    var tmp = {x:endNode.x,y: endNode.y};
    path.push({x:tmp.x,y:tmp.y});
    while(grid[tmp.x][tmp.y].x!==-1  || grid[tmp.x][tmp.y].y!==-1){
        let tmpX = grid[tmp.x][tmp.y].x;
        let tmpY = grid[tmp.x][tmp.y].y;
        tmp.x = tmpX;
        tmp.y = tmpY;
        path.push({x:tmp.x,y:tmp.y});
    }
    return {path,visitedNodes,error:""};
}

export default DFS;