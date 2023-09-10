import React, { createContext, useContext, useState } from 'react';

const MessageContext = createContext();

export const useMessage = () => {
  return useContext(MessageContext);
};

export const MessageProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);

  const addMessage = (message) => {
    setMessages([...messages, message]);
    console.log('setMessages', [...messages, message]);
  };

  return <MessageContext.Provider value={{ messages, addMessage }}>{children}</MessageContext.Provider>;
};
