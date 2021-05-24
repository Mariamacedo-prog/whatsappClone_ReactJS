import React, { useState } from 'react';

import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';

import NewChat from './components/NewChat';
import ChatIntro from './components/ChatIntro';
import ChatWindow from './components/ChatWindow';
import ChatListItem from './components/ChatListItem';

import './App.css';

interface Chat {
  chatId: number;
  title: string;
  image: string;
}

const App: React.FC = () => {
  const [activeChat, setActiveChat] = useState({} as Chat);

  const [chatList, setChatList] = useState([
    {
      chatId: 1,
      title: 'Fulano',
      image:
        'https://image.freepik.com/vetores-gratis/avatar-de-personagem-de-empresario-isolado_24877-60111.jpg',
    },
    {
      chatId: 2,
      title: 'Cicrano',
      image:
        'https://image.freepik.com/vetores-gratis/avatar-de-personagem-de-empresario-isolado_24877-60111.jpg',
    },
    {
      chatId: 3,
      title: 'Gabs',
      image:
        'https://image.freepik.com/vetores-gratis/avatar-de-personagem-de-empresario-isolado_24877-60111.jpg',
    },
    {
      chatId: 4,
      title: 'Lara',
      image:
        'https://image.freepik.com/vetores-gratis/avatar-de-personagem-de-empresario-isolado_24877-60111.jpg',
    },
  ]);

  const [user, setUser] = useState({
    id: 1234,
    avatar:
      'https://image.freepik.com/vetores-gratis/avatar-de-personagem-de-empresario-isolado_24877-60111.jpg',
    name: 'Maria Macedo',
  });

  const [showNewChat, setShowNewChat] = useState(false);

  const handleNewChat = () => {
    setShowNewChat(true);
  };
  return (
    <div className="App-window">
      <div className="listArea">
        <NewChat
          chatList={chatList}
          user={user}
          show={showNewChat}
          setShow={setShowNewChat}
        />
        <header>
          <img className="header--avatar" src={user.avatar} alt="Avatar" />
          <div className="header--buttons">
            <div className="header--btn">
              <DonutLargeIcon style={{ color: '#919191' }} />
            </div>
            <div onClick={handleNewChat} className="header--btn">
              <ChatIcon style={{ color: '#919191' }} />
            </div>
            <div className="header--btn">
              <MoreVertIcon style={{ color: '#919191' }} />
            </div>
          </div>
        </header>
        <div className="listArea__search">
          <div className="seach--input">
            <SearchIcon fontSize="small" style={{ color: '#919191' }} />
            <input
              type="search"
              placeholder="Pesquisar ou começar uma nova conversa"
            />
          </div>
        </div>
        <div className="listArea__chatList">
          {chatList.map((item, key) => (
            <ChatListItem
              key={key}
              data={item}
              active={activeChat.chatId === chatList[key].chatId}
              onClick={() => setActiveChat(chatList[key])}
            />
          ))}
        </div>
      </div>
      <div className="contentArea">
        {activeChat.chatId !== undefined && <ChatWindow user={user} />}
        {activeChat.chatId === undefined && <ChatIntro />}
      </div>
    </div>
  );
};
export default App;
