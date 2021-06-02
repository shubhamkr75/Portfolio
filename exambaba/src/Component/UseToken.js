import { useState } from 'react';

export default function UseToken() {
  const getToken = () => {
    const tokenString = sessionStorage.getItem('user');
    const userToken = JSON.parse(tokenString);
    return userToken
  };

  const [token, setToken] = useState(getToken());

  const saveToken = userToken => {
    //sessionStorage.setItem('user', JSON.stringify(userToken));
    setToken(userToken);
  };

  return {
    setToken: saveToken,
    token
  }
}