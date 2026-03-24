import { put, get } from "@/api/apiService";
import { useLocalization } from "@/contexts/LocalizationContext";
import { useState } from "react";
function useStatusNotification() {
    const { localization } = useLocalization();

    const [isLoading, setIsLoading] = useState(null);
    const [error, setError] = useState(null);
    const [isMessage, setIsMessage] = useState(false);
    const [message, setMessage] = useState(null);
    const [notificationStatuses, setNotificationStatuses] = useState([]);
    const [notificationData, setNotificationData] = useState(null);

    const changeStatusNotification = (item) => {
        setNotificationData(item);
    }

    const confirmHandler = async () => {
        setIsMessage(false);
        await getAllNotificationStatuses();
    }

    const getAllNotificationStatuses = async () => {
        setIsLoading('get');
        try {
            const response = await get("statusNotification");
            if (response.status === 200) {
                setNotificationStatuses(response.data);
            }
        } catch (errorData) {
            setIsMessage(true);
            setError(errorData);
        } finally {
            setIsLoading(null);
        }
    }


    const patchStatusNotification = async () => {
        setIsLoading('patch');
        setError(null);

        try {
            const date = new Date().toDateString();
            const response = await put(`statusNotification/${date}/statusCheck`, {
                statusId: notificationData?._id,
            });
            setIsMessage(true);
            if (response.status === 201) {
                setMessage(localization.SETTINGS.NOTIFICATIONSTATUS.submitChanges);
            }
        } catch (errorData) {
            setIsMessage(true);
            setError(errorData);
        } finally {
            setIsLoading(null);
        }
    };
    const getEmployerCheck = async () => {
        setIsLoading('get');
        try {
            const response = await get("statusNotification/getEmployerCheck");
            if (response.status === 200) {
                setNotificationData(response.data.statusCheck);
            }
        } catch (errorData) {
            setIsMessage(true);
            setError(errorData);
        } finally {
            setIsLoading(null);
        }
    }
    return {
        notificationStatuses,
        isLoading,
        error,
        isMessage,
        message,
        confirmHandler,
        setIsMessage,
        changeStatusNotification,
        notificationData,
        patchStatusNotification,
        getEmployerCheck,
        getAllNotificationStatuses
    };
}

export default useStatusNotification;
