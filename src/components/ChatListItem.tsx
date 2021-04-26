import React from 'react';
import './ChatListItem.css';

const ChatListArea: React.FC = () => {
  return (
    <div className="chatList">
      <img
        src="https://image.freepik.com/vetores-gratis/avatar-de-personagem-de-empresario-isolado_24877-60111.jpg"
        alt="Avatar"
        className="chatList__avatar"
      />
      <div className="chatList__lines">
        <div className="chatList__line">
          <div className="chatList--name">Maria macedo</div>
          <div className="chatList--date">10:00</div>
        </div>
        <div className="chatList__line">
          <div className="chatList--lastMsg">
            <p>Opaa tudo bem?</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ChatListArea;
