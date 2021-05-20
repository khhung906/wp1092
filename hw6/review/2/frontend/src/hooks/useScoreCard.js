import { createContext, useContext, useState, useEffect } from "react";

const ADD_MESSAGE_COLOR = "#3d84b8";
const REGULAR_MESSAGE_COLOR = "#2b2e4a";
const ERROR_MESSAGE_COLOR = "#fb3640";

const ScoreCardContext = createContext({
  messages: [],
  addCardMessage: () => {},
  addRegularMessage: () => {},
  addErrorMessage: () => {},
  emptyMessage: () => {},
});

const makeMessage = (message, color) => {
  return { message, color };
};

const ScoreCardProvider = (props) => {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    console.log("messages:", messages);
  });

  const addCardMessage = (message) => {
    console.log("addCardMessage");
    setMessages([makeMessage(message, ADD_MESSAGE_COLOR)]);
  };

  const addRegularMessage = (...ms) => {
    console.log("addRegularMessage");
    setMessages([...ms.map((m) => makeMessage(m, REGULAR_MESSAGE_COLOR))]);
  };

  const addErrorMessage = (message) => {
    console.log("addErrorMessage");
    setMessages([makeMessage(message, ERROR_MESSAGE_COLOR)]);
  };

  const emptyMessage = () => {
    console.log("emptyMessage");
    setMessages([]);
  };

  return (
    <ScoreCardContext.Provider
      value={{
        messages,
        addCardMessage,
        addRegularMessage,
        addErrorMessage,
        emptyMessage,
      }}
      {...props}
    />
  );
};

function useScoreCard() {
  return useContext(ScoreCardContext);
}

export { ScoreCardProvider, useScoreCard };
