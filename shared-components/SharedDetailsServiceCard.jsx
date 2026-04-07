import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { FontAwesome } from "@expo/vector-icons";
import { useLocalization } from "@/contexts/LocalizationContext";

const SharedDetailsServiceCard = (props) => {
  const { data } = props;
  const { id, image, name, duration, price } = data;
  const { localization } = useLocalization();
  
  return (
    <View key={id} style={styles.card}>
      {image && <Image source={{ uri: image }} style={styles.profileImage} />}
      <View style={styles.detailsContainer}>
        <Text style={styles.name}>
          {localization.code === "en" ? name?.nameEn : name?.nameLocal}
        </Text>
        <View style={styles.locationContainer}>
          <FontAwesome name={"clock-o"} size={16} color="#CCCCCC" />
          <Text style={styles.locationText}>
            {`${localization.DETAILS.duration} ${
              duration || data?.serviceDuration
            }`}
          </Text>
        </View>
        <View style={styles.ratingContainer}>
          <MaterialIcons name={"price-change"} size={16} color="#FFD700" />
          <Text style={styles.reviewText}>
            {`${localization.DETAILS.price} ${price || data?.servicePrice}`}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerReview: {
    alignSelf: "flex-start",
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#1E1E1E",
    borderRadius: 12,
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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
    width: 90,
    height: 90,
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

export default SharedDetailsServiceCard;
