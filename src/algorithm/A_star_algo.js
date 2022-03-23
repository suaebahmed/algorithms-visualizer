/* 
To see my c++ submission:  
https://cses.fi/problemset/result/3677359/

Want to learn more about a* algorithm please visit

https://www.youtube.com/watch?v=icZj67PTFhc&t=256s
https://en.wikipedia.org/wiki/A*_search_algorithm

*/

function Astar(startNode,endNode){

    var open_list = [];
    var close_list = [];
    let path = [];

    startNode.g = 0;
    startNode.f = Math.abs(startNode.x-endNode.x)+Math.abs(startNode.y-endNode.y);
    open_list.push(startNode);

    while(open_list.length > 0){

        var atLeastValueIdx = 0;
        for(let i=0; i<open_list.length; i++){
            if(open_list[atLeastValueIdx].f > open_list[i].f){
                atLeastValueIdx = i;
            }
        }
        var curr_node = open_list[atLeastValueIdx];
        close_list.push(curr_node);

        // to remove
        var newOpen_list = [];
        for(var i=0; i<open_list.length; i++) if(i!==atLeastValueIdx) newOpen_list.push(open_list[i]);
        open_list = newOpen_list;

        // found the path
        if(endNode === curr_node){
            let temp = curr_node;
            path.push(temp);
            while(temp.previous){
                path.push(temp.previous);
                temp = temp.previous;
            }
            return {path,close_list,error:""};
        }
        
        let neighbors = curr_node.neighbors;
        for(let i=0; i<neighbors.length; i++){
            
            var child = neighbors[i];
            if(child.isWall === true) continue;

            var newGScore  = curr_node.g + 1;
            var HScore = Math.abs(child.x - endNode.x)+Math.abs(child.y - endNode.y);
            child.f = newGScore + HScore;

            if(neighbors[i].g > newGScore){
                neighbors[i].g = newGScore // update neighbors gScore
                neighbors[i].previous = curr_node;
                if(!open_list.includes(child)) open_list.push(child)
            }
        }
    }
    return {path, close_list, error:"path is not found"};


}

export default Astar;