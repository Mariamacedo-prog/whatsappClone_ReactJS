import React, { useState } from 'react';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import './NewChat.css';

interface NewChatInter {
  user: {
    id: number;
    avatar: string;
    name: string;
  };
  show: boolean;
  setShow: any;
  chatList: any;
}

const NewChat: React.FC<NewChatInter> = ({ user, chatList, show, setShow }) => {
  const [list, setList] = useState([
    {
      id: 123,
      avatar:
        'https://image.freepik.com/vetores-gratis/avatar-de-personagem-de-empresario-isolado_24877-60111.jpg',
      name: 'Maria',
    },
    {
      id: 1234,
      avatar:
        'https://image.freepik.com/vetores-gratis/avatar-de-personagem-de-empresario-isolado_24877-60111.jpg',
      name: 'Maria',
    },
    {
      id: 12345,
      avatar:
        'https://image.freepik.com/vetores-gratis/avatar-de-personagem-de-empresario-isolado_24877-60111.jpg',
      name: 'Maria',
    },
    {
      id: 123456,
      avatar:
        'https://image.freepik.com/vetores-gratis/avatar-de-personagem-de-empresario-isolado_24877-60111.jpg',
      name: 'Maria',
    },
  ]);

  const handleClose = () => {
    setShow(false);
  };

  return (
    <div className="newchat" style={{ left: show ? 0 : -415 }}>
      <div className="newchat--head">
        <div onClick={handleClose} className="newchat--backButton">
          <ArrowBackIcon style={{ color: '#fff' }} />
        </div>
        <div className="newchat--headTitle">Nova conversa</div>
      </div>
      <div className="newchat--list">
        {list.map((item, key) => (
          <div className="newchat--item" key={key}>
            <img
              className="newchat--itemAvatar"
              src="https://image.freepik.com/vetores-gratis/avatar-de-personagem-de-empresario-isolado_24877-60111.jpg"
              alt="avatar"
            />
            <div className="newchat--itemName">Maria macedo</div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default NewChat;
