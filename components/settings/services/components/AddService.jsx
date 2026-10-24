import { FontAwesome } from "@expo/vector-icons";
import React, { useContext, useEffect, useRef, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import ImageCompress from "../../sharedComponents/ImageCompress";
import { useLocalization } from "@/contexts/LocalizationContext";
import { SharedMessage } from "@/shared-components/SharedMessage";
import { SharedQuestion } from "@/shared-components/SharedQuestion";
import { router, useLocalSearchParams } from "expo-router";
import ServiceInput from "./ServiceInput";
import SharedButtonRejected from "@/shared-components/SharedButtonRejected";
import SharedButtonApproved from "@/shared-components/SharedButtonApproved";
import { ColorsBarber } from "@/constants/Colors";
import SharedBackButton from "@/shared-components/SharedBackButton";
import { useServiceCategory } from "@/contexts/ServiceCategoryContext";
import CategoryComponent from './CategoryComponent';
import { SharedLoader } from "@/shared-components/SharedLoader";
import Loader from "@/shared-components/Loader";
export default function AddService() {
  const { localization } = useLocalization();
  const params = useLocalSearchParams();
  const { id } = params;
  const { isLoading, error, setError, addEditService, isMessage, message, confirmHandler, getServiceHandler, getServiceData, removeService,
    requestData, setRequestData, setCategoryName,
    categoryName,
    setCategoryId,
    categoryId } = useServiceCategory();
  const [nameLocal, setNameLocal] = useState("");
  const [nameEn, setNameEn] = useState("");

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
    if (id) {
      getServiceHandler(id).then((data) => {
        if (data) {
          setNameEn(data?.name?.nameEn || "");
          setNameLocal(data?.name?.nameLocal || "");
          setPrice(data?.price?.toString() || "");
          setDuration(data?.duration?.toString() || "");
          selectedImgHandler(data?.image);
          setEditingId(data?._id || data?.id);

          const catName = localization.code === 'en'
            ? data?.category?.name?.nameEn
            : data?.category?.name?.nameLocal;

          setCategoryName(catName || null);
          setCategoryId(data?.category?._id || null);
        }
      });
    }
  }, [id]);

  useEffect(() => {
    if (requestData) {
      const catNameRequest = localization.code === 'en'
        ? requestData?.name?.nameEn
        : requestData?.name?.nameLocal;

      setCategoryName(catNameRequest || null);
      setCategoryId(requestData?._id || null);
    }
  }, [requestData])

  const isValid = (() => {
    // Ako je u pitanju kreiranje novog servisa
    if (!editingId) {
      return Boolean(
        nameEn?.trim() &&
        nameLocal?.trim() &&
        price?.toString().trim() &&
        duration?.toString().trim() &&
        changedImg
      );
    }

    // Ako je u pitanju izmena postojećeg servisa (poređenje sa originalnim podacima)
    const originalPrice = getServiceData?.price?.toString() ?? "";
    const originalDuration = getServiceData?.duration?.toString() ?? "";
    const originalNameEn = getServiceData?.name?.nameEn ?? "";
    const originalNameLocal = getServiceData?.name?.nameLocal ?? "";
    const originalImage = getServiceData?.image ?? null;
    const originalCategoryId = getServiceData?.category?._id ?? null;

    // Proveravamo da li se BILO KOJE polje razlikuje od originalnog
    const hasChanges = (
      originalNameEn !== nameEn ||
      originalNameLocal !== nameLocal ||
      originalPrice !== price.toString() ||
      originalDuration !== duration.toString() ||
      originalImage !== changedImg ||
      originalCategoryId !== categoryId
    );

    // Dodatno osiguranje: dugme je aktivno samo ako ima izmena I ako su obavezna polja popunjena
    const areFieldsValid = Boolean(
      nameEn?.trim() &&
      nameLocal?.trim() &&
      price?.toString().trim() &&
      duration?.toString().trim()
    );

    return hasChanges && areFieldsValid;
  })();



  // const validationData = (id) => {
  //   if (!id) {
  //     if (nameEn?.length > 0 && nameLocal?.length > 0 && price?.length > 0 && duration?.length > 0 && changedImg) {
  //       return true;
  //     }
  //   } else if (
  //     getServiceData?.id === editingId &&
  //     getServiceData?.name?.nameEn === nameEn &&
  //     getServiceData?.name?.nameLocal === nameLocal &&
  //     getServiceData.price?.toString() === price &&
  //     getServiceData.duration?.toString() === duration &&
  //     getServiceData?.image === changedImg &&
  //     getServiceData?.category?._id === categoryId
  //   ) {
  //     return false;

  //   } else {
  //     return true;

  //   }
  // };
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
        categoryId: categoryId || null,
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

      setRequestData(newService);
      router.push({ pathname: "/(tabs)/(03_settings)/getCategories", params: { name: localization.code === 'en' ? nameEn : nameLocal } })
    }


  };
  const confirmMessageHandler = async () => {
    resetForm();
    confirmHandler(id);
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

  const redirectHandler = () => {
    router.push({
      pathname: "/(tabs)/(03_settings)/getCategories",
      params:
      {
        name: localization.code === 'en' ? nameEn : nameLocal,
        categoryId: categoryId || null,
        serviceId: editingId || null
      }
    })
  }


  return (
    <View style={styles.container}>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 30,
          marginHorizontal: 15,
        }}
      >
        <View>
          <SharedBackButton
            onPress={router.back}
            absolutePosition={false}
          />
        </View>
      </View>
      {isLoading === "getServiceData" && <Loader />}
      {isLoading !== "getServiceData" &&
        <View style={{ flex: 1 }}>
          <View style={styles.containerImage}>
            <ImageCompress
              handlePickImage={selectedImgHandler}
              imageValue={changedImg}
              setImageValue={setChangedImg}
            />
          </View>
          <ServiceInput
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

          {id && <CategoryComponent
            modalHandler={redirectHandler}
            label={localization.SETTINGS.LOCATIONSBARBERS.category}
            selected={categoryName}
          />}

        </View>

      }
      {isLoading !== 'getServiceData' &&
        <View style={[styles.btnContainer, id && styles.btnGap]}>
          <SharedButtonApproved
            onPress={addService}
            loading={isLoading === "addEdit"}
            // disabled={!validationData(id)}
            disabled={!isValid}
            text={
              editingId
                ? localization.SERVICES.saveChanges
                : localization.SERVICES.continue
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
      }



      {isMessage && (
        <SharedMessage
          isOpen={isMessage}
          icon={
            <FontAwesome
              name="check-circle-o"
              size={64}
              color={ColorsBarber.dark.textColor}
            />
          }
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
            <FontAwesome
              name="question-circle-o"
              size={64}
              color={ColorsBarber.dark.textColor}
            />
          }
          title={localization.SERVICES.question}
          buttonTextYes={localization.SERVICES.confirmButton}
          buttonTextNo={localization.SERVICES.cancel}
        />
      )}
      {error?.length > 0 && (
        <SharedMessage
          isOpen={error?.length > 0}
          icon={
            <FontAwesome
              name="close"
              size={64}
              color={ColorsBarber.dark.textColor}
            />
          }
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
    backgroundColor: ColorsBarber.dark.background,
  },
  errorLoading: {
    marginTop: 100,
    alignContent: "center",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: ColorsBarber.dark.background,
    height: "100%",
  },
  btnContainer: {
    flexDirection: "column",
  },
  btnGap: { gap: 10 },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: ColorsBarber.dark.background,
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
    backgroundColor: ColorsBarber.dark.item,
    color: ColorsBarber.dark.textColor,
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
