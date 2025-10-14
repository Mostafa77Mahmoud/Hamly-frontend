# HamlyMD - Pregnancy Tracking App

## Overview
HamlyMD is a comprehensive pregnancy tracking and health management application built with Expo (React Native) for cross-platform support. The app provides features for pregnancy tracking, medication safety analysis, lab report processing, and symptom monitoring.

**Tech Stack:**
- **Frontend:** Expo (React Native) with Expo Router for navigation
- **Web Support:** React Native Web
- **Backend:** Supabase for authentication and database
- **Language:** TypeScript
- **Deployment:** Configured for Netlify and Replit deployment

## Project Status
- ✅ Successfully imported from GitHub
- ✅ Dependencies installed (npm install completed successfully)
- ✅ Supabase credentials configured in Replit Secrets
- ✅ Development server working perfectly on port 5000
- ✅ Production dist folder built successfully (12MB, 52 files - empty bundles removed)
- ✅ Netlify deployment configuration verified
- ✅ Ready for Netlify deployment

## Recent Changes (October 14, 2025)
- ✅ Installed all npm dependencies from package.json
- ✅ Configured Supabase environment variables (EXPO_PUBLIC_SUPABASE_URL, EXPO_PUBLIC_SUPABASE_ANON_KEY)
- ✅ Successfully built production dist folder with all assets and bundles
- ✅ Verified development server works flawlessly with authentication flow
- ✅ Confirmed netlify.toml configuration is correct for deployment
- ✅ App displays Arabic UI correctly with Supabase integration

## Previous Changes (October 13, 2025)
- Set up Replit environment for Expo web development
- Configured workflow to run `npm run dev:web` on port 5000
- Added Supabase environment variables (EXPO_PUBLIC_SUPABASE_URL, EXPO_PUBLIC_SUPABASE_ANON_KEY)
- Created .gitignore for Node.js/Expo project
- Configured deployment for autoscale with static web build
- **Updated web build to use SPA (Single Page Application) mode** instead of static rendering
- **Fixed Hermes transformer issues** by using `--no-bytecode` flag
- **Optimized Metro config** for production builds with inline requires
- **Tested build process successfully** - ready for Netlify deployment
- **Optimized Netlify build command** - removed redundant npm install (Netlify auto-installs dependencies)

## Architecture

### Directory Structure
```
├── app/                    # Expo Router screens
│   ├── (auth)/            # Authentication screens
│   ├── (tabs)/            # Main app screens (health, medications, lab results, profile)
│   └── (onboarding)/      # Setup/onboarding flow
├── components/            # Reusable UI components
│   └── ui/               # UI components library
├── contexts/             # React contexts (Auth, Data)
├── services/             # API and service integrations
├── utils/                # Utility functions and helpers
├── assets/               # Images and static assets
└── types/                # TypeScript type definitions
```

### Key Features
1. **Authentication:** Supabase-based user authentication
2. **Pregnancy Tracking:** Track pregnancy weeks, due date, and health metrics
3. **Medication Safety:** FDA category analysis and AI safety recommendations
4. **Lab Reports:** Upload and process lab reports with AI analysis
5. **Symptom Tracking:** Log and analyze pregnancy symptoms
6. **Bilingual Support:** English and Arabic (RTL support)

### Database Schema
The app uses Supabase with the following main tables:
- `profiles` - User profiles
- `pregnancies` - Pregnancy records
- `medications` - Medication tracking with safety analysis
- `lab_reports` & `lab_results` - Lab report management
- `symptoms` - Symptom tracking with AI analysis
- `medication_adherence_logs` - Medication adherence tracking

## Development

### Running the App
The app automatically starts on port 5000 using the configured workflow:
```bash
npm run dev:web
```

### Environment Variables
Required environment variables (already configured in Replit Secrets):
- `EXPO_PUBLIC_SUPABASE_URL` - Supabase project URL
- `EXPO_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key

### Build Commands
- `npm run dev:web` - Start web development server (port 5000)
- `npm run build:web` - Build for production
- `npm run dev` - Start Expo development server for mobile
- `npm run android` - Run on Android
- `npm run ios` - Run on iOS

## Deployment

### Current Configuration
- **Type:** Autoscale (stateless web app)
- **Build:** `npm run build:web`
- **Run:** `npx serve -s dist -l`
- **Output:** Static files in `dist/` directory

### Deployment Notes
1. The Metro config is set up to allow all hosts (required for Replit proxy)
2. The app uses SPA (Single Page Application) mode with Expo's web export (`web.output: "single"`)
3. **Fixed empty JS files issue**: Build process now automatically removes empty bundle files
4. Netlify configuration in `netlify.toml`:
   - Build command: `npx expo export --platform web --output-dir dist --clear && find dist/_expo/static/js/web -type f -size 0 -delete`
   - The build auto-deletes empty JS files that Expo generates during code splitting
   - Netlify automatically installs dependencies
   - SPA redirects configured (`/* → /index.html`)
   - **IMPORTANT**: Set environment variables in Netlify dashboard: `EXPO_PUBLIC_SUPABASE_URL`, `EXPO_PUBLIC_SUPABASE_ANON_KEY`

## Netlify Deployment Steps

### 1. Environment Variables Setup
In your Netlify dashboard, go to Site settings → Environment variables and add:
- `EXPO_PUBLIC_SUPABASE_URL` = Your Supabase project URL
- `EXPO_PUBLIC_SUPABASE_ANON_KEY` = Your Supabase anonymous key

### 2. Build Configuration
The `netlify.toml` file is already configured with:
- ✅ Auto-removal of empty JS files (fixes white screen issue)
- ✅ SPA redirects for Expo Router
- ✅ Security headers
- ✅ Cache control for static assets

### 3. Common Issues & Solutions
- **White screen on Netlify**: Make sure environment variables are set in Netlify dashboard
- **Empty JS files error**: Fixed by auto-cleanup in build command
- **404 errors on routes**: SPA redirects are configured in netlify.toml

## Important Notes

### Replit-Specific Configuration
- Metro bundler is configured to allow requests from any host (Replit proxy support)
- Development server binds to 0.0.0.0:5000 (required for Replit)
- CORS headers are set in metro.config.js for proxy compatibility

### Known Issues
- Initial build may take 1-2 minutes due to large bundle size
- "Premature close" errors during first build are normal and can be ignored
- The app expects a backend API at http://localhost:3001 for AI features (optional)

### API Integration
The app has endpoints configured for:
- Medication safety analysis
- Lab report processing
- Symptom analysis

These require a separate backend server (not included in this repository).

## User Preferences
(This section will be updated as user preferences are discovered)

## Next Steps
To extend the app:
1. Set up the backend API server for AI features
2. Configure Supabase Row Level Security (RLS) policies
3. Add additional features or screens as needed
4. Test mobile builds with EAS Build (see README.md for instructions)
