import { useCompany } from "@/contexts/CompanyContext";
import { useLocalization } from "@/contexts/LocalizationContext";
import SharedTabHeader from "@/shared-components/SharedTabHeader";
import { FontAwesome } from "@expo/vector-icons";
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import useStatusNotification from './hooks/useStatusNotification';
import SharedBackButton from "@/shared-components/SharedBackButton";
import { router } from "expo-router";
import { SharedLoader } from "@/shared-components/SharedLoader";
import { SharedMessage } from "@/shared-components/SharedMessage";
import { useEffect } from "react";
import SharedButtonApproved from "@/shared-components/SharedButtonApproved";

const StatusReservationConfirmation = () => {
    const { localization } = useLocalization();
    const {
        notificationStatuses,
        changeStatusNotification,
        patchStatusNotification,
        isMessage,
        confirmHandler,
        isLoading,
        notificationData,
        error,
        message,
        getAllNotificationStatuses,
        getEmployerCheck,
        currentData
    } = useStatusNotification();

    const { company } = useCompany();

    useEffect(() => {
        setTimeout(async () => {
            await getAllNotificationStatuses();
            await getEmployerCheck();
        }, 20);
    }, []);


    if (isLoading === 'get') {
        return <SharedLoader isLoading={isLoading === 'get'} />
    }

    return (
        <View style={styles.container}>
            <SharedBackButton onPress={router.back} />
            <SharedTabHeader
                image={company?.media?.coverImageSettings}
                title={localization.SETTINGS.NOTIFICATIONSTATUS.capture}
            />

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
                            name={item._id === notificationData?._id && "check-circle-o"}
                            size={28}
                            color="white"
                        />
                    </TouchableOpacity>
                )}
            />


            <View style={{ marginHorizontal: 20 }}>
                <SharedButtonApproved
                    loading={isLoading === 'patch'}
                    disabled={currentData?._id === notificationData?._id}
                    onPress={patchStatusNotification}
                    text={localization.SETTINGS.NOTIFICATIONSTATUS.saveChanges}
                />
            </View>
            {isMessage && (
                <SharedMessage
                    isOpen={isMessage}
                    onClose={confirmHandler}
                    onConfirm={confirmHandler}
                    icon={
                        <FontAwesome
                            name={error ? "close" : "check-circle-o"}
                            size={64}
                            color="white"
                        />
                    }
                    title={error || message}
                    buttonText="OK"
                />
            )}
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
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
        marginHorizontal: 20,
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
