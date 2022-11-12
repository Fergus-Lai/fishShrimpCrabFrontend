import image from "../components/image";
import { Store } from "react-notifications-component";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import "react-notifications-component/dist/theme.css";
import { useParams, useNavigate, redirect } from "react-router-dom";

export function Board() {
  const [bet, setBet] = useState(50);
  const [money, setMoney] = useState(1000);

  const socket = io("http://localhost:3000/");

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      navigate("/");
    }
    socket.emit("loaded", { userId, id });
  });

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
  function onBetClickHandler(name: string) {
    if (!socket.connected) {
      errorAlert("Unable to connect to server");
      return;
    }
    if (bet > money) {
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

  return (
    <div className="flex min-w-screen min-h-screen bg-gradient-to-r from-purple-800 via-pink-800 to-orange-800 background-animate flex-wrap">
      <div className="text-center h-1/3 basis-1/3">Options</div>
      <div className="text-center h-1/3 basis-1/3">
        <p>dice</p>
      </div>
      <div className="text-center h-1/3 basis-1/3">Timer</div>
      <button
        onClick={() => onBetClickHandler("anya")}
        className="basis-full md:basis-1/3 h-1/3 my-2"
      >
        {image("anya")}
      </button>
      <button
        onClick={() => onBetClickHandler("anya")}
        className="basis-full md:basis-1/3 h-1/3 my-2"
      >
        {image("anya")}
      </button>
      <button
        onClick={() => onBetClickHandler("anya")}
        className="basis-full md:basis-1/3 h-1/3 my-2"
      >
        {image("anya")}
      </button>
      <button
        onClick={() => onBetClickHandler("anya")}
        className="basis-full md:basis-1/3 h-1/3 my-2"
      >
        {image("anya")}
      </button>
      <button
        onClick={() => onBetClickHandler("anya")}
        className="basis-full md:basis-1/3 h-1/3 my-2"
      >
        {image("anya")}
      </button>
      <button
        onClick={() => onBetClickHandler("anya")}
        className="basis-full md:basis-1/3 h-1/3 my-2"
      >
        {image("anya")}
      </button>
      <button
        onClick={() => onBetClickHandler("anya")}
        className="basis-full md:basis-1/3 h-1/3 my-2"
      >
        {image("anya")}
      </button>
      <button
        onClick={() => onBetClickHandler("anya")}
        className="basis-full md:basis-1/3 h-1/3 my-2"
      >
        {image("anya")}
      </button>
      <button
        onClick={() => onBetClickHandler("anya")}
        className="basis-full md:basis-1/3 h-1/3 my-2"
      >
        {image("anya")}
      </button>
      <button
        onClick={() => onBetClickHandler("anya")}
        className="basis-full md:basis-1/3 h-1/3 my-2"
      >
        {image("anya")}
      </button>
      <button
        onClick={() => onBetClickHandler("anya")}
        className="basis-full md:basis-1/3 h-1/3 my-2"
      >
        {image("anya")}
      </button>
      <button
        onClick={() => onBetClickHandler("anya")}
        className="basis-full md:basis-1/3 h-1/3 my-2"
      >
        {image("anya")}
      </button>
      <button
        onClick={() => onBetClickHandler("anya")}
        className="basis-full content-center h-1/3 my-2"
      >
        {image("anya")}
      </button>
    </div>
  );
}
