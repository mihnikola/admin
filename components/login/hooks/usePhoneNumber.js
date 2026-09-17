import { useLocalization } from "@/contexts/LocalizationContext";
import { useRef, useState } from "react";

const usePhoneNumber = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [errorPhoneNumber, setErrorPhoneNumber] = useState("");

  const phoneNumberInputRef = useRef(null);

  const { localization } = useLocalization();
  const phoneRegex = /^\+?\d{9,12}$/;

  const validatePhoneNumber = (number) => {
    if (number.length === 0) {
      setIsValid(true);
      setErrorPhoneNumber("");
      return true;
    }

    if (phoneRegex.test(number)) {
      setIsValid(true);
      setErrorPhoneNumber("");
      return true;
    }

    setIsValid(false);
    setErrorPhoneNumber(localization.SETTINGS.PROFILE.errorPhoneNumber);

    return false;
  };

  const handlePhoneNumberChange = (text) => {
    const cleaned = text.replace(/[^\d+]/g, "");
    const formatted = cleaned.startsWith("+")
      ? "+" + cleaned.slice(1).replace(/\+/g, "")
      : cleaned.replace(/\+/g, "");

    setPhoneNumber(formatted);
    validatePhoneNumber(formatted);
  };
  return {
    handlePhoneNumberChange,
    phoneNumber,
    errorPhoneNumber,
    phoneNumberInputRef,
  };
};

export default usePhoneNumber;
