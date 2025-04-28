export class Cache {
  private ttl: number
  private store: Map<string, unknown> = new Map()
  private timers: Map<string, NodeJS.Timeout> = new Map()

  // 5 minutes by default
  constructor(ttlInSeconds: number = 60 * 5) {
    this.ttl = ttlInSeconds
  }

  set(key: string, value: unknown) {
    this.clearTimer(key)

    this.store.set(key, value)
    const timer = setTimeout(() => {
      this.store.delete(key)
      this.timers.delete(key)
    }, this.ttl * 1000)

    this.timers.set(key, timer)
  }

  get(key: string) {
    return this.store.get(key)
  }

  has(key: string) {
    return this.store.has(key)
  }

  del(key: string) {
    this.clearTimer(key)
    this.store.delete(key)
  }

  private clearTimer(key: string) {
    const timer = this.timers.get(key)
    if (timer) clearTimeout(timer)
    this.timers.delete(key)
  }
}
