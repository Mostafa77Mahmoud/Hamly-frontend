import { traceEvent } from './deepTracer';
import { logSupabaseRequest } from './logCollector';

interface RequestMetrics {
  endpoint: string;
  startTime: number;
  endTime?: number;
  latency?: number;
  status?: string;
  error?: any;
  payload?: any;
  response?: any;
}

class NetworkMonitor {
  private activeRequests: Map<string, RequestMetrics> = new Map();

  startRequest(requestId: string, endpoint: string, payload?: any) {
    const metrics: RequestMetrics = {
      endpoint,
      startTime: performance.now(),
      payload,
    };

    this.activeRequests.set(requestId, metrics);
    
    traceEvent('NETWORK_MONITOR', 'request_start', {
      requestId,
      endpoint,
      hasPayload: !!payload,
    });
  }

  endRequest(requestId: string, status: string, response?: any, error?: any) {
    const metrics = this.activeRequests.get(requestId);
    
    if (!metrics) {
      console.warn('Request not found in monitor:', requestId);
      return;
    }

    metrics.endTime = performance.now();
    metrics.latency = metrics.endTime - metrics.startTime;
    metrics.status = status;
    metrics.response = response;
    metrics.error = error;

    traceEvent('NETWORK_MONITOR', 'request_end', {
      requestId,
      endpoint: metrics.endpoint,
      latency: metrics.latency,
      status,
      hasError: !!error,
    });

    logSupabaseRequest(metrics.endpoint, {
      latencyMs: metrics.latency,
      status,
      response,
      error,
    });

    this.activeRequests.delete(requestId);
  }

  getActiveRequests() {
    return Array.from(this.activeRequests.entries()).map(([id, metrics]) => ({
      id,
      ...metrics,
      duration: performance.now() - metrics.startTime,
    }));
  }

  printActiveRequests() {
    const active = this.getActiveRequests();
    
    console.log('\n========== ACTIVE REQUESTS ==========');
    if (active.length === 0) {
      console.log('No active requests');
    } else {
      active.forEach((req, idx) => {
        console.log(`${idx + 1}. ${req.endpoint}`);
        console.log(`   Duration: ${req.duration.toFixed(0)}ms`);
        console.log(`   ID: ${req.id}`);
      });
    }
    console.log('=====================================\n');
  }
}

const monitor = new NetworkMonitor();

export const startNetworkRequest = (requestId: string, endpoint: string, payload?: any) =>
  monitor.startRequest(requestId, endpoint, payload);

export const endNetworkRequest = (requestId: string, status: string, response?: any, error?: any) =>
  monitor.endRequest(requestId, status, response, error);

export const getActiveRequests = () => monitor.getActiveRequests();
export const printActiveRequests = () => monitor.printActiveRequests();

if (typeof window !== 'undefined') {
  (window as any).printActiveRequests = printActiveRequests;
  (window as any).getActiveRequests = getActiveRequests;
}
