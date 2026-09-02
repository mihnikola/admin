import { useState } from "react";
import { getData } from "@/api/apiService";
import { router } from "expo-router";
import { saveOtpParamsStorage } from "@/helpers/verificationOtpParams";
import { useLocalization } from "@/contexts/LocalizationContext";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const useEmailOtpCode = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { localization } = useLocalization();

  const checkEmailValidation = async (email) => {
    setError(null);
    if (!email || email.trim().length === 0) {
      setError(localization.EMAIL.errorEmpty);
      return;
    }

    if (!EMAIL_REGEX.test(email)) {
      setError(localization.EMAIL.errorValid);
      return;
    }
    setIsLoading(true);

    try {
      const response = await getData(`/admin/users/${email}/email`, {
        params: { email },
      });

      if (response.status === 201) {
        // console.log("x", response);
        setError(localization.BARBERS.removed);

        // setError(localization.EMAIL.errorValid);
        // return;
      }
      if (response.status === 200) {
        console.log("x2222");

        if (response.success) {
          const verifyData = { email };
          await saveOtpParamsStorage(verifyData);
          router.push("/(z_auth)/otpCode");
        } else {
          setError(localization.EMAIL.errorFound);
        }
      }
    } catch (err) {
      setError(localization.SERVER_RESPONSE.error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    setError,
    checkEmailValidation,
  };
};

export default useEmailOtpCode;
