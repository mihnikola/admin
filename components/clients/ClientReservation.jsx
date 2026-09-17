import useChangeUser from "@/components/clients/hooks/useChangeUser";
import { ColorsBarber } from "@/constants/Colors";
import { useLocalization } from "@/contexts/LocalizationContext";
import { getInitialsName } from "@/helpers";
import { SharedButton } from "@/shared-components/SharedButton";
import { SharedLoader } from "@/shared-components/SharedLoader";
import { SharedMessage } from "@/shared-components/SharedMessage";
import { SharedQuestion } from "@/shared-components/SharedQuestion";
import { Feather, FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useRef } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const ClientReservation = () => {
  const params = useLocalSearchParams();
  const { localization } = useLocalization();
  const scrollViewRef = useRef(null);

  const {
    isMessage,
    message,
    setIsMessage,
    color: colorData,
    setColor,
    makePhoneCall,
    isLoading,
    setDialog,
    dialog,
    changeColorSubmit,
  } = useChangeUser();

  const {
    name,
    color,
    skippedCount,
    completedCount,
    totalRevenue,
    image,
    phoneNumber,
    email,
    id,
  } = params;

  const initials = getInitialsName(name);

  if (isLoading === "delete") {
    return <SharedLoader isOpen={isLoading === "delete"} />;
  }
  const refreshHandler = () => {
    setIsMessage(false);
    router.back();
  }

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Zaglavlje profila */}
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

        {/* Akciona dugmad */}
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

        {/* Statistički podaci */}
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

        {/* Kontakt informacije i Input */}
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

          <View style={{ paddingVertical: 20 }}>
            <Text style={styles.textValue}>Dodaj boju</Text>
            <TextInput
              value={colorData}
              onChangeText={setColor}
              placeholder={color || colorData || "Unesite boju"}
              style={styles.input}
              onFocus={() => {
                // Čim korisnik dodirne input, skroluje skroz do dna
                setTimeout(() => {
                  scrollViewRef.current?.scrollToEnd({ animated: true });
                }, 100);
              }}
            />
          </View>

          <View style={{ paddingBottom: 20 }}>
            <SharedButton
              onPress={() => changeColorSubmit(id)}
              text="Sacuvaj izmene"
              disabled={colorData?.length === 0 || isLoading === "changeColor"}
              loading={isLoading === "changeColor"}
            />
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorsBarber.light.background,
  },
  // KLJUČNO: Omogućava dinamičku visinu i prostor za podizanje pod tastaturom
  scrollContent: {
    flexGrow: 1,
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
  input: {
    backgroundColor: "white",
    color: ColorsBarber.light.item,
    padding: 15,
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 2,
    borderColor: ColorsBarber.light.item,
    fontFamily: "OldStandard-Bold",
    marginTop: 8,
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
  textValue: {
    color: ColorsBarber.light.textColor,
    fontSize: 16,
    fontFamily: "OldStandard-Bold",
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

export default ClientReservation;
