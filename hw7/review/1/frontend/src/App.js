import "./App.css";
import { useState, useEffect } from "react";
import { message } from "antd";
import SignIn from "./containers/SignIn";
import ChatRoom from "./containers/ChatRoom";
import useChat from "./hooks/useChat";

const LOCALSTORAGE_KEY = "save-me";
const App = () => {
  const savedMe = localStorage.getItem(LOCALSTORAGE_KEY);

  const [signedIn, setSignedIn] = useState(false);
  const [me, setMe] = useState(savedMe || "");

  const { status, buffer, sendMessage, clearMessages } = useChat();
  const displayStatus = (status) => {
    if (status.connected) {
      let content = {
        content: "connected",
        duration: 0.5,
      };
      message.success(content);
    } else {
      let content = {
        content: "error",
        duration: 0.5,
      };
      message.error(content);
    }
  };

  useEffect(() => {
    displayStatus(status);
  }, [status]);

  useEffect(() => {
    if (signedIn) {
      localStorage.setItem(LOCALSTORAGE_KEY, me);
    }
  }, [signedIn]);

  return (
    <div className="App">
      {signedIn ? (
        <ChatRoom
          me={me}
          displayStatus={displayStatus}
          sendMessage={sendMessage}
          buffer={buffer}
        />
      ) : (
        <SignIn
          me={me}
          setMe={setMe}
          setSignedIn={setSignedIn}
          displayStatus={displayStatus}
        />
      )}
    </div>
  );
};
export default App;
