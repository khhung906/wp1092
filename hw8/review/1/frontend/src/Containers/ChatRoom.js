import "../App.css";
import { useState } from "react";
import { message, Tabs, Input } from "antd";
import ChatModal from "../Components/ChatModal";
import ChatBox from "../Components/ChatBox";
import useChatBox from "../hooks/useChatBox";
import { useMutation } from "@apollo/client";
import {
  CREATE_CHATBOX_MUTATION,
  CREATE_MESSAGE_MUTATION,
} from '../graphql';

const { TabPane } = Tabs;
const ChatRoom = ({ me, displayStatus }) => {
  const [messageInput, setMessageInput] = useState("");
  const [activeKey, setActiveKey] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [startChat] = useMutation(CREATE_CHATBOX_MUTATION);
  const [sendMessage] = useMutation(CREATE_MESSAGE_MUTATION);
  const { chatBoxes, removeChatBox, createChatBox } = useChatBox();

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
            else if (action === "remove") setActiveKey(removeChatBox(targetKey, activeKey));
          }}
        >
          {chatBoxes.map((
            { friend, key, chatLog }) => {
            return (
              <TabPane tab={friend}
                key={key} closable={true}>
                <p>{friend}'s chatbox.</p>
              </TabPane>
            );
          })}
        </Tabs>
        <ChatModal
          visible={modalVisible}
          onCreate={async ({ name }) => {
            setActiveKey(createChatBox(name, me));
            await startChat({
              variables: {
                name1: me,
                name2: name,
              },
            });
            setModalVisible(false);
          }}
          onCancel={() => {
            setModalVisible(false);
          }}
        />
        {
          (activeKey !== "") ? <ChatBox activeKey={activeKey} me={me} /> : ""
        }
      </div>
      <Input.Search
        value={messageInput}
        onChange={(e) =>
          setMessageInput(e.target.value)}
        enterButton="Send"
        placeholder=
        "Enter message here..."
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
          const newmessage = sendMessage({
            variables: {
              name: activeKey,
              sender: me,
              body: msg
            },
          });
          setMessageInput("");
        }}

      ></Input.Search>
    </>);
};
export default ChatRoom;