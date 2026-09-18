import { createContext, useContext, useState } from "react";

const ServicesContext = createContext();

export const ServicesProvider = ({ children }) => {
  const [serviceData, setServicesData] = useState([]);
  const [serviceCategory, setServiceCategory] = useState(null);

  return (
    <ServicesContext.Provider
      value={{
        serviceData,
        setServicesData,
        setServiceCategory,
        serviceCategory,
      }}
    >
      {children}
    </ServicesContext.Provider>
  );
};

export const useServicesStore = () => useContext(ServicesContext);
