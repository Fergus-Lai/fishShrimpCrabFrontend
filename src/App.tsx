import React from "react";
import image from "./components/image";
import triple from "./components/triple";
import single from "./components/single";
import "./App.css";

function App() {
  return (
    <div className="bg-cyan-900 h-screen">
      <div className="flex place-content-center h-1/6">
        <p>dice</p>
      </div>
      <div className="flex flex-row flex-wrap h-2/6">
        {single("anya")}
        {single("anya")}
        {single("anya")}
        {single("anya")}
        {single("anya")}
        {single("anya")}
      </div>
      <div className="flex flex-row flex-wrap h-1/2">
        <div className="basis-full md:basis-1/12 flex">{image("anya")}</div>
        <div className="basis-full md:basis-11/12 flex">
          <div className="basis-full md:basis-1/3">
            {triple("anya")}
            {triple("anya")}
          </div>
          <div className="basis-full md:basis-1/3">
            {triple("anya")}
            {triple("anya")}
          </div>
          <div className="basis-full md:basis-1/3">
            {triple("anya")}
            {triple("anya")}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
