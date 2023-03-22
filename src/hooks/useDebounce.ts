import React, { useState, useEffect} from 'react'

export const useDebounce = (value: string, delay: number): string => {
    console.log(value)
    const [debounced, setDebounced] = useState<string>(value)
    useEffect(() => {
       const timeout =  setTimeout(() => setDebounced(value), delay)
       return () => clearTimeout(timeout)
    }, [value])
    
  return debounced
}
