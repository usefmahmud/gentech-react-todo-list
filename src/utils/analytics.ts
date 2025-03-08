import mixpanel from 'mixpanel-browser'

export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  mixpanel.track(eventName, properties)
}

export const identifyUser = (userId: string) => {
  mixpanel.identify(userId)
} 

export const setUserProperties = (properties: Record<string, any>) => {
  mixpanel.people.set(properties)
}