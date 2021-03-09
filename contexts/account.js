import { createContext, useState } from 'react';

const AccountContext = createContext(null);
// const AccountContext = createContext(false,() => {});

export const AccountProvider = ({ children }) => {
  const [account, setAccount] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);

  const login = (acc) => {
    setLoggedIn(true);
    setAccount(acc)
  }

  const logout = () => {
    setLoggedIn(false)
    setAccount(null)
  }

  const contextValue = {
    account,
    loggedIn,
    login,
    logout
  }

  return (
    <AccountContext.Provider value={contextValue}>
      {children}
    </AccountContext.Provider>
  );
};
export default AccountContext;