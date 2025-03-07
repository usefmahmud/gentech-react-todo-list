import { useEffect, useState } from "react"

export const useRTL = () => {
  const [isRTL, setIsRTL] = useState(false)

  useEffect(() => {
    const observer = new MutationObserver(() => {  
      setIsRTL(document.documentElement.dir === 'rtl')
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['dir']
    })

    return () => observer.disconnect()
  }, [])

  return isRTL
}