import { ChatProvider } from './context/ChatContext';
import ContactList from './components/ContactList/ContactList.tsx';
import Conversation from './components/Conversation/Conversation.tsx';
import './styles.css';

function App() {
  return (
    <ChatProvider>
      <div className="app">
        <ContactList />
        <Conversation />
      </div>
    </ChatProvider>
  );
}

export default App;
