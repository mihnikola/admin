import { getData } from "@/api/apiService";
import { useAppointment } from "@/contexts/AppointmentContext";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";

function useCheckCalendar() {
  const [checkDates, setCheckDates] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(false);
  const { isToken } = useAuth();
  const { getReservations, events } = useAppointment();

  // const [events, setEvents] = useState(null);

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

  const handleDayPress = async (day) => {
    setIsLoading(true);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let cleanedDates = removeSelectedProps(checkDates);
    cleanedDates[day?.dateString] = {
      ...cleanedDates[day?.dateString],
      selected: true,
      selectedColor: "#ffffffff",
    };
    setCheckDates(cleanedDates);
    await getReservations(day?.dateString);
    setIsLoading(false);

  };
  const createMonthObject = (date = new Date()) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const today = date.toLocaleDateString("sv-SE");

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const result = {};

    for (let day = 1; day <= daysInMonth; day++) {
      const key = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

      result[key] = {
        marked: false,
        dotColor: "#000000",
      };

      if (key === today) {

        result[key] = {
          marked: true,
          dotColor: "white",
          selected: true,
          selectedColor: "#fff",
        };
      }
    }

    return result;
  };

  const initialHandleDayPress = (day) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    let cleanedDates = createMonthObject();
    setCheckDates(cleanedDates);
    getReservations(day?.dateString);
  };

  const getDates = async (selectedMonth) => {
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

        const today = new Date();
        const todayStr = today.toLocaleDateString("sv-SE"); // YYYY-MM-DD

        responseData[todayStr] = {
          ...responseData[todayStr],
          selected: true,
          selectedColor: "#fff",
        };

        setCheckDates(responseData);
      }
    } catch (err) {
      console.error("Error fetching tasks:", err);
    } finally {
      setIsLoading(false);
    }
  };
  const nowValue = new Date();

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return { dateString: `${year}-${month}-${day}` };
  };
  useEffect(() => {
    const result = formatDate(nowValue);
    setSelectedDate(true);
    initialHandleDayPress(result);
  }, []);

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
