import { useLocalization } from "@/contexts/LocalizationContext";
import SharedApprovedReservationButton from "@/shared-components/SharedApprovedReservationButton";
import SharedDeclinedReservationButton from "@/shared-components/SharedDeclinedReservationButton";
import SharedButtonCancel from "@/shared-components/SharedButtonCancel";
import SharedButtonRejected from "@/shared-components/SharedButtonRejected";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { SharedQuestion } from "@/shared-components/SharedQuestion";
import { SharedMessage } from "@/shared-components/SharedMessage";
import { router, useLocalSearchParams } from "expo-router";
import { SharedLoader } from "@/shared-components/SharedLoader";
import { useEffect, useState } from "react";
import SharedCoverImage from "@/shared-components/SharedCoverImage";
import { useCompany } from "@/contexts/CompanyContext";
import SharedBackButton from "@/shared-components/SharedBackButton";
import SharedDetailsReservation from "@/shared-components/SharedDetailsReservation";
import HeaderReservationTime from "@/components/reservation/HeaderReservationTime";

import { useAppointment } from "@/contexts/AppointmentContext";
import { convertNowDateTimestamp } from "@/helpers";

function ResevationNotificationScreen() {
  const { localization } = useLocalization();
  const { itemId, user, note, past, rating, criteriaDate, arrived } =
    useLocalSearchParams();
  const { company } = useCompany();

  const {
    reservationData,
    fetchReservationDetails,
    isLoading,
    error,
    message,
    isModalQuestion,
    setIsModalQuestion,
    setIsModal,
    isModal,
    changeStatusReservation,
    missedReservation,
  } = useAppointment();

  useEffect(() => {
    fetchReservationDetails(itemId);
  }, []);

  const [actionValue, setActionValue] = useState(null);

  const confirmHandler = async () => {
    router.back();
    setIsModal(false);
  };

  const sharedApprovedQuestionHandler = () => {
    setIsModalQuestion(false);

    setTimeout(async () => {
      await changeStatusReservation(itemId, actionValue, criteriaDate);
    }, 500);
  };

  const sharedMissedQuestionHandler = () => {
    setIsModalQuestion(false);

    setTimeout(async () => {
      await missedReservation(itemId, criteriaDate);
    }, 500);
  };

  const sharedRejectQuestionHandler = () => {
    setIsModalQuestion(false);
    setTimeout(async () => {
      await changeStatusReservation(itemId, actionValue, criteriaDate);
    }, 500);
  };
  const modalReservationHandler = (title) => {
    setActionValue(title);
    setIsModalQuestion(true);
  };

  const renderQuestion = () => {
    const titleQuestion =
      actionValue === "rejected"
        ? localization.APPOINTMENTS.rejectReservation.rejectQuestion
        : actionValue === "approved"
          ? localization.APPOINTMENTS.approveReservation.approveQuestion
          : localization.APPOINTMENTS.missedReservation.question;

    const questionButtonYes =
      actionValue === "rejected"
        ? localization.APPOINTMENTS.rejectReservation.yesButton
        : actionValue === "approved"
          ? localization.APPOINTMENTS.approveReservation.yesButton
          : localization.APPOINTMENTS.missedReservation.yesButton;

    const questionButtonNo =
      localization.APPOINTMENTS.approveReservation.noButton;

    const submitAppointment =
      actionValue === "rejected"
        ? sharedRejectQuestionHandler
        : actionValue === "approved"
          ? sharedApprovedQuestionHandler
          : sharedMissedQuestionHandler;

    return (
      <SharedQuestion
        isOpen={isModalQuestion && !isLoading}
        onClose={() => setIsModalQuestion(false)}
        onLogOut={submitAppointment}
        icon={<FontAwesome name="question-circle-o" size={64} color="white" />}
        title={titleQuestion}
        buttonTextYes={questionButtonYes}
        buttonTextNo={questionButtonNo}
      />
    );
  };
  console.log("reservationData", reservationData);

  const finishReservation = (startDateValue) => {
    if (!startDateValue) return null;
    const now = new Date();
    const startDate = new Date(startDateValue);
    if (now > startDate) {
      return true;
    }
    return false;
  };

  const startEndDate = () => {
    if (!reservationData) return null;
    const nowValue = new Date().toISOString();
    const now = convertNowDateTimestamp(nowValue);
    const startDateReservation = convertNowDateTimestamp(
      reservationData?.startDate || null,
    );
    const endDateReservation = convertNowDateTimestamp(
      reservationData?.endDate || null,
    );

    if (now >= startDateReservation && now <= endDateReservation) {
      return "missed";
    }
    if (now > endDateReservation) {
      return "completed";
    }

    return "cancelled";
  };

  return (
    <View style={styles.screenContainer}>
      {!isLoading && reservationData && (
        <ScrollView
          automaticallyAdjustKeyboardInsets
          contentContainerStyle={styles.scrollContent}
        >
          <SharedCoverImage image={company?.media?.coverImageAppointments} />
          <SharedBackButton
            onPress={router.back}
            styleBtn={{ margin: 10 }}
          />

          <HeaderReservationTime data={reservationData} />

          <View style={styles.containerCancel}>
            {reservationData && (
              <SharedDetailsReservation data={reservationData} note={note} />
            )}
          </View>
        </ScrollView>
      )}
      {!isLoading &&
        reservationData &&
        reservationData?.status === 0 &&
        startEndDate() === "cancelled" && (
          <View style={styles.bottomButtonRejected}>
            <SharedButtonCancel
              onPress={() => modalReservationHandler("rejected")}
              text={localization.APPOINTMENTS.cancelBtn}
            />
          </View>
        )}
      {!isLoading &&
        reservationData?.status === 0 &&
        arrived === "arrived" &&
        startEndDate() === "missed" && (
          <TouchableOpacity
            style={styles.missed}
            onPress={() => modalReservationHandler("missed")}
          >
            <Text style={styles.textBold}>{localization.HOME.missed}</Text>
            <FontAwesome5
              name="calendar-times"
              size={60}
              color="#c38d8d"
              solid
            />
          </TouchableOpacity>
        )}

      {!isLoading && reservationData && arrived === "missed" && (
        <View style={styles.missed}>
          <Text style={styles.textBoldMissed}>
            {localization.STATUS.reservation}
          </Text>
        </View>
      )}
      {!isLoading &&
        reservationData?.status === 0 &&
        startEndDate() === "completed" && (
          <View style={styles.missed}>
            <Text style={styles.textBoldSuccess}>
              {localization.APPOINTMENTS.completed}
            </Text>
          </View>
        )}
      {!isLoading && reservationData?.status === 1 && (
        <View style={styles.missed}>
          <Text style={styles.textBoldRejected}>
            {localization.APPOINTMENTS.rejectReservation.info}
          </Text>
        </View>
      )}

      {!isLoading && reservationData?.status === 2 && !finishReservation(reservationData?.startDate) && (
        <View style={styles.bottomButtons}>
          <SharedApprovedReservationButton
            onPress={() => modalReservationHandler("approved")}
            text={localization.APPOINTMENTS.approveReservation.approveButton}
          />
          <View style={{ marginTop: 20 }}>
            <SharedDeclinedReservationButton
              onPress={() => modalReservationHandler("rejected")}
              text={localization.APPOINTMENTS.rejectReservation.rejectButton}
            />
          </View>
        </View>
      )}
      {!isLoading && reservationData?.status === 2 && finishReservation(reservationData?.startDate) && (
        <View style={styles.missed}>
          <Text style={styles.textBoldSuccess}>
            {localization.APPOINTMENTS.expired}
          </Text>
        </View>
      )}

      {isModalQuestion && renderQuestion()}

      {isModal && (
        <SharedMessage
          isOpen={isModal && !isLoading}
          onClose={confirmHandler}
          onConfirm={confirmHandler}
          icon={
            <FontAwesome
              name={error ? "close" : "check-circle-o"}
              size={64}
              color="white"
            />
          }
          title={error || message}
          buttonText="Ok"
        />
      )}

      <SharedLoader isOpen={isLoading} />
    </View>
  );
}

const styles = StyleSheet.create({
  textBold: {
    color: "white",
    fontSize: 22,
  },
  textBoldMissed: {
    color: "grey",
    fontSize: 30,
  },
  textBoldRejected: {
    color: "grey",
    fontSize: 24,
  },
  textBoldSuccess: {
    color: "grey",
    fontSize: 24,
    textAlign: "center"
  },
  missed: {
    flex: 2,
    padding: 20,
    alignContent: "center",
    alignItems: "center",
  },
  screenContainer: {
    flex: 1,
    backgroundColor: "black",
  },

  scrollContent: {
    paddingBottom: 50, // 👈 space so content doesn’t hide behind buttons
  },

  bottomButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingBottom: 80,
    backgroundColor: "#000", // Osnovna boja aplikacije
  },
  bottomButtonRejected: {
    justifyContent: "space-between",
    marginVertical: 50,
    marginHorizontal: 20,
    backgroundColor: "#000", // Osnovna boja aplikacije
  },
  containerCancel: {
    marginTop: 10,
  },
});
export default ResevationNotificationScreen;
