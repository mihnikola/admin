// /app/contexts/ReservationContext.tsx
import { router } from "expo-router";
import { createContext, useContext, useEffect, useState } from "react";
import { useLocalization } from "./LocalizationContext";
import { useAuth } from "./AuthContext";
import { get, getData, post, put } from "@/api/apiService";
import { addMinutesToTime, convertNameAndDate } from "@/helpers";

import useRequirements from "@/components/home/hooks/useRequirements";
import { convertTimeHandler } from "../helpers";

const AppointmentContext = createContext(null);
export const useAppointment = () => {
  return useContext(AppointmentContext);
};
export const AppointmentProvider = ({ children }) => {
  const [reservations, setReservations] = useState([]);
  
  const [checkDates, setCheckDates] = useState(null);
  // const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(true);

  //  const { isToken } = useAuth();

  // const {
  //   getReservations,
  //   events,
  //   isLoading: isLoadingAppointment,
  // } = useAppointment();

  const convertResult = (response) => {
    const marketDates = {};

    response.forEach((item) => {
      if (item.count > 0) {
        const { year, month, day } = item._id;

        const dateStr = `${year}-${String(month).padStart(2, "0")}-${String(
          day,
        ).padStart(2, "0")}`;

        marketDates[dateStr] = {
          marked: true,
          dotColor: "white",
        };
      }
    });

    return marketDates;
  };

  const removeSelectedProps = (markedDates = {}) => {
    const cleaned = {};

    Object.entries(markedDates).forEach(([date, value]) => {
      const newValue = { ...value };

      delete newValue.selected;
      delete newValue.selectedColor;

      cleaned[date] = newValue;
    });

    return cleaned;
  };

  const handleDayPress = async (day) => {
    setIsLoading(true);

    setCheckDates((prev) => {
      const cleanedDates = removeSelectedProps(prev);

      cleanedDates[day.dateString] = {
        ...cleanedDates[day.dateString],
        selected: true,
        selectedColor: "#ffffff",
      };

      return cleanedDates;
    });

    await getReservations(day.dateString);

    setIsLoading(false);
  };

  const createMonthObject = (date = new Date()) => {
    const year = date.getFullYear();
    const month = date.getMonth();

    const result = {};

    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let day = 1; day <= daysInMonth; day++) {
      const key = `${year}-${String(month + 1).padStart(2, "0")}-${String(
        day,
      ).padStart(2, "0")}`;

      result[key] = {
        marked: false,
        dotColor: "#000000",
      };
    }

    return result;
  };

  const initialHandleDayPress = async (day) => {
    setCheckDates((prev) => {
      const cleaned = removeSelectedProps(prev || createMonthObject());

      cleaned[day.dateString] = {
        ...cleaned[day.dateString],
        selected: true,
        selectedColor: "#ffffff",
      };

      return cleaned;
    });

    await getReservations(day.dateString);
  };

  const getDates = async (selectedMonth, initial) => {
    console.log("selectedMonth",selectedMonth)
    setIsLoading(true);
    setError(null);
    if (!selectedMonth) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await getData("/admin/availabilities/check", {
        monthValue: selectedMonth,
        token: isToken,
      });

      if (response.status === 200) {
        const responseData = convertResult(response.data);

        if (initial) {
          const todayStr = new Date().toLocaleDateString("sv-SE");

          responseData[todayStr] = {
            ...responseData[todayStr],
            selected: true,
            selectedColor: "#ffffff",
          };
        }

        setCheckDates(responseData);
      }
    } catch (err) {
      console.error("Error fetching tasks:", err);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };



  const [isLoading, setIsLoading] = useState(false);
  const [isModalQuestion, setIsModalQuestion] = useState(false);

  const [error, setError] = useState(null);
  const [IsError, setIsError] = useState(false);

  const [responseData, setResponseData] = useState(null);
  const [message, setMessage] = useState(null);

  const [reservationData, setReservationData] = useState(null);
  const [description, setDescription] = useState(null);

  const { isToken, getTokenData } = useAuth();
  const { localization } = useLocalization();
  const [events, setEvents] = useState([]);
  const {
    isLoading: isLoad,
    requirements,
    fetchRequirements,
  } = useRequirements();

  const [isModal, setIsModal] = useState(false);


  const missedReservation = async (id, criteriaDate) => {
    setIsLoading(true);
    setError(null);

    if (!id) {
      setIsError(true);
      setError("Reservation ID is missing.");
      return false;
    }
    try {
      const response = await put(`admin/availabilities/${id}/missed`);
      console.log("admin/availabilities/${id}/missed", response);
      if (response.status === 202) {
        setIsModal(true);
        setMessage(localization.APPOINTMENTS.missedReservation.success);
      }
      await getReservations(criteriaDate);
    } catch (err) {
      console.log("ssssssssssssss", err);
      setIsError(true);

      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const getDateFromString = (val) => {
    return val.split("T")[0];
  };
  const changeStatusReservation = async (id, status, criteriaDate) => {
    setIsLoading(true);
    setError(null);

    if (!id) {
      setIsError(true);
      setError("Reservation ID is missing.");
      return false;
    }
    try {
      const response = await put(`admin/availabilities/${id}`, {
        status,
      });
      if (response.status === 200) {
        setIsModal(true);
        setMessage(
          status === "approved"
            ? localization.APPOINTMENTS.approveReservation.confirmMessage
            : localization.APPOINTMENTS.rejectReservation.confirmMessage,
        );
        const dateValue =
          criteriaDate ?? getDateFromString(response?.data?.startDate);

        await getReservations(dateValue);
      }
    } catch (err) {
      console.error("changeStatusReservation Error fetching tasks:", err);

      setIsError(true);
      setError(localization.APPOINTMENTS.cancelReservation.errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const getReservations = async (criteria) => {
    setIsLoading(true);
    setError(null);
    if (!criteria) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await getData("/admin/availabilities", {
        dateValue: criteria,
        token: isToken,
      });
      setEvents(response);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    } finally {
      setIsLoading(false);
    }
  };
  const fetchReservationDetails = async (reservationId) => {
    setIsLoading(true);
    setError(null);

    if (!reservationId) {
      setIsLoading(false);
      setError(localization.APPOINTMENTS.errorId);
      return;
    }
    const arrivedMap = {
      0: "arrived",
      1: "missed",
    };

    try {
      const response = await get(`/admin/availabilities/${reservationId}`);
      const startDateTime = convertTimeHandler(response?.startDate);
      const finishedTime = addMinutesToTime(
        convertTimeHandler(response?.startDate),
        response?.service?.duration,
      );

      const eventDate = convertNameAndDate(response?.startDate);
      const result = {
        ...response,
        startDateTime,
        finishedTime,
        eventDate,
        arrived: arrivedMap[response.arrived],
      };
      setReservationData(result);
    } catch (err) {
      console.log("fetchReservationDetails+-+-", err);

      setError(localization.APPOINTMENTS.errorFetchId);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AppointmentContext.Provider
      value={{
        isToken,
        isLoading,
        reservations,
        error,
        isModal,
        setIsModal,
        fetchReservationDetails,
        reservationData,
        message,
        setMessage,
        responseData,
        setDescription,
        description,
        setIsLoading,
        setIsModalQuestion,
        isModalQuestion,
        getTokenData,
        setIsError,
        IsError,
        missedReservation,
        changeStatusReservation,
        fetchRequirements,
        events,
        getReservations,

        isLoading,
        setIsLoading,
        error,
        handleDayPress,
        getDates,
        checkDates,
        events,
        selectedDate,
        setSelectedDate,
        setCheckDates,
        initialHandleDayPress
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
};

export default AppointmentContext;
