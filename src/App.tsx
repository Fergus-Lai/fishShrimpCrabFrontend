import React from "react";
import { Route, Routes } from "react-router-dom";
import { Board } from "./pages/board";
import { Home } from "./pages/home";

function App() {
  return (
    <Routes>
      <Route path="/board/:id" element={<Board />} />
      <Route
        path="/"
        loader={(params) => {
          console.log(params);
          return null;
        }}
        element={<Home />}
      />
      <Route
        path="/lobby/:id"
        element={<Home />}
        loader={({ params }) => {
          return params.id;
        }}
      />
    </Routes>
  );
}

export default App;
