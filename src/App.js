import React from 'react';
import {
  Routes,
  Route
} from "react-router-dom";
import './App.css'
import PathfindingVS from './Pages/PathfindingVS'
import Home from './Pages/Home';
import SortingApp from './Pages/BubbleSort';
import PrimeApp from './Pages/PrimeSpiral';

function App() {

  return (
      <div className="App">
          <Routes>
            <Route exact path="/" element={<Home/>} />
            <Route exact path="/path-finding" element={<PathfindingVS/>} />
            <Route exact path="/sorting" element={<SortingApp/>} />
            <Route exact path="/spiral-prime" element={<PrimeApp/>} />
          </Routes>
    </div>
  );
}

export default App;
