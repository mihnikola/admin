import { useLocalization } from "@/contexts/LocalizationContext";
import { SharedMessage } from "@/shared-components/SharedMessage";
import { FontAwesome } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
} from "react-native";
import useLocation from "../hooks/useLocations";
import { SharedLoader } from "@/shared-components/SharedLoader";
import GooglePlace from "./GooglePlace";
import LocationInput from "./LocationInput";
import TimeSettingsScreen from "../../WorkHourManagement";

export default function LocationsAddEdit() {
  const [city, setCity] = useState("");
  const [streetName, setStreetName] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const { localization } = useLocalization();
  const [editingId, setEditingId] = useState(null);
  const [active, setActive] = useState(null);

  const [placeId, setPlaceId] = useState(null);
  const [workHours, setWorkHours] = useState(null);
  const [slotDuration, setSlotDuration] = useState(null);

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
    deleteLocation
  } = useLocation();

  const submitHandler = (data) => {
    if (editingId) {
      const updateLocationData = {
        id: editingId,
        city,
        streetName,
        lat,
        lng,
        ...data,
        placeId
      };
      if (updateLocationData) {
        addEditLocation(updateLocationData);
      }
    } else {
      const addData = {
        city,
        streetName,
        lat,
        lng,
        ...data,
        placeId
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
      setWorkHours(locationById);
      setStreetName(locationById?.address);
      setSlotDuration(locationById?.slotDuration);
      setActive(locationById?.active);
      setEditingId(id);
    }
  }, [locationById]);


  if (isLoading === "getPlaceById") {
    return <SharedLoader isOpen={isLoading === "getPlaceById"} />;
  }

  console.log("workHours",workHours);
  console.log("locationById",locationById);

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, margin: 10, gap: 10 }}>
        <GooglePlace
          onSelect={({ city, street, lat, lng, place_id }) => {
            setCity(city);
            setStreetName(street);
            setLat(lat);
            setLng(lng);
            setPlaceId(place_id);
          }}
        />

        {streetName && (
          <LocationInput
            icon="map"
            label={localization.PLACES.addStreetName}
            placeholder={streetName}
          />
        )}
        {city && (
          <LocationInput
            icon="map"
            label={localization.PLACES.addCityName}
            placeholder={city}
          />
        )}
      </View>
      {streetName && <TimeSettingsScreen
        data={locationById}
        city={city}
        streetName={streetName}
        activateLocation={activateLocation}
        isLoading={isLoading}
        deleteLocation={deleteLocation}
        deactivate={deactivateLocation}
        workHours={workHours?.workingHours}
        minutes={slotDuration}
        active={active}
        id={id}
        submitEverything={submitHandler}
      />
      }

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
    backgroundColor: "#000000",
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
    backgroundColor: "#c7c7c7",
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

  cancelButton: {
    backgroundColor: "#525252",
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
