// src/hooks/useEmail.js
import { useLocalization } from "@/contexts/LocalizationContext";
import { useState, useCallback, useRef } from "react";

const useEmail = () => {
  const emailInputRef = useRef(null);

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const { localization } = useLocalization();
  const handleEmailChange = useCallback((text) => {
    setEmail(text);
    // const trimmedEmail = text.trim().toLowerCase();

    if (text?.length > 0 && (text.includes(" ") || !emailRegex.test(text))) {
      setEmailError(localization.EMAIL.errorValid);
    } else {
      setEmailError(""); // No errors
    }


  }, []);

  return { email, emailError, handleEmailChange, emailInputRef };
};

export default useEmail;
