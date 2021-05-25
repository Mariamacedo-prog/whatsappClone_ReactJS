import React, { useState, useEffect } from 'react';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Api from '../Api';
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

interface Listcontact {
  id: string;
  name: string;
  avatar: string;
}

const NewChat: React.FC<NewChatInter> = ({ user, chatList, show, setShow }) => {
  const [list, setList] = useState<Listcontact[]>([]);

  useEffect(() => {
    const getList = async () => {
      if (user !== null) {
        const results = await Api.getContactList(user.id);
        setList(results);
      }
    };
    getList();
  }, [user]);

  const handleClose = () => {
    setShow(false);
  };

  const addNewChat = async (user2: any) => {
    await Api.addNewChat(user, user2);

    handleClose();
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
          <div
            onClick={() => addNewChat(item)}
            className="newchat--item"
            key={key}
          >
            <img
              className="newchat--itemAvatar"
              src={item.avatar}
              alt={`avatar ${item.name}`}
            />
            <div className="newchat--itemName">{item.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default NewChat;
