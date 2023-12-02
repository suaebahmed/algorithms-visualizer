var dx = [+2,-2,0,0]
var dy = [0,0,+2,-2]
var vis = []; // represent grid
var visitedNodes = [];

export const PrimsAlgorithm = (N,M)=>{
    visitedNodes = [];
    vis = new Array(N);
    for(let i=0; i<N; i++){
        let arr = [];
        for(let j=0; j<M; j++){
            arr.push(false);
        }
        vis[i] = arr;
    }
    PrimMST(N,M);
    return visitedNodes;
}

// Implement Prim's Algorithm using set data structure
// Modified: instead of selecting the edge with the smallest weight, you select an edge at random

const PrimMST = (N,M) =>{
    let s = new Set();
    const src = (Math.floor(Math.random()*100))%N;
    s.add({ x:src, y:src});
    visitedNodes.push({r:src, c:src}); //first node

    while(s.size){
        // select a random element from set
        let top = [...s][(Math.floor(Math.random()*s.size))%s.size];
        vis[top.x][top.y] = true;
        FindParentAndPush(top.x, top.y, N, M);
        s.delete(top);

        let neighbours = getNeighbours(top,N,M);
        for(let i=0; i<neighbours.length; i++){
            const cx = neighbours[i][0];
            const cy = neighbours[i][1];

            if(!vis[cx][cy]){
                s.add({x:cx, y:cy});
            }
        }
    }
}

export function FindParentAndPush(r,c,N,M){
    // find parent x,y
    let pr, pc;

    // go up
    if(r-2 >= 0 && vis[r-2][c]){
        pr = r-2;
        pc = c;
    }
    // go down
    else if(r+2 < N && vis[r+2][c]){
        pr = r+2;
        pc = c;
    }
    // go left
    else if(c-2 >= 0 && vis[r][c-2]){
        pr = r;
        pc = c-2;
    }
    // go right
    else if(c+2 < M && vis[r][c+2]){
        pr = r;
        pc = c+2;
    }

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
