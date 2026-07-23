import { AuthProvider } from "@/contexts/AuthContext";
import { CompanyProvider } from "@/contexts/CompanyContext";
import { LocalizationProvider } from "@/contexts/LocalizationContext";
import { ReservationProvider } from "@/contexts/ReservationContext";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { useColorScheme } from "react-native";
import NotificationWrapper from "./NotificationWrapper";
import { AppointmentProvider } from "@/contexts/AppointmentContext";
import { HomeDataProvider } from "@/contexts/HomeDataContext";
import { ServicesProvider } from "@/contexts/ServiceContext";
import { BarbersProvider } from "@/contexts/BarberContext";
import { InternetProvider } from "@/contexts/InternetContext";
import { GlobalErrorProvider } from "@/contexts/GlobalErrorContext";
import GlobalErrorHandler from "@/shared-components/GlobalErrorHandler";

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
      <InternetProvider>
        <LocalizationProvider>
          <CompanyProvider>
            <AuthProvider>
              <NotificationWrapper>
                <GlobalErrorProvider>
                  <GlobalErrorHandler />
                  <HomeDataProvider>
                    <ReservationProvider>
                      <AppointmentProvider>
                        <ServicesProvider>
                          <BarbersProvider>{props.children}</BarbersProvider>
                        </ServicesProvider>
                      </AppointmentProvider>
                    </ReservationProvider>
                  </HomeDataProvider>
                </GlobalErrorProvider>
              </NotificationWrapper>
            </AuthProvider>
          </CompanyProvider>
        </LocalizationProvider>
      </InternetProvider>
    </ThemeProvider>
  );
}
