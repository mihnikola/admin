import { SharedButton } from "@/shared-components/SharedButton";
import { SharedLoader } from "@/shared-components/SharedLoader";
import { SharedMessage } from "@/shared-components/SharedMessage";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
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
import { SharedQuestion } from "../../shared-components/SharedQuestion";

export default function TimeSettingsScreen({
  isLoading,
  deactivate,
  deleteLocation,
  activateLocation,
  minutes,
  workHours,
  active,
  id,
  submitEverything,
}) {
  const { localization } = useLocalization();
  const {
    getTimes,
    startWorkTime,
    endWorkTime,
    error,
    minutesValue,
    message,
    isMessage,
    setIsMessage,
    options,
  } = useGetWorhHours();

  const [selected, setSelected] = useState(10);
  const [isError, setIsError] = useState(false);
  const [isRemove, setIsRemove] = useState(false);
  const [isDeactivate, setIsDeactivate] = useState(false);

  useEffect(() => {
    getTimes();
  }, []);

  useEffect(() => {
    if (minutesValue || minutes) {
      setSelected(minutes || minutesValue);
    }
  }, [minutesValue, minutes]);

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
  const deactivateCancelHandler = () => {
    setIsDeactivate(false);
  };

  const deactivateConfirmHandler = async (id) => {
    setIsDeactivate(false);
    await deactivate(id);
  };

  const removeHandler = () => {
    setIsRemove(true);
  };
  const removeConfirmHandler = async (id) => {
    setIsRemove(false);
    await deleteLocation(id);
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

  const deactiveHandler = () => {
    setIsDeactivate(true);
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
      0,
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
      0,
    );
  };
  const [toTime, setToTime] = useState(finishedDate(workHours?.end));
  const [fromTime, setFromTime] = useState(startDate(workHours?.start));
  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);
  const [isUndo, setIsUndo] = useState(false);
  const [disabledBtn, setDisabledBtn] = useState(false);

  const verificationData = () => {
    if (
      data.address == streetName &&
      data.workingHours.start == formatTime(fromTime) &&
      data.workingHours.end == formatTime(toTime) &&
      data.slotDuration == selected
    ) {
      setDisabledBtn(true);
    } else {
      setDisabledBtn(false);
    }
  };

  useEffect(() => {
    getTimes();
  }, []);

  useEffect(() => {
    verificationData();
  }, [selected, fromTime, toTime, streetName]);

  console.log("selected", selected);

  useEffect(() => {
    if (minutesValue || minutes) {
      console.log("wwwwwwwww", minutes, minutesValue);
      setSelected(minutes || minutesValue);
    }
  }, [minutesValue, minutes]);

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
      console.log("wqweqweqwe");
      setSelected(minutesValue);
    }
  }, [minutesValue]);

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

  if (isLoading === "get") {
    return <SharedLoader isOpen={isLoading === "get"} />;
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
    const dataData = {
      open: formatTime(fromTime),
      close: formatTime(toTime),
      minutes: selected,
    };
    console.log("locationById", data);
    console.log("locationByIdxs", dataData);
    console.log("streetName", streetName);
    console.log("city", city);
    submitEverything(data);
  };
  console.log("disabledBtn", disabledBtn);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {localization.SETTINGS.WORKHOURS.capture}
      </Text>
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
      <Text style={styles.subtitle}>
        {localization.SETTINGS.WORKHOURS.subCapture}
      </Text>

      <CustomDropDownPicker
        options={options}
        selectedValue={selected}
        onValueChange={setSelected}
        placeholder={selected || localization.SETTINGS.WORKHOURS.gap}
      />

      <View style={{ flex: !id ? 0.5 : 2 }}>
        <SharedButton
          loading={isLoading === "addEdit"}
          onPress={submitHandler}
          text={localization.SETTINGS.WORKHOURS.submit}
          margin
        />
        {id && active === 1 && (
          <View style={{ gap: 10 }}>
            <TouchableOpacity style={styles.buttonRmv} onPress={removeHandler}>
              {isLoading === "remove" && (
                <ActivityIndicator size={20} color="#fff" />
              )}
              {isLoading !== "remove" && (
                <Text style={styles.buttonText}>
                  {localization.PLACES.deleteBtn}
                </Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonDeactive}
              onPress={deactiveHandler}
            >
              {isLoading === "deactivate" && (
                <ActivityIndicator size={20} color="#fff" />
              )}
              {isLoading !== "deactivate" && (
                <Text style={styles.buttonText}>
                  {localization.PLACES.deactivateBtn}
                </Text>
              )}
            </TouchableOpacity>
          </View>
        )}
        {id && active === 0 && (
          <View style={{ gap: 10 }}>
            <TouchableOpacity style={styles.buttonRmv} onPress={removeHandler}>
              {isLoading === "remove" && (
                <ActivityIndicator size={20} color="#fff" />
              )}
              {isLoading !== "remove" && (
                <Text style={styles.buttonText}>
                  {localization.PLACES.deleteBtn}
                </Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonUndo} onPress={undoHandler}>
              {isLoading === "activate" && (
                <ActivityIndicator size={20} color="#fff" />
              )}
              {isLoading !== "activate" && (
                <Text style={styles.buttonText}>
                  {localization.PLACES.undo}
                </Text>
              )}
            </TouchableOpacity>
          </View>
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
          title={localization.PLACES.deleteQuestion}
          buttonTextYes={localization.PLACES.deleteBtn}
          buttonTextNo={localization.PLACES.cancel}
        />
      )}
      {isDeactivate && (
        <SharedQuestion
          isOpen={isDeactivate}
          onClose={deactivateCancelHandler}
          onLogOut={() => deactivateConfirmHandler(id)}
          icon={
            <FontAwesome name="question-circle-o" size={64} color="white" />
          }
          title={localization.PLACES.deactivateQuestion}
          buttonTextYes={localization.PLACES.deactivateBtn}
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
    marginHorizontal: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
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
    marginVertical: 15,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    gap: 10,
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
  buttonDeactive: {
    backgroundColor: "rgb(179, 172, 172)",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    borderColor: "white",
    borderWidth: 1,
  },
  buttonUndo: {
    backgroundColor: "rgb(148, 148, 148)",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    borderColor: "white",
    borderWidth: 1,
  },
});
