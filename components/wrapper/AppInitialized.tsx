import { AuthProvider } from "@/contexts/AuthContext";
import { CompanyProvider } from "@/contexts/CompanyContext";
import { LocalizationProvider } from "@/contexts/LocalizationContext";
import { ReservationProvider } from "@/contexts/ReservationContext";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { useColorScheme } from "react-native";
import NotificationWrapper from "./NotificationWrapper";
import { AppointmentProvider } from "@/contexts/AppointmentContext";
import { HomeDataProvider } from "@/contexts/HomeDataContext";

export default function AppInitialized(props) {
  const colorScheme = useColorScheme();

  const MyDarkTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      background: "#000000",
    },
  };

  return (
    <ThemeProvider value={MyDarkTheme}>
      <LocalizationProvider>
        <CompanyProvider>
          <AuthProvider>
            <NotificationWrapper>
              <HomeDataProvider>
                <ReservationProvider>
                  <AppointmentProvider>{props.children}</AppointmentProvider>
                </ReservationProvider>
              </HomeDataProvider>
            </NotificationWrapper>
          </AuthProvider>
        </CompanyProvider>
      </LocalizationProvider>
    </ThemeProvider>
  );
}
