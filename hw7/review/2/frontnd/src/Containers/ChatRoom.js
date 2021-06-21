import "../App.css";
import { useState,useEffect } from "react";
import { Tabs, Input,Typography } from "antd";
import ChatModal from "../Components/ChatModal"
import useChatBox from "../hook/useChatBox"
import useChat from "../hook/useChat"



const { TabPane } = Tabs;



const ChatRoom = ({ me, displayStatus }) => {

  const [messageInput, setMessageInput] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [activeKey, setActiveKey] = useState("")

  const{sendMessage,chatBoxes,createChatBox,removeChatBox }=useChatBox()
  //const{sendMessage }=useChat()

  
  const addChatBox = () => { setModalVisible(true); };

  const KeyToReceiver=(key,sender)=>{
    let [name1,name2]=key.split("_")
    //console.log("name1:",name1,"name2:",name2,"sender:",sender)
    if (name1===sender)
    {
      //console.log("receiver is name2")
      return name2
    }
    else {
      //console.log("receiver is name1")
      return name1
    }
    
    }

  

  return (
    <> <div className="App-title">
         <h1>{me}'s Chat Room</h1> </div>

      <div className="App-messages">

        <Tabs 
          type="editable-card" 
          onEdit={(targetKey, action)=>{ 
              //console.log(targetKey)
              if (action==="add") addChatBox()
              else if (action === "remove")  setActiveKey( removeChatBox(targetKey,activeKey));
          }}
          activeKey={activeKey}//原本就有個attribute 叫activeKey 表誰被選到
          onChange={(key) => { setActiveKey(key); }} //點擊名字標籤時  將該名字的key setActiveKey
          >

          {chatBoxes.map(
            ({ friend, key, chatLog }) => {
              return (
                <TabPane tab={friend} //名字
                  key={key} 
                  closable={true}>
                  <p>{friend}'s chatbox.</p>
                  {chatLog.map( (message)=>{   
                    
                    
                  if(message.name==friend)    {
                    return( <p>  <Typography.Text code>{message.name}</Typography.Text>{message.body}</p>)
                  }
                  else{

                    return( <p style={{textAlign: 'right'}} > {message.body}  <Typography.Text code>{message.name}</Typography.Text></p>)
                  }
                  
                  
                  }    
                  )}

                </TabPane>
            );})}
         </Tabs>

         <ChatModal
          visible={modalVisible}
          onCreate={({ name }) => {
            setActiveKey( createChatBox(name,me) );
            setModalVisible(false);
          }}
          onCancel={() => {
            setModalVisible(false);
          }}
         />



        </div>

        <Input.Search
          value={messageInput}
          onChange={(e) => 
            setMessageInput(e.target.value)}
          enterButton="Send"
          placeholder=
            "Enter message here..."
            onSearch={(msg) => {
              if (!msg) { //傳送的訊息為空
                displayStatus({
                  type: "error",
                  msg: "Please enter message.",
                });
                return;
              } else if (activeKey === "") { //沒有chatbox
                displayStatus({
                  type: "error",
                  msg: "Please add a chatbox first.",
                });
                setMessageInput("");
                return;
              }
              console.log("chatBoxes when pressing send",chatBoxes)
              let receiver=KeyToReceiver(activeKey,me)

              sendMessage(receiver,me,{ key: activeKey, body: msg });
              setMessageInput("");
            }}
        ></Input.Search> 
    </>);
  };
  export default ChatRoom;