// Environment variables are now available via Replit Secrets
// No need to load dotenv in Replit environment

export default {
  expo: {
    jsEngine: "hermes",
    newArchEnabled: false,
    name: "Hamly",
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
      supportsTablet: true,
      bundleIdentifier: "com.hamlymd.app"
    },
    android: {
      package: "com.hamlymd.app",
      adaptiveIcon: {
        foregroundImage: "./assets/images/app-icon.png",
        backgroundColor: "#ffffff"
      }
    },
    web: {
      bundler: "metro",
      output: "single",
      favicon: "./assets/images/favicon.png",
      dangerousAllowMutuallyExclusiveExtensions: true,
      build: {
        babel: {
          include: ["@supabase/supabase-js"]
        }
      }
    },
    runtimeVersion: {
      policy: "appVersion"
    },
    devClient: {
      silentLaunch: true
    },
    plugins: [
      "expo-router",
      [
        "expo-camera",
        {
          cameraPermission: "Allow Hamly to access your camera to take photos of lab reports and documents."
        }
      ],
      [
        "expo-document-picker",
        {
          documentsPermission: "Allow Hamly to access your documents to upload lab reports."
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
      eas: {
        projectId: "0a70a1df-c52c-44a8-a9fe-3a1e5cb8603e"
      },
      supabaseUrl: "https://uzhtruxyzxtqappavqhr.supabase.co",
      supabaseAnonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV6aHRydXh5enh0cWFwcGF2cWhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc5ODA4NDUsImV4cCI6MjA0MzU1Njg0NX0.kDZcTPJkZdHfzuTGiYlFO46EXdwsrpGSwaBWxRexDSU",
      // Note: Server-side API keys (Gemini, ElevenLabs) should NOT be exposed to client
      // These will be handled via server-side API endpoints or Replit Secrets
    }
  }
};