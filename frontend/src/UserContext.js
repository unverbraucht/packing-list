import { createContext, useState, useMemo } from 'react';

const currentToken = sessionStorage.getItem('access_token');

export const UserContext = createContext(currentToken);

export function UserContextProvider( { children }) {
  const [accessToken, setAccessToken] = useState(currentToken);
  const value = useMemo(
    () => ({ accessToken, setAccessToken }),
    [accessToken]
  );

  return <UserContext.Provider value={value}>
    { children }
  </UserContext.Provider>
}
