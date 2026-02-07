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
import useServices from "../hooks/useServices";
import Loader from "../../../../shared-components/Loader";
import { useLocalization } from "@/contexts/LocalizationContext";
import { SharedMessage } from "@/shared-components/SharedMessage";
import { SharedQuestion } from "@/shared-components/SharedQuestion";
import { SharedLoader } from "@/shared-components/SharedLoader";
import { useCompany } from "@/contexts/CompanyContext";
import SharedCoverImage from "@/shared-components/SharedCoverImage";
import { router, useLocalSearchParams } from "expo-router";

export default function AddService() {
  const { localization } = useLocalization();
  const params = useLocalSearchParams();
  const { id } = params;

  const {
    isLoading,
    error,
    isMessage,
    setIsMessage,
    message,
    setMessage,
    addEditService,
    confirmHandler,
    getServiceHandler,
    getService,
    editScreen,
  } = useServices();

  useEffect(() => {
    if (id) {
      getServiceHandler(id);
    }
  }, [id]);

  const [nameLocal, setNameLocal] = useState(""); //ovo ti je za lokalni jezik - srpski nameLocal
  const [nameEn, setNameEn] = useState(""); //ovo ti je za jezik koji dodajes - engleski nameEn

  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
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
      setNameEn(getService?.name?.nameEn);
      setNameLocal(getService?.name?.nameLocal);
      setPrice(getService.price?.toString() || "");
      setDuration(getService.duration?.toString() || "");
      selectedImgHandler(getService?.image);
      setEditingId(getService?.id);
    }
  }, [editScreen]);

  const resetForm = () => {
    setNameEn("");
    setNameLocal("");
    setPrice("");
    setDuration("");
    setEditingId(null);
    setChangedImg(null);
  };
  const cancelEditHandler = () => {
    router.back();
    resetForm();
  };

  const addService = () => {
    if (editingId) {
      const updateService = {
        id: editingId,
        nameLocal,
        nameEn,
        price: parseFloat(price),
        duration: parseInt(duration),
        image: changedImg === imageValue ? null : changedImg,
      };
      if (updateService) {
        addEditService(updateService);
      }
    } else {
      const newService = {
        nameLocal,
        nameEn,
        price: parseFloat(price),
        duration: parseInt(duration),
        image: changedImg === imageValue ? null : changedImg,
      };

      if (
        newService?.image &&
        newService?.nameLocal &&
        newService?.nameEn &&
        newService?.price &&
        newService?.duration
      ) {
        addEditService(newService);
      } else {
        setIsError(localization.SERVICES.errorFields);
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

  if (isLoading === "getService") {
    return <SharedLoader isOpen={isLoading === "getService"} />;
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
        {/* ovo ti je za lokalni jezik - srpski nameLocal */}
        <TextInput
          style={styles.input}
          placeholder={localization.SERVICES.serviceNameSr}
          value={nameLocal}
          onChangeText={setNameLocal}
        />
        {/* ovo ti je za lokalni jezik - engleski nameEn */}

        <TextInput
          style={styles.input}
          placeholder={localization.SERVICES.serviceNameEn}
          value={nameEn}
          onChangeText={setNameEn}
        />

        <TextInput
          style={styles.input}
          placeholder={localization.SERVICES.servicePrice}
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
        />

        <TextInput
          style={styles.input}
          placeholder={localization.SERVICES.serviceDuration}
          value={duration}
          onChangeText={setDuration}
          keyboardType="numeric"
        />
      </View>

      <View style={{ flex: 1 }}>
        <TouchableOpacity style={styles.button} onPress={addService}>
          {isLoading === "addEdit" && (
            <ActivityIndicator size={20} color="#fff" />
          )}
          {isLoading !== "addEdit" && (
            <Text style={styles.buttonText}>
              {editingId
                ? localization.SERVICES.saveChanges
                : localization.SERVICES.submitAdd}
            </Text>
          )}
        </TouchableOpacity>
      </View>

      {editingId && (
        <TouchableOpacity
          style={[styles.button, styles.cancelButton]}
          onPress={cancelEditHandler}
        >
          <Text style={styles.buttonText}>{localization.SERVICES.cancel}</Text>
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
