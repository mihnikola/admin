import { View, Text, StyleSheet } from "react-native";
import { useLocalization } from "@/contexts/LocalizationContext";
import SharedBackButton from "@/shared-components/SharedBackButton";
import { SharedInput } from "@/shared-components/SharedInput";
import { SharedButton } from "@/shared-components/SharedButton";
import { SharedMessage } from "@/shared-components/SharedMessage";
import { FontAwesome } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { ColorsBarber } from "@/constants/Colors";
import { useState } from "react";
import WrapperAuth from "@/wrapper/WrapperAuth";
import { useCategories } from "@/contexts/CategoriesContext";
import SharedButtonRejected from "@/shared-components/SharedButtonRejected";
import { SharedQuestion } from "@/shared-components/SharedQuestion";

const AddCategory = () => {
  const { localization } = useLocalization();
  const {
    submitHandler,
    deleteHandler,
    isLoading,
    setIsMessage,
    isMessage,
    message,
    setError,
    isConfirmation,
    setIsConfirmation,
    error,
    questionHandler,
  } = useCategories();

  const { categoryValue, id } = useLocalSearchParams();
  const [category, setCategory] = useState(categoryValue || "");

  const confirmHandler2 = async () => {
    setIsMessage(false);
    router.back();
  };

  return (
    <WrapperAuth>
      <SharedBackButton
        onPress={router.back}
        absolutePosition={false}
        styleBtn={{ marginBottom: 30 }}
      />

      <View style={{ flex: 1, backgroundColor: ColorsBarber.light.background }}>
        <View>
          <Text style={styles.mainTitle}>
            {id
              ? localization.CATEGORY.edit
              : localization.CATEGORY.createLabel}{" "}
          </Text>
        </View>
        <View style={{ marginTop: 20 }}>
          <SharedInput
            label={localization.CATEGORY.title}
            value={category}
            onChangeText={setCategory}
            placeholder={localization.CATEGORY.enter}
            style={styles.input}
          />
        </View>
      </View>

      <View>
        <SharedButton
          disabled={category?.length === 0}
          onPress={() => submitHandler(id, category)}
          loading={isLoading === "post" || isLoading === "patch"}
          text={
            id ? localization.CATEGORY.save : localization.CATEGORY.createBtn
          }
        />
        {id && (
          <SharedButtonRejected
            onPress={questionHandler}
            loading={isLoading === "delete"}
            text={localization.CATEGORY.deleteBtn}
          />
        )}
      </View>
      {isConfirmation && (
        <SharedQuestion
          isOpen={isConfirmation}
          onClose={() => setIsConfirmation(false)}
          onLogOut={() => deleteHandler(id)}
          buttonTextNo={localization.CLIENTS.cancel}
          buttonTextYes="OK"
          icon={
            <FontAwesome
              name="question"
              size={64}
              color={ColorsBarber.light.textColor}
            />
          }
          title={message}
        />
      )}
     
      {isMessage && (
        <SharedMessage
          isOpen={isMessage}
          onClose={confirmHandler2}
          onConfirm={confirmHandler2}
          icon={
            <FontAwesome
              name={error ? "close" : "check-circle"}
              size={64}
              color={ColorsBarber.light.textColor}
            />
          }
          title={error || message}
          buttonText={localization.OK.label}
        />
      )}
    </WrapperAuth>
  );
};
const styles = StyleSheet.create({
  input: {
    backgroundColor: "white",
    color: ColorsBarber.light.item,
    padding: 15,
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 2,
    borderColor: "white",
    paddingVertical: 15,
    fontFamily: "OldStandard-Bold",
  },
  mainTitle: {
    fontSize: 22,
    color: ColorsBarber.light.textColor,
    fontFamily: "OldStandard-Bold",
  },
  subtitle: {
    fontSize: 16,
    color: ColorsBarber.light.textColor,
    fontFamily: "OldStandard-Regular",
  },
});
export default AddCategory;
