import { SharedButton } from "@/shared-components/SharedButton";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import DateAbsentComponent from "./DateAbsentComponent";
import { useLocalization } from "@/contexts/LocalizationContext";
import useAbsentHours from "./hooks/useAbsentHours";
import { useAuth } from "@/contexts/AuthContext";
import { FontAwesome } from "@expo/vector-icons";
import { SharedMessage } from "@/shared-components/SharedMessage";
import TimePickerModal from "./TimePickerModal";
import { router } from "expo-router";
import { SharedLoader } from "@/shared-components/SharedLoader";
import withKeyboardAvoid from "@/wrapper/WrapperKeyboard";
import TimeAbsentComponent from "./TimeAbsentComponent";

const AbsentHourManagement = () => {
  const {
    createAbsentHours,
    setIsMessage,
    isMessage,
    message,
    error,
    setError,
    isLoading,
    getEmployer,
    workHours,
  } = useAbsentHours();
  const [activeTab, setActiveTab] = useState("upcoming"); 

  const [commentDate, setCommentDate] = useState("");
  const [commentTime, setCommentTime] = useState("");
  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);

  const [dateFrom, setDateFrom] = useState(new Date());
  const [showFromDate, setShowFromDate] = useState(false);

  const [dateTo, setDateTo] = useState(new Date());
  const [showToDate, setShowToDate] = useState(false);
  const [fromTime, setFromTime] = useState("");
  const [toTime, setToTime] = useState("");

  const { localization } = useLocalization();
  const { isToken } = useAuth();

  useEffect(() => {
    if (isToken) getEmployer(isToken);
  }, [isToken]);

  useEffect(() => {
    setFromTime(workHours?.start || "");
    setToTime(workHours?.end || "");
  }, [activeTab]);

  useEffect(() => {
    if (dateFrom > dateTo) {
      setDateTo(dateFrom);
    }
  }, [dateFrom]);

  const onDateFromChange = (event, selectedDate) => {
    setShowFromDate(false);

    if (event.type === "set" && selectedDate) {
      setDateFrom(selectedDate);
    }
  };

  const onDateToChange = (event, selectedDate) => {
    setShowToDate(false);

    if (event.type === "set" && selectedDate) {
      setDateTo(selectedDate);
    }
  };

  const isValidDateRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (start.getTime() === end.getTime()) {
      return false;
    }
    if (start > end) {
      return false;
    }
    return true;
  };
  const isValidTimeRange = (startTime, endTime) => {
    const [startH, startM] = startTime.split(":").map(Number);
    const [endH, endM] = endTime.split(":").map(Number);

    const startTotal = startH * 60 + startM;
    const endTotal = endH * 60 + endM;

    if (startTotal >= endTotal) {
      return false;
    }

    return true;
  };
  const submitChanges = () => {
    if (activeTab === "upcoming") {
      if (isValidDateRange(dateFrom, dateTo)) {
        createAbsentHours(dateFrom, dateTo, commentDate, isToken, "upcoming");
      } else {
        setError(localization.SETTINGS.ABSENTHOURS.error);
      }
    } else {
      if (isValidTimeRange(fromTime, toTime)) {
        createAbsentHours(fromTime, toTime, commentTime, isToken, "past");
      } else {
        setError(localization.SETTINGS.ABSENTHOURS.error);
      }
    }
  };

  const confirmHandler = () => {
    setIsMessage(false);
    router.back();
  };
  const cancelErrorHandler = () => {
    setError(null);
  };

  const getTimeFromHandler = (fromTimeData) => {
    setFromTime(fromTimeData);
  };
  const getTimeToHandler = (toTimeData) => {
    setToTime(toTimeData);
  };
  const cancelHandler = () => {
    setIsMessage(false);
  };

  if (isLoading === "get") {
    return <SharedLoader isOpen={isLoading === "get"} />;
  }
  if (!workHours) {
    return (
      <View style={styles.messageContainer}>
        <Text style={styles.noEventsText}>
          {localization.PLACES.workHoursNotFound}
        </Text>
      </View>
    );
  }

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>
          {localization.SETTINGS.ABSENTHOURS.capture}
        </Text>
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === "upcoming" && styles.activeTab]}
            onPress={() => setActiveTab("upcoming")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "upcoming" && styles.activeText,
              ]}
            >
              {localization.SETTINGS.ABSENTHOURS.tab1}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === "past" && styles.activeTab]}
            onPress={() => setActiveTab("past")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "past" && styles.activeText,
              ]}
            >
              {localization.SETTINGS.ABSENTHOURS.tab2}
            </Text>
          </TouchableOpacity>
        </View>

        {activeTab === "upcoming" && (
          <>
            <DateAbsentComponent
              label={localization.SETTINGS.ABSENTHOURS.from}
              onDateChange={onDateFromChange}
              setShowDate={setShowFromDate}
              showDate={showFromDate}
              date={dateFrom}
              placeholder={
                localization.SETTINGS.ABSENTHOURS.startDatePlaceHolder
              }
            />

            <DateAbsentComponent
              label={localization.SETTINGS.ABSENTHOURS.to}
              onDateChange={onDateToChange}
              setShowDate={setShowToDate}
              showDate={showToDate}
              date={dateTo}
              placeholder={localization.SETTINGS.ABSENTHOURS.endDatePlaceHolder}
            />
            <TextInput
              label={localization.SETTINGS.ABSENTHOURS.to}
              style={styles.textInput}
              placeholder={localization.SETTINGS.ABSENTHOURS.comment}
              multiline
              numberOfLines={4}
              value={commentDate}
              onChangeText={setCommentDate}
              textAlignVertical="top"
            />
          </>
        )}

        {activeTab === "past" && (
          <>
            <TimeAbsentComponent
              setShowFromPicker={setShowFromPicker}
              label={localization.SETTINGS.ABSENTHOURS.from}
              time={fromTime}
              placeholder={localization.SETTINGS.WORKHOURS.startTimePlaceHolder}
            />
            <TimeAbsentComponent
              setShowFromPicker={setShowToPicker}
              label={localization.SETTINGS.ABSENTHOURS.to}
              time={toTime}
              placeholder={localization.SETTINGS.WORKHOURS.endTimePlaceHolder}
            />
            <TextInput
              style={styles.textInput}
              placeholder={localization.SETTINGS.ABSENTHOURS.comment}
              multiline
              numberOfLines={4}
              value={commentTime}
              onChangeText={setCommentTime}
              textAlignVertical="top"
            />
          </>
        )}

        <View>
          <SharedButton
            onPress={submitChanges}
            loading={isLoading === "post"}
            text={localization.SETTINGS.ABSENTHOURS.submit}
          />
        </View>

        {isMessage && (
          <SharedMessage
            isOpen={isMessage}
            onClose={!error ? confirmHandler : cancelHandler}
            onConfirm={!error ? confirmHandler : cancelHandler}
            icon={
              <FontAwesome
                name={error ? "close" : "check-circle-o"}
                size={64}
                color="white"
              />
            }
            title={error || message}
            buttonText="OK"
          />
        )}
        {error?.length > 0 && (
          <SharedMessage
            isOpen={error?.length > 0}
            icon={<FontAwesome name="close" size={64} color="white" />}
            onClose={cancelErrorHandler}
            onConfirm={cancelErrorHandler}
            buttonText="Ok"
            title={error}
          />
        )}
      </View>
      <TimePickerModal
        visible={showFromPicker}
        value={workHours?.start}
        startValue={workHours?.start}
        endValue={workHours?.end}
        interval={5}
        setVisible={setShowFromPicker}
        onCancel={() => setShowFromPicker(false)}
        onConfirm={getTimeFromHandler}
        activeTab={activeTab}
      />
      <TimePickerModal
        visible={showToPicker}
        value={workHours?.end}
        startValue={workHours?.start}
        endValue={workHours?.end}
        interval={5}
        setVisible={setShowToPicker}
        onCancel={() => setShowToPicker(false)}
        onConfirm={getTimeToHandler}
        activeTab={activeTab}
      />
    </>
  );
};

const styles = StyleSheet.create({
  submit: {
    flex: 2,
  },
  row: {
    marginBottom: 20,
    justifyContent: "space-between",
    gap: 10,
  },
  noEventsText: {
    fontSize: 16,
    color: "rgb(255, 255, 255)",
    textAlign: "center",
  },
  messageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
    minHeight: 150,
  },
  label: {
    fontSize: 18,
    flex: 1,
    color: "white",
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#747474",
    marginBottom: 15,
  },
  tab: {
    flex: 1,
    padding: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#fff",
  },
  activeTab: {
    backgroundColor: "#000000",
  },
  timeButton: {
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 10,
    backgroundColor: "#000",
    marginBottom: 20,
  },
  timeText: {
    fontSize: 18,
    color: "#ffffffff",
    textAlign: "center",
  },
  tabText: {
    color: "#ffffff",
  },
  activeText: {
    color: "#fff",
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#000",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 30,
    textAlign: "center",
    color: "white",
  },

  textInput: {
    borderWidth: 1,
    borderColor: "#fff",
    color: "white",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    backgroundColor: "#000",
    minHeight: 100,
    marginBottom: 20,
  },
});

export default withKeyboardAvoid(AbsentHourManagement);
