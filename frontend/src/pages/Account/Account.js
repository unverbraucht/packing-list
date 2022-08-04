import React, { useContext } from 'react';
import { UserContext } from '../../UserContext';
import Loggedin from './Loggedin';
import Login from './Login';

function Account() {
  const { accessToken } = useContext(UserContext);

  return <>
    { accessToken && (
      <Loggedin/>
    )}
    { !accessToken && (
      <Login/>
    )}
  </>;
}

export default Account;