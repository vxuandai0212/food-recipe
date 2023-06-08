import { createClient } from 'redis'
const PASSWORD = '__@picker-redis'
const IP = '192.168.1.78'
const PORT = 6379
const REDIS_URL = `redis://default:${PASSWORD}@${IP}:${PORT}`

export const ENABLE_REDIS = 0
export const REDIS_TTL = 600 // unit secs 10 min

export const redisClient = createClient({
  url: REDIS_URL
})
