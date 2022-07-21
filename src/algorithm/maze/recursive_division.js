var vis = [];
var visitedNodes = [];

function recursiveDivision(N,M){
    visitedNodes = [];
    vis = new Array(N);
    for(let i=0; i<N; i++){
        let arr = [];
        for(let j=0; j<M; j++){
            arr.push(false);
        }
        vis[i] = arr;
    }
    //All around of the grid..
    for(let i=0; i<M; i++){
        visitedNodes.push({r:0,c:i});
        vis[0][i] = true;
    }
    for(let i=1; i<N; i++){
        visitedNodes.push({r:i,c:M-1});
        vis[i][M-1] = true;
    }
    for(let i=M-2; i>=0; i--){
        visitedNodes.push({r:N-1,c:i});
        vis[N-1][i] = true;
    }
    for(let i=N-2; i>0; i--){
        visitedNodes.push({r:i,c:0});
        vis[i][0] = true;
    }

    divide(1,N-2,1,M-2);
    return visitedNodes;
}

function divide(startRow,endRow,startCol,endCol){
    if(endRow-startRow<=1 && endCol-startCol<=1) return;
    if(endRow-startRow > endCol-startCol){
        let mid = Math.floor((startRow+endRow)/2);
        let ran_id = Math.floor((Math.random()*100)%(endCol-startCol+1))+startCol;

        let start = startCol;
        if(vis[mid][startCol-1]===false){
            ran_id = start;
            start++;
        }
        let end = endCol;
        if(vis[mid][endCol+1]===false){
            ran_id = end;
            end--;
        }
        for(let i=start; i<=end; i++){
            if(i !== ran_id){
                visitedNodes.push({r:mid,c:i});
                vis[mid][i] = true;
            }
        }
        divide(startRow,mid-1,startCol,endCol);
        divide(mid+1,endRow,startCol,endCol);
    }
    else{
        let mid = Math.floor((startCol+endCol)/2);
        let ran_id = Math.floor((Math.random()*100)%(endRow-startRow+1))+startRow;

        let start = startRow;
        if(vis[startRow-1][mid]===false){
            ran_id = start;
            start++;
        }
        let end = endRow;
        if(vis[end+1][mid]===false){
            ran_id = end;
            end--;
        }
        for(let i=start; i<=end; i++){
            if(i !== ran_id){
                visitedNodes.push({r:i,c:mid});
                vis[i][mid] = true;
            }
        }
        divide(startRow,endRow,startCol,mid-1);
        divide(startRow,endRow,mid+1,endCol);
    }
}

export default recursiveDivision;