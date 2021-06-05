import "../App.css"; 
import { useState, useEffect } from "react"; 
import { Tabs, Input } from "antd";
import ChatModal from './ChatModal';
import useChatBox from '../hooks/useChatBox';
import useChat from '../hooks/useChat';
import ChatLog from './ChatLog';

const { TabPane } = Tabs; 
const server = new WebSocket('ws://localhost:8080');

const ChatRoom = ({ me, displayStatus }) => {  
    const [messageInput, setMessageInput] =  useState("");  
    const [modalVisible, setModalVisible] = useState(false); 
    const [activeKey, setActiveKey] = useState("")
    const {chatBoxes, createChatBox, removeChatBox, setChatBoxes} = useChatBox(setActiveKey, me);
    const {status, sendMessage} = useChat(chatBoxes, setChatBoxes);

    const addChatBox = () => { setModalVisible(true); };

    useEffect(() => {
        server.onopen = () => console.log('Server connected.'); 
    }, []); //only re-run the effect if new message comes in
    
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
                        <ChatLog log={chatLog} me={me}/>         
                    </TabPane>           
                    );})}   
                </Tabs> 
                <ChatModal           
                    visible={modalVisible}           
                    onCreate={({ name }) => {             
                        createChatBox(name, me);             
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
                        onSearch={(msg) => {           
                            if (!msg) {             
                                displayStatus({               
                                    type: "error",               
                                    msg: "Please enter message.",             
                                });             
                                return;           
                            } else if (activeKey === "") {             
                                displayStatus({               
                                    type: "error",               
                                    msg: "Please add a chatbox first.",             
                                });             
                                setMessageInput("");             
                                return;           
                            }           
                            sendMessage({ key: activeKey, body: msg, me: me});           
                            setMessageInput("");         
                        }}
  >
            </Input.Search>   
        </>
    ); 
}; 
export default ChatRoom;
