import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";
import { useEffect } from "react";
import { getToken, onMessage } from "firebase/messaging";
import { messaging } from "./firebase";

export const generateToken = async () => {
  const permission = await Notification.requestPermission();
  console.log("permission", permission);
  if (permission == "granted") {
    const token = await getToken(messaging, {
      vapidKey:
        "BMWGSmWQlGkYr8sUTRKNDyX7MuVWnpQ2RFG_kHCGksGz2UCeGYgtfbk2jWM4Dm6CTZfh0_Fo1epVYORPNzWJ4tQ",
    });
    console.log("token :>> ", token);
    localStorage.setItem("firebase-registration-token", token);
    console.log(token);
  }
};

function App() {
  const { authUser } = useAuthContext();
  useEffect(() => {
    generateToken();
    // messaging
    //   .requestPermission()
    //   .then(() => {
    //     return messaging.getToken();
    //   })
    //   .then((token) => {
    //     console.log("Token:", token);
    //     localStorage.setItem("firebase-registration-token", token);
    //   })
    //   .catch((error) => {
    //     console.error("Error:", error);
    //   });
  }, []);

  onMessage(function (payload) {
    console.log("payload :>> ", payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
      icon: payload.notification.icon,
    };
    // console.log(notificationTitle,notificationOptions)

    if (!("Notification" in window)) {
      console.log("This browser does not support system notifications.");
    } else if (Notification.permission === "granted") {
      // If it's okay let's create a notification
      var notification = new Notification(
        notificationTitle,
        notificationOptions
      );
      notification.onclick = function (event) {
        event.preventDefault();
        window.open(payload.notification.click_action, "_blank");
        notification.close();
      };
    }
  });

  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <Routes>
        <Route
          path="/"
          element={authUser ? <Home /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/login"
          element={authUser ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/signup"
          element={authUser ? <Navigate to="/" /> : <SignUp />}
        />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
