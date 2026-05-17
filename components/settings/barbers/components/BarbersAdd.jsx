import { FontAwesome } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import useBarbers from "../hooks/useBarbers";
import Loader from "../../../../shared-components/Loader";
import { useLocalization } from "@/contexts/LocalizationContext";
import { SharedMessage } from "@/shared-components/SharedMessage";
import { SharedQuestion } from "@/shared-components/SharedQuestion";
import { SharedLoader } from "@/shared-components/SharedLoader";
import { useCompany } from "@/contexts/CompanyContext";
import SharedCoverImage from "@/shared-components/SharedCoverImage";
import { router, useLocalSearchParams } from "expo-router";
import ImageCompress from "../../ImageCompress";
import BarbersSeniority from "./BarbersSeniority";
import BarbersInput from "./BarbersInput";
import BarberSeniorityComponent from "./BarbersSeniorityInput";
import BarbersStatusCheck from "./BarbersStatusCheck";
import BarbersStatuses from "./BarbersStatuses";
import SharedButtonApproved from "@/shared-components/SharedButtonApproved";
import SharedButtonRejected from "@/shared-components/SharedButtonRejected";
import useEmail from "@/components/login/hooks/useEmail";
import usePassword from "@/components/login/hooks/usePassword";
import usePhoneNumber from "@/components/login/hooks/usePhoneNumber";
import { SharedInput } from "@/shared-components/SharedInput";

export default function BarbersAdd() {
  const { localization } = useLocalization();
  const params = useLocalSearchParams();
  const { id, changeProfile } = params;

  const {
    isLoading,
    error,
    isMessage,
    setIsMessage,
    setMessage,
    message,
    barberData,
    setError,
    removeBarber,
    confirmHandler,
    getBarberHandler,
    addEditBarber,
    fetchAllSeniority,
    seniorityData,
    statuses,
    fetchAllStatusChecking,
  } = useBarbers();

  const [name, setName] = useState("");
  const [imageValue, setImageValue] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [changedImg, setChangedImg] = useState(null);
  const [selected, setSelected] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [statusChecking, setStatusChecking] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const refName = useRef(null);
  const scrollRef = useRef(null);
  const phoneNumberLayoutY = useRef(0);
  const emailLayoutY = useRef(0);
  const passwordLayoutY = useRef(0);

  const { email, emailError, handleEmailChange, emailInputRef } = useEmail();
  const { password, passwordError, handlePasswordChange, passwordInputRef } =
    usePassword();
  const {
    phoneNumber,
    handlePhoneNumberChange,
    errorPhoneNumber,
    phoneNumberInputRef,
  } = usePhoneNumber();

  const selectedImgHandler = (imgData) => {
    if (imgData) {
      setChangedImg(imgData);
    }
  };
  useEffect(() => {
    setTimeout(async () => {
      await fetchAllSeniority();
      await fetchAllStatusChecking();
    }, 100);
    if (id) {
      setTimeout(async () => {
        await getBarberHandler(id, changeProfile || "");
      }, 100);
    }
  }, [id]);

  useEffect(() => {
    if (barberData) {
      setName(barberData?.name);
      handleEmailChange(barberData?.email);
      setSelected(barberData?.seniority);
      setSelectedStatus(barberData?.statusCheck);
      handlePhoneNumberChange(barberData?.phoneNumber);
      selectedImgHandler(barberData?.image);
      setEditingId(barberData?.id);
    }
  }, [barberData]);

  const resetForm = () => {
    setName("");
    setSelected("");
    handlePhoneNumberChange("");
    handleEmailChange("");
    setSelectedStatus(null);
    setEditingId(null);
    setChangedImg(null);
  };

  const addBarber = () => {
    if (editingId) {
      const updateBarber = {
        id: editingId,
        name,
        email,
        phoneNumber,
        seniority: selected,
        password: changeProfile === "1" && password?.length > 0 ? password : "",
        image: changedImg === imageValue ? null : changedImg,
        statusCheck: selectedStatus?._id,
      };
      if (updateBarber) {
        addEditBarber(updateBarber);
      }
    } else {
      const newBarber = {
        name,
        email,
        phoneNumber,
        seniority: selected,
        image: changedImg === imageValue ? null : changedImg,
        statusCheck: selectedStatus?._id,
      };
      if (newBarber?.name && newBarber?.email) {
        addEditBarber(newBarber);
      } else {
        setError(localization.BARBERS.errorFields);
      }
    }
  };
  const confirmMessageHandler = () => {
    resetForm();
    confirmHandler();
  };
  const confirmErrorMessageHandler = () => {
    setError(null);
  };

  const modalHandler = () => {
    setModalVisible(true);
  };
  const handleLocationSelect = (data) => {
    const senioritetyData = [...seniorityData];
    let activeSenioritet;
    senioritetyData.map((item) => {
      if (item._id === data._id) {
        activeSenioritet = data;
      }
    });

    setSelected(activeSenioritet);
  };

  const handleStatusNotificationSelect = (data) => {
    const statusData = [...statuses];
    let activeStatus;
    statusData.map((item) => {
      if (item._id === data._id) {
        activeStatus = data;
      }
    });

    setSelectedStatus(activeStatus);
  };

  const changePasswordHandler = () => {
    router.push({
      pathname: "/(z_auth)/changePassword",
      params: { email, changeProfile },
    });
  };

  const removeQuestion = (id) => {
    router.push({
      pathname: "/(tabs)/(03_settings)/removeBarber",
      params: { id },
    });
  };
  const modalStatusHandler = () => {
    setStatusChecking(true);
  };
  if (isLoading === "getBarber") {
    return <SharedLoader isOpen={isLoading === "getBarber"} />;
  }
  if (modalVisible && !isLoading) {
    return (
      <BarbersSeniority
        seniorityData={seniorityData}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        selected={selected}
        handleLocationSelect={handleLocationSelect}
      />
    );
  }
  if (statusChecking && !isLoading) {
    return (
      <BarbersStatuses
        statuses={statuses}
        modalVisible={statusChecking}
        setModalVisible={setStatusChecking}
        selected={selectedStatus}
        handleStatusSelect={handleStatusNotificationSelect}
      />
    );
  }

  if (isLoading !== "getBarber") {
    return (
      <View style={styles.container}>
        <ScrollView
          ref={scrollRef}
          keyboardDismissMode="interactive"
          style={styles.safeArea}
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: 20,
            marginHorizontal: 12,
          }}
          keyboardShouldPersistTaps="always"
        >
          {changedImg !== undefined && (
            <View style={styles.containerImage}>
              <ImageCompress
                handlePickImage={selectedImgHandler}
                imageValue={changedImg}
              />
            </View>
          )}
          <View style={{ flex: 3, marginTop: 20 }}>
            <BarbersInput
              autoFocus
              icon="user"
              label={localization.BARBERS.name}
              value={name}
              onChangeText={setName}
              onSubmitEditing={() => emailInputRef.current.focus()}
              ref={refName}
              returnKeyType="next"
            />

            <View
              onLayout={(e) => {
                emailLayoutY.current = e.nativeEvent.layout.y;
              }}
            >
              <BarbersInput
                icon="at"
                label={localization.BARBERS.email}
                value={email}
                autoCapitalize="none"
                onChangeText={handleEmailChange}
                keyboardType="email-address"
                error={emailError}
                returnKeyType="next"
                ref={emailInputRef}
                onSubmitEditing={() => {
                  phoneNumberInputRef.current?.focus();
                  scrollRef.current?.scrollTo({
                    y: emailLayoutY.current - 20,
                    animated: true,
                  });
                }}
              />
            </View>

            <View
              onLayout={(e) => {
                phoneNumberLayoutY.current = e.nativeEvent.layout.y;
              }}
            >
              <BarbersInput
                icon="phone"
                label={localization.BARBERS.phoneNumber}
                value={phoneNumber}
                onChangeText={handlePhoneNumberChange}
                keyboardType="phone-pad"
                ref={phoneNumberInputRef}
                error={errorPhoneNumber}
                dataDetectorTypes="phoneNumber"
                placeholder="6x xxx xxxx"
              />
            </View>
            <BarbersStatusCheck
              modalHandler={modalStatusHandler}
              label={localization.BARBERS.status}
              selected={
                localization.code === "sr"
                  ? selectedStatus?.name?.nameLocal
                  : selectedStatus?.name?.nameEn
              }
            />
            <BarberSeniorityComponent
              modalHandler={modalHandler}
              label={localization.BARBERS.seniority}
              selected={selected?.title}
            />
            {changeProfile === "1" && (
              <View
                onLayout={(e) => {
                  passwordLayoutY.current = e.nativeEvent.layout.y;
                }}
              >
                <BarbersInput
                  icon="lock"
                  lock={localization.BARBERS.changePassword}
                  label={localization.BARBERS.password}
                  value={password}
                  autoCapitalize="none"
                  onChangeText={handlePasswordChange}
                  keyboardType="password"
                  error={passwordError}
                  returnKeyType="next"
                  ref={passwordInputRef}
                  onPress={changePasswordHandler}
                />
              </View>
            )}
          </View>
          <View style={[styles.btnContainer, editingId && styles.btnGap]}>
            <SharedButtonApproved
              onPress={addBarber}
              loading={isLoading === "addEdit"}
              text={
                editingId
                  ? localization.BARBERS.saveChanges
                  : localization.BARBERS.submitAdd
              }
              disabled={
                emailError?.length > 0 ||
                errorPhoneNumber?.length > 0 ||
                passwordError?.length > 0
              }
            />
            {editingId && changeProfile !== "1" && (
              <SharedButtonRejected
                onPress={() => removeQuestion(id)}
                loading={isLoading === "remove"}
                text={localization.BARBERS.removeBtn}
              />
            )}
          </View>
        </ScrollView>

        {isMessage && (
          <SharedMessage
            isOpen={isMessage}
            icon={<FontAwesome name="check-circle-o" size={64} color="white" />}
            onClose={confirmMessageHandler}
            onConfirm={confirmMessageHandler}
            buttonText="Ok"
            title={message}
          />
        )}
        {error?.length > 0 && (
          <SharedMessage
            isOpen={error?.length > 0}
            icon={<FontAwesome name="close" size={64} color="white" />}
            onClose={confirmErrorMessageHandler}
            onConfirm={confirmErrorMessageHandler}
            buttonText="Ok"
            title={error}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerPicker: {
    backgroundColor: "#1e1e1e",
    borderRadius: 12,
    marginVertical: 5,
    padding: 10,
  },
  btnContainer: {},
  btnGap: { gap: 10 },
  buttonRmv: {
    backgroundColor: "rgb(129, 29, 29)",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    borderColor: "white",
    borderWidth: 1,
  },
  picker: {
    height: 60,
  },
  editHint: {
    fontSize: 12,
    color: "#aaa",
    padding: 8,
  },

  containerImage: {
    alignContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#000000",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  image: {
    width: 60,
    height: 60,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
    marginTop: 20,
    marginBottom: 10,
  },
  input: {
    backgroundColor: "#1e1e1e",
    color: "#fff",
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  button: {
    backgroundColor: "rgb(0, 0, 0)",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    borderColor: "white",
    borderWidth: 1,
    marginTop: 5,
  },
  cancelButton: {
    backgroundColor: "#525252",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  serviceItem: {
    backgroundColor: "#2a2a2a",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    borderRadius: 8,
    marginBottom: 10,
  },
  serviceText: {
    color: "#fff",
    fontSize: 15,
  },
  editHint: {
    fontSize: 12,
    color: "#aaa",
    padding: 8,
  },
});
