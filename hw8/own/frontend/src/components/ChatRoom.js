import "../App.css"; 
import { useState} from "react"; 
import { Tabs, Input } from "antd";
import ChatModal from './ChatModal';
import useChatBox from '../hooks/useChatBox';
import ChatLog from './ChatLog';
import {useMutation } from '@apollo/react-hooks';
import {
    CREATE_CHATBOX_MUTATION,
    SEND_MESSAGE_MUTATION,
} from '../graphql';

const { TabPane } = Tabs; 

const decode_key = (key, me) =>{
    if (key.split('_')[0] == me) return key.split('_')[1];
    return key.split('_')[0];
}

const ChatRoom = ({ me, displayStatus }) => {  
    const [messageInput, setMessageInput] =  useState("");  
    const [modalVisible, setModalVisible] = useState(false); 
    const [activeKey, setActiveKey] = useState("")
    const {chatBoxes, createChatBoxx, removeChatBox, setChatBoxes} = useChatBox(setActiveKey, me, activeKey);
    //const {status, sendMessage} = useChat(chatBoxes, setChatBoxes);
    const [startChat] = useMutation(CREATE_CHATBOX_MUTATION);
    const [sendMessage] = useMutation(SEND_MESSAGE_MUTATION);
    const addChatBox = () => { setModalVisible(true); };
    
    return (     
        <> 
            <div className="App-title">          
                <h1>{me}'s Chat Room</h1> 
            </div>       
            <div className="App-messages">         
                <Tabs type="editable-card"
                      activeKey={activeKey}           
                      onChange={(key) => { setActiveKey(key); }}
                      onEdit={(targetKey, action) => {     
                          if (action === "add") addChatBox();     
                          else if (action === "remove") removeChatBox(targetKey);   
                        }}
                      >           
                {chatBoxes.map(({ friend, key, chatLog }) => { 
                    return (               
                    <TabPane tab={friend} key={key} closable={true}>                 
                        <p>{friend}'s chatbox.</p>    
                        <ChatLog log={chatLog} me={me} friend={friend}/>         
                    </TabPane>           
                    );})}   
                </Tabs> 
                <ChatModal           
                    visible={modalVisible}           
                    onCreate={async ({ name }) => {  
                        await startChat ({
                            variables: {
                              name1: name,
                              name2: me
                            },
                        });       
                        createChatBoxx(name, me);             
                        setModalVisible(false);           
                    }}           
                        onCancel={() => {             
                        setModalVisible(false);           
                    }}         
                />

            </div>       
            <Input.Search value={messageInput}   
                        onChange={(e) => setMessageInput(e.target.value)}         
                        enterButton= "Send"         
                        placeholder= "Enter message here..."         
                        onSearch={async (msg) => {           
                            if (!msg) {             
                                displayStatus({               
                                    type: "error",               
                                    msg: "Please enter message.",             
                                });             
                                return;           
                            } else if (activeKey === ""||activeKey === undefined) {             
                                displayStatus({               
                                    type: "error",               
                                    msg: "Please add a chatbox first.",             
                                });             
                                setMessageInput("");             
                                return;           
                            }      
                            console.log(me, activeKey, msg)
                            try{
                                const nowTime = new Date().toLocaleString();
                                await sendMessage({
                                    variables: {
                                    name1: me,
                                    name2: activeKey,
                                    message: msg+'---split---'+nowTime 
                                    },
                                });  
                                // const ff = decode_key(activeKey, me);
                                // console.log(ff)
                                // for(let i = 0; i < chatBoxes.length; i++){
                                //     console.log(chatBoxes[i].friend)
                                //     if(chatBoxes[i].friend === ff){
                                //         console.log('hit')
                                //         let new_chatbox = [...chatBoxes];
                                //         new_chatbox[i].chatLog.push({sender:chatBoxes[i].friend, body:msg})
                                //         setChatBoxes(new_chatbox)
                                //     }
                                // }
                                //console.log(data)
                            } catch (e) {
                                // Here you can catch any errors from Apollo Error.
                                console.warn(e);
                              }      
                            setMessageInput("");         
                        }}
  >
            </Input.Search>   
        </>
    ); 
}; 
export default ChatRoom;
