import { useCallback, useEffect, useRef } from 'react'

const useDebounce = (callback: () => void, delay: number, deps: Array<any>) => {
    const callbackRef = useRef(callback)
    const timeoutRef = useRef<NodeJS.Timeout>()

    useEffect(() => {
        callbackRef.current = callback
    }, [callback])

    const set = useCallback(() => {
        timeoutRef.current = setTimeout(() => callbackRef.current(), delay)
    }, [delay])

    const clear = useCallback(() => {
        timeoutRef.current && clearTimeout(timeoutRef.current)
    }, [])

    const reset = useCallback(() => {
        clear()
        set()
    }, [clear, set])

    useEffect(reset, [...deps, reset])
    useEffect(clear, [])
}

export { useDebounce }
