import { SharedButton } from "@/shared-components/SharedButton";
import { SharedLoader } from "@/shared-components/SharedLoader";
import { SharedMessage } from "@/shared-components/SharedMessage";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useEffect, useState } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CustomDropDownPicker from "./CustomDropDownPicker";
import useGetWorhHours from "./hooks/useGetWorkHours";
import { FontAwesome } from "@expo/vector-icons";
import { useLocalization } from "@/contexts/LocalizationContext";

export default function TimeSettingsScreen({ minutes, workHours, active, id, submitEverything }) {

  const { localization } = useLocalization();
  const {
    getTimes,
    startWorkTime,
    endWorkTime,
    isLoading,
    error,
    minutesValue,
    message,
    isMessage,
    createWorkTimeAndSlots,
    setIsMessage,
    options,
    initialData,
  } = useGetWorhHours();

  const [selected, setSelected] = useState(10);
  const [isError, setIsError] = useState(false);
  const [isRemove, setIsRemove] = useState(false);
  const [isUndo, setIsUndo] = useState(false);

  useEffect(() => {
    getTimes();
  }, []);

  useEffect(() => {
    if (minutesValue || minutes) {
      setSelected(minutes || minutesValue);
    }
  }, [minutesValue,minutes]);

  useEffect(() => {
    if (startWorkTime) {
      const [h, s] = startWorkTime.split(":").map(Number);
      setFromTime(new Date(0, 0, 0, h, s));
    }
  }, [startWorkTime]);

  useEffect(() => {
    if (endWorkTime) {
      const [h, s] = endWorkTime.split(":").map(Number);
      setToTime(new Date(0, 0, 0, h, s));
    }
  }, [endWorkTime]);

  useEffect(() => {
    if (minutesValue) {
      setSelected(minutesValue);
    }
  }, [minutesValue]);

  const now = new Date();

  const removeCancelHandler = () => {
    setIsRemove(false);
  };
  const removeHandler = () => {
    setIsRemove(true);
  };
  const removeConfirmHandler = async (id) => {
    setIsRemove(false);
    await deactivateLocation(id);
  };

  const undoHandler = () => {
    setIsUndo(true);
  };
  const undoCancelHandler = () => {
    setIsUndo(false);
  };
  const undoConfirmlHandler = async (id) => {
    setIsUndo(false);
    await activateLocation(id);
  };

  const finishedDate = (data) => {
    const now = new Date();

    let hour = 17;
    let min = 0;

    if (data) {
      const [h, m] = data.split(":");
      hour = parseInt(h, 10);
      min = parseInt(m, 10);
    }

    return new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      hour,
      min,
      0
    );
  };

    const startDate = (data) => {
    const now = new Date();

    let hour = 9;
    let min = 0;

    if (data) {
      const [h, m] = data.split(":");
      hour = parseInt(h, 10);
      min = parseInt(m, 10);
    }

    return new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      hour,
      min,
      0
    );
  };


  const [toTime, setToTime] = useState(finishedDate(workHours?.end));
  const [fromTime, setFromTime] = useState(startDate(workHours?.start));

  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);

  const onChangeFrom = (event, selectedDate) => {
    setShowFromPicker(Platform.OS === "ios");
    if (selectedDate) setFromTime(selectedDate);
  };

  const onChangeTo = (event, selectedDate) => {
    setShowToPicker(Platform.OS === "ios");
    if (selectedDate) setToTime(selectedDate);
  };

  // Formatiraj vreme u HH:mm
  const formatTime = (date) => {
    const h = date?.getHours().toString().padStart(2, "0");
    const m = date?.getMinutes().toString().padStart(2, "0");
    return `${h}:${m}`;
  };

  console.log("toTime", workHours)

  if (isLoading) {
    return <SharedLoader isOpen={isLoading} />;
  }

  const submitHandler = () => {
    if (
      formatTime(fromTime) === startWorkTime &&
      formatTime(toTime) === endWorkTime &&
      minutesValue === selected
    ) {
      setIsError(true);
      return;
    }
    // createWorkTimeAndSlots(formatTime(fromTime), formatTime(toTime), selected);
    const data = {
      open: formatTime(fromTime),
      close: formatTime(toTime),
      minutes: selected,
    };
    submitEverything(data);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{localization.SETTINGS.WORKHOURS.capture}</Text>
      <View style={styles.containerData}>
        <View style={styles.row}>
          <FontAwesome name="clock-o" size={24} color="grey" />

          <Text style={styles.label}>
            {localization.SETTINGS.WORKHOURS.from}
          </Text>
          <TouchableOpacity
            onPress={() => setShowFromPicker(true)}
            style={styles.timeButton}
          >
            {fromTime && (
              <Text style={styles.timeText}>{formatTime(fromTime)}</Text>
            )}
            {!fromTime && (
              <Text style={styles.timeText}>
                {localization.SETTINGS.WORKHOURS.startTimePlaceHolder}
              </Text>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <FontAwesome name="clock-o" size={24} color="grey" />
          <Text style={styles.label}>{localization.SETTINGS.WORKHOURS.to}</Text>
          <TouchableOpacity
            onPress={() => setShowToPicker(true)}
            style={styles.timeButton}
          >
            {toTime && (
              <Text style={styles.timeText}>{formatTime(toTime)}</Text>
            )}
            {!toTime && (
              <Text style={styles.timeText}>
                {localization.SETTINGS.WORKHOURS.endTimePlaceHolder}
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
      {showFromPicker && (
        <DateTimePicker
          value={fromTime || new Date()}
          mode="time"
          is24Hour={true}
          display="spinner"
          onChange={onChangeFrom}
        />
      )}

      {showToPicker && (
        <DateTimePicker
          value={toTime || new Date()}
          mode="time"
          is24Hour={true}
          display="spinner"
          onChange={onChangeTo}
        />
      )}
      {!id && <Text style={styles.subtitle}>{localization.SETTINGS.WORKHOURS.subCapture}</Text>}

      <CustomDropDownPicker
        options={options}
        selectedValue={selected}
        onValueChange={setSelected}
        placeholder={selected || localization.SETTINGS.WORKHOURS.gap}
      />
      <View style={{ flex: !id ? 1 : 2 }}>
        <SharedButton
          onPress={submitHandler}
          text={localization.SETTINGS.WORKHOURS.submit}
        />
        {id && active === 1 && (
          <TouchableOpacity style={styles.buttonRmv} onPress={removeHandler}>
            {isLoading === "remove" && (
              <ActivityIndicator size={20} color="#fff" />
            )}
            {isLoading !== "remove" && (
              <Text style={styles.buttonText}>
                {localization.PLACES.removeBtn}
              </Text>
            )}
          </TouchableOpacity>
        )}
        {id && active === 0 && (
          <TouchableOpacity style={styles.buttonUndo} onPress={undoHandler}>
            {isLoading === "activate" && (
              <ActivityIndicator size={20} color="#fff" />
            )}
            {isLoading !== "activate" && (
              <Text style={styles.buttonText}>{localization.PLACES.undo}</Text>
            )}
          </TouchableOpacity>
        )}
      </View>




      {isRemove && (
        <SharedQuestion
          isOpen={isRemove}
          onClose={removeCancelHandler}
          onLogOut={() => removeConfirmHandler(id)}
          icon={
            <FontAwesome name="question-circle-o" size={64} color="white" />
          }
          title={localization.PLACES.question}
          buttonTextYes={localization.PLACES.confirmButton}
          buttonTextNo={localization.PLACES.cancel}
        />
      )}
      {isUndo && (
        <SharedQuestion
          isOpen={isUndo}
          onClose={undoCancelHandler}
          onLogOut={() => undoConfirmlHandler(id)}
          icon={
            <FontAwesome name="question-circle-o" size={64} color="white" />
          }
          title={localization.PLACES.questionActivate}
          buttonTextYes={localization.PLACES.undo}
          buttonTextNo={localization.PLACES.cancel}
        />
      )}
      {isMessage && (
        <SharedMessage
          isOpen={isMessage}
          onConfirm={() => setIsMessage(false)}
          icon={
            <FontAwesome
              name={error ? "close" : "check-circle-o"}
              size={64}
              color="white"
            />
          }
          title={message}
          buttonText="Ok"
        />
      )}
      {isError && (
        <SharedMessage
          isOpen={isError}
          onConfirm={() => setIsError(false)}
          icon={
            <FontAwesome name={isError && "close"} size={64} color="white" />
          }
          title={message}
          buttonText="Ok"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  containerData: {
    flex: 1,
  },
  container: {
    flex: 2,
    backgroundColor: "#000",
    marginHorizontal: 10

  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 10,
    textAlign: "center",
    color: "#fff",
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "400",
    textAlign: "center",
    color: "#919191",

  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    gap: 10
  },
  label: {
    fontSize: 18,
    flex: 1,
    color: "white",
  },
  timeButton: {
    borderWidth: 1,
    borderColor: "rgb(0, 0, 0)",
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 20,
    backgroundColor: "rgb(48, 48, 48)",
    fontWeight: "bold",
  },
  timeText: {
    fontSize: 18,
    color: "#ffffffff",
    textAlign: "center",
  },

  selectedText: {
    marginTop: 20,
    fontSize: 18,
    textAlign: "center",
    color: "white",
  },
  buttonRmv: {
    backgroundColor: "rgb(129, 29, 29)",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    borderColor: "white",
    borderWidth: 1,
  },
  buttonUndo: {
    backgroundColor: "rgb(23, 77, 12)",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    borderColor: "white",
    borderWidth: 1,
  },
});
