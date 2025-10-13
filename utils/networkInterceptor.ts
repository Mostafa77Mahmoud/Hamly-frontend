
// Network interceptor for debugging API requests
export function installNetworkInterceptor() {
  if (typeof window === 'undefined') return;

  const originalFetch = window.fetch;
  
  window.fetch = async function(...args) {
    const url = typeof args[0] === 'string' ? args[0] : args[0].url;
    const method = args[1]?.method || 'GET';
    
    console.log(`[NETWORK_INTERCEPTOR] 🌐 Request: ${method} ${url}`);
    
    try {
      const response = await originalFetch(...args);
      console.log(`[NETWORK_INTERCEPTOR] ✅ Response: ${method} ${url} - Status: ${response.status}`);
      return response;
    } catch (error) {
      console.error(`[NETWORK_INTERCEPTOR] ❌ Error: ${method} ${url}`, error);
      throw error;
    }
  };
  
  console.log('[NETWORK_INTERCEPTOR] 📡 Network interceptor installed');
}
