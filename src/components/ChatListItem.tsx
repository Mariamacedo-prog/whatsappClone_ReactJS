import React, { useState, useEffect } from 'react';

import './ChatListItem.css';

interface ChatListItemInter {
  key: React.Key;
  onClick: any;
  active: any;
  data: {
    chatId: string;
    title: string;
    image: string;
    lastMessage: any;
    lastMessageDate: any;
  };
}

const ChatListItem: React.FC<ChatListItemInter> = ({
  onClick,
  active,
  data,
}) => {
  const [time, setTime] = useState('');

  useEffect(() => {
    if (data.lastMessageDate > 0) {
      const d = new Date(data.lastMessageDate.seconds * 1000);
      let hours: string | number = d.getHours();
      let minutes: string | number = d.getMinutes();

      hours = hours < 10 ? `0${hours}` : hours;
      minutes = minutes < 10 ? `0${minutes}` : minutes;

      setTime(`${hours}:${minutes}`);
    }
  }, [data]);

  return (
    <div className={`chatList ${active ? 'active' : ''} `} onClick={onClick}>
      <img src={data.image} alt="Avatar" className="chatList__avatar" />
      <div className="chatList__lines">
        <div className="chatList__line">
          <div className="chatList--name">{data.title}</div>
          <div className="chatList--date">{time}</div>
        </div>
        <div className="chatList__line">
          <div className="chatList--lastMsg">
            <p>{data.lastMessage}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ChatListItem;
