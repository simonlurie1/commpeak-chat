import { useState } from 'react';
import { useChat } from '../../context/ChatContext.tsx';
import type { Contact } from '../../types';
import './contactListStyle.css';

const ContactList = () => {
  const { contacts, conversations, selectedPhone, selectPhone } = useChat();
  const [search, setSearch] = useState('');

  const filtered: Contact[] = contacts.filter((c) => {
    const fullName = `${c.first_name} ${c.last_name}`.toLowerCase();
    return fullName.includes(search.toLowerCase()) || c.phone.includes(search);
  });

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <input
          placeholder="Search..."
          type="text"
          id="search-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {filtered.map((contact) => {
        const msgs = conversations[contact.phone] || [];
        const last = msgs[msgs.length - 1];
        return (
          <div
            className={`contact-row ${selectedPhone === contact.phone ? 'active' : ''}`}
            key={contact.phone}
            onClick={() => selectPhone(contact.phone)}
          >
            <div
              className="avatar"
              id="avatar"
            >{`${contact?.first_name?.[0] ?? ''}${contact?.last_name?.[0] ?? ''}`}</div>
            <div className="contact">
              <div className="first-line">
                <div>
                  {contact.first_name} {contact.last_name}
                </div>
                <div className="timestamp">
                  {new Date(last?.timestamp).toTimeString().slice(0, 5)}
                </div>
              </div>
              <div className="preview">{last?.content}</div>
            </div>
          </div>
        );
      })}
    </aside>
  );
};

export default ContactList;
