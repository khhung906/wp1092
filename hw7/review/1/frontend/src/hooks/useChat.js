import { useState } from "react";  
const useChat = () => {
  const [status, setStatus] = useState({}); // { type, msg }
  const sendMessage = (payload) => {
    console.log(payload);
  }; // { key, msg }
  return { status, sendMessage };
};
export default useChat;
