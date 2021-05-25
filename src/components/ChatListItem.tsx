import React from 'react';
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
  };
}

const ChatListItem: React.FC<ChatListItemInter> = ({
  onClick,
  active,
  data,
}) => {
  return (
    <div className={`chatList ${active ? 'active' : ''} `} onClick={onClick}>
      <img src={data.image} alt="Avatar" className="chatList__avatar" />
      <div className="chatList__lines">
        <div className="chatList__line">
          <div className="chatList--name">{data.title}</div>
          <div className="chatList--date">10:00</div>
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
