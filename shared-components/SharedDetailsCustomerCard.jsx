import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { useLocalization } from "@/contexts/LocalizationContext";
import { getInitialsName } from "@/helpers";
import { ColorsBarber } from "@/constants/Colors";

const SharedDetailsCustomerCard = ({ user, note, otherServices }) => {
  const { image, name, _id: id } = user;
  const { localization } = useLocalization();

  const initials = getInitialsName(name);

  return (
    <View
      key={id}
      style={[styles.card, otherServices?.length > 0 && styles.paddingSection]}
    >
      {image ? (
        <Image
          source={{ uri: image }}
          style={[
            styles.profileImage,
            otherServices?.length > 0 && styles.profileImageOther,
          ]}
        />
      ) : (
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>{initials}</Text>
        </View>
      )}
      <View style={styles.detailsContainer}>
        <View
          style={
            otherServices?.length > 0 && {
              justifyContent: "space-between",
            }
          }
        >
          <Text style={styles.name}>{name}</Text>
          {note && (
            <Text style={styles.note}>{localization.HOME.commentLabel}</Text>
          )}
          {note && <Text style={styles.note}>{note}</Text>}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profileImageOther: {
    width: 45,
    height: 45,
    borderRadius: 15,
    marginRight: 15,
    borderColor: "#333",
  },
  paddingSection: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "transparent",
    margin: 0,
  },
  avatarContainer: {
    backgroundColor: ColorsBarber.dark.background,
    width: 90,
    height: 90,
    borderRadius: 30,
    marginRight: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: ColorsBarber.dark.textColor,
    fontWeight: "bold",
    fontSize: 30,
  },
  card: {
    flexDirection: "row",
    backgroundColor: ColorsBarber.dark.item,
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

  dataContainer: {
    gap: 5,
  },

  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 30,
    marginRight: 15,
    borderWidth: 1,
    color: ColorsBarber.dark.inActiveTextColor,
  },
  detailsContainer: {
    flex: 1,
    justifyContent: "center",
  },
  name: {
    fontSize: 18,
    color: ColorsBarber.dark.textColor,
    marginBottom: 4,
    fontFamily: "OldStandard-Regular",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  locationText: {
    fontSize: 14,
    color: ColorsBarber.dark.textColor,
  },
  ratingContainer: {
    gap: 5,
    flexDirection: "row",
    alignItems: "center",
  },

  note: {
    fontSize: 14,
    color: ColorsBarber.dark.textColor,
    fontFamily: "OldStandard-Regular",

  },
});

export default SharedDetailsCustomerCard;
