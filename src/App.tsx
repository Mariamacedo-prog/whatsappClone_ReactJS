import React, { useState, useEffect } from 'react';

import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';

import Api from './Api';

import NewChat from './components/NewChat';
import ChatIntro from './components/ChatIntro';
import Login from './components/Login';
import ChatWindow from './components/ChatWindow';
import ChatListItem from './components/ChatListItem';

import './App.css';

interface Chat {
  chatId: string;
  title: string;
  image: string;
}

const App: React.FC = () => {
  const [activeChat, setActiveChat] = useState({} as Chat);

  const [chatList, setChatList] = useState<any[]>([]);

  const [user, setUser] = useState<any | null>(null);

  const [showNewChat, setShowNewChat] = useState(false);

  useEffect(() => {
    if (user !== null) {
      Api.onChatList(user.id, setChatList);
    }
  }, [user]);

  const handleNewChat = () => {
    setShowNewChat(true);
  };

  const handleLoginData = async (u: any) => {
    const newUser = {
      id: u.uid,
      name: u.displayName,
      avatar: u.photoURL,
    };

    setUser(newUser);
    await Api.addUser(newUser);
  };

  if (user === null) {
    return <Login onReceive={handleLoginData} />;
  }

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
        {activeChat.chatId !== undefined && (
          <ChatWindow user={user} data={activeChat} />
        )}
        {activeChat.chatId === undefined && <ChatIntro />}
      </div>
    </div>
  );
};
export default App;
