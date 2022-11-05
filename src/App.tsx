import React from "react";
import "./App.css";

function App() {
  return (
    <div className="bg-cyan-900">
      <div className="flex place-content-center">
        <p>dice</p>
      </div>
      <div className="flex flex-row flex-wrap">
        <div className="basis-full md:basis-1/3">
          <img
            className="mx-auto"
            src={require("./imgs/anya.png")}
            alt="anya"
          />
        </div>
        <div className="basis-full md:basis-1/3">
          <img
            className="mx-auto"
            src={require("./imgs/anya.png")}
            alt="anya"
          />
        </div>
        <div className="basis-full md:basis-1/3">
          <img
            className="mx-auto"
            src={require("./imgs/anya.png")}
            alt="anya"
          />
        </div>
        <div className="basis-full md:basis-1/3">
          <img
            className="mx-auto"
            src={require("./imgs/anya.png")}
            alt="anya"
          />
        </div>
        <div className="basis-full md:basis-1/3">
          <img
            className="mx-auto"
            src={require("./imgs/anya.png")}
            alt="anya"
          />
        </div>
        <div className="basis-full md:basis-1/3">
          <img
            className="mx-auto"
            src={require("./imgs/anya.png")}
            alt="anya"
          />
        </div>
      </div>
    </div>
  );
}

export default App;
