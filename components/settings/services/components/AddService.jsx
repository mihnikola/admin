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
import ServiceInput from "./ServiceInput";

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
    getServiceData,
    removeService
  } = useServices();

  useEffect(() => {
    if (id) {
      setTimeout(async () => {
        await getServiceHandler(id);
      }, 100);
    }
  }, [id]);

  const [nameLocal, setNameLocal] = useState(""); //ovo ti je za lokalni jezik - srpski nameLocal
  const [nameEn, setNameEn] = useState(""); //ovo ti je za jezik koji dodajes - engleski nameEn

  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [imageValue, setImageValue] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [changedImg, setChangedImg] = useState(null);

  const [isError, setIsError] = useState(null);

  const selectedImgHandler = (imgData) => {
    if (imgData) {
      setChangedImg(imgData);
    }
  };

  useEffect(() => {
    if (getServiceData) {
      setNameEn(getServiceData?.name?.nameEn);
      setNameLocal(getServiceData?.name?.nameLocal);
      setPrice(getServiceData.price?.toString() || "");
      setDuration(getServiceData.duration?.toString() || "");
      selectedImgHandler(getServiceData?.image);
      setEditingId(getServiceData?.id);
    }
  }, [getServiceData]);

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
    removeService(removeItem);
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

  if (isLoading === "remove") {
    return <SharedLoader isOpen={isLoading === "remove"} />;
  }
  return (
    <View style={styles.container}>
      <View style={styles.containerImage}>
        <ImageCompress
          handlePickImage={selectedImgHandler}
          imageValue={changedImg}
        />
      </View>

      <View style={{ flex: 3, marginTop: 20 }}>
        {/* ovo ti je za lokalni jezik - srpski nameLocal */}
        <ServiceInput
          icon="scissors"
          label={localization.SERVICES.serviceNameSr}
          value={nameLocal}
          onChangeText={setNameLocal}
        />

        <ServiceInput
          icon="scissors"
          label={localization.SERVICES.serviceNameEn}
          value={nameEn}
          onChangeText={setNameEn}
        />
        {/* 
        <TextInput
          style={styles.input}
          placeholder={localization.SERVICES.serviceNameSr}
          value={nameLocal}
          onChangeText={setNameLocal}
        /> */}
        {/* ovo ti je za lokalni jezik - engleski nameEn */}

        {/* <TextInput
          style={styles.input}
          placeholder={localization.SERVICES.serviceNameEn}
          value={nameEn}
          onChangeText={setNameEn}
        /> */}

        {/* <TextInput
          style={styles.input}
          placeholder={localization.SERVICES.servicePrice}
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
        /> */}

        <ServiceInput
          icon="money"
          label={localization.SERVICES.servicePrice}
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
        />
        <ServiceInput
          icon="history"
          label={localization.SERVICES.serviceDuration}
          value={duration}
          onChangeText={setDuration}
          keyboardType="numeric"
        />
        {/* <TextInput
          style={styles.input}
          placeholder={localization.SERVICES.serviceDuration}
          value={duration}
          onChangeText={setDuration}
          keyboardType="numeric"
        /> */}
      </View>

      <View style={[styles.btnContainer, id && styles.btnGap]}>
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
        {id && (
          <TouchableOpacity
            style={styles.buttonRmv}
            onPress={() => removeQuestion(id)}
          >
            {isLoading === "remove" && (
              <ActivityIndicator size={20} color="#fff" />
            )}
            {isLoading !== "remove" && (
              <Text style={styles.buttonText}>
                {localization.SERVICES.removeBtn}
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
          title={localization.SERVICES.question}
          buttonTextYes={localization.SERVICES.confirmButton}
          buttonTextNo={localization.SERVICES.cancel}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  containerImage: {
    alignContent: "center",
    alignItems: "center",
    alignSelf: "center",
    paddingTop: 20,
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
