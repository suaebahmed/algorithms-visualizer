var dx = [0,0,+1,-1]
var dy = [+1,-1,0,0]

function BFS(Grid,startNode,endNode,N,M){
    var grid = [...Grid];
    var visitedNodes = [];
    var path = [];
    
    var queue = [];
    queue.push({x : startNode.x, y: startNode.y});
    grid[startNode.x][startNode.y].isWall = 1;   //  x == row  y == col
    
    while(queue.length > 0){
        var front = queue.shift(); // return and pop
        visitedNodes.push(front);

        for(let i=0; i<4; i++){
            var x = dx[i] + front.x;
            var y = dy[i] + front.y;
            
            if(x===endNode.x && y===endNode.y){ // found
                grid[x][y].previous = grid[front.x][front.y]
                let temp = grid[x][y];
                path.push(temp);
                while(temp.previous){
                    path.push(temp.previous);
                    temp = temp.previous;
                }
                return {path,visitedNodes,error:""};
            }
            else if(x>=0 && y>=0 && x<N && y<M && !grid[x][y].isWall){
                grid[x][y].isWall = 1;
                grid[x][y].previous = grid[front.x][front.y] // node parent of node x-y;
                queue.push({x,y});
            }
        }
    }
    return {path,visitedNodes,error:"Path is not found"};
}

export default BFS;