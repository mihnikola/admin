import { createContext, useContext, useState } from "react";

const BarbersContext = createContext();

export const BarbersProvider = ({ children }) => {
  const [barbersData, setBarbersData] = useState([]);

  return (
    <BarbersContext.Provider value={{ barbersData, setBarbersData }}>
      {children}
    </BarbersContext.Provider>
  );
};

export const useBarbersStore = () => useContext(BarbersContext);
