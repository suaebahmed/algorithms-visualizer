
function prime_Spiral_Generate(N){

    var row = Math.floor(N/2);
    var col = Math.floor(N/2);
    var num = 1, step = 1;
    var list = [];

    for(let k = 0; k<Math.floor(N/2); k++){
        for(let i=0; i<step; i++){
            list.push({r: row,c: col++, num: num++, direction: 1});
        }
        for(let j=0; j<step; j++){
            list.push({r: row--,c: col, num: num++, direction: 2});
        }
        step++;
        for(let i=0; i<step; i++){
            list.push({r: row,c: col--, num: num++, direction: 3});

        }
        for(let j=0; j<step; j++){
            list.push({r: row++,c: col, num: num++, direction: 4});
        }
        step++;
    }
    for(let i=1; i<step; i++){
        list.push({r: row,c: col++, num: num++, direction: 1});
    }
    return list;
}

export default prime_Spiral_Generate;