import { NextApiRequest, NextApiResponse } from 'next';
import { performanceMonitor } from './monitoring';

export interface ApiError {
  message: string;
  status: number;
  code?: string;
}

export class ApiErrorHandler extends Error {
  status: number;
  code?: string;

  constructor(message: string, status: number = 500, code?: string) {
    super(message);
    this.status = status;
    this.code = code;
    this.name = 'ApiErrorHandler';
  }
}

export function handleApiError(error: unknown, res: NextApiResponse) {
  console.error(`[API Error] ${new Date().toISOString()}:`, error);

  if (error instanceof ApiErrorHandler) {
    return res.status(error.status).json({
      error: error.message,
      code: error.code,
      timestamp: new Date().toISOString()
    });
  }

  if (error instanceof Error) {
    return res.status(500).json({
      error: 'Internal server error',
      message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong',
      timestamp: new Date().toISOString()
    });
  }

  return res.status(500).json({
    error: 'Unknown error occurred',
    timestamp: new Date().toISOString()
  });
}

export function validateMethod(req: NextApiRequest, res: NextApiResponse, allowedMethods: string[]) {
  if (!req.method || !allowedMethods.includes(req.method)) {
    throw new ApiErrorHandler(
      `Method ${req.method} not allowed. Allowed methods: ${allowedMethods.join(', ')}`,
      405,
      'METHOD_NOT_ALLOWED'
    );
  }
}

export function logApiRequest(req: NextApiRequest, startTime: number = Date.now()) {
  const duration = Date.now() - startTime;
  const ip = req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || req.connection?.remoteAddress || 'unknown';
  
  console.log(`[API] ${new Date().toISOString()} - ${req.method} ${req.url} - IP: ${ip} - Duration: ${duration}ms`);
}

export function withErrorHandling(handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const startTime = Date.now();
    const endpoint = req.url || 'unknown';
    const method = req.method || 'unknown';
    const ip = req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || req.socket?.remoteAddress || 'unknown';
    const userAgent = req.headers['user-agent'];

    let statusCode = 200;
    let error: string | undefined;
    
    try {
      await handler(req, res);
      statusCode = res.statusCode || 200;
      logApiRequest(req, startTime);
    } catch (err) {
      statusCode = 500;
      error = err instanceof Error ? err.message : 'Unknown error';
      logApiRequest(req, startTime);
      handleApiError(err, res);
    } finally {
      const responseTime = Date.now() - startTime;
      
      // Record performance metrics
      performanceMonitor.recordMetric({
        timestamp: Date.now(),
        endpoint,
        method,
        statusCode,
        responseTime,
        ip: Array.isArray(ip) ? ip[0] : ip.toString(),
        userAgent,
        error
      });
    }
  };
}

// Utility to validate and sanitize Sanity query parameters
export function validateSanityParams(params: Record<string, any>) {
  // Remove any potential injection attempts
  const sanitized = { ...params };
  
  // Basic sanitization - remove common injection patterns
  for (const [key, value] of Object.entries(sanitized)) {
    if (typeof value === 'string') {
      // Remove potential GROQ injection attempts
      sanitized[key] = value.replace(/[{}[\];]/g, '');
    }
  }
  
  return sanitized;
}