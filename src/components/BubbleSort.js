import React, { useEffect, useState } from 'react';
import Sorting from '../algorithm/bubble_sorting';
import './Bubble.css';



const BARS = 35;
const barsSize = 20;

function SortingApp(){
    const [bar,setBar] = useState([]);
    const [swap,setSwap] = useState([]);
    
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
    const starSorting=()=>{
        // console.log(swap);
        for(let i=0; i<swap.length; i++){
            setTimeout(()=>{
                document.getElementById('bar-'+swap[i].ff).style.height = swap[i].ssHeight+'px';
                document.getElementById('bar-'+swap[i].ss).style.height = swap[i].ffHeight+'px';
            },i*100);
        }
    }
    const printAllBar = (
            bar.map((item,id)=>{
                return(
                    <div className='bar' id={'bar-'+id} key={id} style={{width:barsSize,height:item}}>
                    </div>
                )
            })
    )
    return (
        <div>
            <button onClick={starSorting}>Start Sorting</button>
            <div className='wrapperBar'>
            {printAllBar}
            </div>
        </div>
    )
}

export default SortingApp;