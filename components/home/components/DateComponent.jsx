import { calendarTheme } from "@/helpers";
import useCheckCalendar from "@/hooks/useCheckCalendar";
import React, { useEffect, useState } from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { CalendarList } from "react-native-calendars";
import EventTimelineList from "../../EventTimeLineList";
import Loader from "@/shared-components/Loader";
import { SharedLoader } from "@/shared-components/SharedLoader";

const DateComponent = () => {
  const today = new Date();
  const localDateString = today.toLocaleDateString("sv-SE");
  const {
    checkDates,
    getDates,
    handleDayPress,
    isLoading,
    events,
    error,
    selectedDate,
    setSelectedDate,
  } = useCheckCalendar();
  const [checkMonth, setCheckMonth] = useState();

  useEffect(() => {
    getDates(checkMonth || localDateString);
  }, [checkMonth]);

  const onDayPressHandler = (date) => {
    setSelectedDate(true);
    handleDayPress(date);
  };

  if (checkDates) {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="black" barStyle="dark-content" />
        <View style={styles.calendarContainer}>
      
            <CalendarList
              key="s"
              calendarHeight={200}
              style={styles.calendar}
              theme={calendarTheme}
              onVisibleMonthsChange={(months) => {
                console.log("xxxxxxxxxxx",months[0]?.dateString);
                setSelectedDate(false);
                setCheckMonth(months[0]?.dateString);
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
                        padding: 6,
                        borderRadius: 20,
                        backgroundColor: isSelected
                          ? "#b6cdd7ff"
                          : "transparent",
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
        
        <View style={styles.timesAndDetails}>
          <EventTimelineList
            events={selectedDate ? events : []}
            isLoading={isLoading}
            error={error}
          />
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  notWorkingDays: {
    display: "flex",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
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
    height: 320,
    overflow: "hidden",
  },
  calendar: {
    paddingTop: 0,
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
