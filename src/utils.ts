import contacts from './assets/contacts.json';
import type { Message, RawConversation } from './types';

export const convertPlaceHolderByPhoneNum = (content: string, phone: string) => {
  const selectedContact = contacts.find((c) => c.phone === phone);
  return content
    .replaceAll('[first_name]', selectedContact?.first_name || '')
    .replaceAll('[last_name]', selectedContact?.last_name || '')
    .replaceAll('[city]', selectedContact?.city || '')
    .replaceAll('[phone]', selectedContact?.phone || '');
};

export const availableTags = ['[first_name]', '[last_name]', '[phone]', '[city]'] as const;

const Me = 'me';

export const normalizeConversations = (data: RawConversation[]): Record<string, Message[]> => {
  return data.reduce(
    (acc, entry) => {
      acc[entry.phone] = entry.messages.map((msg, index) => {
        const date = new Date(msg.timestamp);
        return {
          id: `${entry.phone}-${index}`,
          from: msg.sender === Me ? Me : entry.phone,
          to: msg.sender === Me ? entry.phone : Me,
          content: convertPlaceHolderByPhoneNum(msg.text, entry.phone),
          timestamp: msg.timestamp,
          formattedDate: date.toLocaleDateString(),
          formattedTime: date.toTimeString().slice(0, 5)
        };
      });
      return acc;
    },
    {} as Record<string, Message[]>
  );
};
