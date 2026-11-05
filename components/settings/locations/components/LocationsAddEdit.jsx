import { useLocalization } from "@/contexts/LocalizationContext";
import { SharedMessage } from "@/shared-components/SharedMessage";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import useLocation from "../hooks/useLocations";
import { SharedLoader } from "@/shared-components/SharedLoader";
import GooglePlace from "./GooglePlace";
import LocationInput from "./LocationInput";
import TimeSettingsScreen from "./WorkHourManagement";
import SharedBackButton from "@/shared-components/SharedBackButton";
import { ColorsBarber } from "@/constants/Colors";

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
    checkReservationIfExists,
    activateLocation,
    deleteLocation,
    error,
    setError,
    navigateToBarbers,
    paramsData,
    refreshHandler
  } = useLocation();

  const confirmErrorMessageHandler = () => {
    setError(null);
  };

  const submitHandler = (data) => {
    if (editingId) {
      const updateLocationData = {
        id: editingId,
        city,
        streetName,
        lat,
        lng,
        ...data,
        placeId,
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
        placeId,
      };
      if (addData) {
        addEditLocation(addData);
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

  return (
    <ScrollView
      style={styles.container}
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="interactive"
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 30,
          marginHorizontal: 15,
        }}
      >
        <View>
          <SharedBackButton onPress={router.back} absolutePosition={false} />
        </View>
        {id && (
          <TouchableOpacity onPress={() => navigateToBarbers(locationById)}>
            <MaterialCommunityIcons
              name="account-plus-outline"
              size={28}
              color={ColorsBarber.dark.textColor}
            />
          </TouchableOpacity>
        )}
      </View>

      <View style={{ margin: 10, gap: 10 }}>
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
            city={city}
          />
        )}
      </View>

      {streetName && (
        <TimeSettingsScreen
          data={locationById}
          city={city}
          streetName={streetName}
          activateLocation={activateLocation}
          isLoading={isLoading}
          checkReservation={checkReservationIfExists}
          deleteLocation={deleteLocation}
          deactivate={deactivateLocation}
          workHours={workHours?.workingHours}
          minutes={slotDuration}
          active={active}
          id={id}
          submitEverything={submitHandler}
        />
      )}

      {isMessage && (
        <SharedMessage
          isOpen={isMessage}
          icon={<FontAwesome name="check-circle-o" size={64} color={ColorsBarber.dark.textColor} />}
          onClose={paramsData ? confirmHandler : refreshHandler}
          onConfirm={paramsData ? confirmHandler : refreshHandler}
          buttonText="Ok"
          title={message}
        />
      )}
      
      {error?.length > 0 && (
        <SharedMessage
          isOpen={error?.length > 0}
          icon={<FontAwesome name="close" size={64} color={ColorsBarber.dark.textColor} />}
          onClose={confirmErrorMessageHandler}
          onConfirm={confirmErrorMessageHandler}
          buttonText="Ok"
          title={error}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorsBarber.dark.background,
  },
});