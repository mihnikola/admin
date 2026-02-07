import { get } from "@/api/apiService";
import { useLocalization } from "@/contexts/LocalizationContext";
import ReservationContext from "@/contexts/ReservationContext";
import { useContext, useEffect, useState } from "react";


const useFetchPlaces = () => {
  const { reservation, updateReservation } = useContext(ReservationContext);
  const { localization } = useLocalization();

  const [locationsData, setLocationsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchLocations = async () => {
    setError(null);
    try {
      const response = await get("/places");
      if (response.status === 200) {
        setIsLoading(false);
        const { data } = response;
        if (data?.length > 1) {
          setLocationsData(data);
        } else {
          updateReservation({ ...reservation, location: data });
        }
      }
    } catch (err) {
      setError(localization.PLACES.error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchLocations();
  }, []);

  return { locationsData, isLoading, error, fetchLocations };
};

export default useFetchPlaces;
