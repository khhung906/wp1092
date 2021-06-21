import { useEffect, useRef } from "react";
import { useQuery } from "@apollo/react-hooks";
import { Spin } from "antd";
import { CHATBOX_QUERY, MESSAGES_SUBSCRIPTION } from "../graphql";

const ChatBox = ({ me, chatKey, chatLog }) => {
  const messagesEndRef = useRef(null);
  const { loading, error, data, subscribeToMore } = useQuery(CHATBOX_QUERY, {
    variables: {
      name: chatKey,
    },
  });
  useEffect(() => {
    
    try {
      //console.log(1)
      //console.log(chatKey)
      subscribeToMore({
        document: MESSAGES_SUBSCRIPTION,
        variables: {name: chatKey},
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          const newMessage = subscriptionData.data.addMessages.data;
          /*return {messages:["a", "b"]}*/
          /*
          return {
            ...prev,
            addMessages: [...prev.addMessages, newMessage],
          }
          */
          return Object.assign({}, {
            chatBoxQuery: {
              messages: [...prev.chatBoxQuery.messages, newMessage],
            },
          });
        },
      });
    } catch (e) {console.log(e)}
  }, [subscribeToMore]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  });
  if (loading)
    return (
      <Spin
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      />
    );
  if (error) return `Error! ${error}`;
  //return(<>{data.messages}</>)
  return (
    <>
      { data.chatBoxQuery.messages.map(({ body, sender }, i) => {
        let chat_className = "chat-message-group" + (me === sender.name ? " writer-user" : "");
        return (
          <div key={i} className="card-content chat-content">
            <div className="content">
              <div className={chat_className}>
                <div className="chat-messages">
                  <div className="message">{body}</div>
                  <div className="from">{sender.name}</div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
      <div ref={messagesEndRef} />
    </>
  );
};
export default ChatBox;