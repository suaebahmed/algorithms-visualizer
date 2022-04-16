
function basicMaze(rows,cols){
    var arr = [];
    for(var r=0; r<rows; r++){
        const st = new Set()
        for(var j=0; j<cols/4; j++){
            var c = Math.floor((Math.random()*100));
            c %= cols;
            st.add(c);
        }
        for(let c of st) arr.push({r,c});
    }
    return arr;
}

export default basicMaze;