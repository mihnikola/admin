import { getData } from "@/api/apiService";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";

function useCheckCalendar() {
  const [checkDates, setCheckDates] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(false);
  const { isToken } = useAuth();

  const [events, setEvents] = useState(null);

  const convertResult = (response) => {
    const marketDates = {};
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    response.forEach((item) => {
      if (item.count > 0) {
        const { year, month, day } = item._id;
        const dateStr = `${year}-${String(month).padStart(2, "0")}-${String(
          day,
        ).padStart(2, "0")}`;
        const currentDate = new Date(dateStr);
        const isPast = currentDate < today;

        marketDates[dateStr] = {
          marked: true,
          dotColor: isPast ? "#999999" : "white", // Siva tačka ako je prošlo
        };
      }
    });
    return marketDates;
  };
  function removeSelectedProps(markedDates) {
    const cleaned = {};

    Object.entries(markedDates).forEach(([date, value]) => {
      const newValue = { ...value };
      delete newValue.selected;
      delete newValue.selectedColor;
      cleaned[date] = newValue;
    });

    return cleaned;
  }
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
      setIsLoading(false);
      setEvents(response);
    } catch (err) {
      console.error("Error fetching tasks:", err);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };
  const handleDayPress = (day) => {
    const clickedDate = new Date(day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const isPast = clickedDate < today;
    if (isPast) {
      console.log("Kliknut prošli dan:", day);
    } else {
      console.log("Kliknut budući/današnji dan:", day?.dateString);
    }
    const cleanedDates = removeSelectedProps(checkDates);
    cleanedDates[day?.dateString] = {
      ...cleanedDates[day?.dateString],
      selected: true,
      selectedColor: "#ffffffff",
    };
    setCheckDates(cleanedDates);
    getReservations(day?.dateString);
  };

  const getDates = async (selectedMonth: any) => {
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
        setCheckDates(responseData);
      }
    } catch (err) {
      console.error("Error fetching tasks:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    handleDayPress,
    getDates,
    checkDates,
    events,
    selectedDate,
    setSelectedDate,
  };
}

export default useCheckCalendar;
