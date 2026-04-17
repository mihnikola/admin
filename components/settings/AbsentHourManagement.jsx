import { SharedButton } from "@/shared-components/SharedButton";
import React, { useEffect, useState } from "react";
import {
  Platform,
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

export default function AbsentHourManagement() {
  const {
    createAbsentHours,
    setIsMessage,
    isMessage,
    message,
    error,
    isLoading,
    getEmployer,
    workHours
  } = useAbsentHours();
  const [activeTab, setActiveTab] = useState("upcoming"); // "upcoming" | "past"

  const [commentDate, setCommentDate] = useState("");
  const [commentTime, setCommentTime] = useState("");
  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);

  const [dateFrom, setDateFrom] = useState(new Date());
  const [showFromDate, setShowFromDate] = useState(false);
  const [tempFromDate, setTempFromDate] = useState(new Date());

  const [dateTo, setDateTo] = useState(new Date());
  const [showToDate, setShowToDate] = useState(false);
  const [tempToDate, setTempToDate] = useState(new Date());
  const [fromTime, setFromTime] = useState("");
  const [toTime, setToTime] = useState("");


  const { localization } = useLocalization();
  const { isToken } = useAuth();

  useEffect(() => {
    if (isToken)
      getEmployer(isToken);

  }, [isToken]);

  useEffect(() => {
    setFromTime(workHours?.start || "");
    setToTime(workHours?.end || "");
  }, [activeTab]);

  const onDateFromChange = (event, selectedDate) => {
    if (event.type === "set" && selectedDate) {
      setDateFrom(selectedDate);
      setShowFromDate(false);
    }
  };

  useEffect(() => {
    if (tempFromDate && tempFromDate > tempToDate) {
      setDateTo(tempFromDate);
      setTempToDate(tempFromDate);
    }
  }, [tempFromDate]);

  const onDateToChange = (event, selectedDate) => {
    if (event.type === "set" && selectedDate) {
      setDateTo(selectedDate);
      setShowToDate(false);
    }
  };

  const submitChanges = () => {

    if (activeTab === "upcoming") {
      createAbsentHours(dateFrom, dateTo, commentDate, isToken, "upcoming");
    } else {
      createAbsentHours(fromTime, toTime, commentTime, isToken, "past");
    }
  };


  const confirmHandler = () => {
    setIsMessage(false);
    router.back();

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

  if (isLoading === 'get') {
    return <SharedLoader isOpen={isLoading === 'get'} />
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
              Odmor / Bolovanje
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
              Hitni slucajevi
            </Text>
          </TouchableOpacity>
        </View>

        {activeTab === "upcoming" && (
          <>
            <Text style={styles.subTitle}>
              {localization.SETTINGS.ABSENTHOURS.from}
            </Text>
            <DateAbsentComponent
              onDateChange={onDateFromChange}
              setShowDate={setShowFromDate}
              showDate={showFromDate}
              date={dateFrom}
            />

            <Text style={styles.subTitle}>
              {localization.SETTINGS.ABSENTHOURS.to}
            </Text>
            <DateAbsentComponent
              onDateChange={onDateToChange}
              setShowDate={setShowToDate}
              showDate={showToDate}
              date={dateTo}
            />
            <TextInput
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
            <View style={styles.row}>
              <Text style={styles.subTitle}>
                {localization.SETTINGS.ABSENTHOURS.from}
              </Text>
              <TouchableOpacity
                onPress={() => setShowFromPicker(true)}
                style={styles.timeButton}
              >
                {fromTime && <Text style={styles.timeText}>{fromTime}</Text>}
                {!fromTime && (
                  <Text style={styles.timeText}>
                    {localization.SETTINGS.WORKHOURS.startTimePlaceHolder}
                  </Text>
                )}
              </TouchableOpacity>
            </View>
            <View style={styles.row}>
              <Text style={styles.subTitle}>
                {localization.SETTINGS.ABSENTHOURS.to}
              </Text>
              <TouchableOpacity
                onPress={() => setShowToPicker(true)}
                style={styles.timeButton}
              >
                {toTime && <Text style={styles.timeText}>{toTime}</Text>}
                {!toTime && (
                  <Text style={styles.timeText}>
                    {localization.SETTINGS.WORKHOURS.endTimePlaceHolder}
                  </Text>
                )}
              </TouchableOpacity>
              <TextInput
                style={styles.textInput}
                placeholder={localization.SETTINGS.ABSENTHOURS.comment}
                multiline
                numberOfLines={4}
                value={commentTime}
                onChangeText={setCommentTime}
                textAlignVertical="top"
              />
            </View>
          </>
        )}

        <View style={styles.submit}>
          <SharedButton
            onPress={submitChanges}
            loading={isLoading === 'post'}
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
      </View>
      <TimePickerModal
        visible={showFromPicker}
        startValue={fromTime}
        endValue={toTime}
        interval={5}
        setVisible={setShowFromPicker}
        onCancel={() => setShowFromPicker(false)}
        onConfirm={getTimeFromHandler}
      />
      <TimePickerModal
        visible={showToPicker}
        startValue={fromTime}
        endValue={toTime}
        interval={5}
        setVisible={setShowToPicker}
        onCancel={() => setShowToPicker(false)}
        onConfirm={getTimeToHandler}
      />
    </>
  );
}

const styles = StyleSheet.create({
  submit: {
    // flex: 1
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
    padding: 20,
    paddingBottom: 40,
    backgroundColor: "#000",
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 30,
    textAlign: "center",
    color: "white",
  },
  subTitle: {
    fontSize: 18,
    fontWeight: "400",
    marginBottom: 10,
    color: "white",
  },
  dateButton: {
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 10,
    backgroundColor: "#000",
    marginBottom: 20,
  },
  dateText: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
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
