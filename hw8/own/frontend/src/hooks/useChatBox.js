import { useState, useEffect } from "react"; 
import { useLazyQuery} from '@apollo/react-hooks';
import {
    MESSAGE_SUBSCRIPTION,
    CHAT_QUERY
} from '../graphql';

const decode_key = (key, me) =>{
    if (key.split('_')[0] == me) return key.split('_')[1];
    return key.split('_')[0];
}

const useChatBox = (setActiveKey, me, activeKey) => {    
    const [chatBoxes, setChatBoxes] = useState([]); 
    const [chatQuery, { loading, data, subscribeToMore }] = useLazyQuery(CHAT_QUERY);

    useEffect(() => {
        //double check whether message is new
        if(data && chatBoxes.length >= 1 && chatBoxes[chatBoxes.length-1].chatLog.length === 0) {
            console.log("create new box")
            let newChatBoxes = [...chatBoxes];    
            newChatBoxes[newChatBoxes.length-1].chatLog = data.chatbox.messages;     
            setChatBoxes(newChatBoxes);      
            console.log("finish create")  
        }
    }, [data]); //only re-run the effect if new box comes in

    useEffect(() => {
        try {
          subscribeToMore({
            document: MESSAGE_SUBSCRIPTION,
            variables: {key: activeKey},
            updateQuery: (prev, { subscriptionData }) => {
              console.log(subscriptionData.data.MessageReceived)
              let new_message = subscriptionData.data.MessageReceived;
              if(new_message.sender.name === me){
                //console.log('my message')
                const friend = decode_key(activeKey, me)
                for(let i = 0; i < chatBoxes.length; i++){
                    if(chatBoxes[i].friend === friend){
                        let new_chatbox = [...chatBoxes];
                        new_chatbox[i].chatLog = [...new_chatbox[i].chatLog, new_message]
                        setChatBoxes(new_chatbox)
                    }
                }
              }
              else{
                for(let i = 0; i < chatBoxes.length; i++){
                    if(chatBoxes[i].friend === new_message.sender.name){
                        let new_chatbox = [...chatBoxes];
                        new_chatbox[i].chatLog = [...new_chatbox[i].chatLog, new_message]
                        setChatBoxes(new_chatbox)
                    }
                }
              }
            },
          });
        } catch (e) {}
      }, [subscribeToMore]);

    const createChatBoxx = async(friend, me) => {  
        const newKey = me <= friend ?           
        `${me}_${friend}` : `${friend}_${me}`;
        if (chatBoxes.some(({ key }) => key === newKey)) {       
            throw new Error(friend +                       
                "'s chat box has already opened.");     
        }        
        chatQuery({ variables: { key: newKey } })
        
        let newChatBoxes = [...chatBoxes];    
        newChatBoxes.push({friend: friend, key: newKey, chatLog:[]});     
        setChatBoxes(newChatBoxes);
        setActiveKey(newKey);  
        // console.log(data)
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
    return {chatBoxes, setChatBoxes, createChatBoxx, removeChatBox }; 
}; 

export default useChatBox;
