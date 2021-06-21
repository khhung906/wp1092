import { useState } from "react";

const useChat = () => {
  const [status, setStatus] = useState({connected: false, msg: ""});
  const client = new WebSocket("ws://localhost:18080");

  const [buffer, setBuffer] = useState([]);
  const sendData = async (data) => {
    await client.send(JSON.stringify(data));
  };

  const sendMessage = (payload) => {
    sendData(payload);
  };

  const clearMessages = () => {
    sendData(["clear"]);
  };
  client.onmessage = (byteString) => {
    const { data } = byteString;

    const buff = JSON.parse(data);
    const {
      type
    } = buff;
    switch (type) {
      case "CHAT": {
        const {
          data: {messages}
        } = buff;
        setBuffer(messages);
        // setChatBoxes(newChatBoxes);
        break;
      }
      case "MESSAGE": {
        const {
          data: {message}
        } = buff;
        let newBuffer = buffer;
        newBuffer = [message]
        setBuffer(newBuffer)
        // setMessages(() => [...messages, ...messages]);
        break;
      }
    }
  };
  client.onopen = ()=>{
    if(status.connected == false)
      setStatus({connected: true, msg: "wbsocket connected"});
  }
  client.onclose = ()=>{
    if(status.connected)
      setStatus({connected: false, msg: "wbsocket not connected!"});
  }

  return {
    status,
    buffer,
    sendMessage,
    clearMessages,
  };
};

export default useChat;
