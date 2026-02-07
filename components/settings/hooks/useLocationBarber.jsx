
import { get, patch } from "@/api/apiService";
import { useLocalization } from "@/contexts/LocalizationContext";
import { router } from "expo-router";
import { useEffect, useState } from "react";
function useLocationBarber() {
    const { localization } = useLocalization();

    const [isLoading, setIsLoading] = useState(null);
    const [error, setError] = useState(null);
    const [isMessage, setIsMessage] = useState(false);
    const [message, setMessage] = useState(null);
    const [locationBarbersData, setLocationBarbersData] = useState([]);
    const [locations, setLocations] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState(null);

    const onSelectedLocation = (item) => {
        console.log("onSelectedLocation item", item);
        // getLocationBarbers(item.id);
        setSelectedLocation(item);
        router.push({ pathname: "/(tabs)/(03_settings)/barbersLocations", params: { id: item.id, address: item.address } })
    };

    const getLocationBarbers = async (id) => {
        setIsLoading('getBarbers');
        setError(null);
        try {
            const response = await get(`admin/places/${id}/employers`);
            if (response.status === 200) {
                setLocationBarbersData(response.data);
            }
        } catch (errorData) {
            setIsMessage(true);
            setError(errorData);
        } finally {
            setIsLoading(null);
        }
    }

    const getLocations = async () => {

        setIsLoading('getLocations');
        setError(null);

        try {
            const response = await get(`admin/places`);

            if (response.status === 200) {
                setLocations(response.data);
            }

        } catch (errorData) {
            setIsMessage(true);
            setError(errorData);
        } finally {
            setIsLoading(null);
        }
    }

    const toggleBarber = (item) => {
        const activeBarbers = [...locationBarbersData];
        const activeBarberData = activeBarbers.map((barber) => {
            if (barber._id === item._id) {
                return { ...barber, flag: item.flag === 'T' ? "F" : "T" }
            }
            return barber;
        })
        setLocationBarbersData(activeBarberData);
    };

    useEffect(() => {
        getLocations();
    }, []);

    const submitChanges = async () => {
        const { id } = selectedLocation;
        const employers = locationBarbersData.map((item) => {
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
        await getLocationBarbers(selectedLocation?.id);
    }

    return {
        getLocationBarbers,
        isLoading,
        error,
        isMessage,
        message,
        setIsMessage,
        locationBarbersData,
        locations,
        selectedLocation,
        onSelectedLocation,
        toggleBarber,
        submitChanges,
        confirmSubmit
    };
}

export default useLocationBarber;