import React from 'react';
import { AuthContext, logout } from '../contexts/AuthContext';

export default function Home() {
  const { setIsLoggedIn, setUser } = React.useContext(AuthContext);

  const logOut = () => {
    logout();
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <div>
      <h1>Home</h1>
      <button onClick={logOut}>Logout</button>
    </div>
  );
}
