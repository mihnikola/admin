import { LocaleConfig } from "react-native-calendars";
import {
  dayNamesEng,
  dayNamesShortEng,
  monthNamesEng,
} from "./locale-calendar-en";
import {
  dayNamesRs,
  dayNamesShortRs,
  monthNamesRs,
} from "./locale-calendar-rs";

export const calendarLocales = (defaultLocaleCode) => {
  LocaleConfig.locales["en"] = {
    monthNames: monthNamesEng,
    dayNames: dayNamesEng,
    dayNamesShort: dayNamesShortEng,
  };

  LocaleConfig.locales["sr"] = {
    monthNames: monthNamesRs,
    dayNames: dayNamesRs,
    dayNamesShort: dayNamesShortRs,
  };

  LocaleConfig.defaultLocale = defaultLocaleCode;
};
