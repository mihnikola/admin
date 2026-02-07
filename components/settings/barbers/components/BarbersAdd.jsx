import { FontAwesome } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import ImageCompress from "../../ImageCompress";
import useBarbers from "../hooks/useBarbers";
import Loader from "../../../../shared-components/Loader";
import { useLocalization } from "@/contexts/LocalizationContext";
import { SharedMessage } from "@/shared-components/SharedMessage";
import { SharedQuestion } from "@/shared-components/SharedQuestion";
import { SharedLoader } from "@/shared-components/SharedLoader";
import { useCompany } from "@/contexts/CompanyContext";
import SharedCoverImage from "@/shared-components/SharedCoverImage";
import { router, useLocalSearchParams } from "expo-router";

export default function BarbersAdd() {
  const { localization } = useLocalization();
  const params = useLocalSearchParams();
  const { id } = params;
  console.log("startEditing", params);

  const {
    isLoading,
    error,
    isMessage,
    setIsMessage,
    setMessage,
    message,
    barberData,
    barbersData,
    removeBarber,
    confirmHandler,
    getBarberHandler,
    startEditing,
    addEditBarber,
    editScreen,
  } = useBarbers();

  useEffect(() => {
    if (id) {
      getBarberHandler(id);
    }
  }, [id]);

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [imageValue, setImageValue] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [changedImg, setChangedImg] = useState(null);
  const { company } = useCompany();

  const [isError, setIsError] = useState(null);

  const selectedImgHandler = (imgData) => {
    if (imgData) {
      setChangedImg(imgData);
    }
  };

  useEffect(() => {
    if (editScreen) {
      setName(barberData?.name);

      setPhoneNumber(barberData?.phoneNumber);
      selectedImgHandler(barberData?.image);
      setEditingId(barberData?.id);
    }
  }, [editScreen]);

  const resetForm = () => {
    setName("");
    setEmail("");
    setPhoneNumber("");
    setPassword("");
    setEditingId(null);
    setChangedImg(null);
  };
  const cancelEditHandler = () => {
    router.back();
    resetForm();
  };

  const addBarber = () => {
    if (editingId) {
      const updateBarber = {
        id: editingId,
        name,
        phoneNumber,
        image: changedImg === imageValue ? null : changedImg,
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
        image: changedImg === imageValue ? null : changedImg,
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

  if (isLoading === "getBarber") {
    return <SharedLoader isOpen={isLoading === "getBarber"} />;
  }

  return (
    <View style={styles.container}>
      {<SharedCoverImage image={company?.media?.coverImageHome} />}
      <View style={styles.containerImage}>
        <ImageCompress
          handlePickImage={selectedImgHandler}
          imageValue={changedImg}
        />
      </View>

      <View style={{ flex: 3, marginTop: 20 }}>
        <TextInput
          style={styles.input}
          placeholder={localization.BARBERS.name}
          value={name}
          onChangeText={setName}
        />
        {!editScreen && (
          <TextInput
            style={styles.input}
            placeholder={localization.BARBERS.email}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        )}
        {!editScreen && (
          <TextInput
            style={styles.input}
            placeholder={localization.BARBERS.password}
            value={password}
            onChangeText={setPassword}
            keyboardType="visible-password"
          />
        )}

        <TextInput
          style={styles.input}
          placeholder={localization.BARBERS.phoneNumber}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
        />
      </View>

      <View style={{ flex: 1 }}>
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
      </View>

      {editingId && (
        <TouchableOpacity
          style={[styles.button, styles.cancelButton]}
          onPress={cancelEditHandler}
        >
          <Text style={styles.buttonText}>{localization.BARBERS.cancel}</Text>
        </TouchableOpacity>
      )}
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
    </View>
  );
}

const styles = StyleSheet.create({
  containerImage: {
    position: "absolute",
    alignContent: "center",
    alignItems: "center",
    alignSelf: "center",
    paddingTop: 20,
  },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#121212",
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
