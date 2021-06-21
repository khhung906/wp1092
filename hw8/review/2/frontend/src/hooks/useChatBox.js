import { useState } from "react";

const useChatBox = () => {
  const [chatBoxes, setChatBoxes] = useState([]);
  

  const removeChatBox = (activeKey, targetKey) => {
    let newActiveKey = activeKey;
    let lastIndex;
    chatBoxes.forEach(({ key }, i) => {
      if (key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const newChatBoxes = chatBoxes.filter((chatBox) => chatBox.key !== targetKey);
    if (newChatBoxes.length) {
      if (newActiveKey === targetKey) {
        if (lastIndex >= 0) {
          newActiveKey = newChatBoxes[lastIndex].key;
        } else {
          newActiveKey = newChatBoxes[0].key;
        }
      }
    } else newActiveKey = ""; // No chatBox left
    setChatBoxes(newChatBoxes);
    return newActiveKey;
  };

  const createChatBox = (me, friend) => {
    const newKey = me <= friend ? `${me}_${friend}` : `${friend}_${me}`;
    if (chatBoxes.some(({ key }) => key === newKey)) {
      throw new Error(friend + "'s chat box has already opened.");
    }
    const newChatBoxes = [...chatBoxes];
    const chatLog = [];
    newChatBoxes.push({ friend, key: newKey, chatLog });
    setChatBoxes(newChatBoxes);
    return newKey;
  };
  return { chatBoxes, createChatBox, removeChatBox };
};
export default useChatBox;