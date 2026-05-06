// src/hooks/useChangePasswordHandler.js
import { useState, useCallback } from "react";
import { put } from "@/api/apiService";
import { useLocalization } from "@/contexts/LocalizationContext";

const useChangePasswordHandler = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [isMessage, setIsMessage] = useState(false);
  const { localization } = useLocalization();
  
  const handlePatchUser = useCallback(
    async (email, password, confirmPassword) => {
      setIsLoading(true);
      setError(null);

      if (password.length === 0 || confirmPassword.length === 0) {
        setIsMessage(true);
        setError(localization.LOGIN.error);
        setIsLoading(false);
        return;
      }
      if (password !== confirmPassword) {
        setIsMessage(true);
        setError(localization.LOGIN.notMatch);
        setIsLoading(false);
        return;
      }


      console.log("data",email, password);

      try {
        const response = await put(`/users/${email}/changePassword`, {
          password,
        });
        if (response.status === 200) {
          setIsMessage(true);
          setMessage(localization.CHANGE_PASS.success);
        }
      } catch (err) {
        setError(localization.CHANGE_PASS.error);
        setIsMessage(true);
      }
      setIsLoading(false);
    }
  );

  return {
    handlePatchUser,
    isLoading,
    message,
    isMessage,
    setIsMessage,
    error,
  };
};

export default useChangePasswordHandler;