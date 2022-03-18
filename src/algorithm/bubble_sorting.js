

function Sorting(b,n){
    var a = [];
    var arr = [];
    // copy the arr
    b.forEach(element => { arr.push(element)});

    for(let i=0; i<n; i++){
        for(let j=0; j<n-1-i; j++){
            if(arr[j] > arr[j+1]){

                const mp = new Map();
                mp['ff'] = j;
                mp['ss'] = j+1;
                mp['ffHeight'] = arr[j];
                mp['ssHeight'] = arr[j+1];

                // ------- another way   ----
                // var obj = {
                //     ff : 0,
                //     ss : 0
                // }
                // in C++  pair<int,int> mp or;
                // map<string,int> mp;   mp['ff'] = j;

                // ------ I want to know more this ----
                // mp.set("ff",j);
                // mp.set("ss",j+1);
                

                let tmp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = tmp;
                a.push(mp);
            }
        }
    }
    return a;
}

export default Sorting;