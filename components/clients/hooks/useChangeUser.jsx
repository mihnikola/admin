import { delete as del } from "@/api/apiService";
import { useLocalization } from "@/contexts/LocalizationContext";
import { useState } from "react";
import { Alert, Linking } from "react-native";

export default function useChangeUser() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [isMessage, setIsMessage] = useState(false);
  const [dialog, setDialog] = useState(false);

  const { localization } = useLocalization();
  const makePhoneCall = async (phoneNumber) => {
    const url = `tel:${phoneNumber}`;
    try {
      const supported = await Linking.canOpenURL(url);

      await Linking.openURL(url);
    } catch (error) {
      Alert.alert(localization.CLIENTS.error, localization.CLIENTS.errorCall);
    }
  };

  const deleteClient = async (clientId) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await del(`/admin/users/${clientId}`);
      setIsMessage(true);

      if (response.status === 200) {
        setMessage(localization.CLIENTS.deactivate);
      }
    } catch (err) {
      setIsMessage(true);
      setError(err);
    } finally {
      setIsLoading(false);

      setDialog(false);
    }
  };

  return {
    makePhoneCall,
    deleteClient,
    error,
    isLoading,
    dialog,
    setDialog,
    message,
    setMessage,
    setIsMessage,
    isMessage,
  };
}
