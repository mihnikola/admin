// components/OtpInput.js
import React, { useRef } from "react";
import { View, TextInput, StyleSheet } from "react-native";

const OtpInput = ({ code, setCode, maxLength = 6 }) => {
  const inputs = useRef([]);

  const handleChange = (text, index) => {
    if (/^\d$/.test(text) || text === "") {
      const newCode = [...code];
      newCode[index] = text;
      setCode(newCode);

      if (text !== "" && index < maxLength - 1) {
        inputs.current[index + 1].focus();
      }

      if (text === "" && index > 0) {
        inputs.current[index - 1].focus();
      }
    }
  };

  return (
    <View style={styles.container}>
      {Array(maxLength)
        .fill(0)
        .map((_, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputs.current[index] = ref)}
            style={styles.input}
            keyboardType="number-pad"
            maxLength={1}
            onChangeText={(text) => handleChange(text, index)}
            value={code[index] || ""}
          />
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
    marginVertical: 20,
    
  },
  input: {
    borderWidth: 1,
    borderColor: "#fff",
    backgroundColor: "#000",
    color: '#fff',
    borderRadius: 10,
    width: 50,
    height: 60,
    fontSize: 24,
    textAlign: "center",
  },
});

export default OtpInput;