import React, { useState } from 'react';

import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';

import ChatListItem from './components/ChatListItem';

import './App.css';

const App: React.FC = () => {
  const [chatList, setChatList] = useState([{}, {}, {}, {}]);

  return (
    <div className="App-window">
      <div className="listArea">
        <header>
          <img
            className="header--avatar"
            src="https://image.freepik.com/vetores-gratis/avatar-de-personagem-de-empresario-isolado_24877-60111.jpg"
            alt="Avatar"
          />
          <div className="header--buttons">
            <div className="header--btn">
              <DonutLargeIcon style={{ color: '#919191' }} />
            </div>
            <div className="header--btn">
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
              placeholder="Procurar ou começar uma nova conversa"
            />
          </div>
        </div>
        <div className="listArea__chatList">
          {chatList.map((item, key) => (
            <ChatListItem key={key} />
          ))}
        </div>
      </div>
      <div className="contentArea">..d</div>
    </div>
  );
};
export default App;
