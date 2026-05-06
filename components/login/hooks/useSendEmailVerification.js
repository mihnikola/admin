import { useState, useCallback } from "react";
import { getData } from "@/api/apiService";
import { useLocalization } from "@/contexts/LocalizationContext";

const useSendEmailVerification = () => {
  const [isLoadingVerification, setIsLoadingVerification] = useState(false);
  const [errorVerification, setErrorVerification] = useState(null);
  const [messageVerification, setMessageVerification] = useState(null);
  const [isMessageVerification, setIsMessageVerification] = useState(false);
  const { localization } = useLocalization();

  const verificationOTPCode = useCallback(async (paramsData) => {
    const { email, password } = paramsData;
    setIsLoadingVerification(true);
    setErrorVerification(null);
    try {
      const response = await getData("/users/sendOTPviaLogin", {
        params: { email, password },
      });
      if (response.status === 400) {
        setIsMessageVerification(true);
        setErrorVerification(localization.LOGIN.errorEmail);
        setIsLoadingVerification(false);
      }
      if (response.status === 200) {
        setIsMessageVerification(true);
        setMessageVerification(localization.LOGIN.email);
        setIsLoadingVerification(false);
      }
    } catch (err) {
      setIsLoadingVerification(false);
      setErrorVerification(localization.LOGIN.errorEmail);
      setIsMessageVerification(true);
    }
  });

  return {
    verificationOTPCode,
    isMessageVerification,
    isLoadingVerification,
    setIsMessageVerification,
    errorVerification,
    messageVerification,
    setErrorVerification,
  };
};

export default useSendEmailVerification;