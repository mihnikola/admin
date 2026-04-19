// src/hooks/usePassword.js
import { useLocalization } from "@/contexts/LocalizationContext";
import { useState, useCallback, useRef } from "react";

const usePassword = () => {
  const passwordInputRef = useRef(null);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const strongPasswordRegex =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!"#$%&'()*+,\-./:;<=>?@\[\\\]^_`{|}~]).{8,}$/;

  const { localization } = useLocalization();

  const handlePasswordChange = useCallback((text) => {
    const trimmedPass = text.trim();
    setPassword(trimmedPass);
    setTimeout(() => {
      if (text?.length > 0 && !strongPasswordRegex.test(trimmedPass)) {
        setPasswordError(localization.PASSWORD.errorRegex);
      } else {
        setPasswordError("");
      }
    }, 500);
  }, []);

  const togglePasswordVisibility = useCallback(() => {
    setIsPasswordVisible(!isPasswordVisible);
  }, [isPasswordVisible]);

  return {
    password,
    passwordError,
    isPasswordVisible,
    handlePasswordChange,
    togglePasswordVisibility,
    setPassword,
    passwordInputRef
  };
};

export default usePassword;
