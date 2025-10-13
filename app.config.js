// Environment variables are now available via Replit Secrets
// No need to load dotenv in Replit environment

export default {
  expo: {
    jsEngine: "jsc",
    name: "HamlyMD",
    slug: "hamly-md",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/app-icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/images/app-icon.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    assetBundlePatterns: [
      "**/*"
    ],
    ios: {
      supportsTablet: true
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/app-icon.png",
        backgroundColor: "#ffffff"
      }
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png",
      dangerousAllowMutuallyExclusiveExtensions: true
    },
    devClient: {
      silentLaunch: true
    },
    plugins: [
      "expo-router",
      [
        "expo-camera",
        {
          cameraPermission: "Allow HamlyMD to access your camera to take photos of lab reports and documents."
        }
      ],
      [
        "expo-document-picker",
        {
          documentsPermission: "Allow HamlyMD to access your documents to upload lab reports."
        }
      ],
      [
        "expo-notifications",
        {
          icon: "./assets/images/app-icon.png",
          color: "#ffffff"
        }
      ]
    ],
    experiments: {
      typedRoutes: true
    },
    extra: {
      supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL,
      supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
      // Note: Server-side API keys (Gemini, ElevenLabs) should NOT be exposed to client
      // These will be handled via server-side API endpoints or Replit Secrets
    }
  }
};
