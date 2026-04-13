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

export default function AbsentHourManagement() {
  const {
    createAbsentHours,
    setIsMessage,
    isMessage,
    message,
    error,
    isLoading,
  } = useAbsentHours();
  const [comment, setComment] = useState("");

  const [dateFrom, setDateFrom] = useState(new Date());
  const [showFromDate, setShowFromDate] = useState(false);
  const [showFromTime, setShowFromTime] = useState(false);
  const [tempFromDate, setTempFromDate] = useState(new Date());

  const [dateTo, setDateTo] = useState(new Date());
  const [showToDate, setShowToDate] = useState(false);
  const [showToTime, setShowToTime] = useState(false);
  const [tempToDate, setTempToDate] = useState(new Date());
  const [finalDateTo, setFinalDateTo] = useState();

  const { localization } = useLocalization();
  const { isToken } = useAuth();

  const onDateFromChange = (event, selectedDate) => {
    if (event.type === "set" && selectedDate) {
      setTempFromDate(selectedDate);
      setShowFromDate(false);
      setShowFromTime(true);
    } else {
      setShowFromDate(false);
    }
  };

  const onTimeFromChange = (event, selectedTime) => {
    if (event.type === "set" && selectedTime) {
      const newDate = new Date(tempFromDate);
      newDate.setHours(selectedTime.getHours());
      newDate.setMinutes(selectedTime.getMinutes());
      setDateFrom(newDate);
    }
    setShowFromTime(false);
  };

  useEffect(() => {
    if (tempFromDate && tempFromDate > tempToDate) {
      setDateTo(tempFromDate);
      setTempToDate(tempFromDate);
    }
  }, [tempFromDate]);

  const onDateToChange = (event, selectedDate) => {
    if (event.type === "set" && selectedDate) {
      setTempToDate(selectedDate);
      setShowToDate(false);
      setShowToTime(true);
    } else {
      setShowToDate(false);
    }
  };

  const onTimeToChange = (event, selectedTime) => {
    console.log("onTimeToChange", tempToDate);
    console.log("selectedTime", selectedTime);
    const combined = new Date(
      Date.UTC(
        tempToDate.getUTCFullYear(),
        tempToDate.getUTCMonth(),
        tempToDate.getUTCDate(),
        selectedTime.getUTCHours(),
        selectedTime.getUTCMinutes(),
        selectedTime.getUTCSeconds(),
      ),
    );
    setFinalDateTo(combined);
    if (event.type === "set" && selectedTime) {
      const newDate = new Date(tempToDate);
      newDate.setHours(selectedTime.getHours());
      newDate.setMinutes(selectedTime.getMinutes());
      setDateTo(newDate);
    }
    setShowToTime(false);
  };

  const submitChanges = () => {
    console.log("dateFrom", dateFrom);
    console.log("dateTo", finalDateTo);
    // createAbsentHours(formatTime(dateFrom), formatTime(dateTo), comment, isToken);
    createAbsentHours(dateFrom, finalDateTo, comment, isToken);
  };

  const resetForm = () => {
    // setComment(null);
    // setDateFrom(new Date());
    // setDateTo(new Date());
  };
  const confirmHandler = () => {
    setIsMessage(false);
    resetForm();
  };

  const cancelHandler = () => {
    setIsMessage(false);
  };
  const [activeTab, setActiveTab] = useState("upcoming"); // "upcoming" | "past"
  return (
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
            style={[styles.tabText, activeTab === "past" && styles.activeText]}
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
            onTimeChange={onTimeFromChange}
            onDateChange={onDateFromChange}
            setShowDate={setShowFromDate}
            showDate={showFromDate}
            showTime={showFromTime}
            date={dateFrom}
            tempDate={tempFromDate}
          />
          <Text style={styles.subTitle}>
            {localization.SETTINGS.ABSENTHOURS.to}
          </Text>
          <DateAbsentComponent
            onTimeChange={onTimeToChange}
            onDateChange={onDateToChange}
            setShowDate={setShowToDate}
            showDate={showToDate}
            showTime={showToTime}
            date={dateTo}
            tempDate={tempFromDate}
          />
        </>
      )}






      

      <TextInput
        style={styles.textInput}
        placeholder={localization.SETTINGS.ABSENTHOURS.comment}
        multiline
        numberOfLines={4}
        value={comment}
        onChangeText={setComment}
        textAlignVertical="top"
      />
      <View style={styles.submit}>
        <SharedButton
          onPress={submitChanges}
          loading={isLoading}
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
  );
}

const styles = StyleSheet.create({
  submit: {
    // flex: 1
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#747474",
    borderRadius: 20,
    marginBottom: 15,
  },
  tab: {
    flex: 1,
    padding: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#fff"
  },
  activeTab: {
    backgroundColor: "#000000",
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
