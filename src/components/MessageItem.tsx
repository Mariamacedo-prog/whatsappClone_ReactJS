import React from 'react';

import './MessageItem.css';

interface Message {
  data: {
    body: string;
    author: number;
  };
  key: number;
  user: {
    id: number;
    avatar: string;
    name: string;
  };
}

const MessageItem: React.FC<Message> = ({ data, user }) => {
  return (
    <div
      className="messageLine"
      style={{
        justifyContent: user.id === data.author ? 'flex-end' : 'flex-start',
      }}
    >
      <div
        className="messageItem"
        style={{
          backgroundColor: user.id === data.author ? '#DCF8c6' : '#fff',
        }}
      >
        <div className="messageText">{data.body}</div>
        <div className="messageDate">19:00</div>
      </div>
    </div>
  );
};
export default MessageItem;
