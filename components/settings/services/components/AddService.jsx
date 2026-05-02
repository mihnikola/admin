import { FontAwesome } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import ImageCompress from "../../ImageCompress";
import useServices from "../hooks/useServices";
import { useLocalization } from "@/contexts/LocalizationContext";
import { SharedMessage } from "@/shared-components/SharedMessage";
import { SharedQuestion } from "@/shared-components/SharedQuestion";
import { SharedLoader } from "@/shared-components/SharedLoader";
import { router, useLocalSearchParams } from "expo-router";
import ServiceInput from "./ServiceInput";
import SharedButtonRejected from "@/shared-components/SharedButtonRejected";
import SharedButtonApproved from "@/shared-components/SharedButtonApproved";

export default function AddService() {
  const { localization } = useLocalization();
  const params = useLocalSearchParams();
  const { id } = params;
  const {
    isLoading,
    error,
    setError,
    isMessage,
    setIsMessage,
    message,
    setMessage,
    addEditService,
    confirmHandler,
    getServiceHandler,
    getServiceData,
    removeService,
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
  const scrollRef = useRef(null);
  const refNameLocal = useRef(null);
  const refNameEng = useRef(0);
  const refDuration = useRef(0);
  const refPrice = useRef(0);
  const nameLocalLayout = useRef(0);
  const priceLayout = useRef(0);
  const durationLayout = useRef(0);
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

      addEditService(newService);
    }
  };
  const confirmMessageHandler = async () => {
    resetForm();
    confirmHandler();
  };
  const confirmErrorMessageHandler = () => {
    setError(null);
  };
  const handleNumberInput =
    (setValue, maxLength = 4) =>
    (text) => {
      const cleaned = text.replace(/\D/g, "").slice(0, maxLength);
      setValue(cleaned);
    };

    
  if (isLoading === "getService") {
    return <SharedLoader isOpen={isLoading === "getService"} />;
  }

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollRef}
        keyboardDismissMode="interactive"
        style={styles.safeArea}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
        keyboardShouldPersistTaps="always"
      >
        <View style={{ flex: 3 }}>
          <View style={styles.containerImage}>
            <ImageCompress
              handlePickImage={selectedImgHandler}
              imageValue={changedImg}
            />
          </View>
          {/* ovo ti je za lokalni jezik - srpski nameLocal */}
          <ServiceInput
            autoFocus
            icon="scissors"
            label={localization.SERVICES.serviceNameSr}
            value={nameLocal}
            onChangeText={setNameLocal}
            onSubmitEditing={() => refNameEng.current.focus()}
            ref={refNameLocal}
            returnKeyType="next"
          />
          <View
            onLayout={(e) => {
              nameLocalLayout.current = e.nativeEvent.layout.y;
            }}
          >
            <ServiceInput
              icon="scissors"
              label={localization.SERVICES.serviceNameEn}
              value={nameEn}
              onChangeText={setNameEn}
              ref={refNameEng}
              returnKeyType="next"
              onSubmitEditing={() => {
                refPrice.current?.focus();
                scrollRef.current?.scrollTo({
                  y: nameLocalLayout.current - 20,
                  animated: true,
                });
              }}
            />
          </View>
          <View
            onLayout={(e) => {
              priceLayout.current = e.nativeEvent.layout.y;
            }}
          >
            <ServiceInput
              icon="money"
              label={localization.SERVICES.servicePrice}
              value={price}
              onChangeText={handleNumberInput}
              keyboardType="numeric"
              onSubmitEditing={() => {
                refDuration.current?.focus();
                scrollRef.current?.scrollTo({
                  y: nameLocalLayout.current - 20,
                  animated: true,
                });
              }}
              setValue={setPrice}
              ref={refPrice}
            />
          </View>
          <View
            onLayout={(e) => {
              durationLayout.current = e.nativeEvent.layout.y;
            }}
          >
            <ServiceInput
              icon="history"
              label={localization.SERVICES.serviceDuration}
              value={duration}
              keyboardType="numeric"
              onChangeText={handleNumberInput}
              setValue={setDuration}
              ref={refDuration}
            />
          </View>
        </View>
        <View style={[styles.btnContainer, id && styles.btnGap]}>
          <SharedButtonApproved
            onPress={addService}
            loading={isLoading === "addEdit"}
            text={
              editingId
                ? localization.SERVICES.saveChanges
                : localization.SERVICES.submitAdd
            }
          />
          {id && (
            <SharedButtonRejected
              onPress={() => removeQuestion(id)}
              loading={isLoading === "remove"}
              text={localization.SERVICES.removeBtn}
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

const styles = StyleSheet.create({
  containerImage: {
    alignContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  btnContainer: {
    flexDirection: "column",
  },
  btnGap: { gap: 10 },

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
