export function throttle(fn: any, delay: number) {
    let last:number | null = null
    return (...args: any[]) => {
        const now = Date.now()
        if (last === null || now - last > delay) {
            last = now
            return fn(...args)
        }
    }
}