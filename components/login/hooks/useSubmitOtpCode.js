// src/hooks/useEmailOtpCode.js
import { useState } from "react";
import { getData, post } from "@/api/apiService";
import { useLocalization } from "@/contexts/LocalizationContext";
import { saveStorage } from "@/helpers/token";

const useSubmitOtpCode = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [isMessage, setIsMessage] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const { localization } = useLocalization();

  const checkOtpCodeValidation = async (email, otpCode) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await getData("/users/otpcode", {
        email,
        otpCode,
      });

      setIsMessage(true);

      if (response.status === 200) {
        setMessage(localization.OTP_CODE.validSuccess);
      }
      if (response.status === 300) {
        setError(localization.OTP_CODE.validError);
      }
    } catch (err) {
      setIsMessage(true);

      console.log('xx',err);
      setError(localization.OTP_CODE.validError);
    } finally {
      setIsLoading(false);
    }
  };

  const checkOtpCodeVerification = async (email, password, otpCode) => {
    console.log("xxxxxxxxxxxx")
    setIsLoading(true);
    setError(null);

    try {
      const response = await post("/users/loginVerify", {
        email,
        password,
        otpCode,
      });
      console.log("checkOtpCodeVerificatio  loginVerify", response);
      setIsMessage(true);

      if (response.status === 69) {
        saveStorage(response.token);
        setMessage(localization.LOGIN.successVerified);
      }
      if (response.status === 202) {
        setError(localization.OTP_CODE.validError);
      }
    } catch (err) {
      setIsMessage(true);

      setError(localization.OTP_CODE.validError);
    } finally {
      setIsLoading(false);
    }
  };

  const checkverifyEmail = async (email, otpCode) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getData("/users/verifyEmail", {
        email,
        otpCode,
      });
      console.log("checkverifyEmail", response);

      if (response.status === 200) {
        setIsMessage(true);

        setMessage(localization.LOGIN.successVerified);
      }
    } catch (err) {
      setIsMessage(true);
      setError(localization.OTP_CODE.validError);
    } finally {
      setIsLoading(false);
    }
  };

  const verificationOTPCode = async (paramsData) => {
    const { email, password } = paramsData;
    setIsLoading(true);
    setError(null);
    try {
      const response = await getData("/users/sendOTPviaLogin", {
        params: { email, password },
      });
      if (response.status === 400) {
        setIsMessage(true);
        setError(localization.LOGIN.errorEmail);
        setIsLoading(false);
      }
      if (response.status === 200) {
        setIsLoading(false);
      }
    } catch (err) {
      setIsLoading(false);
      setError(localization.LOGIN.errorEmail);
      setIsMessage(true);
    }
  };

  const verificationOTPCodeResend = async (paramsData) => {
    const { email, password } = paramsData;

    setError(null);
    try {
      const response = await getData("/users/sendOTPviaLogin", {
        params: { email, password },
      });
      if (response.status === 400) {
        setIsMessage(true);
        setError(localization.LOGIN.errorEmail);
      }
    } catch (err) {
      setError(localization.LOGIN.errorEmail);
      setIsMessage(true);
    }
  };

  return {
    message,
    setMessage,
    isLoading,
    error,
    setError,
    checkOtpCodeValidation,
    isMessage,
    setIsMessage,
    verificationOTPCode,
    checkOtpCodeVerification,
    isVerified,
    checkverifyEmail,
    verificationOTPCodeResend,
  };
};

export default useSubmitOtpCode;