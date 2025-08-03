export interface Contact {
  first_name: string;
  last_name: string;
  phone: string;
  city: string;
}

export interface RawConversation {
  phone: string;
  messages: RawMessage[];
}

export interface RawMessage {
  timestamp: string;
  sender: 'me' | 'contact';
  text: string;
}

export interface Message {
  id: string;
  from: string;
  to: string;
  content: string;
  timestamp: string;
  formattedDate?: string;
  formattedTime?: string;
}
