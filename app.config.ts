import { ExpoConfig, ConfigContext } from '@expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
    ...config,
    name: 'fta-barber-admin-app',
    slug: 'fta-barber-admin-app',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/images/admin.png',
    scheme: 'adminbarberdemo',
    userInterfaceStyle: 'automatic',
    splash: {
        image: './assets/images/admin.png',
        backgroundColor: '#000000',
    },
    newArchEnabled: true,
    ios: {
        supportsTablet: true,
    },
    android: {
        googleServicesFile: process.env.GOOGLE_SERVICES_JSON || "./firebase/google-services.json",
        package: 'fta.admin.app',
    },
    plugins: [
        '@react-native-firebase/app',
        '@react-native-firebase/messaging',
        'expo-router',
        [
            'expo-splash-screen',
            {
                image: './assets/images/admin.png',
                imageWidth: 200,
                resizeMode: 'contain',
                backgroundColor: '#ffffff',
                dark: {
                    backgroundColor: '#000000',
                },
            },
        ],
    ],
    experiments: {
        typedRoutes: true,
        reactCompiler: true,
    },
    extra: {
        eas: {
            projectId: "fcd5681e-4fac-41b4-9334-d272ee972954",
        },
    },
    owner: "fusion-tech-agency"
});