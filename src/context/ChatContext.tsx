import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import type { Contact, Message, RawConversation } from '../types';
import contacts from '../assets/contacts.json';
import conversationData from '../assets/conversations.json';
import { convertPlaceHolderByPhoneNum, normalizeConversations } from '../utils.ts';

interface ChatContextType {
  contacts: Contact[];
  conversations: Record<string, Message[]>;
  selectedPhone: string | null;
  selectPhone: (phone: string) => void;
  sendMessage: (phone: string, message: string) => void;
}

const ChatContext = createContext<ChatContextType>({} as ChatContextType);
export const useChat = () => useContext(ChatContext);

const Me = 'me';

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [conversations, setConversations] = useState<Record<string, Message[]>>({});
  const [selectedPhone, setSelectedPhone] = useState<string | null>(null);

  useEffect(() => {
    setConversations(normalizeConversations(conversationData as RawConversation[]));
  }, []);

  const selectPhone = (phone: string) => setSelectedPhone(phone);

  const sendMessage = (phone: string, content: string) => {
    const timestamp = new Date();
    const newMsg: Message = {
      id: crypto.randomUUID(),
      from: Me,
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

  const contextValue = useMemo(
    () => ({
      contacts,
      conversations,
      selectedPhone,
      selectPhone,
      sendMessage
    }),
    [conversations, selectedPhone]
  );

  return <ChatContext.Provider value={contextValue}>{children}</ChatContext.Provider>;
};
