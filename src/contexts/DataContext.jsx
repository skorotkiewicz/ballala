import React, { useContext, useState } from "react";

const DataContext = React.createContext();

export function useData() {
  return useContext(DataContext);
}

export function DataProvider({ children }) {
  const [window, setWindow] = useState(null);
  const [auth, setAuth] = useState(null);

  const value = {
    auth,
    setAuth,
    window,
    setWindow,
  };
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
