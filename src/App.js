import React from 'react';
import {
  Routes,
  Route
} from "react-router-dom";
import './App.css'
import PathfindingVS from './Pages/PathfindingVS'
import Home from './Pages/Home';
import SortingApp from './Pages/Sorting';
import PrimeApp from './Pages/PrimeSpiral';
import NQueen from './Pages/N_Queen';

function App() {

  return (
      <div className="App">
          <Routes>
            <Route exact path="/" element={<Home/>} />
            <Route exact path="/path-finding" element={<PathfindingVS/>} />
            <Route exact path="/sorting" element={<SortingApp/>} />
            <Route exact path="/spiral-prime" element={<PrimeApp/>} />
            <Route exact path="/nqueens" element={<NQueen/>} />
          </Routes>
    </div>
  );
}

export default App;
