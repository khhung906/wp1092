import { useState } from "react"; 

const server = new WebSocket('ws://localhost:8080');
const decode_key = (key, me) =>{
    if (key.split('_')[0] == me) return key.split('_')[1];
    return key.split('_')[0];
}

const useChat = (chatBoxes, setChatBoxes) => {   
    // connected with 
    const [status, setStatus] = useState({}); // { type, msg }   
    server.sendEvent = (e) => server.send(JSON.stringify(e));
    const sendMessage = (payload) => {    
        const to = decode_key(payload.key, payload.me);
        const nowTime = new Date().toLocaleString();
        const data =  { to: to, name: payload.me, body: payload.body+'---split---'+nowTime };
        // console.log(body_time)
        console.log('send-data')
        console.log(data)
        server.sendEvent({
            type: 'MESSAGE',
            data: data,
        });
        for(let i = 0; i < chatBoxes.length; i++){
            if(chatBoxes[i].friend === to){
                let new_chatbox = [...chatBoxes];
                new_chatbox[i].chatLog.push({name:payload.me, body:payload.body+'---split---'+nowTime})
                setChatBoxes(new_chatbox)
            }
        }
    }; // { key, msg }   

    return { status, sendMessage }; 
}; 
export default useChat;
