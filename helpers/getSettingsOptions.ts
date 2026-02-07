

export const getSettingsOptions = (localization: any) => [
  {
    id: "1",
    title: localization.SETTINGS.changeLanguage.capture,
    icon: "language",
    route: "/(tabs)/(03_settings)/changeLanguage",
  },
  {
    id: "2",
    title: localization.SETTINGS.LIMIT.title,
    icon: "analytics-sharp",
    route: "/(tabs)/(03_settings)/managerReservation",
  },
  {
    id: "2236213213",
    title: localization.SETTINGS.SERVICES.title,
    icon: "duplicate-outline",
    route: "/(tabs)/(03_settings)/serviceManager",
  },
    {
    id: "2236213213x",
    title: localization.BARBERS.title,
    icon: "duplicate-outline",
    route: "/(tabs)/(03_settings)/barbers",
  },
  {
    id: "2220201101",
    title: localization.SETTINGS.LOCATIONS.title,
    icon: "duplicate-outline",
    route: "/(tabs)/(03_settings)/locationManager",
  },
  {
    id: "12",
    title: localization.SETTINGS.SERVICESBARBERS.title,
    icon: "attach-sharp",
    route: "/(tabs)/(03_settings)/barbersServices",
  },
  {
    id: "151482",
    title: localization.SETTINGS.LOCATIONSBARBERS.title,
    icon: "repeat-sharp",
    route: "/(tabs)/(03_settings)/locationManagement",
  },
  {
    id: "2122",
    title: localization.SETTINGS.WORKHOURS.title,
    icon: "stopwatch-outline",
    route: "/(tabs)/(03_settings)/timeManagement",
  },
  {
    id: "15148",
    title: localization.SETTINGS.ABSENTHOURS.title,
    icon: "swap-vertical",
    route: "/(tabs)/(03_settings)/absentManager",
  },

  {
    id: "9",
    title: localization.SETTINGS.LOGOUT.title,
    icon: "exit",
    route: "logout"
  },
];