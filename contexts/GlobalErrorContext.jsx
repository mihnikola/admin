// GlobalErrorContext.jsx
import { registerGlobalHandler } from "@/helpers/error-handler";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useLocalization } from "./LocalizationContext";
import { router } from "expo-router";

const GlobalErrorContext = createContext();

export const useGlobalError = () => useContext(GlobalErrorContext);

export const GlobalErrorProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const { localization } = useLocalization();

  const hideError = () => {
    setError(null);

    router.replace("/(z_auth)/");
  };

  // Register the showError function when the provider mounts
  useEffect(() => {
    registerGlobalHandler((data) => {
      switch (data.type) {
        case "ACCOUNT_DELETED":
          console.log(
            "qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq",
          );
          setError({ title: localization.DETERMINATION.error });
          break;

        case "UNAUTHORIZED_TOKEN":
          setError({ title: localization.AUTHORIZATION.error });
          break;
      }
    });
  }, []);

  return (
    <GlobalErrorContext.Provider value={{ error, hideError }}>
      {children}
    </GlobalErrorContext.Provider>
  );
};
