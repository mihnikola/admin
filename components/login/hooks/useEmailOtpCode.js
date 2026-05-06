import { useState, useCallback } from "react";
import { getData } from "@/api/apiService";
import { router } from "expo-router";
import { saveOtpParamsStorage } from "@/helpers/verificationOtpParams";
import { useLocalization } from "@/contexts/LocalizationContext";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const useEmailOtpCode = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isMessage, setIsMessage] = useState(false);

    const { localization } = useLocalization();

    const checkEmailValidation = async (email) => {

        setError(null);
        setIsMessage(true);
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
            const response = await getData("/users/email", { params: { email } });

            if (response.status === 200) {
                if (response.success) {
                    const verifyData = { email };
                    await saveOtpParamsStorage(verifyData);
                    router.push("/(z_auth)/otpCode");
                } else {
                    setError(localization.EMAIL.errorFound);
                }
            } else {
                setError(localization.SERVER_RESPONSE.error);
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
        isMessage,
        setIsMessage,
    };
};

export default useEmailOtpCode;