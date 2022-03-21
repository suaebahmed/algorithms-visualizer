import React, { useEffect, useState } from 'react';
import Sorting from '../algorithm/bubble_sorting';
import './Bubble.css';



const BARS = 25;
const barWidth = 20;
var SPEED = 500;

async function waitForAnimate(sp){
    sp = sp < 5? 5 : sp;
    return new Promise((resolve)=>{
        setTimeout(()=>{resolve('')},sp);
    })
}

function SortingApp(){
    const [bar,setBar] = useState([]);
    const [swap,setSwap] = useState([]);

    // it doesn't work but work for global variable
    // it's need for input range dom update
    var [speed,setSpeed] = useState(SPEED); 
    
    useEffect(()=>{
       init(); 
    },[])

    const init=()=>{
        var arr = [];
        for(let i=0; i<BARS; i++){
            let x = Math.floor(Math.random()*1000)%400;
            arr.push(x);
        }
        var obj = Sorting(arr,arr.length);
        setBar(arr);
        setSwap(obj);
    }

    async function starSortingHandle(){
        for(let i=0; i<swap.length; i++){
            document.getElementById('bar-'+swap[i].ff).style.background = 'red';
            document.getElementById('bar-'+swap[i].ss).style.background = 'red';
            // we control animation speed with async/await and Promise.
            await waitForAnimate(SPEED);

            document.getElementById('bar-'+swap[i].ff).style.height = swap[i].ssHeight+'px';
            document.getElementById('bar-'+swap[i].ss).style.height = swap[i].ffHeight+'px';
            document.getElementById('bar-'+swap[i].ff).style.background = 'blue';
            document.getElementById('bar-'+swap[i].ss).style.background = 'blue';
        }
    }

    const printAllBar = (
            bar.map((item,id)=>{
                return(
                    <div className='bar' id={'bar-'+id} key={id} style={{width:barWidth,height:item}}>
                    </div>
                )
            })
    )
    const rangeValueHandle = (event) =>{    
        SPEED = parseInt(event.target.max)-parseInt(event.target.value);
        setSpeed(event.target.valueAsNumber);
    }

    return (
        <div>
            <button onClick={starSortingHandle}>Start Sorting</button>
            <form >
                <input type='range' onChange={rangeValueHandle} name='range1' id = 'range1'
                min='1' value={speed} max='1000' step='1'></input>
            </form>
            <div className='wrapperBar'>
            {printAllBar}
            </div>
        </div>
    )
}

export default SortingApp;