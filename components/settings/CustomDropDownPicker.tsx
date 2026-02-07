import { useState } from "react";
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const CustomDropDownPicker = ({
  options,
  selectedValue,
  onValueChange,
  placeholder,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleSelect = (value) => {
    onValueChange(value);
    setModalVisible(false);
  };

  const selectedLabel = options.find(
    (opt) => opt.value === selectedValue
  )?.label;

  return (
    <View style={styles.modalContainer}>
      <TouchableOpacity
        style={styles.dropdownButton}
        onPress={() => setModalVisible(true)}
        activeOpacity={0.7}
      >
        <Text
          style={[
            styles.dropdownButtonText,
            !selectedValue && styles.placeholder,
          ]}
        >
          {selectedLabel || placeholder}
        </Text>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={() => setModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.optionButton}
                  onPress={() => handleSelect(item.value)}
                >
                  <Text style={styles.optionText}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1
  },
  dropdownButton: {
    borderWidth: 1,
    borderColor: "#ffffffff",
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: "#272727ff",
  },
  dropdownButtonText: {
    textAlign: "center",
    fontSize: 18,
    color: "#ffffffff",
    fontWeight: "bold"

  },
  placeholder: {
    color: "#ffffffff",
    fontWeight: "bold"
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    paddingHorizontal: 40,
  },
  modalContent: {
    backgroundColor: "black",
  },
  optionButton: {
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: "#ecececff",
  },
  optionText: {
    fontSize: 18,
    textAlign: "center",
    color: "#ffffffff",
    fontWeight: "bold",
  },
});

export default CustomDropDownPicker;
