export interface PerformanceMetrics {
  timestamp: number;
  endpoint: string;
  method: string;
  statusCode: number;
  responseTime: number;
  ip: string;
  userAgent?: string;
  error?: string;
}

export interface ApiStats {
  totalRequests: number;
  averageResponseTime: number;
  errorRate: number;
  requestsPerMinute: number;
  slowestEndpoints: Array<{ endpoint: string; avgResponseTime: number }>;
  errorsByEndpoint: Array<{ endpoint: string; errorCount: number }>;
}

class PerformanceMonitor {
  private metrics: PerformanceMetrics[] = [];
  private maxMetrics = 1000; // Keep last 1000 requests

  recordMetric(metric: PerformanceMetrics) {
    this.metrics.push(metric);
    
    // Keep only recent metrics
    if (this.metrics.length > this.maxMetrics) {
      this.metrics = this.metrics.slice(-this.maxMetrics);
    }

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      const status = metric.statusCode >= 400 ? '❌' : '✅';
      console.log(`[Monitor] ${status} ${metric.method} ${metric.endpoint} - ${metric.responseTime}ms - ${metric.statusCode}`);
    }
  }

  getStats(timeWindowMs: number = 5 * 60 * 1000): ApiStats { // Default: 5 minutes
    const now = Date.now();
    const recentMetrics = this.metrics.filter(m => (now - m.timestamp) <= timeWindowMs);

    if (recentMetrics.length === 0) {
      return {
        totalRequests: 0,
        averageResponseTime: 0,
        errorRate: 0,
        requestsPerMinute: 0,
        slowestEndpoints: [],
        errorsByEndpoint: []
      };
    }

    const totalRequests = recentMetrics.length;
    const averageResponseTime = recentMetrics.reduce((sum, m) => sum + m.responseTime, 0) / totalRequests;
    const errorCount = recentMetrics.filter(m => m.statusCode >= 400).length;
    const errorRate = (errorCount / totalRequests) * 100;
    const requestsPerMinute = (totalRequests / (timeWindowMs / 60000));

    // Group by endpoint for analysis
    const endpointStats = new Map<string, { responseTimes: number[]; errors: number }>();
    
    recentMetrics.forEach(metric => {
      const key = `${metric.method} ${metric.endpoint}`;
      if (!endpointStats.has(key)) {
        endpointStats.set(key, { responseTimes: [], errors: 0 });
      }
      
      const stats = endpointStats.get(key)!;
      stats.responseTimes.push(metric.responseTime);
      if (metric.statusCode >= 400) {
        stats.errors++;
      }
    });

    // Calculate slowest endpoints
    const slowestEndpoints = Array.from(endpointStats.entries())
      .map(([endpoint, stats]) => ({
        endpoint,
        avgResponseTime: stats.responseTimes.reduce((sum, time) => sum + time, 0) / stats.responseTimes.length
      }))
      .sort((a, b) => b.avgResponseTime - a.avgResponseTime)
      .slice(0, 5);

    // Calculate errors by endpoint
    const errorsByEndpoint = Array.from(endpointStats.entries())
      .map(([endpoint, stats]) => ({
        endpoint,
        errorCount: stats.errors
      }))
      .filter(item => item.errorCount > 0)
      .sort((a, b) => b.errorCount - a.errorCount)
      .slice(0, 5);

    return {
      totalRequests,
      averageResponseTime: Math.round(averageResponseTime),
      errorRate: Math.round(errorRate * 100) / 100,
      requestsPerMinute: Math.round(requestsPerMinute * 100) / 100,
      slowestEndpoints,
      errorsByEndpoint
    };
  }

  getRecentErrors(limit: number = 10): PerformanceMetrics[] {
    return this.metrics
      .filter(m => m.statusCode >= 400)
      .slice(-limit)
      .reverse();
  }

  clear() {
    this.metrics = [];
  }
}

// Global instance
export const performanceMonitor = new PerformanceMonitor();

// Helper function to create performance middleware
import { NextApiRequest, NextApiResponse } from 'next';

export function withPerformanceMonitoring<T extends (req: NextApiRequest, res: NextApiResponse) => Promise<void>>(
  handler: T,
  endpointName?: string
): T {
  return (async (req: NextApiRequest, res: NextApiResponse) => {
    const startTime = Date.now();
    const endpoint = endpointName || req.url || 'unknown';
    const method = req.method || 'unknown';
    const ip = req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || req.connection?.remoteAddress || 'unknown';
    const userAgent = req.headers['user-agent'];

    let statusCode = 200;
    let error: string | undefined;

    try {
      await handler(req, res);
      statusCode = res.statusCode || 200;
    } catch (err) {
      statusCode = 500;
      error = err instanceof Error ? err.message : 'Unknown error';
      throw err;
    } finally {
      const responseTime = Date.now() - startTime;
      
      performanceMonitor.recordMetric({
        timestamp: Date.now(),
        endpoint,
        method,
        statusCode,
        responseTime,
        ip: Array.isArray(ip) ? ip[0] : ip,
        userAgent,
        error
      });
    }
  }) as T;
}

// Health check function
export function getHealthStatus(): { status: 'healthy' | 'warning' | 'critical'; stats: ApiStats; issues: string[] } {
  const stats = performanceMonitor.getStats();
  const issues: string[] = [];
  let status: 'healthy' | 'warning' | 'critical' = 'healthy';

  // Check for issues
  if (stats.averageResponseTime > 2000) {
    issues.push(`High average response time: ${stats.averageResponseTime}ms`);
    status = 'warning';
  }

  if (stats.averageResponseTime > 5000) {
    status = 'critical';
  }

  if (stats.errorRate > 5) {
    issues.push(`High error rate: ${stats.errorRate}%`);
    status = status === 'critical' ? 'critical' : 'warning';
  }

  if (stats.errorRate > 10) {
    status = 'critical';
  }

  if (stats.requestsPerMinute > 50) {
    issues.push(`High request rate: ${stats.requestsPerMinute}/min`);
    status = status === 'critical' ? 'critical' : 'warning';
  }

  return { status, stats, issues };
}