import React, { useEffect, useState } from 'react';
import Sorting from '../algorithm/bubble_sorting';
import './Bubble.css';

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
    const [bar,setBar] = useState([]);
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
        setBar(arr);
    }

    async function starSortingHandle(){
        // for(let i=0; i<swap.length; i++){
        //     document.getElementById('bar-'+swap[i].ff).style.background = '#FF5959';
        //     document.getElementById('bar-'+swap[i].ss).style.background = '#FF5959';
        //     // we control animation speed with async/await and Promise.
        //     await waitForAnimate(SPEED); // global

        //     document.getElementById('bar-'+swap[i].ff).style.height = swap[i].ssHeight+'px';
        //     document.getElementById('bar-'+swap[i].ss).style.height = swap[i].ffHeight+'px';
        //     document.getElementById('bar-'+swap[i].ff).style.background = '#005F99';
        //     document.getElementById('bar-'+swap[i].ss).style.background = '#005F99';
        // }
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
        setBar(arr);
    }
    // console.log(sizeOfBar,speed)

    return (
        <div>
            <div>
                <button onClick={starSortingHandle}>Start Sorting</button>
                <button onClick={generateNewArray}>Generate New</button>
            </div>
            <div id = 'formBubble1'>
                <form>
                    <label htmlFor='range1'>Speed: </label>
                    <input type='range' onChange={rangeValueHandle} name='range1' id = 'range1'
                    min='1' value={speed} max='1000' step='1'></input>
                    <div>
                        <label htmlFor='num'>Choose bar size: </label>
                        <select value={bar.length} onChange={sizeHandle} id="num" name="num">
                            <option value="10">10</option>
                            <option value="18">18</option>
                            <option value="25">25</option>
                            <option value="35">35</option>
                            <option value="50">50</option>
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