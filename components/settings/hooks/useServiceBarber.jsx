
import { get, patch } from "@/api/apiService";
import { useLocalization } from "@/contexts/LocalizationContext";
import { useEffect, useState } from "react";

function useServiceBarber() {
    const { localization } = useLocalization();

    const [isLoading, setIsLoading] = useState(null);
    const [error, setError] = useState(null);
    const [isMessage, setIsMessage] = useState(false);
    const [message, setMessage] = useState(null);
    const [barberServicesData, setBarberServicesData] = useState([]);
    const [barbers, setBarbers] = useState([]);
    const [selectedBarber, setSelectedBarber] = useState(null);

    const onSelectedBarber = (item) => {
        getBarbersService(item._id);
        setSelectedBarber(item);
    };

    const getBarbersService = async (id) => {
        setIsLoading('getServices');
        setError(null);
        try {
            const response = await get(`employersServices/${id}`);
            if (response.status === 200) {
                setBarberServicesData(response.data.services);
            }
        } catch (errorData) {
            setIsMessage(true);
            setError(errorData);
        } finally {
            setIsLoading(null);
        }
    }

    const getBarbers = async () => {

        setIsLoading('getBarbers');
        setError(null);

        try {
            const response = await get(`employersServices`);
            if (response.status === 200) {
                setBarbers(response.data);
            }

        } catch (errorData) {
            setIsMessage(true);
            setError(errorData);
        } finally {
            setIsLoading(null);
        }
    }

    const toggleService = (item) => {
        const activeBarbers = [...barberServicesData];
        const activeBarberData = activeBarbers.map((barber) => {
            if (barber._id === item._id) {
                return { ...barber, flag: item.flag === 'T' ? "F" : "T" }
            }
            return barber;
        })
        setBarberServicesData(activeBarberData);
    };

    useEffect(() => {
        getBarbers();
    }, []);

    const submitChanges = async () => {
        const { id } = selectedBarber;
        const employers = barberServicesData.map((item) => {
            return {
                id: item._id,
                place: item?.place,
                flag: item?.flag
            }
        })

        setIsLoading('post');
        setError(null);
        try {
            const response = await patch(`employersPlaces/${id}`, { employers });
            if (response.status === 200) {
                setIsMessage(true);
                setMessage(localization.SETTINGS.EMPLOYERSPLACES.success);
            }
        } catch (errorData) {
            setIsMessage(true);
            setError(errorData);
        } finally {
            setIsLoading(null);
        }
    }

    const confirmSubmit = async () => {
        setIsMessage(false);
        await getBarbersService(selectedBarber?.id);
    }

    return {
        getBarbersService,
        isLoading,
        error,
        isMessage,
        message,
        setIsMessage,
        barberServicesData,
        barbers,
        selectedBarber,
        onSelectedBarber,
        toggleService,
        submitChanges,
        confirmSubmit
    };
}

export default useServiceBarber;