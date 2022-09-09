import React, { useEffect, useState } from 'react';
import '../styles/Bubble.css';

var BARS = 25;
const barWidth = 20;
var SPEED = 500;

async function waitForAnimate(sp){
    sp = sp < 5? 5 : sp;
    return new Promise((resolve)=>{
        setTimeout(()=>{resolve('')},sp);
    })
}

/*
    ** https://blog.logrocket.com/why-react-doesnt-update-state-immediately/

    // speed variable doesn't work but work for global variable
    // it's need for input range dom update
*/

function SortingApp(){
    const [bar,setBar] = useState([80,40,20,70,30]);
    var [speed,setSpeed] = useState(SPEED); 
    const [sortID,setSortID] = useState(3);

    useEffect(()=>{
       init(); 
    },[])

    const init=()=>{
        var arr = [];
        for(let i=0; i<BARS; i++){
            let x = Math.floor(Math.random()*1000)%400;
            arr.push(x);
        }
        setBar(arr);
    }
    var ORGINAL_COLOR = '#3498DB';
    var COMP_COLOR = '#FF5959';
    var SORTED_COLOR = '#6C3483';
    var PIVOT_COLOR = 'orange';

    const swap = (i,j,newBars) => {
        document.getElementById('bar-'+i).style.height = newBars[j]+'px';
        document.getElementById('bar-'+j).style.height = newBars[i]+'px';

        var tmp = newBars[i];
        newBars[i] = newBars[j];
        newBars[j] = tmp;
    }
    // -----------  All Sorting Algorithm  -----------
    async function bubbleSort(){
        var newBars = []; //copy the array
        for(let i=0; i<bar.length; i++) newBars.push(bar[i]);

        for(var i=0; i<newBars.length; i++){
            for(var j=0; j<newBars.length-1-i; j++){
                
                document.getElementById('bar-'+j).style.background =  COMP_COLOR;
                document.getElementById('bar-'+(j+1)).style.background = COMP_COLOR;
                // we control animation speed with async/await and Promise.
                await waitForAnimate(SPEED); // global var
                document.getElementById('bar-'+j).style.background = ORGINAL_COLOR
                document.getElementById('bar-'+(j+1)).style.background = ORGINAL_COLOR;


                if(newBars[j] > newBars[j+1]){
                    swap(j,j+1,newBars);
                }
            }
            var sorted = newBars.length-1-i;
            document.getElementById('bar-'+sorted).style.background = SORTED_COLOR;
        }
    }
    async function selectionSort(){
        var newBars = [];
        for(let i=0; i<bar.length; i++) newBars.push(bar[i]);
        
        for(var i=0; i<newBars.length; i++){
            var leastIdx = i;
            document.getElementById('bar-'+leastIdx).style.background = 'black';

            for(var j=i+1; j<newBars.length; j++){
                document.getElementById('bar-'+j).style.background = COMP_COLOR;
                await waitForAnimate(SPEED); // global var
                document.getElementById('bar-'+j).style.background = ORGINAL_COLOR;

                if(newBars[j] < newBars[leastIdx]){
                    document.getElementById('bar-'+leastIdx).style.background = ORGINAL_COLOR;
                    leastIdx = j;
                    document.getElementById('bar-'+leastIdx).style.background = 'black';
                }
            }
            // swap
            swap(i,leastIdx,newBars);
            document.getElementById('bar-'+leastIdx).style.background = ORGINAL_COLOR;
            document.getElementById('bar-'+i).style.background = SORTED_COLOR
        }
    }
    const insertionSort = async () =>{
        var newBars = [];
        for(let i=0; i<bar.length; i++) newBars.push(bar[i]);
        
        for(var i=1; i<newBars.length; i++){
            var tmp = newBars[i], j = i-1;
            document.getElementById('bar-'+i).style.transform = 'translateY(15px)'

            while(j>=0 && newBars[j] > tmp){
                document.getElementById('bar-'+j).style.background = COMP_COLOR;
                document.getElementById('bar-'+(j+1)).style.background = PIVOT_COLOR;

                await waitForAnimate(SPEED);
                newBars[j+1] = newBars[j];
                document.getElementById('bar-'+(j+1)).style.height = newBars[j]+'px';
                document.getElementById('bar-'+(j+1)).style.background = SORTED_COLOR;
                j--;
            }
            newBars[j+1] = tmp;
            document.getElementById('bar-'+(j+1)).style.height = tmp+'px';
            document.getElementById('bar-'+(j+1)).style.background = SORTED_COLOR;
            document.getElementById('bar-'+i).style.transform = 'translateY(0px)';
        }
    }
    const partition = async (low,high,array) =>{
        let pivot = high, i = low;
        document.getElementById('bar-'+pivot).style.background = PIVOT_COLOR;

        for(let j=low; j<high; j++){
            document.getElementById('bar-'+j).style.background = COMP_COLOR;
            document.getElementById('bar-'+i).style.background = COMP_COLOR;
            await waitForAnimate(SPEED);
            document.getElementById('bar-'+j).style.background = ORGINAL_COLOR;
            document.getElementById('bar-'+i).style.background = ORGINAL_COLOR;

            if(array[j] <= array[pivot]){
                swap(i,j,array);
                i++;
            }
        }
        swap(i,pivot,array);
        document.getElementById('bar-'+pivot).style.background = ORGINAL_COLOR;
        return i;
    }

    const quickSort = async (low,high,array) =>{
        if(low >= high) return;
        let pi = await partition(low,high,array);
        await quickSort(low,pi-1,array);
        await quickSort(pi+1,high,array);            
    }

    const mergeSort = async (low,high,array) =>{
        if(low >= high) return;
        var mid = Math.floor((low+high)/2);
        await mergeSort(low,mid,array)
        await mergeSort(mid+1,high,array);

        // merge the array
        // console.log(low,high, mid);

        var newArr1 = [], newArr2 = [];
        for(let i=low; i<=mid; i++){
            newArr1.push({x:array[i],idx:i});
        }
        for(let i=mid+1; i<=high; i++){
            newArr2.push({x:array[i],idx:i});
        }
        let i=0, j = 0, k = low;
        while(i<newArr1.length && j<newArr2.length){
            document.getElementById('bar-'+newArr1[i].idx).style.background = COMP_COLOR;
            document.getElementById('bar-'+newArr2[j].idx).style.background = COMP_COLOR;
            await waitForAnimate(SPEED);
            document.getElementById('bar-'+newArr1[i].idx).style.background = SORTED_COLOR;
            document.getElementById('bar-'+newArr2[j].idx).style.background = SORTED_COLOR;

            if(newArr1[i].x < newArr2[j].x){
                array[k] = newArr1[i].x;
                document.getElementById('bar-'+k).style.height = array[k]+'px';
                i++;
            }
            else{
                array[k] = newArr2[j].x;
                document.getElementById('bar-'+k).style.height = array[k]+'px';
                j++;
            }
            k++;
        }
        while(i<newArr1.length){
            array[k] = newArr1[i].x;
            document.getElementById('bar-'+k).style.height = array[k]+'px';
            document.getElementById('bar-'+k).style.background = SORTED_COLOR;
            i++;
            k++;
        }
        while(j<newArr2.length){
            array[k] = newArr2[j].x;
            document.getElementById('bar-'+k).style.height = array[k]+'px';
            document.getElementById('bar-'+k).style.background = SORTED_COLOR;
            j++;
            k++;
        }
    }
    // -----------  End Sorting Algorithm  ----------

    const startSortingHandle = async () =>{
        var newBars = [];
        switch(sortID){
            case 1:
                selectionSort();
            break;
            case 2:
                insertionSort();
            break;
            case 3:
                for(let i=0; i<bar.length; i++) newBars.push(bar[i]); 
                await quickSort(0,newBars.length-1,newBars);
            break;
            case 4:
                newBars = [];
                for(let i=0; i<bar.length; i++) newBars.push(bar[i]); 
                await mergeSort(0,newBars.length-1,newBars);
            break;
            default:
                bubbleSort();
            break;
        }
    }

    const printAllBar = (
            bar.map((item,id)=>{
                return(
                    <div className='bar' id={'bar-'+id} key={id} 
                    style={{width:barWidth,height:item}}>
                    </div>
                )
            })
    )
    const rangeValueHandle = (event) =>{    
        SPEED = parseInt(event.target.max)-parseInt(event.target.value);
        setSpeed(event.target.valueAsNumber);
    }
    const sizeHandle = (e) =>{
        BARS = parseInt(e.target.value);
        generateNewArray();
    }
    const generateNewArray = () =>{
        var arr = [];
        for(let i=0; i<BARS; i++){
            let x = Math.floor(Math.random()*1000)%400;
            arr.push(x);
        }
        for(let i=0; i<bar.length; i++){
            var dom = document.getElementById('bar-'+i);
            dom.style.backgroundColor = '#3498DB';
        }
        setBar(arr);
    }

    return (
        <div>
            <div className='Btn-Wrap'>
                <button onClick={startSortingHandle}>Start Sorting</button>
                <button onClick={generateNewArray}>Generate New</button>
                <select value={sortID} onChange={(e)=>{setSortID(parseInt(e.target.value));generateNewArray()}} id="num" name="num">
                        <option value="0">Bubble Sort</option>
                        <option value="1">Selection Sort</option>
                        <option value="2">Insertion Sort</option>
                        <option value="3">Quick Sort</option>
                        <option value="4">Merge Sort</option>
                </select>
            </div>
            <div id = 'formBubble1'>
                <form>
                    <label htmlFor='range1'>Speed: </label>
                    <input type='range' onChange={rangeValueHandle} name='range1' id = 'range1'
                    min='1' value={speed} max='1000' step='1'></input>
                    <div>
                        <label htmlFor='num'>Choose Size: </label>
                        <select value={bar.length} onChange={sizeHandle} id="num" name="num">
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                            <option value="200">200</option>
                        </select>
                    </div>
                </form>
            </div>
            <div className='wrapperBar'>
            {printAllBar}
            </div>
        </div>
    )
}

export default SortingApp;