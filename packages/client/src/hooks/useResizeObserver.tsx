import { useState, useEffect } from 'react'
import { RefObject } from 'react'

const useResizeObserver = (elRef: RefObject<HTMLDivElement | null>) => {
  const [elSize, setElSize] = useState({
    width: 0,
    height: 0,
  })

  useEffect(() => {
    if (elRef.current == null) return
    const resizeObserver = new ResizeObserver(entries => {
      setElSize({
        width: entries[0].contentRect.width,
        height: entries[0].contentRect.height,
      })
    })

    resizeObserver.observe(elRef.current)
    return () => {
      if (elRef.current) resizeObserver.unobserve(elRef.current)
    }
  }, [elRef])

  return elSize
}

export default useResizeObserver
