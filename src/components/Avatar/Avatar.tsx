import React from 'react';
import type { Contact } from '../../types';
import './avatar.css';

interface Props {
  contact: Contact;
}

const Avatar: React.FC<Props> = ({ contact }) => {
  return (
    <div className="avatar" id="avatar">
      {contact?.first_name?.[0] ?? ''}
      {contact?.last_name?.[0] ?? ''}
    </div>
  );
};

export default Avatar;
