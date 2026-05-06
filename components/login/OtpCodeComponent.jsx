import { useLocalization } from "@/contexts/LocalizationContext";
import { getOtpParamsStorage, removeOtpParamsStorage } from "@/helpers/verificationOtpParams";
import { View, Text, StyleSheet } from "react-native";
import useSubmitOtpCode from './hooks/useSubmitOtpCode';
import { router } from "expo-router";
import SharedBackButton from "@/shared-components/SharedBackButton";
import WrapperAuth from './../../wrapper/WrapperAuth';
import { SharedButton } from "@/shared-components/SharedButton";
import OtpInput from './OtpCodeInput';
import ResendOtpCodeTimer from './ResendOtpCodeTimer';
import { useEffect, useState } from "react";
import { SharedMessage } from "@/shared-components/SharedMessage";
import { FontAwesome } from "@expo/vector-icons";


const OtpCodeComponent = () => {
  const [code, setCode] = useState(Array(6).fill(""));
  const [verifyData, setVerifyData] = useState(null);
  const { localization } = useLocalization();

  const getOtpParams = async () => {
    try {
      const result = await getOtpParamsStorage();
      setVerifyData(JSON.parse(result));
    } catch (error) {
      console.log("err", error);
    }
  };

  useEffect(() => {
    getOtpParams();
  }, []);

  const {
    checkOtpCodeValidation,
    checkOtpCodeVerification,
    message,
    setIsMessage,
    isMessage,
    error,
    isLoading,
    isVerified,
    setIsVerified,
    verificationOTPCode,
    checkverifyEmail,
    verificationOTPCodeResend,
    setError,
  } = useSubmitOtpCode();

  const handleVerify = async () => {
    const otp = code.join("");

    if (otp.length !== 6) {
      setIsMessage(true);
      setError(localization.OTP_CODE.validCode);
      return;
    }
    if (otp.length === 6) {
      if (
        verifyData?.email &&
        verifyData?.password &&
        verifyData?.confirmPassword
      ) {
        checkverifyEmail(verifyData?.email, otp);
      } else if (verifyData?.email && verifyData?.password) {
        checkOtpCodeVerification(verifyData?.email, verifyData?.password, otp);
      } else {
        checkOtpCodeValidation(verifyData?.email, otp);
      }
    } else {
      setIsMessage(true);
      setError(localization.OTP_CODE.validCode);
    }
  };

  const confirmHandler = async () => {
    setIsMessage(false);
    router.dismissAll();

    if (verifyData?.email && !verifyData?.password) {
      router.push({
        pathname: "/(z_auth)/changePassword",
        params: { data: verifyData?.email },
      });
    }
    if (isVerified && verifyData?.email && verifyData?.password) {
      await removeOtpParamsStorage();
      router.push("/(tabs)/(01_home)");
    }

    if (
      verifyData?.email &&
      verifyData?.password &&
      verifyData?.confirmPassword
    ) {
      await removeOtpParamsStorage();

      router.push("/(z_auth)/");
    }
  };

  const handleResendCodeHandler = () => {
    verificationOTPCodeResend(verifyData);
  };
  const confirmHandler2 = () => {
    setIsMessage(false);
  };

  console.log("isMessage",isMessage);
  console.log("message",message);

  if (verifyData) {
    return (
      <WrapperAuth>
        <SharedBackButton
          onPress={router.back}
          absolutePosition={false}
          styleBtn={{ marginBottom: 30 }}
        />

        <View style={{ flex: 1 }}>
          <View>
            <Text style={styles.mainTitle}>
              {localization.OTP_CODE.mainTitle}
            </Text>
          </View>
          <View style={{ marginTop: 20 }}>
            <Text style={styles.subtitle}>
              {localization.OTP_CODE.subtitlePrimary} {verifyData?.email}.
            </Text>
            <Text style={styles.subtitle}>
              {localization.OTP_CODE.subtitleSecondary}
            </Text>
          </View>
          <OtpInput code={code} setCode={setCode} />
          <ResendOtpCodeTimer resendHandler={handleResendCodeHandler} />
        </View>
        <View style={styles.btnFooter}>
          <SharedButton
            disabled={code.join("").length < 6}
            onPress={handleVerify}
            text={localization.SUBMIT.label}
            loading={isLoading}
          />
        </View>
        {/* {isLoaderVerify && <Loader />} */}
        {isMessage && (
          <SharedMessage
            isOpen={isMessage}
            onClose={!error ? confirmHandler : confirmHandler2}
            onConfirm={!error ? confirmHandler : confirmHandler2}
            icon={
              <FontAwesome
                name={error ? "close" : "check-circle-o"}
                size={64}
                color="white"
              />
            }
            title={error || message}
            buttonText={localization.OK.label}
          />
        )}
      </WrapperAuth>
    );
  }
};
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#0A0B0E",
  },
  btnFooter: {
    marginVertical: 0,
  },
  radiobtn: {
    flex: 2,
    flexDirection: "column",
    gap: 25,
  },
  imageContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },

  resendText: {
    color: "#00AEEF",
    fontSize: 16,
    fontWeight: "bold",
  },
  timerText: {
    color: "#999",
    fontSize: 14,
  },
  iconStyle: {
    width: 30,
    height: 30,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "black",
  },
  image: {
    width: 290,
    height: 290,
    resizeMode: "contain",
    backgroundColor: "black",
  },
  mainTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 13,
    color: "#ccc",
  },
  socialButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "white",
  },
});

export default OtpCodeComponent;
