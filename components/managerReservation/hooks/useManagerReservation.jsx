import { useEffect, useState } from "react";
import { useLocalization } from "@/contexts/LocalizationContext";
import { get, put } from "@/api/apiService";

const useManagerReservation = () => {
  const [isLoading, setIsLoading] = useState(null);
  const [lastResponse, setLastResponse] = useState(null);
  const [getLimitation, setGetLimitation] = useState(null);
  const [isMessage, setIsMessage] = useState(false);
  const { localization } = useLocalization();
  const [dailyLimit, setDailyLimit] = useState("222");
  const [weeklyLimit, setWeeklyLimit] = useState("000");
  const [monthlyLimit, setMonthlyLimit] = useState("444");
  const [error, setError] = useState(null);

  const handleReservation = async (data) => {
    const { dailyLimit, weeklyLimit, monthlyLimit } = data;
    if (!dailyLimit || !weeklyLimit || !monthlyLimit) {
      setError(localization.SETTINGS.LIMIT.errorLimit)
      return;
    }
    if (
      parseInt(dailyLimit) === 0 ||
      parseInt(weeklyLimit) === 0 ||
      parseInt(monthlyLimit) === 0
    ) {
      setError(localization.SETTINGS.LIMIT.errorCorrect)
      return;
    }
    if (
      parseInt(dailyLimit) < 0 ||
      parseInt(weeklyLimit) < 0 ||
      parseInt(monthlyLimit) < 0
    ) {
      setError(localization.SETTINGS.LIMIT.greaterThanZero)
      return;
    }

    setIsLoading("put");

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
    setIsLoading("get");
    try {
      const response = await get("/limitations");
      if (response.status === 200) {
        const { counterDaily, counterWeekly, counterMonthly } = response.data;
        setDailyLimit(counterDaily);
        setWeeklyLimit(counterWeekly);
        setMonthlyLimit(counterMonthly);
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
      monthlyLimit,
    };
    handleReservation(data);
  };

  return {
    submitHandler,
    isLoading,
    isMessage,
    getLimitation,
    lastResponse,
    setIsMessage,
    refreshHandler,
    dailyLimit,
    setDailyLimit,
    weeklyLimit,
    setWeeklyLimit,
    monthlyLimit,
    setMonthlyLimit,
    error,
    setError
  };
};
export default useManagerReservation;
