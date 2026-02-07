import { useCompany } from "@/contexts/CompanyContext";
import { useLocalization } from "@/contexts/LocalizationContext";
import ReservationContext from "@/contexts/ReservationContext";
import SharedItemLocation from "@/shared-components/SharedItemLocation";
import { router } from "expo-router";
import { useContext } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Loader from "../../../shared-components/Loader";
import SharedCoverImage from "../../../shared-components/SharedCoverImage";
import SharedTitle from "../../../shared-components/SharedTitle";
import useFetchLocations from "../../../shared-hooks/useFetchLocations";

const Locations = () => {
    const { reservation, updateReservation } = useContext(ReservationContext);
    const { isLoading, error, locationsData } = useFetchLocations();
    const { localization } = useLocalization();
    const { company } = useCompany();

    console.log("Locations+++", locationsData);
    const redirectHandler = (location) => {
        updateReservation({ ...reservation, location });
        const pathName = "/(tabs)/(01_home)/calendar";
        router.push({
            pathname: pathName,
            params: { backButton: true },
        });
    };

    return (
        <ScrollView style={styles.container}>
            <SharedCoverImage image={company?.media?.coverImageAppointments} />
            {!isLoading && <SharedTitle title={localization.PLACES.title} />}
            {isLoading && <Loader />}
            {!isLoading && (
                <View style={styles.contentContainer}>
                    {locationsData?.map((item) => (
                        <SharedItemLocation
                            key={item.id}
                            data={item}
                            redirectHandler={redirectHandler}
                        />
                    ))}
                </View>
            )}
            {!isLoading && error && (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{localization.PLACES.network}</Text>
                </View>
            )}
        </ScrollView>
    );
};

export default Locations;

const styles = StyleSheet.create({
    coverImage: {
        width: "100%",
        height: 200,
        opacity: 0.2,
    },

    contentContainer: {
        marginTop: 10,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
    },

    captureContainer: {
        position: "absolute",
        marginHorizontal: 15, // Side padding for the list
    },
    capture: {
        fontSize: 32,
        color: "white",
        fontWeight: "500",
        paddingVertical: 130,
    },

    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "black",
    },
    errorContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000",
        alignSelf: "center",
        alignContent: "center",
        height: 500,
    },
    errorText: {
        marginhorizontal: 40,
        fontSize: 16,
        textAlign: "center",
        color: "gray",
    },
});