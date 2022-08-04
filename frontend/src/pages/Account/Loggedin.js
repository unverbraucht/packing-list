import React, { useContext } from 'react';
import { UserContext } from '../../UserContext';

function Loggedin() {
  const { setAccessToken } = useContext(UserContext);


  return (
    <div>
      <p> You're logged in, amazing </p>
      <button
        onClick={() => {
          sessionStorage.setItem('access_token', '');
          setAccessToken(false);
        }}>
        Log out
      </button>

    </div>
  )
}

export default Loggedin;