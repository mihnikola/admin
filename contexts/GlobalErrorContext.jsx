// GlobalErrorContext.jsx
import { registerErrorHandler } from "@/helpers/error-handler";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useLocalization } from "./LocalizationContext";

const GlobalErrorContext = createContext();

export const useGlobalError = () => useContext(GlobalErrorContext);

export const GlobalErrorProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const {localization} = useLocalization();
  const showError = (title) => {

    setError({ title: localization.Authorization.error });
  };

  const hideError = () => {
    setError(null);
  };

  // Register the showError function when the provider mounts
  useEffect(() => {
    registerErrorHandler(showError);
  }, []);

  return (
    <GlobalErrorContext.Provider value={{ error, showError, hideError }}>
      {children}
    </GlobalErrorContext.Provider>
  );
};
