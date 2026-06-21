export function throttle(fn: any, delay: number) {
    let last:number | null = null
    return (...args: any[]) => {
        const now = Date.now()
        if (now - last > delay || last === null) {
            last = now
            return fn(...args)
        }
    }
}