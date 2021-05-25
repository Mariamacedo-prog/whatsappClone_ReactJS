import React from 'react';
import Api from '../Api';
import './Login.css';

interface LoginFace {
  onReceive: any;
}

const Login: React.FC<LoginFace> = ({ onReceive }) => {
  const handleGmail = async () => {
    const result = await Api.gMailPopup();

    if (result) {
      onReceive(result.user);
    } else {
      alert('Error!');
    }
  };

  return (
    <div className="login">
      <button type="button" onClick={handleGmail}>
        Logar com Gmail
      </button>
    </div>
  );
};

export default Login;
