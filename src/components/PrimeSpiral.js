import React, { useState, useEffect } from 'react'
import './PrimeSpiral.css'
import prime_Spiral_Generate from '../algorithm/prime_spiral';

// Density of primes = n/ln(n);
const N = 21;

function PrimeApp(){
    const[Grid,setGrid] = useState([]);
    const[cntPrime, setCntPrime] = useState(0);

    useEffect(()=>{
        gridInitialize();
    },[])

    const gridInitialize =()=>{
        var grid = new Array(N);
        for(let i=0; i<N; i++) grid[i] = new Array(N);
        let c = 0;
        for(let i=0; i<N; i++){
            for(let j=0; j<N; j++){
                grid[i][j] = ++c;
            }
        }
        setGrid(grid);
    }

    const gridOfNode = (
        Grid.map((R,idx_r)=>{
            return (
                <div key={idx_r} className='ROW'>
                    {
                        R.map((value,idx_c)=>{
                            return (
                                <div key={idx_c} className='primeSquare' id={'node-row'+idx_r+'-col'+idx_c}>
                                    <div></div>
                                    <div className='rectangle'></div>
                                </div>
                            )
                        })
                    }
                </div>
            )
        })
    )
    const isPrime = (n) =>{
        if(n < 2) return false;
        for(let i=2; i*i<=n; i++){
            if(n%i===0) return false;
        }
        return true;
    }

    const startPrimeSpiral = () =>{
        var arr = prime_Spiral_Generate(N);
        var c = 0;
        for(let i=0; i<arr.length; i++){
            setTimeout(()=>{
                var node = document.getElementById('node-row'+arr[i].r+'-col'+arr[i].c);
                if(isPrime(arr[i].num)){
                    node.children[0].className = 'circle';
                    setCntPrime(++c);
                }
                node.children[1].className = 'rectangle-'+arr[i].direction;

                // node.innerHTML = '<b style = text-align: center>'+arr[i].num+'</b>';
            },i*50);
        }
    }
    return (
        <>
            <button onClick={startPrimeSpiral}>Show Prime spiral</button>
            <div className='primeGridContainer'>
                <div>
                {gridOfNode}
                </div>
            </div>
            <h2 style={{textAlign:'center'}}>{cntPrime} prime numbers out of {N*N}</h2>
            <h2 style={{textAlign:'center'}}><a href='https://en.wikipedia.org/wiki/Ulam_spiral'>Wikipedia Ulam Spiral</a></h2>

        </>

    )
}

export default PrimeApp;