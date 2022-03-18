import { useState } from 'react';
import './App.css'
import PathfindingVS from './components/PathfindingVS'
import SortingApp from './components/BubbleSort';

function App() {
  const [flag,setFlag] = useState(true);
  return (
    <div className="App">
      <button onClick={()=>{setFlag(!flag)}}> Toggle Algo </button>
      {flag?<SortingApp/>:<PathfindingVS/>}
    </div>
  );
}

export default App;
