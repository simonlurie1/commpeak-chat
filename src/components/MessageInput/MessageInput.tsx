import { useState } from 'react';
import { useChat } from '../../context/ChatContext.tsx';
import Tags from '../Tags/Tags.tsx';
import './messageInput.css';

const MessageInput = () => {
  const { selectedPhone, sendMessage } = useChat();
  const [text, setText] = useState('');

  const send = () => {
    if (!text.trim()) return;
    if (selectedPhone) sendMessage(selectedPhone, text);
    setText('');
  };

  const onClickTag = (tag: string) => {
    setText((prev) => prev + ` ${tag}`);
  };

  return (
    <div>
      <div className="message-input">
        <textarea
          placeholder="write something..."
          id="message-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && send()}
        ></textarea>
        <button onClick={send}>Send</button>
      </div>
      <Tags onClickTag={onClickTag} />
    </div>
  );
};

export default MessageInput;
