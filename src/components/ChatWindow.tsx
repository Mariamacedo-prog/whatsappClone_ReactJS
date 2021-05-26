import React, { useState, useEffect, useRef } from 'react';

import EmojiPicker from 'emoji-picker-react';

import SearchIcon from '@material-ui/icons/Search';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import CloseIcon from '@material-ui/icons/Close';
import SendIcon from '@material-ui/icons/Send';
import MicIcon from '@material-ui/icons/Mic';
import Api from '../Api';
import MessageItem from './MessageItem';
import './ChatWindow.css';

declare global {
  interface Window {
    webkitSpeechRecognition: any;
  }
}

interface User {
  user: {
    id: number;
    avatar: string;
    name: string;
  };
  data: any;
}

const ChatWindow: React.FC<User> = ({ user, data }) => {
  // ref para descer a barra de rolagem no body da conversa.
  const body = useRef<HTMLDivElement | null>(null);

  let recognition: any = null;

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (SpeechRecognition !== undefined) {
    recognition = new SpeechRecognition();
  }

  const [emojiOpen, setEmojiOpen] = useState(false);
  const [text, setText] = useState('');
  const [listening, setListening] = useState(false);
  const [list, setList] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setList([]);
    const onsub = Api.onChatContent(data.chatId, setList, setUsers);
    return onsub;
  }, [data.chatId]);

  // conta para verificar onde esta a barra de rolagem e descer para o final da conversa.
  useEffect(() => {
    if (body && body.current) {
      if (body.current.scrollHeight > body.current.offsetHeight) {
        body.current.scrollTop =
          body.current.scrollHeight - body.current.offsetHeight;
      }
    }
  }, [list]);

  const handleEmojiClick = (e: any, emojiObject: any) => {
    setText(text + emojiObject.emoji);
  };

  const handleOpenEmoji = () => {
    setEmojiOpen(true);
  };

  const handleCloseEmoji = () => {
    setEmojiOpen(false);
  };

  const handleMicClick = () => {
    if (recognition !== null) {
      recognition.onstart = () => {
        setListening(true);
      };

      recognition.onend = () => {
        setListening(false);
      };

      recognition.onresult = (e: any) => {
        setText(e.results[0][0].transcript);
      };

      recognition.start();
    }
  };

  const handleSendClick = () => {
    if (text !== '') {
      Api.sendMessage(data, user.id, 'text', text, users);

      setText('');
      setEmojiOpen(false);
    }
  };

  const handleInputKeyUp = (e: any) => {
    if (e.keyCode === 13) {
      handleSendClick();
    }
  };

  return (
    <div className="classWindow">
      <div className="classWindow--header">
        <div className="classWindow--headerInfo">
          <img className="classWindow--avatar" src={data.image} alt="avatar" />
          <div className="classWindow--name">{data.title}</div>
        </div>
        <div className="classWindow--headerButtons">
          <div className="btn">
            <SearchIcon style={{ color: '#919191' }} />
          </div>

          <div className="btn">
            <MoreVertIcon style={{ color: '#919191' }} />
          </div>
        </div>
      </div>
      <div ref={body} className="classWindow--body">
        {list.map((item, key) => (
          <MessageItem key={key} data={item} user={user} />
        ))}
      </div>

      <div
        className="classWindow--emojiArea"
        style={{ height: emojiOpen ? '200px' : '0px' }}
      >
        <EmojiPicker
          disableSearchBar
          disableSkinTonePicker
          onEmojiClick={handleEmojiClick}
        />
      </div>

      <div className="classWindow--footer">
        <div className="classWindow--pre">
          <div
            className="btn"
            onClick={handleCloseEmoji}
            style={{ width: emojiOpen ? 40 : 0 }}
          >
            <CloseIcon style={{ color: '#919191' }} />
          </div>
          <div className="btn" onClick={handleOpenEmoji}>
            <InsertEmoticonIcon
              style={{ color: emojiOpen ? '#009688' : '#919191' }}
            />
          </div>
          <div className="btn">
            <AttachFileIcon style={{ color: '#919191' }} />
          </div>
        </div>
        <div className="classWindow--inputArea">
          <input
            type="text"
            className="classWindow--input"
            placeholder="Digite uma mensagem"
            value={text}
            onChange={e => setText(e.target.value)}
            onKeyUp={handleInputKeyUp}
          />
        </div>
        <div className="classWindow--pos">
          {text === '' && (
            <div className="btn" onClick={handleMicClick}>
              <MicIcon style={{ color: listening ? '#126ece' : '#919191' }} />
            </div>
          )}

          {text !== '' && (
            <div className="btn">
              <SendIcon
                style={{ color: '#919191' }}
                onClick={handleSendClick}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
