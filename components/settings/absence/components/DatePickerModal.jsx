import { StyleSheet, View } from "react-native"
import { Modal } from "react-native"
import DateTimePicker from "@react-native-community/datetimepicker";
import { TouchableOpacity } from "react-native";
import { Text } from "react-native";
import { ColorsBarber } from "@/constants/Colors";

const DatePickerModal = ({ setShowDate, showDate, handleChange, tempDate, handleConfirmIOS }) => {
    return (
        <Modal
            transparent={true}
            animationType="slide"
            visible={showDate}
            onRequestClose={() => setShowDate(false)}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <DateTimePicker
                        value={tempDate}
                        mode="date"
                        display="spinner"
                        onChange={handleChange}
                        minimumDate={new Date()}
                        textColor={ColorsBarber.dark.textColor}
                        style={styles.picker}
                    />
                    <TouchableOpacity
                        style={styles.doneButton}
                        onPress={handleConfirmIOS}
                    >
                        <Text style={styles.doneButtonText}>Ok</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({

    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.88)",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
    },
    modalContent: {
        backgroundColor: ColorsBarber.dark.backgroundModal, // Corresponds to bg-gray-800
        borderRadius: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.5,
        shadowRadius: 20,
        elevation: 15,
        padding: 32,
        maxWidth: 384,
        width: "100%",
        alignItems: "center",
    },
    picker: {
        width: "100%",
        height: 200,
    },
    doneButton: {
        marginTop: 15,
        backgroundColor: ColorsBarber.dark.btnBgColor,
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 10,
        width: "100%",
        alignItems: "center",
    },
    doneButtonText: {
        color: ColorsBarber.dark.textColor,
        fontWeight: "bold",
        fontSize: 16,
    },
});
export default DatePickerModal;