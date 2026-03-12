import { useLocalization } from "@/contexts/LocalizationContext";
import { SharedMessage } from "@/shared-components/SharedMessage";
import { FontAwesome } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import useLocation from "../hooks/useLocations";
import { SharedLoader } from "@/shared-components/SharedLoader";
import { SharedQuestion } from "@/shared-components/SharedQuestion";

export default function LocationsAddEdit() {
  const [city, setCity] = useState("");
  const [streetName, setStreetName] = useState("");
  const { localization } = useLocalization();
  const [editingId, setEditingId] = useState(null);
  const [active, setActive] = useState(null);
  const [isRemove, setIsRemove] = useState(false);
  const [isUndo, setIsUndo] = useState(false);

  const {
    isMessage,
    isLoading,
    getLocationById,
    locationById,
    addEditLocation,
    confirmHandler,
    message,
    deactivateLocation,
    activateLocation,
  } = useLocation();

  const submitHandler = () => {
    if (editingId) {
      const updateLocationData = {
        id: editingId,
        city,
        streetName,
      };
      if (updateLocationData) {
        addEditLocation(updateLocationData);
      }
    } else {
      const addData = {
        city,
        streetName,
      };
      if (addData) {
        addEditLocation(addData);
      } else {
        setIsError(localization.PLACES.errorFields);
      }
    }
  };

  const { id } = useLocalSearchParams();

  useEffect(() => {
    if (id) {
      setTimeout(async () => {
        await getLocationById(id);
      }, 50);
    }
  }, [id]);

  useEffect(() => {
    if (locationById) {
      setCity(locationById.city);
      setStreetName(locationById?.address);
      setActive(locationById?.active);
      setEditingId(id);
    }
  }, [locationById]);

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

  if (isLoading === "getPlaceById") {
    return <SharedLoader isOpen={isLoading === "getPlaceById"} />;
  }

  return (
    <View style={styles.container}>
      <View style={{ flex: 3, margin: 20, gap: 10 }}>
        <TextInput
          style={styles.input}
          placeholder={localization.PLACES.addStreetName}
          value={streetName}
          onChangeText={setStreetName}
        />

        <TextInput
          style={styles.input}
          placeholder={localization.PLACES.addCityName}
          value={city}
          onChangeText={setCity}
        />
      </View>

      <View style={{ flex: 1 }}>
        <TouchableOpacity style={styles.button} onPress={submitHandler}>
          {isLoading === "addEdit" && (
            <ActivityIndicator size={20} color="#fff" />
          )}
          {isLoading !== "addEdit" && (
            <Text style={styles.buttonText}>
              {editingId
                ? localization.PLACES.saveChanges
                : localization.PLACES.addLocation}
            </Text>
          )}
        </TouchableOpacity>

        {editingId && active === 1 && (
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
        {editingId && active === 0 && (
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
      {isMessage && (
        <SharedMessage
          isOpen={isMessage}
          icon={<FontAwesome name="check-circle-o" size={64} color="white" />}
          onClose={confirmHandler}
          onConfirm={confirmHandler}
          buttonText="Ok"
          title={message}
        />
      )}
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
    </View>
  );
}

const styles = StyleSheet.create({
  containerImage: {
    position: "absolute",
    alignContent: "center",
    alignItems: "center",
    alignSelf: "center",
    paddingTop: 20,
  },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#121212",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  image: {
    width: 60,
    height: 60,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
    marginTop: 20,
    marginBottom: 10,
  },
  input: {
    backgroundColor: "#1e1e1e",
    color: "#fff",
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  button: {
    backgroundColor: "rgb(0, 0, 0)",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    borderColor: "white",
    borderWidth: 1,
    margin: 20,
  },
  buttonRmv: {
    backgroundColor: "rgb(129, 29, 29)",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    borderColor: "white",
    borderWidth: 1,
    margin: 20,
  },
  buttonUndo: {
    backgroundColor: "rgb(23, 77, 12)",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    borderColor: "white",
    borderWidth: 1,
    margin: 20,
  },
  cancelButton: {
    backgroundColor: "#525252",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  serviceItem: {
    backgroundColor: "#2a2a2a",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    borderRadius: 8,
    marginBottom: 10,
  },
  serviceText: {
    color: "#fff",
    fontSize: 15,
  },
  editHint: {
    fontSize: 12,
    color: "#aaa",
    padding: 8,
  },
});
