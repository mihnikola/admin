import { ScrollView, StyleSheet, Text, View, Dimensions } from "react-native";
import { useLocalization } from "@/contexts/LocalizationContext";
import Loader from "@/shared-components/Loader";
import LocationItem from "./LocationItem";
import useLocation from "../hooks/useLocations";
import FloatingButton from "../../FloatingButton";
import { useCallback, useEffect, useState } from "react";
import { SharedQuestion } from "@/shared-components/SharedQuestion";
import { FontAwesome } from "@expo/vector-icons";
import { SharedMessage } from "@/shared-components/SharedMessage";
import { useFocusEffect } from "expo-router";

const Locations = () => {
  const { localization } = useLocalization();

  const [removeItem, setRemoveItem] = useState(null);
  const [isError, setIsError] = useState(null);
  const [isRemove, setIsRemove] = useState(null);

  const {
    onSelectedLocation,
    isLoading,
    error,
    isMessage,
    message,
    setIsMessage,
    locationBarbersData,
    locations,
    getLocations,
    toggleBarber,
    submitChanges,
    selectedLocation,
    addLocationRouter,
    startEditing,
    deactivateLocation,
    confirmHandler,
    undoHandler
  } = useLocation();

  const { height: screenHeight } = Dimensions.get("window");
  const containerHeight = screenHeight * 0.7;

 
   useFocusEffect(
      useCallback(() => {
        getLocations();
      }, []),
    );

  const removeLocation = (item) => {
    setIsRemove(true);
    setRemoveItem(item);
  };
  const removeCancelHandler = () => {
    setIsRemove(false);
  };
  const removeConfirmHandler = () => {
    setIsRemove(false);
    deactivateLocation(removeItem);
  };


  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.content}>
          <Text style={styles.title}>{localization.PLACES.title}</Text>
          <View style={{ maxHeight: containerHeight }}>
            {isLoading === "getPlaces" && (
              <Loader isOpen={isLoading === "getPlaces"} />
            )}
            <ScrollView>
              {isLoading !== "getPlaces" &&
                locations.map((item) => (
                  <LocationItem
                    key={item.id}
                    item={item}
                    onSelectedLocation={onSelectedLocation}
                    selectedLocation={selectedLocation}
                    startEditing={startEditing}
                    deactivateLocation={removeLocation}
                    undoHandler={undoHandler}
                  />
                ))}
            </ScrollView>
          </View>
        </View>
      </ScrollView>
      <FloatingButton onPress={addLocationRouter} />
      {isRemove && (
        <SharedQuestion
          isOpen={isRemove}
          onClose={removeCancelHandler}
          onLogOut={removeConfirmHandler}
          icon={
            <FontAwesome name="question-circle-o" size={64} color="white" />
          }
          title={localization.PLACES.question}
          buttonTextYes={localization.PLACES.confirmButton}
          buttonTextNo={localization.PLACES.cancel}
        />
      )}
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
};
const styles = StyleSheet.create({
  content: {
    padding: 20,
  },
  scrollContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
    marginBottom: 10,
    textAlign: "center",
  },
  btn: {
    paddingBottom: 5,
    marginHorizontal: 20,
  },
});
export default Locations;
