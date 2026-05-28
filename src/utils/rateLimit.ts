interface RateLimitEntry {
  count: number
  firstRequestAt: number
}

const store = new Map<string, RateLimitEntry>()

export interface RateLimitOptions {
  maxRequests: number
  windowMs: number
}

export interface RateLimitResult {
  allowed: boolean
  remaining: number
  resetAt: number
}

export function checkRateLimit(key: string, options: RateLimitOptions): RateLimitResult {
  const now = Date.now()
  const entry = store.get(key)

  if (!entry || now - entry.firstRequestAt > options.windowMs) {
    store.set(key, { count: 1, firstRequestAt: now })
    return { allowed: true, remaining: options.maxRequests - 1, resetAt: now + options.windowMs }
  }

  if (entry.count >= options.maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetAt: entry.firstRequestAt + options.windowMs,
    }
  }

  entry.count++
  return {
    allowed: true,
    remaining: options.maxRequests - entry.count,
    resetAt: entry.firstRequestAt + options.windowMs,
  }
}

export function clearRateLimit(key: string): void {
  store.delete(key)
}
