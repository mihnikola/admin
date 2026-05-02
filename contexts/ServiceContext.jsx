import { createContext, useContext, useState } from "react";

const ServicesContext = createContext();

export const ServicesProvider = ({ children }) => {
  const [serviceData, setServicesData] = useState([]);

  return (
    <ServicesContext.Provider value={{ serviceData, setServicesData }}>
      {children}
    </ServicesContext.Provider>
  );
};

export const useServicesStore = () => useContext(ServicesContext);
