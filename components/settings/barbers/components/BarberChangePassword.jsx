import {
  View,
  Text,
  StyleSheet,
} from "react-native";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { ColorsBarber } from "@/constants/Colors";
import { TouchableOpacity } from "@/shared-components/TouchableOpacity";

const BarberChangePassword = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <FontAwesome
          name={props.icon}
          size={20}
          color={ColorsBarber.dark.textColorInput}
        />
      </View>

      <View style={styles.viewContainer}>
        {props.lock && (
          <TouchableOpacity style={styles.lockRow} onPress={props.onPress}>
            <Text style={styles.lock}>{props.lock}</Text>
            <Feather
              name="chevron-right"
              size={20}
              color={ColorsBarber.dark.textColorInput}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  lockRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  lock: {
    color: ColorsBarber.dark.textColorInput,
    fontSize: 15,
    fontFamily: "OldStandard-Regular",
  },
  phoneNumberContainer: {
    flexDirection: "row",
  },
  viewContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  container: {
    flexDirection: "row",
    backgroundColor: ColorsBarber.dark.inputField,
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 15,
    marginTop: 7
  },

  iconContainer: {
    marginRight: 15,
  },
});

export default BarberChangePassword;
