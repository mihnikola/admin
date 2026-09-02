import { createContext, useContext, useEffect, useState } from "react";
import { ENG_LOCALIZATION } from "../helpers/en-locale";
import { SRB_LOCALIZATION } from "../helpers/srb-locale";
import { getLanguageValue, setLanguageValue } from "../helpers/language";
import { getStorage } from "@/helpers/token";
import { put } from "@/api/apiService";

const LocalizationContext = createContext(null);
export const useLocalization = () => {
  return useContext(LocalizationContext);
};
export const LocalizationProvider = ({ children }) => {
  const [localization, setLocalization] = useState(SRB_LOCALIZATION);

  const getLanguageFromStorage = async () => {
    await getLanguageValue().then((res) => {
      if (res) {
        const prom = { code: res };
        changeLocalization(prom);
      } else {
        setLocalization(SRB_LOCALIZATION);
      }
    });
  };
  useEffect(() => {
    getLanguageFromStorage();
  }, []);

  const changeFirebaseLocalization = async (lang) => {
    const langData = lang === "en" ? "en" : "sr";
    try {
      const token = await getStorage();
      if (!token) return;
      await put(`/admin/users/${token}/changeLanguage`, { langData });
    } catch (error) {
      console.log("LocalizationContext error", error);
    }
  };
  const changeLocalization = (language) => {
    const { code } = language;
    changeFirebaseLocalization(code);

    setLanguageValue(code);
    if (code === "en") {
      setLocalization(ENG_LOCALIZATION);
    }
    if (code === "sr") {
      setLocalization(SRB_LOCALIZATION);
    }
  };
  return (
    <LocalizationContext.Provider value={{ localization, changeLocalization }}>
      {children}
    </LocalizationContext.Provider>
  );
};

export default LocalizationContext;
