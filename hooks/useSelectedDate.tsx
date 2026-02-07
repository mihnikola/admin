import { useState } from "react";

const useSelectedDate = (initialDate, checkDates) => {
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [isSunday, setIsSunday] = useState(false);
  const [selectedDates, setSelectedDates] = useState();

  const handleDayPress = (day) => {
    const { dateString } = day;

    setSelectedDate(dateString || day);
    getMarkedDatesForSundays(dateString || day);

    const isSun = new Date(dateString || day).getDay() === 0;

    if (isSun) {
      setIsSunday(true);
    } else {
      setIsSunday(false);
    }
  };

  const getMarkedDatesForSundays = (selectedDateString) => {
    const markedDates = {...checkDates};
    markedDates[selectedDateString] = {
      selected: true,
      selectedColor: "#b6cdd7ff",
    };

    console.log("selected",markedDates)
    setSelectedDates(markedDates);
  };

  return {
    selectedDate,
    handleDayPress,
    isSunday,
    selectedDates,
  };
};

export default useSelectedDate;
