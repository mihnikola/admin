import { FontAwesome } from "@expo/vector-icons";
import { useEffect, useState } from "react";
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

export default function BarbersAdd() {
  const { localization } = useLocalization();
  const params = useLocalSearchParams();
  const { id } = params;

  const {
    isLoading,
    error,
    isMessage,
    setIsMessage,
    setMessage,
    message,
    barberData,
    removeBarber,
    confirmHandler,
    getBarberHandler,
    addEditBarber,
    fetchAllSeniority,
    seniorityData,
    statuses,
    fetchAllStatusChecking
  } = useBarbers();



  const [name, setName] = useState("");

  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [imageValue, setImageValue] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [changedImg, setChangedImg] = useState(null);
  const { company } = useCompany();
  const [selected, setSelected] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [statusChecking, setStatusChecking] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const [isError, setIsError] = useState(null);

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
        await getBarberHandler(id);
      }, 100);
    }
  }, [id]);

  useEffect(() => {
    if (barberData) {
      setName(barberData?.name);
      setSelected(barberData?.seniority);
      setSelectedStatus(barberData?.statusCheck); 
      setPhoneNumber(barberData?.phoneNumber);
      selectedImgHandler(barberData?.image);
      setEditingId(barberData?.id);
    }
  }, [barberData]);

  const resetForm = () => {
    setName("");
    setSelected("");
    setSelectedStatus(null);
    setEmail("");
    setPhoneNumber("");
    setPassword("");
    setEditingId(null);
    setChangedImg(null);
  };
  const cancelEditHandler = () => {
    resetForm();
    router.back();
  };

  const addBarber = () => {
    if (editingId) {
      const updateBarber = {
        id: editingId,
        name,
        phoneNumber,
        seniority: selected,
        image: changedImg === imageValue ? null : changedImg,
        statusCheck: selectedStatus?._id
      };
      if (updateBarber) {
        addEditBarber(updateBarber);
      }
    } else {
      const newBarber = {
        name,
        email,
        phoneNumber,
        password,
        seniority: selected,
        image: changedImg === imageValue ? null : changedImg,
        statusCheck: selectedStatus?._id

      };
      if (newBarber?.name && newBarber?.email) {
        addEditBarber(newBarber);
      } else {
        setIsError(localization.BARBERS.errorFields);
      }
    }
  };
  const confirmMessageHandler = () => {
    if (editingId) {
      router.back();
    }
    resetForm();
    confirmHandler();
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
  }


  console.log("selectedStatus", selectedStatus)

  const [removeItem, setRemoveItem] = useState(null);
  const [isRemove, setIsRemove] = useState(null);

  const removeQuestion = (item) => {
    setIsRemove(true);
    setRemoveItem(item);
  };
  const removeCancelHandler = () => {
    setIsRemove(false);
  };
  const removeConfirmHandler = () => {
    setIsRemove(false);
    removeBarber(removeItem);
  };
  const modalStatusHandler = () => {
    setStatusChecking(true);
  }
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

  return (
    <View style={styles.container}>

      {changedImg !== undefined && (
        <View style={styles.containerImage}>
          <ImageCompress
            handlePickImage={selectedImgHandler}
            imageValue={changedImg}
          />
        </View>
      )}
      <ScrollView>
        <View style={{ flex: 3, marginTop: 20 }}>
          <BarbersInput
            icon="user"
            label={localization.BARBERS.name}
            value={name}
            onChangeText={setName}
          />

          {!id && (
            <BarbersInput
              icon="at"
              label={localization.BARBERS.email}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
          )}
          {!id && (
            <BarbersInput
              icon="lock"
              label={localization.BARBERS.password}
              value={password}
              onChangeText={setPassword}
              textContentType="password"
            />
          )}
          <BarbersInput
            icon="phone"
            label="Telefon"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
          />
          <BarbersStatusCheck
            modalHandler={modalStatusHandler}
            label="Status odobravanja"
            selected={localization.code === 'sr' ? selectedStatus?.name.nameLocal : selectedStatus?.name.nameEn}
          />
          <BarberSeniorityComponent
            modalHandler={modalHandler}
            label="Senioritet"
            selected={selected?.title}
          />
        </View>
      </ScrollView>
      <View style={[styles.btnContainer, editingId && styles.btnGap]}>
        <TouchableOpacity style={styles.button} onPress={addBarber}>
          {isLoading === "addEdit" && (
            <ActivityIndicator size={20} color="#fff" />
          )}
          {isLoading !== "addEdit" && (
            <Text style={styles.buttonText}>
              {editingId
                ? localization.BARBERS.saveChanges
                : localization.BARBERS.submitAdd}
            </Text>
          )}
        </TouchableOpacity>
        {editingId && (
          <TouchableOpacity
            style={styles.buttonRmv}
            onPress={() => removeQuestion(id)}
          >
            {isLoading === "remove" && (
              <ActivityIndicator size={20} color="#fff" />
            )}
            {isLoading !== "remove" && (
              <Text style={styles.buttonText}>
                {localization.BARBERS.removeBtn}
              </Text>
            )}
          </TouchableOpacity>
        )}
      </View>


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
      {isRemove && (
        <SharedQuestion
          isOpen={isRemove}
          onClose={removeCancelHandler}
          onLogOut={removeConfirmHandler}
          icon={
            <FontAwesome name="question-circle-o" size={64} color="white" />
          }
          title={localization.BARBERS.question}
          buttonTextYes={localization.BARBERS.confirmButton}
          buttonTextNo={localization.BARBERS.cancel}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  containerPicker: {
    backgroundColor: "#1e1e1e",
    borderRadius: 12,
    marginVertical: 5,
    padding: 10,
  },
  btnContainer: {},
  btnGap: { gap: 20 },
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
    paddingTop: 20,
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
