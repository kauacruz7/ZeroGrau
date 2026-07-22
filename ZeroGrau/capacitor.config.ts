
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.zerograu.app',
  appName: 'ZeroGrau',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
    hostname: 'localhost',
    iosScheme: 'ionic'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#4f46e5",
      showSpinner: false
    },
    StatusBar: {
      style: "dark",
      backgroundColor: "#4f46e5"
    },
    PushNotifications: {
      presentationOptions: ["badge", "sound", "alert"]
    },
    LocalNotifications: {
      smallIcon: "ic_stat_icon_config_sample",
      iconColor: "#4f46e5"
    }
  }
};

export default config;
