import { NextRequest, NextResponse } from 'next/server';

// Rate limiting store (in-memory for simplicity)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Rate limiting configuration
const RATE_LIMITS = {
  '/api/sitemap': { limit: 10, window: 60 * 1000 }, // 10 requests per minute
  '/api/hello': { limit: 20, window: 60 * 1000 }, // 20 requests per minute
} as const;

function cleanupExpiredEntries() {
  const now = Date.now();
  const entries = Array.from(rateLimitStore.entries());
  for (const [key, value] of entries) {
    if (now > value.resetTime) {
      rateLimitStore.delete(key);
    }
  }
}

function checkRateLimit(ip: string, path: string): { allowed: boolean; remaining: number; resetTime: number } {
  cleanupExpiredEntries();
  
  // Find matching rate limit configuration
  const rateLimitConfig = Object.entries(RATE_LIMITS).find(([pattern]) => 
    path.startsWith(pattern)
  )?.[1] || { limit: 30, window: 60 * 1000 }; // Default limit

  const key = `${ip}:${path}`;
  const now = Date.now();
  const entry = rateLimitStore.get(key);

  if (!entry || now > entry.resetTime) {
    // First request or window expired
    const resetTime = now + rateLimitConfig.window;
    rateLimitStore.set(key, { count: 1, resetTime });
    return { allowed: true, remaining: rateLimitConfig.limit - 1, resetTime };
  }

  if (entry.count >= rateLimitConfig.limit) {
    // Rate limit exceeded
    return { allowed: false, remaining: 0, resetTime: entry.resetTime };
  }

  // Increment count
  entry.count++;
  rateLimitStore.set(key, entry);
  return { allowed: true, remaining: rateLimitConfig.limit - entry.count, resetTime: entry.resetTime };
}

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const { pathname } = request.nextUrl;

  // Apply security headers to all routes
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'origin-when-cross-origin');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  
  // Strict Transport Security (HSTS) - only for HTTPS
  if (request.nextUrl.protocol === 'https:') {
    response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  }

  // Content Security Policy
  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: https: blob:",
    "connect-src 'self' https://api.sanity.io https://*.sanity.io https://www.google-analytics.com",
    "frame-src 'none'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'"
  ].join('; ');
  
  response.headers.set('Content-Security-Policy', csp);

  // Apply rate limiting to API routes
  if (pathname.startsWith('/api/')) {
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    const rateLimit = checkRateLimit(ip, pathname);

    // Add rate limit headers
    response.headers.set('X-RateLimit-Limit', String(Object.values(RATE_LIMITS)[0]?.limit || 30));
    response.headers.set('X-RateLimit-Remaining', String(rateLimit.remaining));
    response.headers.set('X-RateLimit-Reset', String(Math.ceil(rateLimit.resetTime / 1000)));

    if (!rateLimit.allowed) {
      return new NextResponse(
        JSON.stringify({ 
          error: 'Rate limit exceeded', 
          message: 'Too many requests. Please try again later.',
          retryAfter: Math.ceil((rateLimit.resetTime - Date.now()) / 1000)
        }),
        { 
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'Retry-After': String(Math.ceil((rateLimit.resetTime - Date.now()) / 1000)),
            ...Object.fromEntries(response.headers.entries())
          }
        }
      );
    }

    // Add CORS headers for API routes
    response.headers.set('Access-Control-Allow-Origin', 'https://raymond-ng.com');
    response.headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
    response.headers.set('Access-Control-Max-Age', '86400');

    // Log API requests for monitoring
    console.log(`[API] ${new Date().toISOString()} - ${request.method} ${pathname} - IP: ${ip} - Remaining: ${rateLimit.remaining}`);
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};