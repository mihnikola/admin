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
            if (supported) {
                await Linking.openURL(url);
            } else {
                Alert.alert(localization.CLIENTS.error, localization.CLIENTS.errorInfo);
            }
        } catch (error) {
            Alert.alert(localization.CLIENTS.error, localization.CLIENTS.errorCall);
        }
    };


    const softDelete = async (clientId) => {
        setError(null);
        try {
            const response = await del(`/admin/users/${clientId}`);
            if (response.status === 200) {
                setIsLoading(false);
                setIsMessage(true);
                setMessage(localization.CLIENTS.deactivate);
            }
        } catch (err) {
            setIsMessage(true);
            setError(err);
            setIsLoading(false);
        }
        setDialog(false);
    };


    return { makePhoneCall, softDelete, error, isLoading, dialog, setDialog, message, setMessage, setIsMessage, isMessage }
}
