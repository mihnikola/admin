import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const SharedModal = ({ modalVisible, setModalVisible, item }) => {

    console.log("item", item)
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}

        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    {/* CLOSE BUTTON */}
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => setModalVisible(false)}
                        hitSlop={30}
                    >
                        <Text style={styles.closeButtonText}>X</Text>
                    </TouchableOpacity>
                    <Text style={styles.modalTitle}>{item.title}</Text>

                    <Text style={styles.modalText}>
                        <Text style={styles.bold}>Tretman: </Text>{item.name}
                    </Text>


                    <Text style={styles.modalText}>
                        <Text style={styles.bold}>Vreme: </Text>{item.startTime} - {item.endTime}
                    </Text>

                    {/* <Text style={styles.modalText}>
                        <Text style={styles.bold}>Status: </Text>{item.status}
                    </Text> */}

                    <Text style={styles.modalText}>
                        <Text style={styles.bold}>Korisnik: </Text>{item.reservation.user}
                    </Text>

                    {/* <Text style={styles.modalText}>{item.reservation.note}</Text> */}
                    <Text style={styles.modalText}>Napomena: {item.reservation.note}</Text>


                    {/* BUTTONS */}
                    <View style={styles.buttonRow}>
                        <TouchableOpacity
                            style={styles.approveButton}
                            onPress={() => {
                                console.log("APPROVED:", item.id);
                                setModalVisible(false);
                            }}
                        >
                            <Text style={styles.buttonText}>APPROVE</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.cancelButton}
                            onPress={() => {
                                console.log("CANCELLED:", item.id);
                                setModalVisible(false);
                            }}
                        >
                            <Text style={styles.buttonText}>CANCELL</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalContent: {
        width: "80%",
        backgroundColor: "#1f1f1f",
        padding: 20,
        borderRadius: 10,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "white",
        marginBottom: 10,
    },
    modalText: {
        fontSize: 14,
        color: "#dcdcdc",
        marginBottom: 8,
    },
    bold: { fontWeight: "bold" },

    closeButton: {
        marginTop: 10,
        backgroundColor: "#444",
        width: 40,
        position:"absolute",
        right: 15,
        top:10,
        padding: 1,
        borderRadius: 8,
        alignItems: "center",
    },
    closeButtonText: {
        color: "white",
        fontWeight: "bold",
        padding: 10
    },
    buttonRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 15,
    },

    approveButton: {
        flex: 1,
        backgroundColor: "green",
        padding: 12,
        marginRight: 8,
        borderRadius: 8,
        alignItems: "center",
    },

    cancelButton: {
        flex: 1,
        backgroundColor: "red",
        padding: 12,
        marginLeft: 8,
        borderRadius: 8,
        alignItems: "center",
    },

    buttonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 14,
    },
})
