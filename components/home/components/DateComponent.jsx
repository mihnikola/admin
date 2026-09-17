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
import SharedBackButton from "@/shared-components/SharedBackButton";
import { router } from "expo-router";
import { calendarLocales } from "@/helpers/calendarLocales";
import { ColorsBarber } from "@/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";

const DateComponent = () => {
  const today = new Date();
  const { localization } = useLocalization();

  const localDateString = today.toLocaleDateString("sv-SE");
  const {
    checkDates,
    getDates,
    handleDayPress,
    setCheckDates,
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

    const year = date.getFullYear();
    const month = date.getMonth();

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    return Math.ceil((firstDay + daysInMonth) / 7);
    // return 6.2;
  };

  const getCalendarHeight = (dateString) => {
    const weeks = getWeeksInMonth(dateString);
    // return weeks * 50 + 20;
    return weeks * 60 + 25; // Povećano sa 50 na 60 po nedelji, i osnovni offset na 90
  };
  useEffect(() => {
    getDates(checkMonth || localDateString, initialValue);
    setCalendarHeight(getCalendarHeight(checkMonth || localDateString));

    // setCalendarHeight(getWeeksInMonth(checkMonth));
    setInitialValue(false);
  }, [checkMonth]);

  useEffect(() => {
    calendarLocales(localization.code);
  }, [localization.code]);

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
            color={ColorsBarber.light.textColor}
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

  const formatDate = (date = new Date()) =>
    `${String(date.getDate()).padStart(2, "0")}-${String(
      date.getMonth() + 1,
    ).padStart(2, "0")}-${date.getFullYear()}`;

  const validateDate = () => {
    if (
      formatDate(new Date()) <=
      formatDate(new Date(selectValueDate?.dateString))
    )
      return true;
    else return false;
  };

  const addReservation = () => {
    router.push({
      pathname: "/(add_reservation)/",
      params: { date: selectValueDate?.dateString },
    });
  };

  if (checkDates) {
    return (
      <View style={styles.container}>
        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            paddingHorizontal: 20,
            paddingTop: 10,
            alignItems: "center",
          }}
        >
          <View>
            <SharedBackButton onPress={router.back} absolutePosition={false} />
          </View>
          {validateDate() && (
            <TouchableOpacity
              onPress={addReservation}
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              <Text style={{ paddingRight: 10 }}>
                {localization.ADDRESERVATION.add}
              </Text>

              <FontAwesome
                name="plus-circle"
                size={32}
                color={ColorsBarber.light.textColor}
              />
            </TouchableOpacity>
          )}
        </View>
        <StatusBar backgroundColor="black" barStyle="dark-content" />
        <View style={[styles.calendarContainer, { height: calendarHight }]}>
          <CalendarList
            key={localization.code}
            locale={localization.code}
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
                <TouchableOpacity
                  onPress={() => onDayPressHandler(date)}
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: 17,
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: isSelected
                        ? ColorsBarber.light.textColor
                        : "transparent",
                    }}
                  >
                    <Text
                      style={{
                        color: isPast
                          ? ColorsBarber.light.inActiveTextColor
                          : isSelected
                            ? "#fff"
                            : ColorsBarber.light.textColor,
                        textAlign: "center",
                        fontWeight: "500",
                      }}
                    >
                      {date.day}
                    </Text>

                    <View
                      style={{
                        width: 5,
                        height: 5,
                        borderRadius: 2.5,
                        backgroundColor: checkDates?.[dateStr]?.marked
                          ? isSelected
                            ? "#fff"
                            : ColorsBarber.light.textColor
                          : "transparent",
                        marginTop: 2,
                      }}
                    />
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
    minHeight: 150,
  },
  notWorkingDays: {
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
  },
  infoDetails: {
    fontSize: 22,
    color: ColorsBarber.light.textColor,
    fontFamily: "OldStandard-Bold",
    textAlign: "center",
  },
  notWorkingDaysContent: {
    fontSize: 20,
    color: ColorsBarber.light.textColor,
    padding: 20,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  container: {
    paddingTop: 30,
    flex: 1,
    backgroundColor: ColorsBarber.light.background,
  },
  calendarContainer: {
    backgroundColor: ColorsBarber.light.background,
  },
  calendar: {
    width: "100%",
    backgroundColor: ColorsBarber.light.background,
    marginTop: 7,
  },
  timesAndDetails: {
    flex: 1,
  },
  buttonContainer: {
    marginTop: 5,
  },
});

export default DateComponent;
