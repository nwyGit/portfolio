import { NextApiRequest, NextApiResponse } from 'next';
import { withErrorHandling, validateMethod } from '@/utils/apiHelpers';
import { getHealthStatus, performanceMonitor } from '@/utils/monitoring';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  validateMethod(req, res, ['GET']);

  // Basic health check
  if (req.query.check === 'basic') {
    return res.status(200).json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development'
    });
  }

  // Detailed health with performance stats
  const healthStatus = getHealthStatus();
  const recentErrors = performanceMonitor.getRecentErrors(5);

  res.status(healthStatus.status === 'critical' ? 503 : 200).json({
    status: healthStatus.status,
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    performance: healthStatus.stats,
    issues: healthStatus.issues,
    recentErrors: recentErrors.map(error => ({
      timestamp: new Date(error.timestamp).toISOString(),
      endpoint: error.endpoint,
      method: error.method,
      statusCode: error.statusCode,
      responseTime: error.responseTime,
      error: error.error
    }))
  });
}

export default withErrorHandling(handler);