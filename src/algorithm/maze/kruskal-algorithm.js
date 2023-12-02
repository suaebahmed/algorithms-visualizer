var dx = [+2,-2,0,0]
var dy = [0,0,+2,-2]
var vis = []; // represent grid
var visitedNodes = [];

export const KruskalAlgorithm = (N,M)=>{
    visitedNodes = [];
    vis = new Array(N);
    for(let i=0; i<N; i++){
        let arr = [];
        for(let j=0; j<M; j++){
            arr.push(false);
        }
        vis[i] = arr;
    }
    RunKruskal(N,M);
    return visitedNodes;
}

const RunKruskal = (N,M) =>{
    let edges = [];
    // push all egde of the grid 
    for(let i=0; i<N; i++){
        for(let j=0; j<M; j++){
            if(j>=2) edges.push({x1: i, y1: j-2, x2: i, y2: j});
            if(i>=2) edges.push({x1: i-2, y1: j, x2: i, y2: j});
        }
    }

    Build(N*100+M+5);
    for(let i=0; i<edges.length; i++){
        // select random edge
        let id = Math.floor((Math.random()*edges.length)%edges.length);

        let px = edges[id].x1;
        let py = edges[id].y1;
        let cx = edges[id].x2;
        let cy = edges[id].y2;

        if(i === 0) visitedNodes.push({r:px,c:py}); // first node

        // check if they are in same component
        if(Find(px*100+py) !== Find(cx*100+cy)){
            goForward(px,py,cx,cy);
            Union(px*100+py,cx*100+cy);
        }
    }
}

export function goForward(pr,pc,r,c){
    if(r===pr){ // same row
        if(c < pc) for(let i=pc-1; i>=c; i--) visitedNodes.push({r,c:i}); // Go right to left
        else for(let i=pc+1; i<=c; i++) visitedNodes.push({r,c:i}); // Go left to right
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

/*
    MXN = 100*Row + Column

    MOD = 100
    Max Row = 20 
    Max Column = 99

    So, MAX N = 20 * 100 + 99 = 2099
*/

const MXN = 2100;
var p = new Array(MXN);
var sz = new Array(MXN);
const Build = (n) =>{
    for(let i=0; i<=n; i++){
        p[i] = i;
        sz[i] = 1;
    }
}
const Find = (x) =>{
    return x===p[x]?x:p[x]=Find(p[x]);
}
const Union = (a,b) =>{
    a = Find(a);
    b = Find(b);
    if(sz[a] < sz[b]) [a,b] = [b,a];
    p[b] = a;
    sz[a] += sz[b];
}
