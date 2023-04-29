import logo from "./logo.svg";
import "./App.css";
import HomePage from "./component/HomePage";
import { Routes, Route, Router } from "react-router-dom";
import FindLand from "./component/FindLand";
import Grid from "./unUsedComponents/Grid";
import Grid2 from "./component/Grid2";
import { useState } from "react";
import LandGrid from "./component/LandGrid";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" exact element={<HomePage />} />
        <Route path="/findLand" element={<FindLand />} />
        <Route path="/landGrid" element={<LandGrid />} />
      </Routes>
      <div className="app-container"></div>
    </div>
  );
}

export default App;
