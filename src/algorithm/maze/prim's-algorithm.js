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
    let s = [];
    let src = (Math.floor(Math.random()*100))%N;
    src = (src%2===0)?src+1:src; // make it odd
    src %= N;
    s.push({ x:src, y:src});
    visitedNodes.push({r:src, c:src}); //first node

    while(s.length > 0){
        let top = s[(Math.floor(Math.random()*100))%s.length];
        vis[top.x][top.y] = true;
        FindParentAndPush(top.x, top.y, N, M);

        s = [...(s.filter((item) => (JSON.stringify(item) !== JSON.stringify(top))))];

        let neighbours = getNeighbours(top,N,M);
        for(let i=0; i<neighbours.length; i++){
            const cx = neighbours[i][0];
            const cy = neighbours[i][1];
            s.push({x:cx, y:cy});
        }
    }
}

export function FindParentAndPush(r,c,N,M){
    // go up
    let choice = [];
    if(r-2 >= 0 && vis[r-2][c]){
        choice.push({r:r-2,c});
    }
    // go down
    if(r+2 < N && vis[r+2][c]){
        choice.push({r:r+2,c});
    }
    // go left
    if(c-2 >= 0 && vis[r][c-2]){
        choice.push({r,c:c-2});
    }
    // go right
    if(c+2 < M && vis[r][c+2]){
        choice.push({r,c:c+2});
    }
    if(choice.length === 0) return;
    
    // find parent x,y
    const random = choice[(Math.floor(Math.random()*100))%choice.length];
    const pr = random.r;
    const pc = random.c;
    if(r===pr){
        if(c < pc) for(let i=pc-1; i>=c; i--) visitedNodes.push({r,c:i});
        else for(let i=pc+1; i<=c; i++) visitedNodes.push({r,c:i});
    }
    else{
        if(r < pr) for(let i=pr-1; i>=r; i--) visitedNodes.push({r:i,c});
        else for(let i=pr+1; i<=r; i++) visitedNodes.push({r:i,c});
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
