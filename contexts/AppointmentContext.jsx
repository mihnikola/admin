// /app/contexts/ReservationContext.tsx
import { router } from "expo-router";
import { createContext, useContext, useState } from "react";
import { useLocalization } from "./LocalizationContext";
import { useAuth } from "./AuthContext";
import { get, post, put } from "@/api/apiService";
import {
  addMinutesToTime,
  convertNameAndDate,
  convertToDayTime,
} from "@/helpers";

import useRequirements from "@/components/home/hooks/useRequirements";

const AppointmentContext = createContext(null);
export const useAppointment = () => {
  return useContext(AppointmentContext);
};
export const AppointmentProvider = ({ children }) => {
  const [reservations, setReservations] = useState([]);

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
  const { isLoading: isLoad, requirements, fetchRequirements } = useRequirements();

  const [isModal, setIsModal] = useState(false);

  const detailsReservation = (item) => {
    router.push({
      pathname: "/(reservation_notification)/",
      params: {
        itemId: item._id,
        past: item?.past,
        rating: item?.rating,
        notification: null,
      },
    });
  };



  const missedReservation = async (id) => {
    setIsLoading(true);
    setError(null);

    if (!id) {
      setIsError(true);
      setError("Reservation ID is missing.");
      return false;
    }
    try {
      const response = await put(`admin/availabilities/${id}/missed`);
      if (response.status === 202) {
        setIsModal(true);
        setMessage(localization.APPOINTMENTS.missedReservation.success);
      }
    } catch (err) {
      setIsError(true);

      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const changeStatusReservation = async (id, status) => {
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
        setMessage(status === "approved" ? localization.APPOINTMENTS.approveReservation.confirmMessage : localization.APPOINTMENTS.rejectReservation.confirmMessage);
      }
    } catch (err) {
      setIsError(true);
      setError(localization.APPOINTMENTS.cancelReservation.errorMessage);
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

    try {
      const response = await get(`admin/availabilities/${reservationId}`);
      const startDateTime = convertToDayTime(response?.startDate);
      const finishedTime = addMinutesToTime(
        convertToDayTime(response?.startDate),
        response?.service?.duration,
      );

      const eventDate = convertNameAndDate(response?.startDate);
      const result = { ...response, startDateTime, finishedTime, eventDate };
      setReservationData(result);
    } catch (err) {
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
        detailsReservation,
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
        fetchRequirements
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
};

export default AppointmentContext;
