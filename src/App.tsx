import React from "react";
import { Route, Routes } from "react-router-dom";
import { Board } from "./pages/board";
import { Home } from "./pages/home";

function App() {
  return (
    <Routes>
      <Route
        path="/board/:id"
        loader={(params) => {
          return null;
        }}
        element={<Board />}
      />
      <Route
        path="/"
        loader={(params) => {
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
