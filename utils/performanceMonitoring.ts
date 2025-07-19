import { onCLS, onFCP, onLCP, onTTFB } from 'web-vitals';

export interface PerformanceMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  id: string;
  navigationType: string;
}

export interface PerformanceReport {
  timestamp: number;
  url: string;
  userAgent: string;
  metrics: PerformanceMetric[];
  pageLoadTime: number;
  domContentLoadedTime: number;
}

class PerformanceMonitor {
  private metrics: PerformanceMetric[] = [];
  private startTime: number = Date.now();
  private isEnabled: boolean = true;

  constructor() {
    if (typeof window === 'undefined' || process.env.NODE_ENV !== 'production') {
      this.isEnabled = false;
      return;
    }
    
    this.initializeMonitoring();
  }

  private initializeMonitoring(): void {
    // Core Web Vitals monitoring
    onCLS(this.handleMetric.bind(this));
    onFCP(this.handleMetric.bind(this));
    onLCP(this.handleMetric.bind(this));
    onTTFB(this.handleMetric.bind(this));

    // Page visibility change handling
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        this.sendReport();
      }
    });

    // Before unload reporting
    window.addEventListener('beforeunload', () => {
      this.sendReport();
    });
  }

  private handleMetric(metric: any): void {
    if (!this.isEnabled) return;

    const performanceMetric: PerformanceMetric = {
      name: metric.name,
      value: metric.value,
      rating: metric.rating,
      delta: metric.delta,
      id: metric.id,
      navigationType: metric.navigationType || 'unknown',
    };

    this.metrics.push(performanceMetric);

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Performance] ${metric.name}:`, {
        value: metric.value,
        rating: metric.rating,
        threshold: this.getThreshold(metric.name),
      });
    }
  }

  private getThreshold(metricName: string): { good: number; poor: number } {
    const thresholds = {
      CLS: { good: 0.1, poor: 0.25 },
      FCP: { good: 1800, poor: 3000 },
      LCP: { good: 2500, poor: 4000 },
      TTFB: { good: 800, poor: 1800 },
    };
    return thresholds[metricName as keyof typeof thresholds] || { good: 0, poor: 0 };
  }

  public getCurrentMetrics(): PerformanceMetric[] {
    return [...this.metrics];
  }

  public generateReport(): PerformanceReport {
    const now = Date.now();
    const navigationTiming = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;

    return {
      timestamp: now,
      url: window.location.href,
      userAgent: navigator.userAgent,
      metrics: this.getCurrentMetrics(),
      pageLoadTime: navigationTiming?.loadEventEnd - navigationTiming?.fetchStart || 0,
      domContentLoadedTime: navigationTiming?.domContentLoadedEventEnd - navigationTiming?.fetchStart || 0,
    };
  }

  private sendReport(): void {
    if (!this.isEnabled || this.metrics.length === 0) return;

    const report = this.generateReport();
    
    // Send to analytics service (replace with your preferred service)
    if (typeof navigator.sendBeacon === 'function') {
      const blob = new Blob([JSON.stringify(report)], { type: 'application/json' });
      navigator.sendBeacon('/api/performance', blob);
    } else {
      // Fallback for browsers without sendBeacon
      fetch('/api/performance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(report),
        keepalive: true,
      }).catch(() => {
        // Ignore errors in performance reporting
      });
    }
  }

  public forceReport(): void {
    this.sendReport();
  }

  public reset(): void {
    this.metrics = [];
    this.startTime = Date.now();
  }
}

// Singleton instance
export const performanceMonitor = new PerformanceMonitor();

// Helper functions for manual metric collection
export function measureCustomMetric(name: string, startTime: number): void {
  const duration = performance.now() - startTime;
  
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Custom Metric] ${name}: ${duration.toFixed(2)}ms`);
  }

  // You can extend this to send custom metrics to your analytics service
}

export function startPerformanceTimer(): number {
  return performance.now();
}

// Web Vitals helper functions for direct access
export async function getWebVitals(): Promise<{
  cls: number;
  fcp: number;
  lcp: number;
  ttfb: number;
}> {
  return new Promise((resolve) => {
    const metrics = { cls: 0, fcp: 0, lcp: 0, ttfb: 0 };
    let count = 0;

    const checkComplete = () => {
      count++;
      if (count === 4) {
        resolve(metrics);
      }
    };

    onCLS((metric) => { metrics.cls = metric.value; checkComplete(); });
    onFCP((metric) => { metrics.fcp = metric.value; checkComplete(); });
    onLCP((metric) => { metrics.lcp = metric.value; checkComplete(); });
    onTTFB((metric) => { metrics.ttfb = metric.value; checkComplete(); });
  });
}

export default performanceMonitor;