import React from "react";
import { Route, Routes } from "react-router-dom";
import { Board } from "./pages/board";
import { Home } from "./pages/home";

function App() {
  return (
    <Routes>
      <Route path="/board" element={<Board />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default App;
