import { post, get } from "@/api/apiService";
import { useLocalization } from "@/contexts/LocalizationContext";
import { useEffect, useState } from "react";
function useStatusNotification() {
    const { localization } = useLocalization();

    const [isLoading, setIsLoading] = useState(null);
    const [error, setError] = useState(null);
    const [isMessage, setIsMessage] = useState(false);
    const [message, setMessage] = useState(null);
    const [notificationStatuses, setNotificationStatuses] = useState([]);



    const statusEmployerNotifications = [
        {
            employerId: "Milojkov Id",
            statusNotificationId: 1,
        },
        {
            employerId: "Ljiljanin Id",
            statusNotificationId: 2,
        }
    ];



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
            setIsLoading(false);
        }
    }


    const patchStatusNotification = async (from, to, comment, token) => {
        //ovde mi treba izmena status notification 

        setIsLoading(true);
        setError(null);

        console.log("from, to, comment, token", from, to, comment, token)
        try {
            const response = await post("admin/availabilities", {
                startDate: from,
                endDate: to,
                token,
                description: comment,
            });

            console.log("vresponse", response)
            setIsMessage(true);

            if (response.status === 201) {
                setMessage(localization.SETTINGS.ABSENTHOURS.success);
            }
        } catch (errorData) {
            setIsMessage(true);
            setError(errorData);
        } finally {
            setIsLoading(false);
        }
    };

    const changeStatusNotification = (data) => {
        //menja se status
        // const oldStatus = [...getAllStatus];

        // const result = oldStatus.map((item) => {
        //     if (item.id === data.id) {
        //         return {
        //             ...item,
        //             active: 1
        //         }
        //     } else {
        //         return {
        //             ...item, active: 0
        //         }
        //     }
        // });


        // setGetAllStatus(result);

    }

    useEffect(() => {
        getAllNotificationStatuses();
    }, []);

    return {
        notificationStatuses,
        isLoading,
        error,
        isMessage,
        message,
        setIsMessage,
        changeStatusNotification,
        patchStatusNotification
    };
}

export default useStatusNotification;
