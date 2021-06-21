import { useState } from "react"; 
const useChatBox = () => {




  const [chatBoxes, setChatBoxes] = useState([
   /* 
    { friend: "Mary", key: "MaryChatbox", 
      chatLog: [] },
    { friend: "Peter", key: "PeterChatBox", 
      chatLog: [] }
      */
  ]);


  console.log("before server connected chatBoxes:",chatBoxes)
  const server = new WebSocket('ws://localhost:8080')
  console.log("before server connected chatBoxes(1):",chatBoxes)
  server.onopen = () => console.log('Server connected.');
  console.log("before server connected chatBoxes(2):",chatBoxes)
  
  const createChatBox = (friend,me) => {
    const newKey = me <= friend ?
          `${me}_${friend}` : `${friend}_${me}`;

    if (chatBoxes.some(({ key }) => key === newKey)) {
      throw new Error(friend +
                      "'s chat box has already opened.");
    }


    server.sendEvent = (e) => server.send(JSON.stringify(e));
    server.sendEvent({
          type: 'CHAT',
          data: { to: friend, name: me },
        });
  
    return newKey
  };




  const removeChatBox = (targetKey,activeKey) => {  

    console.log("ChatBoxes in removeChatbox",chatBoxes)
    let newActiveKey = activeKey; 
    let lastIndex;
    console.log(targetKey) //targetKey是按叉叉的那個key

    chatBoxes.forEach(({ key }, i) => {
      if (key === targetKey) { lastIndex = i - 1; }});

    const newChatBoxes = chatBoxes.filter( //filter放的是可以通過的條件，如key=targetKey(被選中要刪掉)就不給過
      (chatBox) => chatBox.key !== targetKey);

    if (newChatBoxes.length) {
      if (newActiveKey === targetKey) { //如果被刪掉的那個=為當前的activeKey，則activeKey要換成被刪掉的前一個
        if (lastIndex >= 0) {
          newActiveKey = newChatBoxes[lastIndex].key;//將activeKey換成被刪掉的前一個
        } else { newActiveKey = newChatBoxes[0].key; }
      }
    } else newActiveKey = ""; // No chatBox left

    console.log("newChatBoxes before setting from removeChatBox",newChatBoxes)
    setChatBoxes(newChatBoxes);
    //setActiveKey(newActiveKey);
    return newActiveKey
  };


  const sendMessage = (friend,me,payload) => {
    console.log(payload);// { key, msg }
    console.log("chatBoxes in sendMessage",chatBoxes)

    server.sendEvent = (e) => server.send(JSON.stringify(e));
    server.sendEvent({
          type: 'MESSAG',
          data: { to: friend, name: me, body: payload.body },
        });

    console.log("chatBoxes in sendMessage after send message to server",chatBoxes)


  }; 




  /////////////////////////////處理接收/

  server.onmessage = (m) => {
    console.log("ChatBoxes outside",chatBoxes)
    console.log("receive data from server:",JSON.parse(m.data))
    
    onEvent(JSON.parse(m.data));

  };

  
  const onEvent = (e) => {
    const { type } = e;
    switch (type) {
      case 'CHAT': {
          console.log("It's a CHAT")

          console.log("ChatBoxes before",chatBoxes)
          const newChatBoxes = [...chatBoxes];
          console.log("ChatBoxes",chatBoxes)
          console.log("newChatBoxes before",newChatBoxes)
          newChatBoxes.push({ friend:e.data.friend, key: e.data.key, chatLog:e.data.messages });
          console.log("newChatBoxes before setting from CHAT",newChatBoxes)
          setChatBoxes(newChatBoxes);
        
        break;
      }
      
      case 'MESSAG': {
        console.log("It's a MESSAGE")
        console.log("ChatBoxes in message",chatBoxes)

        
        let message = e.data.message;
        let key = e.data.key;
        
        //const newChatBoxes = [...chatBoxes];
        
        //console.log("newChatBoxes in message",newChatBoxes)
        
        
        let newChatBoxes=chatBoxes.map( (chatBox)=>{  
          if(chatBox.key===key)
          { 
            let NewchatLog=[...chatBox.chatLog]
            NewchatLog.push(message)

            let NewchatBox={friend:chatBox.friend,key:chatBox.key,chatLog:NewchatLog}
            return( NewchatBox)
          } 
          return(chatBox)

        
        } )
        console.log("newChatBoxes before setting from addMessage",newChatBoxes)
        
        setChatBoxes(newChatBoxes);
         
        
        
        break;
      }
     
    }
  }
  

/////////////////////////////處理接收/  






  
  
  return { sendMessage,chatBoxes,createChatBox, removeChatBox };
};
export default useChatBox;