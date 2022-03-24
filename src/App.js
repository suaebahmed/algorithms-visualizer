import React,{ useState } from 'react';
import './App.css'
import PathfindingVS from './components/PathfindingVS'
import SortingApp from './components/BubbleSort';
import PrimeApp from './components/PrimeSpiral';

function App() {
  const [flag,setFlag] = useState(1);
  var project = undefined;
  switch (flag) {
    case 1:
      project = <SortingApp/>;
      break;
    case 2:
      project = <PrimeApp/>;
      break;
    default:
      project = <PathfindingVS/>
      break;
  }

  return (
    <div className="App">
      <div className='btnContainer'>
        <button className='btn' onClick={()=>{setFlag(0)}}> Path finding</button>
        <button className='btn' onClick={()=>{setFlag(1)}}> Bubble sort </button>
        <button className='btn' onClick={()=>{setFlag(2)}}> Prime spiral </button>
        <button className='btn' onClick={()=>{}}> Comming soon... </button>
      </div>
        {project}
    </div>
  );
}

export default App;
