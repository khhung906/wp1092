import "./App.css";
import { useState, useEffect } from "react";
import SignIn from"./Containers/SignIn"
import ChatRoom from"./Containers/ChatRoom"
import {message} from "antd"

const App = () => {
  const [signedIn, setSignedIn] = useState(false);
  const [me, setMe] = useState("");


  const displayStatus = (payload) => {
    if (payload.msg) {
      const { type, msg } = payload
      const content = {
        content: msg, duration: 0.8 }
      switch (type) {
        case 'success':
          message.success(content)
          break
        case 'error':
        default:
          message.error(content)
          break
  }}}

/*
  useEffect(() => {
    displayStatus(status)}, [status])
*/





  return (
    <div className="App">
      {signedIn? (<ChatRoom me={me}  displayStatus={displayStatus}/>) : (<SignIn setMe={setMe} setSignedIn={setSignedIn}  me={me} displayStatus={displayStatus}  />)}
    </div>
  );
};
export default App;