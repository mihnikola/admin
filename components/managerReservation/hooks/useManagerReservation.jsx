import { useEffect, useState } from "react";
import { useLocalization } from "@/contexts/LocalizationContext";
import { get, put } from "@/api/apiService";
import { Alert } from "react-native";


const useManagerReservation = () => {

    const [isLoading, setIsLoading] = useState(null);
    const [lastResponse, setLastResponse] = useState(null);
    const [getLimitation, setGetLimitation] = useState(null);
    const [isMessage, setIsMessage] = useState(false);
    const { localization } = useLocalization();
    const [dailyLimit, setDailyLimit] = useState("");
    const [weeklyLimit, setWeeklyLimit] = useState("");
    const [monthlyLimit, setMonthlyLimit] = useState("");



    const handleReservation = async (data) => {
        const { dailyLimit, weeklyLimit, monthlyLimit } = data;
        if (!dailyLimit || !weeklyLimit || !monthlyLimit) {
            Alert.alert(localization.SETTINGS.LIMIT.error, localization.SETTINGS.LIMIT.errorLimit);
            return;
        }
        if (
            parseInt(dailyLimit) === 0 ||
            parseInt(weeklyLimit) === 0 ||
            parseInt(monthlyLimit) === 0
        ) {
            Alert.alert(localization.SETTINGS.LIMIT.error, localization.SETTINGS.LIMIT.errorCorrect);
            return;
        }
        if (
            parseInt(dailyLimit) < 0 ||
            parseInt(weeklyLimit) < 0 ||
            parseInt(monthlyLimit) < 0
        ) {
            Alert.alert(localization.SETTINGS.LIMIT.error, localization.SETTINGS.LIMIT.greaterThanZero);
            return;
        }

        setIsLoading('put');

        try {
            const response = await put(`/limitations/${getLimitation?._id}`, {
                daily: parseInt(dailyLimit),
                weekly: parseInt(weeklyLimit),
                monthly: parseInt(monthlyLimit),
            });
            setIsMessage(true);
            setLastResponse(localization.SETTINGS.LIMIT.successMsg);
        } catch (error) {
            setIsMessage(true);

            setLastResponse(error);
        } finally {
            setIsLoading(null);
        }
    };

    const getCurrentLimitReservation = async () => {
        setIsLoading('get');
        try {
            const response = await get("/limitations");
            if (response.status === 200) {
                setGetLimitation(response.data);
            }
        } catch (ex) {
            console.log("ex", ex);
        } finally {
            setIsLoading(null);

        }
    };
    const refreshHandler = async () => {

        setIsMessage(false);
        setDailyLimit("");
        setWeeklyLimit("");
        setMonthlyLimit("");
        await getCurrentLimitReservation();
    };

    useEffect(() => {
        getCurrentLimitReservation();
    }, []);

    const submitHandler = () => {
        const data = {
            dailyLimit,
            weeklyLimit,
            monthlyLimit
        }
        handleReservation(data);
    }



    return { submitHandler, isLoading, isMessage, getLimitation, lastResponse, setIsMessage, refreshHandler, dailyLimit, setDailyLimit, weeklyLimit, setWeeklyLimit, monthlyLimit, setMonthlyLimit };

}
export default useManagerReservation;

