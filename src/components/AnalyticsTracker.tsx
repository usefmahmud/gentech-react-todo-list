import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { trackEvent } from '../utils/analytics'

const AnalyticsTracker = () => {
  const location = useLocation()

  useEffect(() => {
    trackEvent('Page Viewed', {
      path: location.pathname
    })
  }, [location])
  
  return null
}

export default AnalyticsTracker