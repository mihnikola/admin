import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { forwardRef, useState } from "react";
import { ColorsBarber } from "@/constants/Colors";

const BarberChangePassword = (props) => {
  const [isFocused, setIsFocused] = useState(false);
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
    padding: 20,
  },

  iconContainer: {
    marginRight: 15,
  },
});

export default BarberChangePassword;
