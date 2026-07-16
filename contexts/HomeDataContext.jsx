// /app/contexts/ReservationContext.tsx
import { createContext, useContext, useState } from "react";
import { useLocalization } from "./LocalizationContext";
import { get } from "@/api/apiService";
import { convertTimeHandler } from "../helpers";

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
  const [absenceData, setAbsenceData] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [error, setError] = useState(null);

  const ARRIVED_STATUS_MAP = {
    0: "arrived",
    1: "missed",
  };

  const formatReservation = (res) => {
    if (!res) return null;
    return {
      ...res,

      arrived: ARRIVED_STATUS_MAP[res.arrived] ?? "unknown", // 'unknown' kao fallback
    };
  };
  const fetchHomeInfo = async () => {
    setIsLoading("getHomeInfo");
    setError(null);

    const id = new Date();
    try {
      const response = await get(`/admin/availabilities/${id}/getHomeInfo`); //fetchInProgressOne

      if (response?.status === 200) {
        const {
          currentReservation,
          nextReservation,
          pendingReservations,
          absenceItemsData,
        } = response.data;


        setRequirementLength(pendingReservations?.amount ?? 0);
        setRequirements(pendingReservations?.data ?? []);
        setAbsenceData(absenceItemsData);

        setUpcomingData(formatReservation(nextReservation));
        setInProgressData(formatReservation(currentReservation));
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
        absenceData
      }}
    >
      {children}
    </HomeDataContext.Provider>
  );
};

export default HomeDataContext;
