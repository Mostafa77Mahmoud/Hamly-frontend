// Unified API configuration for frontend-backend communication
// Development: http://localhost:3001
// Production: Use EXPO_PUBLIC_API_BASE_URL environment variable

export function getApiBase(): string {
  // Check for explicit environment variable first
  if (process.env.EXPO_PUBLIC_API_BASE_URL) {
    return process.env.EXPO_PUBLIC_API_BASE_URL;
  }

  // For browser/client-side in Replit or production
  if (typeof window !== 'undefined') {
    // In Replit, use the current origin with backend port
    const currentOrigin = window.location.origin;
    
    // If we're on Replit (has .replit.dev domain)
    if (currentOrigin.includes('.replit.dev')) {
      // Use the same domain but with port 3001 for backend
      const url = new URL(currentOrigin);
      url.port = '3001';
      return url.toString().replace(/\/$/, ''); // Remove trailing slash
    }
    
    // For local development
    return 'http://localhost:3001';
  }

  // Server-side/Node.js fallback
  return 'http://localhost:3001';
}

export const API_ENDPOINTS = {
  medicationSafety: '/api/medication-safety-api',
  processLabReport: '/api/process-lab-report-api',
  analyzeSymptom: '/api/analyze-symptom-api',
} as const;

export function getApiUrl(endpoint: keyof typeof API_ENDPOINTS): string {
  return `${getApiBase()}${API_ENDPOINTS[endpoint]}`;
}

// API configuration - Use dynamic base URL
function getConfiguredBaseURL(): string {
  const baseURL = getApiBase();
  console.log("🌐 [API_CONFIG] Base URL:", baseURL);
  console.log("🔧 [API_CONFIG] Environment:", process.env.EXPO_PUBLIC_API_BASE_URL);
  console.log("📍 [API_CONFIG] Current origin:", typeof window !== 'undefined' ? window.location.origin : 'server-side');
  console.log("📍 [API_CONFIG] All endpoints ready:", Object.keys(API_ENDPOINTS));
  return baseURL;
}

const API_BASE_URL = getConfiguredBaseURL();

export const API_CONFIG = {
  baseURL: API_BASE_URL,
  timeout: 120000,
};

// Helper to create authenticated headers
export function createAuthHeaders(accessToken?: string): Record<string, string> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`;
  }

  return headers;
}

// Check if backend API is available (not localhost on mobile)
export function isBackendAvailable(): boolean {
  const baseURL = getApiBase();
  const envURL = process.env.EXPO_PUBLIC_API_BASE_URL;
  
  // If explicitly set to empty string, backend is disabled
  if (envURL === '') {
    console.log('🚫 [API_CONFIG] Backend disabled (empty env var)');
    return false;
  }
  
  // If localhost on mobile (React Native), backend is not available
  if (typeof window === 'undefined' && baseURL.includes('localhost')) {
    console.log('🚫 [API_CONFIG] Backend not available (localhost on mobile)');
    return false;
  }
  
  // If the URL is valid and not localhost on mobile, backend is available
  const isAvailable = !!(envURL && envURL !== '' && !envURL.includes('localhost'));
  console.log(`${isAvailable ? '✅' : '⚠️'} [API_CONFIG] Backend available:`, isAvailable, 'URL:', baseURL);
  return isAvailable;
}

// Safe API call wrapper with error handling
export async function safeFetch(url: string, options?: RequestInit): Promise<Response | null> {
  if (!isBackendAvailable()) {
    console.log('⏭️ [API_CONFIG] Skipping API call (backend not available):', url);
    return null;
  }
  
  try {
    const response = await fetch(url, options);
    return response;
  } catch (error) {
    console.error('❌ [API_CONFIG] API call failed:', error);
    return null;
  }
}