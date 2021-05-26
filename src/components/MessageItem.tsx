import React, { useState, useEffect } from 'react';

import './MessageItem.css';

interface Message {
  data: {
    body: string;
    author: number;
    date: any;
  };
  key: number;
  user: {
    id: number;
    avatar: string;
    name: string;
  };
}

const MessageItem: React.FC<Message> = ({ data, user }) => {
  const [time, setTime] = useState('');

  useEffect(() => {
    if (data.date > 0) {
      const d = new Date(data.date.seconds * 1000);
      let hours: string | number = d.getHours();
      let minutes: string | number = d.getMinutes();

      hours = hours < 10 ? `0${hours}` : hours;
      minutes = minutes < 10 ? `0${minutes}` : minutes;

      setTime(`${hours}:${minutes}`);
    }
  }, [data]);

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
        <div className="messageDate">{time}</div>
      </div>
    </div>
  );
};
export default MessageItem;
