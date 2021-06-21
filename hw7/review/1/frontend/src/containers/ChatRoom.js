import "../App.css";
import { useState, useEffect } from "react";
import { Tabs, Input, Tag, Row, Col } from "antd";
import ChatModal from "../components/ChatModal";
import useChatBox from "../hooks/useChatBox";

const { TabPane } = Tabs;
const ChatRoom = ({ me, displayStatus, sendMessage, buffer }) => {
  const [messageInput, setMessageInput] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [activeKey, setActiveKey] = useState("");
  const { chatBoxes, setChatBoxes, createChatBox, removeChatBox } =
    useChatBox();

  const addChatBox = () => {
    setModalVisible(true);
  };

  useEffect(() => {
    let chat = chatBoxes.find((a) => a.key == activeKey);
    if (chat && chat.chatLog.length == 0)
      sendMessage({ type: "CHAT", data: { name: me, to: chat.friend } });
  }, [activeKey]);

  useEffect(() => {
    let newChatBoxes = chatBoxes;
    newChatBoxes = newChatBoxes.map((chatBox) => {
      if (chatBox.key == activeKey) {
        if (buffer) chatBox.chatLog = chatBox.chatLog.concat(buffer);
      }
      return chatBox;
    });
    setChatBoxes(newChatBoxes);
  }, [buffer]);

  return (
    <>
      {" "}
      <div className="App-title">
        <h1>{me}'s Chat Room</h1>{" "}
      </div>
      <div className="App-messages">
        <Tabs
          type="editable-card"
          activeKey={activeKey}
          onChange={(key) => {
            setActiveKey(key);
          }}
          onEdit={(targetKey, action) => {
            if (action === "add") addChatBox();
            else if (action === "remove")
              setActiveKey(removeChatBox(targetKey, activeKey));
          }}
        >
          {chatBoxes.map(({ friend, key, chatLog }) => {
            return (
              <TabPane tab={friend} key={key} closable={true}>
                <p>{friend}'s chatbox.</p>
                <div className="App-messages">
                  {chatLog.length === 0 ? (
                    <p style={{ color: "#ccc" }}>No messages...</p>
                  ) : (
                    chatLog.map(({ name, body }, i) => {
                      return (
                        <>
                          {name == me ? (
                            <p className="App-message-right" key={i}>
                              {body}
                              <Tag color="purple">{name}</Tag>
                            </p>
                          ) : (
                            <p className="App-message-left" key={i}>
                              <Tag color="blue">{name}</Tag>
                              {body}
                            </p>
                          )}
                        </>
                      );
                    })
                  )}
                </div>
              </TabPane>
            );
          })}
        </Tabs>
        <ChatModal
          visible={modalVisible}
          onCreate={({ name }) => {
            let key = createChatBox(me, name, sendMessage);
            setActiveKey(key);
            setModalVisible(false);
          }}
          onCancel={() => {
            setModalVisible(false);
          }}
        />
      </div>
      <Input.Search
        value={messageInput}
        onChange={(e) => setMessageInput(e.target.value)}
        enterButton="Send"
        placeholder="Enter message here..."
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
          sendMessage({
            type: "MESSAGE",
            data: {
              name: me,
              to: chatBoxes.find((a) => a.key == activeKey).friend,
              body: msg,
            },
          });
          setMessageInput("");
        }}
      ></Input.Search>
    </>
  );
};
export default ChatRoom;
