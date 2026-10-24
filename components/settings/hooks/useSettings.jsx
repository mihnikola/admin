import { useEffect, useState } from 'react';
import { useLocalization } from "@/contexts/LocalizationContext";
import { useAuth } from "@/contexts/AuthContext";
import { getSettingsOptions } from "@/helpers/getSettingsOptions";
import { router } from 'expo-router';
import { getInitialsName } from "@/helpers";

const useSettings = () => {
    const { localization } = useLocalization();

    const settingsOptions = getSettingsOptions(localization);
    const { logoutFirebase, isLoading, fetchUserData, userData } = useAuth();
    const [isImageLoading, setIsImageLoading] = useState(!!userData?.image);
    const [isLogout, setIsLogout] = useState(false);

    const handlePress = (route) => {
        if (route === "logout") {
            setIsLogout(true);
            return;
        }
        if (route) router.push(route);
    };
    const logoutCancelHandler = () => {
        setIsLogout(false);
    };
    const logoutConfirmHandler = () => {
        setIsLogout(false);
        logoutFirebase();
    };
    const editProfileBarber = () => {
        router.push({
            pathname: "/(tabs)/(03_settings)/addBarbers",
            params: { id: userData?.id, changeProfile: 1 },
        });
    };

    const initials = getInitialsName(userData?.name);


    return { isLogout, settingsOptions, fetchUserData, initials, localization, editProfileBarber, logoutConfirmHandler, logoutCancelHandler, handlePress, isLoading, userData, setIsImageLoading };

}

export default useSettings;