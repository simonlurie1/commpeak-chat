import { useEffect, useRef } from 'react';
import { useChat } from '../../context/ChatContext.tsx';
import MessageInput from '../MessageInput/MessageInput.tsx';
import type { Message } from '../../types';
import './conversation.css';

const Conversation = () => {
  const { contacts, selectedPhone, conversations } = useChat();
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversations, selectedPhone]);

  if (!selectedPhone) return <div className="conversation">Select a contact</div>;

  const contact = contacts.find((c) => c.phone === selectedPhone);
  const messages = conversations[selectedPhone] || [];
  const initials = `${contact?.first_name?.[0] ?? ''}${contact?.last_name?.[0] ?? ''}`;

  return (
    <div className="conversation">
      <div className="header">
        <div className="avatar">{initials}</div>
        <b>
          {contact?.first_name} {contact?.last_name}
        </b>{' '}
        <div className="muted">({messages.length} messages)</div>
      </div>
      <div className="messages">
        {messages.map((msg: Message, index) => (
          <div key={msg.id}>
            {index === 0 || msg.formattedDate !== messages[index - 1 || 0].formattedDate ? (
              <div className="divider">
                <div className="divider-text"> {msg.formattedDate}</div>
              </div>
            ) : null}
            <div className={`bubble ${msg.from === 'me' ? 'outgoing' : 'incoming'}`}>
              <div className="message-text">{msg.content}</div>
              <div className="timestamp">Sent: {msg.formattedTime}</div>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <MessageInput />
    </div>
  );
};

export default Conversation;
