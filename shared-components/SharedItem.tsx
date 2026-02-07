import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const SharedItem = (props: any) => {
  const { data, onPressHandler } = props;
  const { id, address } = data;
  return (
    <TouchableOpacity
      key={id}
      style={styles.card}
      onPress={() => onPressHandler(data)}
    >
      <Image
        source={require("./../assets/images/pinImage.png")}
        style={styles.profileImage}
      />
      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{address}</Text>
      </View>
      <View style={styles.locationContainer}>
        <FontAwesome name={"arrow-right"} size={25} color="#CCCCCC" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#1E1E1E", // Dark background from your image
    borderRadius: 12,
    padding: 20,
    marginVertical: 8, // Spacing between cards
    alignItems: "center",
    shadowColor: "#000", // For a subtle shadow (iOS)
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // For Android shadow
  },
  detailsCard: {
    flexDirection: "row",
    backgroundColor: "#1E1E1E", // Dark background from your image
    borderRadius: 12,
    padding: 15,
    marginVertical: 8, // Spacing between cards
    marginHorizontal: 15, // Side padding for the list
    alignItems: "center",
    shadowColor: "#000", // For a subtle shadow (iOS)
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // For Android shadow
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 30, // Makes it circular
    marginRight: 15,
    borderWidth: 1, // Optional: for a subtle border around the image
    borderColor: "#333",
  },
  detailsContainer: {
    flex: 1,
    justifyContent: "center",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF", // White text color
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  locationText: {
    fontSize: 14,
    color: "#CCCCCC", // Lighter grey for location
    marginLeft: 5,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FFD700", // Gold color for rating number
    marginLeft: 5,
  },
  reviewText: {
    fontSize: 14,
    color: "#CCCCCC", // Lighter grey for review count
    marginLeft: 5,
  },
});

export default SharedItem;
