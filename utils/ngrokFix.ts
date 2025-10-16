
// Global fetch interceptor to add ngrok headers to all requests
export function installNgrokFix() {
  if (typeof window === 'undefined') return;

  const originalFetch = window.fetch;
  
  window.fetch = async function(...args: Parameters<typeof fetch>): Promise<Response> {
    const [resource, config] = args;
    
    // Add ngrok headers to all requests
    const headers = new Headers(config?.headers);
    headers.set('ngrok-skip-browser-warning', 'true');
    headers.set('User-Agent', 'Hamly-App');
    
    const newConfig: RequestInit = {
      ...config,
      headers,
      mode: 'cors',
      credentials: 'omit',
    };
    
    return originalFetch(resource, newConfig);
  };
  
  console.log('✅ [NGROK_FIX] Installed global fetch interceptor for ngrok headers');
}
