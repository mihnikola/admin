import { useCompany } from "@/contexts/CompanyContext";
import { useLocalization } from "@/contexts/LocalizationContext";
import { SharedButton } from "@/shared-components/SharedButton";
import SharedTabHeader from "@/shared-components/SharedTabHeader";
import { FontAwesome } from "@expo/vector-icons";
import {
    FlatList,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import useStatusNotification from './hooks/useStatusNotification';
import SharedBackButton from "@/shared-components/SharedBackButton";
import { router } from "expo-router";
import Loader from "@/shared-components/Loader";

const StatusReservationConfirmation = () => {
    const { localization } = useLocalization();
    const { notificationStatuses, changeStatusNotification, patchStatusNotification, isLoading } = useStatusNotification();

    const { company } = useCompany();

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="black" barStyle="dark-content" />
            <SharedBackButton onPress={router.back} />
            <SharedTabHeader
                image={company?.media?.coverImageSettings}
                title={localization.SETTINGS.NOTIFICATIONSTATUS.capture}
            />

            {isLoading && <Loader />}
            <FlatList
                data={notificationStatuses}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.languageItem}
                        onPress={() => changeStatusNotification(item)}
                    >
                        <Text style={styles.languageText}>
                            {localization.code === "en" ? item.name.nameEn : item.name.nameLocal}
                        </Text>
                        <FontAwesome
                            name={"check-circle-o"}
                            size={28}
                            color="white"
                        />
                    </TouchableOpacity>
                )}
            />


            <SharedButton
                // loading={loadingLogin === 'login'}
                onPress={patchStatusNotification}
                text="Posalji promene"
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
        padding: 20,
        marginHorizontal: 10,
        marginVertical: 10,
        borderRadius: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "black",
        borderWidth: 1,
        borderColor: 'white'
    },
    languageText: {
        fontSize: 18,
        fontWeight: "500",
        color: "#fff",
    },
});

export default StatusReservationConfirmation;
