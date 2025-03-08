import { useEffect, useState } from "react"
import { trackEvent } from "../utils/analytics"

type LayoutType = 'grid' | 'list'

export const useTodosLayout = () => {
  const [isGridView, setIsGridView] = useState(() => {
    const storedLayout = localStorage.getItem('layout') as LayoutType || 'grid'
    return storedLayout === 'grid' ? true : false
  })


  useEffect(() => {
    const layout: LayoutType = isGridView ? 'grid' : 'list'
    localStorage.setItem('layout', layout)
  }, [isGridView])

  const setLayout = (layout: LayoutType) => {
    trackEvent('Layout Change', {
      layout
    })
    setIsGridView(layout === 'grid')
  }

  return [(isGridView ? 'grid' : 'list') as LayoutType, setLayout] as const
}