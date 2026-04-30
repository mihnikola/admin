import { calendarTheme } from "@/helpers";
import useCheckCalendar from "@/hooks/useCheckCalendar";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { CalendarList } from "react-native-calendars";
import EventTimelineList from "../../EventTimeLineList";
import { useLocalization } from "@/contexts/LocalizationContext";

const DateComponent = () => {
  const today = new Date();
  const { localization } = useLocalization();

  const localDateString = today.toLocaleDateString("sv-SE");
  const {
    checkDates,
    getDates,
    handleDayPress,
    setCheckDates,
    isLoading,
    setIsLoading,
    events,
    error,
    selectedDate,
    isLoadingAppointment,
    setSelectedDate,
  } = useCheckCalendar();

  const [selectValueDate, setSelectValueDate] = useState({
    dateString: new Date().toLocaleDateString("en-CA"),
  });
  const [checkMonth, setCheckMonth] = useState(null);
  const [calendarHight, setCalendarHeight] = useState(null);
  const [initialValue, setInitialValue] = useState(true);

  const getWeeksInMonth = (dateString) => {
    const date = new Date(dateString);

    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    const daysInMonth = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0,
    ).getDate();

    return Math.ceil((firstDay + daysInMonth) / 7) * 50 + 50;
  };
  useEffect(() => {
    getDates(checkMonth || localDateString, initialValue);
    setCalendarHeight(getWeeksInMonth(checkMonth));
    setInitialValue(false);
  }, [checkMonth]);

  const onDayPressHandler = (date) => {
    setSelectedDate(true);
    setSelectValueDate(date);
    handleDayPress(date);
  };

  const renderSomeShit = () => {
    if (isLoadingAppointment) {
      return (
        <View style={styles.messageContainer}>
          <ActivityIndicator
            size={40}
            style={{ paddingVertical: 20 }}
            color="white"
          />
        </View>
      );
    }
    if (selectedDate && !isLoadingAppointment) {
      return (
        <View style={styles.timesAndDetails}>
          <EventTimelineList
            events={events}
            error={error}
            criteriaDate={selectValueDate || null}
          />
        </View>
      );
    }
    if (!selectedDate && !isLoadingAppointment) {
      return (
        <View style={styles.messageContainer}>
          <Text style={styles.infoDetails}>
            {localization.EVENTS.noSelected}
          </Text>
        </View>
      );
    }
  };

  if (checkDates) {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="black" barStyle="dark-content" />
        <View style={[styles.calendarContainer, { height: calendarHight }]}>
          <CalendarList
            key="s"
            style={styles.calendar}
            theme={calendarTheme}
            onVisibleMonthsChange={(months) => {
              setIsLoading(true);
              setSelectedDate(null);
              setCheckMonth(months[0]?.dateString);
              setCheckDates((prev) => {
                const updated = {};

                Object.keys(prev).forEach((date) => {
                  updated[date] = {
                    ...prev[date],
                    selected: false,
                  };
                });

                return updated;
              });
            }}
            current={localDateString}
            minDate={localDateString}
            horizontal
            pagingEnabled
            markedDates={checkDates}
            dayComponent={({ date, state }) => {
              const dateStr = date?.dateString;
              const isPast =
                new Date(dateStr) < new Date().setHours(0, 0, 0, 0);
              const isSelected = checkDates?.[dateStr]?.selected;

              return (
                <TouchableOpacity onPress={() => onDayPressHandler(date)}>
                  <View
                    style={{
                      borderRadius: 20,
                      backgroundColor: isSelected ? "#b6cdd7ff" : "transparent",
                    }}
                  >
                    <Text
                      style={{
                        color: isPast
                          ? "#999"
                          : isSelected
                            ? "#fff"
                            : "#dfdfdfff",
                        textAlign: "center",
                        fontWeight: "500",
                        paddingHorizontal: 8,
                      }}
                    >
                      {date.day}
                    </Text>
                    {checkDates?.[dateStr]?.marked && (
                      <View
                        style={{
                          width: 5,
                          height: 5,
                          borderRadius: 2.5,
                          backgroundColor: isPast ? "#999" : "white",
                          alignSelf: "center",
                          marginTop: 2,
                        }}
                      />
                    )}
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
        {renderSomeShit()}
      </View>
    );
  }
};

const styles = StyleSheet.create({
  messageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    minHeight: 150, // Give some minimum height for consistency
  },
  notWorkingDays: {
    display: "flex",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
  },
  infoDetails: {
    fontSize: 22,
    color: "rgb(172, 164, 164)",
    textAlign: "center",
  },
  notWorkingDaysContent: {
    fontSize: 20,
    color: "white",
    padding: 20,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  calendarContainer: {
    backgroundColor: "black",
  },
  calendar: {
    borderWidth: 1,
    borderColor: "gray",
    display: "flex",
    width: "100%",
    backgroundColor: "black",
  },
  timesAndDetails: {
    flex: 1,
  },
  buttonContainer: {
    marginTop: 5,
  },
});

export default DateComponent;
