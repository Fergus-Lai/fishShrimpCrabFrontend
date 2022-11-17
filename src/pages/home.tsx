import React, { useState, useRef, CSSProperties } from "react";
import ReRegExp from "reregexp";
import { useParams, useNavigate } from "react-router-dom";
import { errorAlert } from "../functions/alert";
import "react-notifications-component/dist/theme.css";
import ClipLoader from "react-spinners/BeatLoader";
import useWindowDimensions from "../hooks/useWinDim";
import { io } from "socket.io-client";
import { v4 as uuidv4 } from "uuid";

export function Home() {
  // Get Dimension of Window
  const { height, width } = useWindowDimensions();

  // Position To Middle
  const override: CSSProperties = {
    position: "absolute",
    left: Math.floor(width / 2 - 50),
    top: Math.floor(height / 2 - 50),
  };

  // Set userId to uuidv4 If Not Exists
  const userId = localStorage.getItem("userId") || uuidv4();
  localStorage.setItem("userId", userId);

  const socket = io("http://localhost:3000/", {
    withCredentials: true,
  });

  const navigate = useNavigate();
  let { id } = useParams();

  // Test If Room Code Satisfy Regex
  const re = /[A-Z0-9]{5}/;
  const regex = new RegExp(re);
  // Random Word From Regex Generator
  const gen = new ReRegExp(re);
  // If No Room Code or Failed Test Generate New Code
  if (!id || !regex.test(id)) {
    id = gen.build();
  }

  const [code, setCode] = useState(id);
  const ref = useRef<HTMLTextAreaElement>(null);
  const nameRef = useRef<HTMLTextAreaElement>(null);
  const [icon, setName] = useState("anya");
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(false);

  // Connection Status
  function connectedToServer() {
    if (!socket.connected) {
      errorAlert("Unable to connect to server");
    }
    return socket.connected;
  }

  // Handle Join Room Button Click
  function joinRoomHandler() {
    if (userName === "") {
      errorAlert("Empty user name");
      return;
    }
    if (connectedToServer()) {
      setLoading(true);
      socket.emit("joinTable", {
        userId,
        userName,
        icon,
        code,
      });
    }
  }

  // Handle Create Room Button Click
  function createRoomHandler() {
    if (userName === "") {
      errorAlert("Empty user name");
      return;
    }
    if (connectedToServer()) {
      setLoading(true);
      socket.emit("createTable", {
        userId,
        userName,
        icon,
        code,
      });
    }
  }

  // Handle Unfocus of Textbox of Room Code
  function onBlurHandler() {
    if (!ref.current) {
      return;
    }
    if (!regex.test(ref.current.value)) {
      setCode(gen.build());
    }
  }

  // Handle Changes of Textbox of Room Code
  function onChangeHandler() {
    if (!ref.current) {
      return;
    }
    setCode(ref.current.value);
  }

  // Handle Click of Dice Button
  function randomCodeOnClickHandler() {
    setCode(gen.build());
  }

  // Handle Changes of Username Textbox
  function onUserNameChange() {
    if (!nameRef.current) {
      return;
    }
    setUserName(nameRef.current.value);
  }

  // Handle Unfocus of Username Textbox
  function onUserNameBlur() {
    if (!nameRef.current) {
      return;
    }
    setUserName(nameRef.current.value);
  }

  // Handle Change Icon
  function onIconClick() {}

  // Handle joined Event from Server
  socket.on("joined", () => {
    setLoading(false);
    navigate(`/board/${code}`);
  });

  // Handle Error From Joining
  socket.on("tableDuplicate", () => {
    setLoading(false);
    errorAlert("Table with the same code already exists");
  });

  socket.on("noTable", () => {
    setLoading(false);
    errorAlert(`Table ${code} not found`);
  });

  return (
    <div className="w-screen h-screen bg-gradient-to-r from-purple-800 via-pink-800 to-orange-800 background-animate overflow-hidden">
      <ClipLoader
        color={"#99F6E4"}
        loading={loading}
        cssOverride={override}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      <div
        className={`flex w-full h-full items-center justify-center ${
          loading ? "bg-slate-700/50" : ""
        }`}
      >
        <div className="flex rounded-lg flex-wrap items-stretch w-1/2 h-2/3 bg-slate-700/25">
          <div className="flex basis-full text-center h-1/4">
            Fish Shrimp Crab
          </div>
          <textarea
            id="code"
            ref={ref}
            maxLength={5}
            rows={1}
            value={code}
            onChange={onChangeHandler}
            onBlur={onBlurHandler}
            disabled={loading}
            className="flex basis-2/3 lg:basis-1/3 h-[8.33333333333%] mx-auto lg:ml-auto lg:mr-0 mt-2 font-sans font-semibold overflow-hidden resize-none text-2xl lg:text-4xl text-center text-gray-300 bg-slate-300/25 rounded-lg border border-gray-300/60"
          ></textarea>
          <button
            className="flex lg:aspect-square basis-2/3 h-[8.33333333333%] lg:basis-1/12 bg-slate-300/25 mt-2 mx-auto lg:mr-auto lg:ml-2 rounded-lg border border-gray-300/60"
            onClick={randomCodeOnClickHandler}
            disabled={loading}
          >
            <img
              className="m-auto aspect-square"
              src={
                require("../imgs/casino_FILL0_wght400_GRAD0_opsz48.svg").default
              }
              alt="Dice"
            />
          </button>
          <div className="flex basis-full h-0"></div>
          <button
            className="flex basis-1/3 lg:basis-1/4 h-[8.33333333333%] font-sans font-semibold text-2xl lg:text-4xl bg-slate-300/25 ml-auto mr-2 mt-2 rounded-lg border border-gray-300/60 text-gray-300"
            onClick={createRoomHandler}
            disabled={loading}
          >
            <div className="flex m-auto">Create</div>
          </button>
          <button
            className="flex basis-1/3 lg:basis-1/4 h-[8.33333333333%] font-sans font-semibold text-2xl lg:text-4xl bg-slate-300/25 mr-auto mt-2 rounded-lg border border-gray-300/60 text-gray-300"
            onClick={joinRoomHandler}
            disabled={loading}
          >
            <div className="flex m-auto">Join</div>
          </button>
          <div className="flex basis-full h-0"></div>
          <button
            onClick={onIconClick}
            disabled={loading}
            className="flex aspect-square md:h-[16.66666667%] mx-auto bg-slate-500 rounded-full md:ml-auto md:mr-0 mt-2 border border-gray-300/60"
          >
            <img
              className="flex object-contain object-center mx-auto p-1"
              src={require(`../imgs/${icon}.png`)}
              alt={icon}
            />
          </button>
          <div className="flex flex-col basis-full md:basis-1/3 h-1/6 md:h-[16.66666667%] mt-2 mx-auto md:mr-auto md:ml-2">
            <div className="font-sans font-semibold text-2xl text-gray-300 my-2 text-center md:text-left">
              Name
            </div>
            <textarea
              id="name"
              ref={nameRef}
              maxLength={13}
              rows={1}
              value={userName}
              onChange={onUserNameChange}
              onBlur={onUserNameBlur}
              disabled={loading}
              className="flex font-sans font-semibold overflow-hidden w-5/6 resize-none text-2xl text-center text-gray-300 bg-slate-300/25 rounded-lg border mx-auto md:mx-0 border-gray-300/60"
            ></textarea>
          </div>
          <div className="flex basis-full h-full"></div>
        </div>
      </div>
    </div>
  );
}
