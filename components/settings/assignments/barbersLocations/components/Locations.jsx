import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    Dimensions,
} from "react-native";
import { useLocalization } from "@/contexts/LocalizationContext";
import useLocationBarber from './../hooks/useLocationBarber';
import Loader from "@/shared-components/Loader";
import LocationItem from './LocationItem';
const Locations = () => {
    const { localization } = useLocalization();
    const { onSelectedLocation, isLoading, error, isMessage, message, setIsMessage, locationBarbersData, locations, toggleBarber, submitChanges, selectedLocation, confirmSubmit } = useLocationBarber();
    const { height: screenHeight } = Dimensions.get("window");
    const containerHeight = screenHeight * 0.7;
    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollContainer}>
                <View style={styles.content}>
                    <Text style={styles.title}>
                        {localization.PLACES.title}
                    </Text>
                    <View style={{ maxHeight: containerHeight }}>
                        {isLoading === "getLocations" && <Loader isOpen={isLoading === "getLocations"} />}
                        <ScrollView>
                            {isLoading !== "getLocations" && locations.map((item) => (
                                <LocationItem key={item.id} item={item} onSelectedLocation={onSelectedLocation} selectedLocation={selectedLocation} />
                            ))}
                        </ScrollView>
                    </View>
                </View>
            </ScrollView>
        </View >
    );
};
const styles = StyleSheet.create({
    content: {
        padding: 20
    },
    scrollContainer: {
        flex: 1
    },
    container: {
        flex: 1,
        backgroundColor: "black"
    },
    title: {
        fontSize: 18,
        fontWeight: "600",
        color: "white",
        marginBottom: 10,
        textAlign: 'center'
    },
    btn: {
        paddingBottom: 5,
        marginHorizontal: 20
    }

});
export default Locations;
