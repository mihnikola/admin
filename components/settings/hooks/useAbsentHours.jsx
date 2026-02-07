
import { post } from "@/api/apiService";
import { useLocalization } from "@/contexts/LocalizationContext";
import { useState } from "react";
function useAbsentHours() {
    const { localization } = useLocalization();

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isMessage, setIsMessage] = useState(false);
    const [message, setMessage] = useState(null);

    const createAbsentHours = async (from, to, comment, token) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await post("admin/availabilities", { startDate: from, endDate: to, token, description: comment });
            if (response.status === 201) {
                setIsMessage(true);
                setMessage(localization.SETTINGS.ABSENTHOURS.success)
            }
        } catch (errorData) {
            setIsMessage(true);
            setError(errorData);
        } finally {
            setIsLoading(false);
        }
    }

    return { createAbsentHours, isLoading, error, isMessage, message, setIsMessage };
}

export default useAbsentHours;