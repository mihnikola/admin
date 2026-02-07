import { FontAwesome } from "@expo/vector-icons";
import { useCallback, useEffect, useState } from "react";
import {
    ActivityIndicator,
    Dimensions,
    FlatList,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import useLocationBarber from "./../hooks/useLocationBarber";
import { useLocalization } from "@/contexts/LocalizationContext";
import { SharedMessage } from "@/shared-components/SharedMessage";
import { SharedQuestion } from "@/shared-components/SharedQuestion";
import { SharedLoader } from "@/shared-components/SharedLoader";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import Loader from "@/shared-components/Loader";
import LocationItem from "./LocationItem";
import BarberItem from "./BarberItem";

export default function Barbers() {

    const { height: screenHeight } = Dimensions.get("window");
    const containerHeight = screenHeight * 0.62;
    const { localization } = useLocalization();
    const { id, address } = useLocalSearchParams();
    const itemData = {
        id, address
    }
    const {
        isLoading,
        error,
        isMessage,
        setIsMessage,
        setMessage,
        message,
        locationBarbersData,
        removeService,
        confirmSubmit,
        getBarbersById,
        startEditing,
        servicesByBarbers,
        toggleBarber,
        submitChanges,
    } = useLocationBarber();

    const [isError, setIsError] = useState(null);

    const cancelHandler = () => {
        setIsError(null);
    };

    useEffect(() => {
        if (id) {
            getBarbersById(id);
        }
    }, [id]);


    return (
        <View style={styles.container}>
            {id && <LocationItem item={itemData} id={id} />}
            <Text style={styles.subTitle}>{localization.SERVICES.listServices}</Text>
            <View style={{ maxHeight: containerHeight }}>
                {isLoading === "getBarbers" && <View style={styles.loadingContainer}><Loader /></View>}
                {isLoading !== "getBarbers" && (
                    <FlatList
                        data={locationBarbersData}
                        keyExtractor={(item) => item._id}
                        renderItem={({ item }) => (<BarberItem item={item} toggleBarber={toggleBarber} />
                        )}
                    />
                )}
            </View>
            {isLoading !== "getBarbers" && (
                <View style={{ flex: 1 }}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => submitChanges(id)}
                    >
                        {isLoading === "post" && (
                            <ActivityIndicator size={20} color="#fff" />
                        )}
                        {isLoading !== "post" && (
                            <Text style={styles.buttonText}>
                                {localization.SERVICES.saveChanges}
                            </Text>
                        )}
                    </TouchableOpacity>
                </View>
            )}

            {isMessage && (
                <SharedMessage
                    isOpen={isMessage}
                    icon={<FontAwesome name="check-circle-o" size={64} color="white" />}
                    onClose={confirmSubmit}
                    onConfirm={confirmSubmit}
                    buttonText="Ok"
                    title={message}
                />
            )}
            {isError?.length > 0 && (
                <SharedMessage
                    isOpen={isError?.length > 0}
                    icon={<FontAwesome name="close" size={64} color="white" />}
                    onClose={cancelHandler}
                    onConfirm={cancelHandler}
                    buttonText="Ok"
                    title={isError}
                />
            )}

        </View>
    );
}

const styles = StyleSheet.create({
    loadingContainer:{
        paddingTop: 40
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

    subTitle: {
        fontSize: 18,
        fontWeight: "600",
        color: "#fff",
        textAlign: "center",
        marginBottom: 12,
        marginTop: 9,
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
        marginTop: 20,
    },
    cancelButton: {
        backgroundColor: "#525252",
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
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
