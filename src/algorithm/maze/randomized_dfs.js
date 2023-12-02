
var dx = [+2,-2,0,0]
var dy = [0,0,+2,-2]

var vis = [];
var visitedNodes = [];

function Randomized_dfs(N,M){
    visitedNodes = [];
    vis = new Array(N);
    for(let i=0; i<N; i++){
        let arr = [];
        for(let j=0; j<M; j++){
            arr.push(false);
        }
        vis[i] = arr;
    }
    dfs(1,1,N,M);
    return visitedNodes;
}
// this function is a iterative DFS
function dfs(r,c,N,M){
    vis[r][c] = true;
    visitedNodes.push({r,c});

    var s = [] // stack()
    s.push({x:r,y:c});
    while(s.length > 0){
        let top = s[s.length-1];

        let neighbours = getNeighbours(top,N,M);
        if(neighbours.length){
            let ren_id = (Math.floor(Math.random()*10))%neighbours.length;
            let cx = neighbours[ren_id][0]; // current x
            let cy = neighbours[ren_id][1]; // current y

            goForward(top.x,top.y,cx,cy);
            s.push({x:cx, y: cy});
            vis[cx][cy] = true;
        }
        else s.pop();  
    }
} 
// pr => parent-row
export function goForward(pr,pc,r,c){
    if(r===pr){
        if(c < pc) for(let i=pc-1; i>=c; i--)visitedNodes.push({r,c:i});
        else for(let i=pc+1; i<=c; i++) visitedNodes.push({r,c:i});
    }
    else{
        if(r < pr) for(let i=pr-1; i>=r; i--) visitedNodes.push({r:i,c});
        else for(let i=pr+1; i<=r; i++)visitedNodes.push({r:i,c});
    }
}

export function getNeighbours(top,N,M){
    let arr = [];
    for(let i=0; i<4; i++){
        let x = top.x + dx[i];
        let y = top.y + dy[i];
        if(x>=0 && y>=0 && x<N && y<M && !vis[x][y]){
            arr.push([x,y]);
        }
    }
    return arr;
}

export default Randomized_dfs;
