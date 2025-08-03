import React from 'react';
import { availableTags } from '../../utils.ts';
import './tags.css';

interface Props {
  onClickTag(tag: string): void;
}

const Tags: React.FC<Props> = ({ onClickTag }) => {
  return (
    <div className="tags-wrapper">
      {availableTags.map((tag) => (
        <span key={tag} className="tag" onClick={() => onClickTag(tag)}>
          {tag.replace('[', '').replace(']', '')}
        </span>
      ))}
    </div>
  );
};

export default Tags;
