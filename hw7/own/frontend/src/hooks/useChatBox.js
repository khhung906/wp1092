import { useState } from "react"; 

const server = new WebSocket('ws://localhost:8080');
const useChatBox = (setActiveKey, me) => {    
    server.onmessage = (m) => {
        onEvent(JSON.parse(m.data));
    };
    server.sendEvent = (e) => server.send(JSON.stringify(e));

    const startChat = (to ,from) => {
        server.sendEvent({
            type: 'CHAT',
            data: { to: to, name: from },
        });
    };

    const renderMessages = (messages) => {
        console.log('render') 
        let new_chat_box = [...chatBoxes];
        console.log(new_chat_box[0])
        new_chat_box[new_chat_box.length-1].chatLog = messages;
        setChatBoxes(new_chat_box) 
    };

    const renderMessage = (message) => {
        //console.log('render')
        if(message.name !== me){
            for(let i = 0; i < chatBoxes.length; i++){
                if(chatBoxes[i].friend === message.name){
                    let new_chatbox = [...chatBoxes];
                    new_chatbox[i].chatLog.push({name:message.name, body:message.body})
                    //console.log({name:message.name, body:message.body})
                    setChatBoxes(new_chatbox)
                    console.log(new_chatbox)
                }
            }
        }
    };

    const onEvent = (e) => {
        const { type } = e;
        console.log('onevent')
        console.log(e) 

        switch (type) {
          case 'CHAT': {
            renderMessages(e.data.messages);
            break;
          }
          case 'MESSAGE': {
            renderMessage(e.data.message);
            break;
          }
        }
      };

    const [chatBoxes, setChatBoxes] = useState([]);   

    const createChatBox = (friend, me) => {    
        console.log(friend)
        const newKey = me <= friend ?           
        `${me}_${friend}` : `${friend}_${me}`;
        if (chatBoxes.some(({ key }) => key === newKey)) {       
            throw new Error(friend +                       
                "'s chat box has already opened.");     
        }      
        let newChatBoxes = [...chatBoxes];    
        newChatBoxes.push({ friend: friend, key: newKey, chatLog: [] });     
        setChatBoxes(newChatBoxes);     
        setActiveKey(newKey);   
        startChat(friend, me); 
    };

    const removeChatBox = (targetKey, activeKey) => {     
        let newActiveKey = activeKey;     
        let lastIndex;     
        chatBoxes.forEach(({ key }, i) => {       
            if (key === targetKey) { lastIndex = i - 1; }});     
        const newChatBoxes = chatBoxes.filter(       
            (chatBox) => chatBox.key !== targetKey);     
        if (newChatBoxes.length) {       
            if (newActiveKey === targetKey) {         
                if (lastIndex >= 0) {           
                    newActiveKey = newChatBoxes[lastIndex].key;         
                } else { newActiveKey = newChatBoxes[0].key; }       
            }     
        } else newActiveKey = ""; // No chatBox left     
        setChatBoxes(newChatBoxes);     
        setActiveKey(newActiveKey);   
    };   
    return {chatBoxes, setChatBoxes, createChatBox, removeChatBox }; 
}; 

export default useChatBox;
