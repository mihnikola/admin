
import { get, post } from "@/api/apiService";
import { useLocalization } from "@/contexts/LocalizationContext";
import { useState } from "react";
function useGetWorkHours() {
    const { localization } = useLocalization();
    const options = [
        { label: `10 ${localization.SETTINGS.WORKHOURS.minutes}`, value: 10 },
        { label: `15  ${localization.SETTINGS.WORKHOURS.minutes}`, value: 15 },
        { label: `20  ${localization.SETTINGS.WORKHOURS.minutes}`, value: 20 },
        { label: `30  ${localization.SETTINGS.WORKHOURS.minutes}`, value: 30 },
        { label: `40  ${localization.SETTINGS.WORKHOURS.minutes}`, value: 40 },
        { label: `45  ${localization.SETTINGS.WORKHOURS.minutes}`, value: 45 },
        { label: `50  ${localization.SETTINGS.WORKHOURS.minutes}`, value: 50 },
        { label: `60  ${localization.SETTINGS.WORKHOURS.minutes}`, value: 60 },
    ];

    const [initialData, setInitalData] = useState(null);
    const [startWorkTime, setStartWorkTime] = useState(null);
    const [endWorkTime, setEndWorkTime] = useState(null);
    const [minutesValue, setMinutesValue] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isMessage, setIsMessage] = useState(false);
    const [message, setMessage] = useState(null);

    const createWorkTimeAndSlots = async (startHour, endHour, minutes) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await post("admin/times", { startHour, minutes, endHour });
            if (response.status === 201) {
                setIsMessage(true);
                setMessage(localization.SETTINGS.WORKHOURS.success)
            }
        } catch (errorData) {
            setIsMessage(true);
            setError(errorData);
        } finally {
            setIsLoading(false);

        }
    }
    const getTimes = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await get("admin/times");
            if (response.status === 200) {
                const { startHour, endHour, minutes } = response.data;
                setInitalData(response.data);
                setStartWorkTime(startHour);
                setEndWorkTime(endHour);
                setMinutesValue(minutes);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);

        }
    }
    return { getTimes, startWorkTime, endWorkTime, isLoading, error, minutesValue, createWorkTimeAndSlots, isMessage, message, setIsMessage, options, initialData };
}

export default useGetWorkHours