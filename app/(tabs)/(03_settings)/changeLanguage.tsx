import { useCompany } from "@/contexts/CompanyContext";
import { useLocalization } from "@/contexts/LocalizationContext";
import SharedTabHeader from "@/shared-components/SharedTabHeader";
import { FontAwesome } from "@expo/vector-icons";
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
      lang.label.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredLanguages(filtered);
  };

  useEffect(() => {
    setFilteredLanguages(LANGUAGES);
  }, [localization.code]);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="black" barStyle="dark-content" />

      <SharedTabHeader
        image={company?.media?.coverImageSettings}
        title={localization.SETTINGS.changeLanguage.capture}
      />
      <TextInput
        style={styles.search}
        placeholder={localization?.SETTINGS?.changeLanguage.filterCapture}
        placeholderTextColor="gray"
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
              color="white"
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
    backgroundColor: "black",
  },
  captureContainer: {
    position: "absolute",
    marginHorizontal: 15,
  },
  headerImage: {
    width: "100%",
    height: 180,
    opacity: 0.2,
  },
  capture: {
    fontSize: 25,
    color: "white",
    fontWeight: "500",
    paddingVertical: 130,
  },

  search: {
    color: "white",
    borderColor: "grey",
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
    backgroundColor: "black",
    borderWidth:1,
    borderColor: 'white'
  },
  languageText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#fff",
  },
});

export default changeLanguage;
