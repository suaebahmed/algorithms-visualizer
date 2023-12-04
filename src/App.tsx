import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import PathfindingVS from "./Pages/PathfindingVS";
import SortingApp from "./Pages/Sorting";
import PrimeApp from "./Pages/PrimeSpiral";
import NQueen from "./Pages/N_Queen";

function App() {
  return (
    <div className="w-full h-full">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/path-finding" element={<PathfindingVS />} />
        <Route path="/sorting" element={<SortingApp />} />
        <Route path="/spiral-prime" element={<PrimeApp />} />
        <Route path="/nqueens" element={<NQueen />} />
      </Routes>
    </div>
  );
}

export default App;
