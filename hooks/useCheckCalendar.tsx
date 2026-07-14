import { getData } from "@/api/apiService";
import { useAppointment } from "@/contexts/AppointmentContext";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";

function useCheckCalendar() {
  const [checkDates, setCheckDates] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(true);

  const { isToken } = useAuth();

  const {
    getReservations,
    events,
    isLoading: isLoadingAppointment,
  } = useAppointment();

  const convertResult = (response) => {
    const marketDates = {};

    response.forEach((item) => {
      if (item.count > 0) {
        const { year, month, day } = item._id;

        const dateStr = `${year}-${String(month).padStart(2, "0")}-${String(
          day
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
        day
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

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return {
      dateString: `${year}-${month}-${day}`,
    };
  };

  useEffect(() => {
    const today = formatDate(new Date());

    setSelectedDate(true);
    initialHandleDayPress(today);
  }, []);

  return {
    isLoading,
    setIsLoading,
    isLoadingAppointment,
    error,
    handleDayPress,
    getDates,
    checkDates,
    events,
    selectedDate,
    setSelectedDate,
    setCheckDates,
  };
}

export default useCheckCalendar;