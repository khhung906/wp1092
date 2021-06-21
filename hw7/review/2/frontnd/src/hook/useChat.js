import { useState } from "react";  


const useChat = () => {

  const [status, setStatus] = useState({}); // { type, msg }



  const sendMessage = (friend,me,payload,server) => {
    console.log(payload);// { key, msg }

    server.sendEvent = (e) => server.send(JSON.stringify(e));
    server.sendEvent({
          type: 'MESSAGE',
          data: { to: friend, name: me, body: payload.body },
        });


  }; 


  return { status, sendMessage };
};
export default useChat;