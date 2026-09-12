import { View, Text, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { useLocalization } from "@/contexts/LocalizationContext";
import { ColorsBarber } from "@/constants/Colors";

const RESEND_TIME = 50;
const ResendOtpCodeTimer = ({ resendHandler }) => {
  const [timer, setTimer] = useState(RESEND_TIME);
  const [canResend, setCanResend] = useState(false);

  const { localization } = useLocalization();

  const handleResendCodeHandler = () => {
    if (!canResend) return;
    setTimer(RESEND_TIME);
    setCanResend(false);
    resendHandler();
  };
  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setTimeout(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer]);
  return (
    <View>
      {canResend ? (
        <Text style={styles.resendText} onPress={handleResendCodeHandler}>
          {localization.OTP_CODE.codeResendCapture}
        </Text>
      ) : (
        <Text style={styles.timerText}>
          {localization.OTP_CODE.codeResend} {timer}
        </Text>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  resendContainer: {
    alignItems: "center",
  },
  resendText: {
    color: ColorsBarber.light.textColor,
    fontSize: 16,
    fontWeight: "bold",
  },
  timerText: {
    color: ColorsBarber.light.inActiveTextColor,

    fontSize: 14,
  },
});
export default ResendOtpCodeTimer;
