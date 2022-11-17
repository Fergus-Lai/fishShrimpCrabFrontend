import image from "../components/image";
import { errorAlert, successAlert } from "../functions/alert";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import "react-notifications-component/dist/theme.css";
import { useParams, useNavigate } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
import userComp from "../components/userComp";
import { User, createUser } from "../interface/user";

export function Board() {
  const [bet, setBet] = useState(50);
  const [userList, setUserList] = useState(Array<User>);
  const [user, setUser] = useState(createUser("abc", "FFF", "anya", 1000));
  const [connected, setConnected] = useState(false);

  const socket = io("http://localhost:3000/", {
    withCredentials: true,
  });

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      navigate("/");
    }
    socket.emit("loading", { userId, id });
  }, []);

  socket.on("connect", () => {
    setConnected(true);
  });
  socket.on("disconnect", () => {
    setConnected(false);
  });

  function onBetClickHandler(name: string) {
    if (!connected) {
      errorAlert("Unable to connect to server");
      return;
    }
    if (bet > user.money) {
      errorAlert("Bet greater than your balance");
      return;
    }
    socket.emit("bet", { target: name, bet });
  }

  socket.on("tableIdNotMatch", () => {
    navigate("/");
  });
  socket.on("tableNotFound", () => {
    navigate("/");
  });

  socket.on("playerJoined", (data) => {
    let { id, money, icon, username } = data;
    let newUser = createUser(id, username, icon, money);
    let newUsers = [...userList, newUser];
    console.log(newUsers);
    setUserList(newUsers);
  });

  socket.on("playerLeft", (data) => {
    let id = data;
    let i = userList.findIndex((o) => o.id === id);
    let newList = userList.splice(i, 1);
    setUserList(newList);
  });

  socket.on("loaded", (data) => {
    let { money, icon, username, users } = data;
    let userId = localStorage.getItem("userId");
    if (userId) {
      let newUser = createUser(userId, username, icon, money);
      setUser(newUser);
      setUserList(users);
    } else {
      navigate("/");
    }
  });

  return (
    <div className="flex min-w-screen min-h-screen bg-gradient-to-r from-purple-800 via-pink-800 to-orange-800 background-animate flex-wrap">
      <div className="flex flex-row h-1/3 basis-full md:basis-1/4 flex-wrap">
        <div className="flex basis-full h-full">
          <CopyToClipboard
            text={`${window.location.host}/lobby/${id}`}
            onCopy={() => successAlert("Copied link to clipboard")}
          >
            <button className="flex h-1/3 mt-5 mw-fit ml-auto mx-auto align-middle bg-slate-300/25 rounded-lg border border-gray-300/60">
              <div className="flex flex-row text-center align-middle">
                <img
                  className="ml-auto aspect-square"
                  src={
                    require("../imgs/link_FILL0_wght400_GRAD0_opsz48.svg")
                      .default
                  }
                  alt=""
                />
                <div className="my-auto font-sans font-semibold text-xl text-gray-300">
                  Invite to {id}
                </div>
              </div>
            </button>
          </CopyToClipboard>
        </div>
        <div className="flex basis-full h-full">
          <div className="mx-auto font-sans font-semibold text-xl text-gray-300">
            Bet
          </div>
        </div>
        <div className="flex basis-full h-full flex-row">
          <button
            className="basis-1/3 text-center"
            onClick={() => {
              if (bet - 50 > 0) {
                setBet(bet - 50);
              }
            }}
          >
            <img
              className="ml-auto aspect-square"
              src={
                require("../imgs/remove_FILL0_wght400_GRAD0_opsz48.svg").default
              }
              alt=""
            />
          </button>
          <div className="basis-1/3 text-center my-auto font-sans font-semibold text-2xl text-gray-300">
            {bet}
          </div>
          <button
            className="basis-1/3"
            onClick={() => {
              if (bet + 50 > user.money) {
                errorAlert("Bet greater than your balance");
                return;
              }
              setBet(bet + 50);
            }}
          >
            <img
              className="aspect-square"
              src={
                require("../imgs/add_FILL0_wght400_GRAD0_opsz48.svg").default
              }
              alt=""
            />
          </button>
        </div>
        <div className="flex basis-full h-full"></div>
      </div>
      <div className="text-center h-1/3 basis-full md:basis-1/2">
        <p>dice</p>
      </div>
      <div className="text-center h-1/3 basis-full md:basis-1/4">Timer</div>
      <button
        onClick={() => onBetClickHandler("anya")}
        className="basis-full md:basis-1/3 h-1/3 my-2"
      >
        {image("anya")}
      </button>
      <button
        onClick={() => onBetClickHandler("loid")}
        className="basis-full md:basis-1/3 h-1/3 my-2"
      >
        {image("anya")}
      </button>
      <button
        onClick={() => onBetClickHandler("yor")}
        className="basis-full md:basis-1/3 h-1/3 my-2"
      >
        {image("anya")}
      </button>
      <button
        onClick={() => onBetClickHandler("bond")}
        className="basis-full md:basis-1/3 h-1/3 my-2"
      >
        {image("anya")}
      </button>
      <button
        onClick={() => onBetClickHandler("tbdA")}
        className="basis-full md:basis-1/3 h-1/3 my-2"
      >
        {image("anya")}
      </button>
      <button
        onClick={() => onBetClickHandler("tbdB")}
        className="basis-full md:basis-1/3 h-1/3 my-2"
      >
        {image("anya")}
      </button>
      <button
        onClick={() => onBetClickHandler("3anya")}
        className="basis-full md:basis-1/3 h-1/3 my-2"
      >
        {image("anya")}
      </button>
      <button
        onClick={() => onBetClickHandler("3loyd")}
        className="basis-full md:basis-1/3 h-1/3 my-2"
      >
        {image("anya")}
      </button>
      <button
        onClick={() => onBetClickHandler("3yor")}
        className="basis-full md:basis-1/3 h-1/3 my-2"
      >
        {image("anya")}
      </button>
      <button
        onClick={() => onBetClickHandler("3bond")}
        className="basis-full md:basis-1/3 h-1/3 my-2"
      >
        {image("anya")}
      </button>
      <button
        onClick={() => onBetClickHandler("3tbdA")}
        className="basis-full md:basis-1/3 h-1/3 my-2"
      >
        {image("anya")}
      </button>
      <button
        onClick={() => onBetClickHandler("3tbdB")}
        className="basis-full md:basis-1/3 h-1/3 my-2"
      >
        {image("anya")}
      </button>
      <button
        onClick={() => onBetClickHandler("3any")}
        className="basis-full content-center h-1/3 my-2"
      >
        {image("anya")}
      </button>
      <div className="flex basis-full justify-center flex-col items-center gap-y-5">
        {userComp(user)}
        {userList.map((other) => userComp(other))}
      </div>
    </div>
  );
}
