import { ColorsBarber } from "@/constants/Colors";
import { useCompany } from "@/contexts/CompanyContext";
import { useLocalization } from "@/contexts/LocalizationContext";
import SharedBackButton from "@/shared-components/SharedBackButton";
import SharedTabHeader from "@/shared-components/SharedTabHeader";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const changeLanguage = () => {
  const { changeLocalization, localization } = useLocalization();
  const [search, setSearch] = useState("");
  const [filteredLanguages, setFilteredLanguages] = useState([]);

  const { company } = useCompany();

  const languageLabels = {
    sr: {
      en: "Engleski",
      sr: "Srpski",
    },
    en: {
      en: "English",
      sr: "Serbian",
    },
  };
  const LANGUAGES = [
    { code: "en", label: languageLabels[localization.code]?.en || "English" },
    { code: "sr", label: languageLabels[localization.code]?.sr || "Serbian" },
  ];
  const handleSearch = (text) => {
    setSearch(text);
    const filtered = LANGUAGES.filter((lang) =>
      lang.label.toLowerCase().includes(text.toLowerCase()),
    );
    setFilteredLanguages(filtered);
  };

  useEffect(() => {
    setFilteredLanguages(LANGUAGES);
  }, [localization.code]);

  return (
    <View style={styles.container}>
      {/* <StatusBar backgroundColor="white" barStyle="light-content" /> */}
      <SharedBackButton onPress={router.back} styleBtn={{ marginTop: 10, marginLeft: 10 }} />

      <SharedTabHeader
        image={company?.media?.coverImageSettings}
        title={localization.SETTINGS.changeLanguage.capture}
      />
      <TextInput
        style={styles.search}
        placeholder={localization?.SETTINGS?.changeLanguage.filterCapture}
        placeholderTextColor={ColorsBarber.light.inActiveTextColor}
        value={search}
        onChangeText={handleSearch}
      />
      <FlatList
        data={filteredLanguages}
        keyExtractor={(item) => item.code}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.languageItem}
            onPress={() => changeLocalization(item)}
          >
            <Text style={styles.languageText}>{item.label}</Text>
            <FontAwesome
              name={localization.code === item.code && "check-circle-o"}
              size={28}
              color={ColorsBarber.light.textColor}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorsBarber.light.background,
  },
  captureContainer: {
    position: "absolute",
    marginHorizontal: 15,
  },
  headerImage: {
    width: "100%",
    height: 180,
    opacity: 0.8,
  },
  capture: {
    fontSize: 25,
    color: ColorsBarber.light.textColor,
    fontWeight: "500",
    paddingVertical: 130,
  },

  search: {
    color: ColorsBarber.light.textColor,
    borderColor: ColorsBarber.light.inActiveTextColor,
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    margin: 20,
    fontSize: 20,
  },

  languageItem: {
    padding: 15,
    marginHorizontal: 20,
    marginVertical: 7,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: ColorsBarber.light.item,
    borderWidth: 1,
    borderColor: ColorsBarber.light.textColor,
  },
  languageText: {
    fontSize: 18,
    fontWeight: "500",
    color: ColorsBarber.light.textColor,
  },
});

export default changeLanguage;
