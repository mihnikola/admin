import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import React from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { FontAwesome } from "@expo/vector-icons";
import { ColorsBarber } from "@/constants/Colors";
import { router } from "expo-router";
import { useLocalization } from "@/contexts/LocalizationContext";

const SharedOtherServices = ({data}) => {
  const { id, image, name, duration, price } = data;
  const { localization } = useLocalization();

  return (
    <View key={id} style={styles.card}>
      {image && <Image source={{ uri: image }} style={styles.profileImage} />}
      {data?.service?.image && (
        <Image
          source={{ uri: data?.service?.image }}
          style={styles.profileImage}
        />
      )}
      <View style={styles.detailsContainer}>
        {data?.service ? (
          <Text style={styles.name}>
            {" "}
            {localization.code === "en"
              ? data?.service?.name?.nameEn
              : data?.service?.name?.nameLocal}{" "}
          </Text>
        ) : (
          <Text style={styles.name}>
            {" "}
            {localization.code === "en" ? name?.nameEn : name?.nameLocal}{" "}
          </Text>
        )}
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={styles.locationContainer}>
            <FontAwesome
              name={"clock-o"}
              size={16}
              color={ColorsBarber.dark.textColor}
            />
            {data?.service?.duration ? (
              <Text style={styles.locationText}>
                {`${localization.DETAILS.duration} ${data?.service?.duration} `}
              </Text>
            ) : (
              <Text style={styles.locationText}>
                {`${localization.DETAILS.duration} ${duration} `}
              </Text>
            )}
          </View>
          <View style={styles.ratingContainer}>
            <MaterialIcons
              name={"price-change"}
              size={16}
              color={ColorsBarber.dark.priceColor}
            />
            <Text style={styles.reviewText}>
              {`${localization.DETAILS.price} ${data?.price}`}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  containerReview: {
    alignSelf: "flex-start",
  },
  moreServices: {
    color: ColorsBarber.dark.textColor,
    fontFamily: "OldStandard-Italic",
    textDecorationLine: "underline",
  },
  row: {
    flexDirection: "row",
  },
  spaceBetween: {
    justifyContent: "space-between",
  },
  card: {
    flexDirection: "row",
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginVertical: 8,
    marginHorizontal: 15,
    alignItems: "center",
    shadowColor: ColorsBarber.dark.background,
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
    shadowColor: ColorsBarber.dark.background, // For a subtle shadow (iOS)
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // For Android shadow
  },
  profileImage: {
    width: 45,
    height: 45,
    borderRadius: 15, // Makes it circular
    marginRight: 15,
  },
  detailsContainer: {
    flex: 1,
    justifyContent: "center",
  },
  name: {
    fontSize: 16,
    fontFamily: "OldStandard-Regular",
    color: ColorsBarber.dark.textColor, // White text color
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  locationText: {
    fontSize: 12,
    color: ColorsBarber.dark.textColor, // White text color
    fontFamily: "OldStandard-Regular",

    marginLeft: 5,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    fontSize: 12,
    fontFamily: "OldStandard-Bold",
    color: ColorsBarber.dark.textColor, // White text color
    marginLeft: 5,
  },
  reviewText: {
    fontSize: 14,
    color: ColorsBarber.dark.textColor, // White text color
    marginLeft: 5,
    fontFamily: "OldStandard-Regular",
  },
});

export default SharedOtherServices;
