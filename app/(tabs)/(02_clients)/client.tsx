import useChangeUser from "@/components/clients/hooks/useChangeUser";
import SearchInputComponent from "@/components/settings/SearchInputComponent";
import { ColorsBarber } from "@/constants/Colors";
import { useLocalization } from "@/contexts/LocalizationContext";
import { getInitialsName } from "@/helpers";
import { SharedButton } from "@/shared-components/SharedButton";
import { SharedLoader } from "@/shared-components/SharedLoader";
import { SharedMessage } from "@/shared-components/SharedMessage";
import { SharedQuestion } from "@/shared-components/SharedQuestion";
import {
  Feather,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const UserProfile = () => {
  const params = useLocalSearchParams();
  const { localization } = useLocalization();

  // 1. Kreiramo Ref za ScrollView
  const scrollViewRef = useRef(null);

  const {
    color: colorData,
    setColor,
    makePhoneCall,
    deleteClient,
    error,
    isLoading,
    dialog,
    setDialog,
    message,
    setMessage,
    setIsMessage,
    isMessage,
    changeColorSubmit
  } = useChangeUser();

  const {
    name,
    skippedCount,
    completedCount,
    totalRevenue,
    image,
    phoneNumber,
    email,
    color,
    id,
  } = params;

  const initials = getInitialsName(name);

  const refreshHandler = () => {
    setIsMessage(false);
    router.back();
  };

  // 2. Funkcija koja prisilno skroluje do dna kada se fokusira input
  const handleInputFocus = () => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  if (isLoading === 'delete') {
    return <SharedLoader isOpen={isLoading === 'delete'} />;
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        ref={scrollViewRef}
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
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
              <Feather
                name="phone"
                size={24}
                color={ColorsBarber.light.textColor}
              />
              <Text style={styles.actionText}>
                {localization.CLIENTS.contact}
              </Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => setDialog(true)}
          >
            <Feather
              name="slash"
              size={24}
              color={ColorsBarber.light.textColor}
            />
            <Text style={styles.actionText}>{localization.CLIENTS.block}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>{localization.CLIENTS.missed}</Text>
            <Text
              style={[
                styles.statValue,
                { color: ColorsBarber.light.textColor },
              ]}
            >
              {skippedCount || 0}
            </Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>
              {localization.CLIENTS.finished}
            </Text>
            <Text style={styles.statValue}>{completedCount || 0}</Text>
          </View>

          <View style={styles.totalIncome}>
            <Text style={styles.statLabel}>{localization.CLIENTS.total}</Text>
            <Text style={styles.incomeValue}>{totalRevenue} RSD</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {localization.CLIENTS.contactInfo}
          </Text>
          <View style={styles.contactItem}>
            <Feather
              name="phone-call"
              size={20}
              color={ColorsBarber.light.textColor}
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
              color={ColorsBarber.light.textColor}
              style={styles.contactIcon}
            />
            <Text style={styles.contactText}>
              {email || localization.CLIENTS.notAvailable}
            </Text>
          </View>

          {/* Wrapper oko inputa hvata dodir/fokus i pokreće scroll */}
          <View style={{ paddingVertical: 20 }} onTouchStart={handleInputFocus}>
            <SearchInputComponent
              search={colorData}
              setSearch={setColor}
              placeholderText={color || "Dodaj boju"}
            />
          </View>
          <View style={{paddingBottom: 40}}>
            <SharedButton onPress={() => changeColorSubmit(id)} text="Sacuvaj izmene" disabled={color?.length === 0 || isLoading === 'changeColor'} loading={isLoading === 'changeColor'} />
          </View>
        </View>
      </ScrollView>

      {dialog && (
        <SharedQuestion
          isOpen={dialog}
          icon={
            <FontAwesome
              name="close"
              size={64}
              color={ColorsBarber.light.textColor}
            />
          }
          onClose={() => setDialog(false)}
          onLogOut={() => deleteClient(id)}
          title={localization.CLIENTS.question}
          buttonTextNo={localization.CLIENTS.cancel}
          buttonTextYes="OK"
        />
      )}
      {isMessage && (
        <SharedMessage
          isOpen={isMessage}
          icon={
            <FontAwesome
              name="check-circle-o"
              size={64}
              color={ColorsBarber.light.textColor}
            />
          }
          onClose={refreshHandler}
          onConfirm={refreshHandler}
          buttonText="Ok"
          title={message}
        />
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorsBarber.light.background,
  },
  // KORISNO: Padding na dnu osigurava da dugme ne ostane zalepljeno za dno tastature
  scrollContent: {
    paddingBottom: 120,
  },
  avatarContainer: {
    backgroundColor: "grey",
    padding: 10,
    borderRadius: 50,
  },
  avatarText: {
    color: ColorsBarber.light.textColor,
    fontFamily: "OldStandard-Bold",
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
  profileHeader: {
    marginTop: 20,
    alignItems: "center",
  },
  nameText: {
    color: ColorsBarber.light.textColor,
    fontSize: 24,
    fontFamily: "OldStandard-Bold",
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
    color: ColorsBarber.light.textColor,
    fontFamily: "OldStandard-Bold",
    fontSize: 12,
    marginTop: 5,
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  sectionTitle: {
    color: ColorsBarber.light.textColor,
    fontSize: 14,
    marginBottom: 10,
    fontFamily: "OldStandard-Bold",
  },
  statItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
  },
  statLabel: {
    color: ColorsBarber.light.textColor,
    fontSize: 16,
    fontFamily: "OldStandard-Bold",
  },
  statValue: {
    color: ColorsBarber.light.textColor,
    fontSize: 16,
    fontFamily: "OldStandard-Bold",
  },
  totalIncome: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  incomeValue: {
    color: ColorsBarber.light.textColor,
    fontSize: 16,
    fontFamily: "OldStandard-Bold",
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
    color: ColorsBarber.light.textColor,
    fontSize: 16,
    fontFamily: "OldStandard-Bold",
  },
});

export default UserProfile;
