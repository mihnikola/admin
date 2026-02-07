import useChangeUser from "@/components/clients/hooks/useChangeUser";
import { useLocalization } from "@/contexts/LocalizationContext";
import { SharedMessage } from "@/shared-components/SharedMessage";
import { SharedQuestion } from "@/shared-components/SharedQuestion";
import {
  Feather,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const UserProfile = () => {
  const params = useLocalSearchParams();
  const { localization } = useLocalization();
  const {
    makePhoneCall,
    softDelete,
    error,
    isLoading,
    dialog,
    setDialog,
    message,
    setMessage,
    setIsMessage,
    isMessage,
  } = useChangeUser();

  const {
    name,
    skippedCount,
    approvedCount,
    totalRevenue,
    image,
    phoneNumber,
    email,
    id,
  } = params;

  const initials = name?.substring(0, 2)?.toUpperCase();

  const refreshHandler = () => {
    setIsMessage(false);
    router.back();
  };
  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        {image ? (
          <Image source={{ uri: image }} style={styles.profileImage} />
        ) : (
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>{initials}</Text>
          </View>
        )}
        <Text style={styles.nameText}>{name}</Text>
      </View>
      <View style={styles.actionButtonsContainer}>
        {phoneNumber && (
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => makePhoneCall(phoneNumber)}
          >
            <Feather name="phone" size={24} color="#fff" />
            <Text style={styles.actionText}>{localization.CLIENTS.contact}</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => setDialog(true)}
        >
          <Feather name="slash" size={24} color="#d9534f" />
          <Text style={styles.actionText}>{localization.CLIENTS.block}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.section}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>{localization.CLIENTS.missed}</Text>
          <Text style={[styles.statValue, { color: "#d9534f" }]}>
            {skippedCount}
          </Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>{localization.CLIENTS.finished}</Text>
          <Text style={styles.statValue}>{approvedCount}</Text>
        </View>

        <View style={styles.totalIncome}>
          <Text style={styles.statLabel}>{localization.CLIENTS.total}</Text>
          <Text style={styles.incomeValue}>{totalRevenue} RSD</Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{localization.CLIENTS.contactInfo}</Text>
        <View style={styles.contactItem}>
          <Feather
            name="phone-call"
            size={20}
            color="#666"
            style={styles.contactIcon}
          />
          <Text style={styles.contactText}>
            {phoneNumber || localization.CLIENTS.notAvailable}
          </Text>
        </View>
        <View style={styles.contactItem}>
          <MaterialCommunityIcons
            name="email-outline"
            size={20}
            color="#666"
            style={styles.contactIcon}
          />
          <Text style={styles.contactText}>{email || localization.CLIENTS.notAvailable}</Text>
        </View>
      </View>
      {dialog && (
        <SharedQuestion
          isOpen={dialog}
          icon={<FontAwesome name="close" size={64} color="white" />}
          onClose={() => setDialog(false)}
          onLogOut={() => softDelete(id)}
          buttonTextYes="OK"
          title={localization.CLIENTS.question}
          buttonTextNo={localization.CLIENTS.cancel}
        />
      )}
      {isMessage && (
        <SharedMessage
          isOpen={isMessage}
          icon={<FontAwesome name="check-circle-o" size={64} color="white" />}
          onClose={refreshHandler}
          onConfirm={refreshHandler}
          buttonText="Ok"
          title={message}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  avatarContainer: {
    backgroundColor: "grey",
    padding: 10,
    borderRadius: 50,
  },
  avatarText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 30,
    marginRight: 15,
    borderWidth: 1,
    borderColor: "#333",
  },
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  navBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  navButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  navText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 5,
  },
  profileHeader: {
    alignItems: "center",
    paddingVertical: 50,
  },
  photoPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#d9534f",
  },
  nameText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
  },
  actionButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 15,
  },
  actionButton: {
    alignItems: "center",
  },
  actionText: {
    color: "#fff",
    fontSize: 12,
    marginTop: 5,
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  sectionTitle: {
    color: "#888",
    fontSize: 14,
    marginBottom: 10,
  },
  statItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
  },
  statLabel: {
    color: "#fff",
    fontSize: 16,
  },
  statValue: {
    color: "#fff",
    fontSize: 16,
  },
  totalIncome: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  incomeValue: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  divider: {
    height: 1,
    backgroundColor: "#222",
    marginVertical: 10,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  contactIcon: {
    marginRight: 10,
  },
  contactText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default UserProfile;
