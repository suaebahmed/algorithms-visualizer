import React from 'react';
import {
  BrowserRouter as Router,
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
        <Router>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/path-finding" element={<PathfindingVS/>} />
            <Route path="/sorting" element={<SortingApp/>} />
            <Route path="/spiral-prime" element={<PrimeApp/>} />
          </Routes>
        </Router>
    </div>
  );
}

export default App;
