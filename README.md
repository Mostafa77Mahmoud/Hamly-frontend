# HamlyMD - دليل التشغيل والنشر

## 📱 نظرة عامة

HamlyMD هو تطبيق لإدارة الحمل والصحة، مبني باستخدام:
- **Expo** و **React Native** للتطبيق الموبايل
- **React Native Web** للموقع الإلكتروني
- **Supabase** لقاعدة البيانات والمصادقة
- **Express** للباك إند

---

## 🚀 التشغيل المحلي

### المتطلبات الأساسية
- Node.js (الإصدار 18 أو أحدث)
- npm أو yarn
- حساب Supabase مع مشروع منشأ

### 1. تثبيت المكتبات

```bash
cd frontend
npm install
```

### 2. إعداد ملف Environment Variables

أنشئ ملف `.env` في مجلد `frontend` وأضف المتغيرات التالية:

```env
# Supabase Configuration
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# API Configuration (للتطوير المحلي)
EXPO_PUBLIC_API_BASE_URL=http://localhost:3001

# أو استخدم URL الباك إند المنشور
# EXPO_PUBLIC_API_BASE_URL=https://your-backend-url.com
```

### 3. تشغيل التطبيق

#### كموقع إلكتروني (Website):
```bash
npm run dev:web
```
سيعمل على: `http://localhost:5000`

#### كتطبيق موبايل (Expo Go):
```bash
npm run dev
```
ثم امسح رمز QR باستخدام تطبيق Expo Go

---

## 🌐 النشر على Netlify

### الخطوات:

1. **إنشاء حساب Netlify**
   - اذهب إلى [netlify.com](https://www.netlify.com/)
   - سجل حساب جديد أو سجل دخول

2. **ربط المشروع**
   - اضغط على "Add new site" → "Import an existing project"
   - اختر GitHub/GitLab/Bitbucket
   - اختر ريبو المشروع

3. **إعدادات البناء (Build Settings)**
   ```
   Build command: npm run build:web
   Publish directory: dist
   ```

4. **إضافة Environment Variables**
   - اذهب إلى Site settings → Environment variables
   - أضف المتغيرات التالية:
   ```
   EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   EXPO_PUBLIC_API_BASE_URL=https://your-backend-url.com
   ```

5. **النشر**
   - اضغط "Deploy site"
   - انتظر حتى ينتهي البناء
   - سيكون موقعك متاح على: `https://your-site.netlify.app`

### ملاحظات مهمة:
- ✅ تأكد من تغيير `EXPO_PUBLIC_API_BASE_URL` لـ URL الباك إند المنشور (ليس localhost)
- ✅ ملف `netlify.toml` موجود بالفعل ويحتوي على جميع الإعدادات
- ✅ جميع الـ routes ستعمل بشكل صحيح بفضل redirect rules

---

## 📦 إنشاء APK/AAB للأندرويد

### تثبيت EAS CLI

```bash
npm install -g eas-cli
```

### تسجيل الدخول إلى Expo

```bash
eas login
```

### إعداد المشروع

```bash
eas build:configure
```

### إنشاء APK للاختبار (Preview)

```bash
eas build --platform android --profile preview
```

- سيتم إنشاء ملف APK يمكنك تنزيله وتثبيته مباشرة على أي جهاز Android
- لا يحتاج Google Play Store

### إنشاء AAB للنشر (Production)

```bash
eas build --platform android --profile production
```

- سيتم إنشاء ملف AAB للنشر على Google Play Store
- يحتاج signing key (ستتم مطالبتك بإنشائه)

### رفع على Google Play Store

```bash
eas submit --platform android --profile production
```

**متطلبات:**
- حساب Google Play Developer (تكلفة $25 لمرة واحدة)
- ملف Service Account JSON من Google Play Console
- ضعه في: `./google-play-service-account.json`

---

## 🍎 إنشاء IPA للآيفون

### إنشاء Build للاختبار

```bash
eas build --platform ios --profile preview
```

### إنشاء Build للنشر

```bash
eas build --platform ios --profile production
```

### رفع على App Store

```bash
eas submit --platform ios --profile production
```

**متطلبات:**
- حساب Apple Developer (تكلفة $99/سنة)
- Apple ID credentials

---

## ⚙️ Environment Variables المطلوبة

### للتطوير المحلي (Local Development):
```env
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
EXPO_PUBLIC_API_BASE_URL=http://localhost:3001
```

### للنشر (Production):
```env
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
EXPO_PUBLIC_API_BASE_URL=https://your-backend-url.com
```

### كيفية الحصول على Supabase Keys:
1. اذهب إلى [supabase.com](https://supabase.com/)
2. افتح مشروعك
3. Settings → API
4. انسخ "Project URL" و "anon public" key

---

## 🔧 حل المشاكل الشائعة

### 1. خطأ "Missing Supabase environment variables"
**الحل:**
- تأكد من وجود ملف `.env` في مجلد `frontend`
- تأكد من صحة قيم `EXPO_PUBLIC_SUPABASE_URL` و `EXPO_PUBLIC_SUPABASE_ANON_KEY`

### 2. خطأ CORS في API Calls
**الحل:**
- تأكد من أن الباك إند يسمح بـ CORS من domain الفرونت إند
- في ملف `backend/src/index.ts`، تأكد من إضافة:
```javascript
app.use(cors({ origin: ['http://localhost:5000', 'https://your-netlify-url.netlify.app'] }));
```

### 3. Expo Build Failure
**الحل:**
- تأكد من ملف `app.json` يحتوي على:
  - `slug` صحيح
  - `bundleIdentifier` (iOS) و `package` (Android) فريدين
- نفذ `npm install` مرة أخرى

### 4. Netlify Build Failure
**الحل:**
- تحقق من Build logs في Netlify dashboard
- تأكد من:
  - Node version صحيح (18)
  - جميع Environment variables مضافة
  - أمر Build صحيح: `npm run build:web`

### 5. Authentication لا يعمل
**الحل:**
- تحقق من Supabase dashboard:
  - Authentication → URL Configuration
  - أضف Netlify URL إلى "Site URL" و "Redirect URLs"
- مثال: `https://your-site.netlify.app`

---

## 📁 هيكل المشروع

```
frontend/
├── app/                    # شاشات التطبيق (Expo Router)
│   ├── (auth)/            # شاشات المصادقة
│   ├── (tabs)/            # الشاشات الرئيسية
│   └── (onboarding)/      # شاشات الإعداد الأولي
├── components/            # مكونات قابلة لإعادة الاستخدام
├── contexts/              # React Contexts (Auth, Data)
├── services/              # خدمات API
├── utils/                 # وظائف مساعدة
├── assets/                # صور وأيقونات
├── app.json              # إعدادات Expo
├── eas.json              # إعدادات EAS Build
├── netlify.toml          # إعدادات Netlify
└── package.json          # المكتبات والسكريبتات
```

---

## 🔐 الأمان

### نصائح مهمة:
- ❌ **لا تضع** API Keys في الكود مباشرة
- ✅ **استخدم** Environment Variables دائماً
- ✅ **لا ترفع** ملف `.env` على Git (موجود في `.gitignore`)
- ✅ **استخدم** Supabase Row Level Security (RLS) policies

---

## 📊 الميزات الرئيسية

- ✅ تسجيل دخول وإنشاء حساب (Supabase Auth)
- ✅ تتبع الحمل والأسابيع
- ✅ إدارة الأدوية وتحليل الأمان
- ✅ تتبع الأعراض مع تحليل AI
- ✅ رفع وتحليل التقارير المعملية
- ✅ واجهة ثنائية اللغة (عربي/إنجليزي)
- ✅ يعمل كـ Website و Mobile App

---

## 📞 الدعم

إذا واجهت أي مشكلة:
1. تحقق من قسم "حل المشاكل الشائعة" أعلاه
2. راجع Expo documentation: [docs.expo.dev](https://docs.expo.dev/)
3. راجع Netlify documentation: [docs.netlify.com](https://docs.netlify.com/)
4. راجع Supabase documentation: [supabase.com/docs](https://supabase.com/docs)

---

## 🎉 نشر ناجح!

بعد اتباع هذه الخطوات، سيكون لديك:
- ✅ موقع إلكتروني منشور على Netlify
- ✅ APK للأندرويد جاهز للتوزيع
- ✅ (اختياري) تطبيق على Google Play Store
- ✅ (اختياري) تطبيق على Apple App Store

**ملاحظة:** تأكد دائماً من اختبار التطبيق بشكل كامل قبل النشر النهائي!
