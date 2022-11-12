import React, { useState, useRef, CSSProperties, useEffect } from "react";
import ReRegExp from "reregexp";
import { io } from "socket.io-client";
import { useParams, useNavigate } from "react-router-dom";
import { Store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import ClipLoader from "react-spinners/BeatLoader";
import useWindowDimensions from "../hooks/useWinDim";

export function Home() {
  const { height, width } = useWindowDimensions();

  const override: CSSProperties = {
    position: "absolute",
    left: Math.floor(width / 2 - 50),
    top: Math.floor(height / 2 - 50),
  };

  const socket = io("http://localhost:3000/");

  const navigate = useNavigate();

  const re = /[A-Z0-9]{5}/;
  const regex = new RegExp(re);
  const gen = new ReRegExp(re);
  let { id } = useParams();
  if (!id || !regex.test(id)) {
    id = gen.build();
  }
  const [code, setCode] = useState(id);
  const ref = useRef<HTMLTextAreaElement>(null);
  const nameRef = useRef<HTMLTextAreaElement>(null);
  const [icon, setName] = useState("anya");
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(false);

  function errorAlert(message: string) {
    Store.addNotification({
      title: "Error",
      message: message,
      type: "danger",
      insert: "top",
      container: "bottom-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 5000,
        onScreen: true,
        pauseOnHover: true,
      },
    });
  }

  function joinRoomHandler() {
    if (userName === "") {
      errorAlert("Empty user name");
      return;
    }
    setLoading(true);
    socket.emit("joinTable", { name: userName, icon: icon, code: code });
  }

  function createRoomHandler() {
    if (userName === "") {
      errorAlert("Empty user name");
      return;
    }
    setLoading(true);
    socket.emit("createTable", {
      name: userName,
      icon: icon,
      code: code,
    });
  }

  function onBlurHandler() {
    if (!ref.current) {
      return;
    }
    if (!regex.test(ref.current.value)) {
      setCode(gen.build());
    }
  }

  function onChangeHandler() {
    if (!ref.current) {
      return;
    }
    setCode(ref.current.value);
  }

  function randomCodeOnClickHandler() {
    setCode(gen.build());
  }

  function onUserNameChange() {
    if (!nameRef.current) {
      return;
    }
    setUserName(nameRef.current.value);
  }

  function onUserNameBlur() {
    if (!nameRef.current) {
      return;
    }
    setUserName(nameRef.current.value);
  }

  function onIconClick() {}

  socket.on("created", () => {
    setLoading(false);
    navigate(`/board/${code}`);
  });

  socket.on("joined", () => {
    setLoading(false);
    navigate(`/board/${code}`);
  });

  socket.on("table_duplicate", () => {
    setLoading(false);
    errorAlert("Table with the same code already exists");
  });

  socket.on("noTable", () => {
    setLoading(false);
    errorAlert(`Table ${code} not found`);
  });

  return (
    <div>
      <ClipLoader
        color={"#99F6E4"}
        loading={loading}
        cssOverride={override}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      <div className="flex w-screen h-screen items-center justify-center bg-violet-800">
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
            className="flex basis-2/3 lg:basis-1/3 h-[8.33333333333%] mx-auto lg:ml-auto lg:mr-0 mt-2 font-sans font-semibold overflow-hidden resize-none text-2xl lg:text-4xl text-center text-gray-300 bg-slate-300/25 rounded-lg border border-gray-300/60"
          ></textarea>
          <button
            className="flex lg:aspect-square basis-2/3 h-[8.33333333333%] lg:basis-1/12 bg-slate-300/25 mt-2 mx-auto lg:mr-auto lg:ml-2 rounded-lg border border-gray-300/60"
            onClick={randomCodeOnClickHandler}
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
          >
            <div className="flex m-auto">Create</div>
          </button>
          <button
            className="flex basis-1/3 lg:basis-1/4 h-[8.33333333333%] font-sans font-semibold text-2xl lg:text-4xl bg-slate-300/25 mr-auto mt-2 rounded-lg border border-gray-300/60 text-gray-300"
            onClick={joinRoomHandler}
          >
            <div className="flex m-auto">Join</div>
          </button>
          <div className="flex basis-full h-0"></div>
          <button
            onClick={onIconClick}
            className="flex aspect-square md:h-[16.66666667%] mx-auto bg-slate-500 rounded-full md:ml-auto md:mr-0 mt-2 border border-gray-300/60"
          >
            <img
              className="flex object-contain object-center mx-auto p-1"
              src={require(`../imgs/${icon}.png`)}
              alt={icon}
            />
          </button>
          <div className="flex flex-col basis-full md:basis-1/3 h-[16.66666667%] mt-2 mx-auto md:mr-auto md:ml-2">
            <div className="font-sans font-semibold text-2xl text-gray-300 my-2">
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
              className="font-sans font-semibold overflow-hidden resize-none text-2xl text-center text-gray-300 bg-slate-300/25 rounded-lg border border-gray-300/60"
            ></textarea>
          </div>
          <div className="flex basis-full h-full"></div>
        </div>
      </div>
    </div>
  );
}
