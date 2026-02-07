import { get } from "@/api/apiService";
import { useLocalization } from "@/contexts/LocalizationContext";
import { useState } from "react";


const useGetClient = () => {
    const { localization } = useLocalization();

    const [userData, setUserData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const getClient = async (clientId) => {
        console.log("clientId", clientId)
        setError(null);
        try {
            const response = await get(`/admin/users/${clientId}`);

            console.log("response", response)
            if (response.status === 200) {
                setIsLoading(false);
                setUserData(response.data);
            }
        } catch (err) {
            setError(localization.PLACES.error);
            setIsLoading(false);
        }
    };


    return { getClient, userData, error, isLoading };
};

export default useGetClient;
