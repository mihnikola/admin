// /app/contexts/ReservationContext.tsx
import { createContext, useContext, useState } from "react";
import { useLocalization } from "./LocalizationContext";
import { get } from "@/api/apiService";

const HomeDataContext = createContext(null);
export const useHomeData = () => {
  return useContext(HomeDataContext);
};
export const HomeDataProvider = ({ children }) => {
  const { localization } = useLocalization();

  const [upcomingData, setUpcomingData] = useState(null);
  const [inProgressData, setInProgressData] = useState(null);
  const [requirements, setRequirements] = useState([]);
  const [requirementsLength, setRequirementLength] = useState(0);
  const [isLoading, setIsLoading] = useState(null);
  const [error, setError] = useState(null);

  const fetchHomeInfo = async () => {
    setIsLoading("getHomeInfo");
    setError(null);

    
    const id = new Date();
    try {
      const response = await get(`admin/availabilities/${id}/getHomeInfo`); //fetchInProgressOne
      if (response.status === 200) {
        const { currentReservation, nextReservation, pendingReservations } =
          response.data;

        setUpcomingData(nextReservation);
        setInProgressData(currentReservation);
        setRequirementLength(pendingReservations.amount);
        setRequirements(pendingReservations.data);
      }
    } catch (err) {
      setError(localization.PLACES.error);
    } finally {
      setIsLoading(null);
    }
  };

  return (
    <HomeDataContext.Provider
      value={{
        upcomingData,
        inProgressData,
        requirementsLength,
        requirements,
        isLoading,
        error,
        fetchHomeInfo,
      }}
    >
      {children}
    </HomeDataContext.Provider>
  );
};

export default HomeDataContext;
