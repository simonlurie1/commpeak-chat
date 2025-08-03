import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Contact, Message, RawConversation } from '../types';
import contacts from '../assets/contacts.json';
import convoData from '../assets/conversations.json';
import { convertPlaceHolderByPhoneNum } from '../utils.ts';

interface ChatContextType {
  contacts: Contact[];
  conversations: Record<string, Message[]>;
  selectedPhone: string | null;
  selectPhone: (phone: string) => void;
  sendMessage: (phone: string, message: string) => void;
}

const ChatContext = createContext<ChatContextType>({} as ChatContextType);
// eslint-disable-next-line react-refresh/only-export-components
export const useChat = () => useContext(ChatContext);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [conversations, setConversations] = useState<Record<string, Message[]>>({});
  const [selectedPhone, setSelectedPhone] = useState<string | null>(null);

  useEffect(() => {
    const normalized: Record<string, Message[]> = {};
    (convoData as RawConversation[]).forEach((entry) => {
      normalized[entry.phone] = entry.messages.map((msg, index) => {
        const date = new Date(msg.timestamp);

        return {
          id: `${entry.phone}-${index}`,
          from: msg.sender === 'me' ? 'me' : entry.phone,
          to: msg.sender === 'me' ? entry.phone : 'me',
          content: convertPlaceHolderByPhoneNum(msg.text, entry.phone),
          timestamp: msg.timestamp,
          formattedDate: date.toLocaleDateString(),
          formattedTime: date.toTimeString().slice(0, 5)
        };
      });
    });
    setConversations(normalized);
  }, []);

  const selectPhone = (phone: string) => setSelectedPhone(phone);

  const sendMessage = (phone: string, content: string) => {
    const timestamp = new Date();
    const newMsg: Message = {
      id: Math.random().toString(36),
      from: 'me',
      to: phone,
      content: convertPlaceHolderByPhoneNum(content, phone),
      timestamp: timestamp.toISOString(),
      formattedDate: timestamp.toLocaleDateString(),
      formattedTime: timestamp.toTimeString().slice(0, 5)
    };
    setConversations((prev) => ({
      ...prev,
      [phone]: [...(prev[phone] || []), newMsg]
    }));
  };

  return (
    <ChatContext.Provider
      value={{ contacts, conversations, selectedPhone, selectPhone, sendMessage }}
    >
      {children}
    </ChatContext.Provider>
  );
};
