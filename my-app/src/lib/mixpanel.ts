import mixpanel from 'mixpanel-browser';

const isProduction = process.env.NODE_ENV === 'production';

// Initialize mixpanel
export const initMixpanel = () => {
    const token = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN;
    if (!token) {
        if (!isProduction) {
            console.warn('Mixpanel token not found. Analytics will be disabled.');
        }
        return;
    }

    mixpanel.init(token, {
        debug: !isProduction,
        track_pageview: true,
        persistence: 'localStorage',
    });
};

// Track an event
export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
    if (!process.env.NEXT_PUBLIC_MIXPANEL_TOKEN) return;

    try {
        mixpanel.track(eventName, properties);
    } catch (error) {
        if (!isProduction) {
            console.error('Mixpanel track error:', error);
        }
    }
};

// Identify a user
export const identifyUser = (userId: string, traits?: Record<string, any>) => {
    if (!process.env.NEXT_PUBLIC_MIXPANEL_TOKEN) return;

    try {
        mixpanel.identify(userId);
        if (traits) {
            mixpanel.people.set(traits);
        }
    } catch (error) {
        if (!isProduction) {
            console.error('Mixpanel identify error:', error);
        }
    }
};
