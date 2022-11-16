import { Store } from "react-notifications-component";

export function errorAlert(message: string) {
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

export function successAlert(message: string) {
  Store.addNotification({
    title: "Success",
    message: message,
    type: "success",
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
