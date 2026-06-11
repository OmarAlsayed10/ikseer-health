interface Entry {
  count: number
  firstRequestAt: number
}

const store = new Map<string, Entry>()

export interface RateLimitOptions {
  maxRequests: number
  windowMs: number
}


export interface RateLimitResult {
  allowed: boolean
  resetAt: number
}

export function checkRateLimit(key: string, options: RateLimitOptions): RateLimitResult {
  const now = Date.now()
  const entry = store.get(key)

  if (!entry || now - entry.firstRequestAt > options.windowMs) {
    store.set(key, { count: 1, firstRequestAt: now })
    return { allowed: true, resetAt: now + options.windowMs }
  }

  if (entry.count >= options.maxRequests) {
    return { allowed: false, resetAt: entry.firstRequestAt + options.windowMs }
  }

  entry.count++
  return { allowed: true, resetAt: entry.firstRequestAt + options.windowMs }
}
