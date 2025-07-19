import { NextApiRequest, NextApiResponse } from 'next';
import { PerformanceReport } from '@/utils/performanceMonitoring';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const report: PerformanceReport = req.body;
    
    // Validate the report structure
    if (!report.timestamp || !report.url || !Array.isArray(report.metrics)) {
      return res.status(400).json({ error: 'Invalid performance report format' });
    }

    // Log performance metrics (in production, you'd send to analytics service)
    if (process.env.NODE_ENV === 'development') {
      console.log('[Performance Report]', {
        url: report.url,
        timestamp: new Date(report.timestamp).toISOString(),
        pageLoadTime: report.pageLoadTime,
        domContentLoadedTime: report.domContentLoadedTime,
        metrics: report.metrics.map(m => ({
          name: m.name,
          value: m.value,
          rating: m.rating,
        })),
      });
    }

    // In production, send to your analytics service:
    // - Google Analytics 4
    // - DataDog
    // - New Relic
    // - Custom analytics endpoint
    
    // Example: Send critical metrics to logging service
    const criticalMetrics = report.metrics.filter(m => m.rating === 'poor');
    if (criticalMetrics.length > 0) {
      console.warn('[Performance Alert] Poor metrics detected:', criticalMetrics);
    }

    return res.status(200).json({ 
      success: true, 
      received: report.metrics.length,
      timestamp: report.timestamp 
    });

  } catch (error) {
    console.error('[Performance API Error]:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}