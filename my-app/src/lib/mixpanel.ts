import mixpanel from 'mixpanel-browser';

// Fallback directly to your token to guarantee it works even if .env is not loaded
const MIXPANEL_TOKEN = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN || '895541f1e18e9c94613014bee9bb92df';

// Initialize mixpanel
export const initMixpanel = () => {
    if (!MIXPANEL_TOKEN) {
        console.warn('Mixpanel token not found. Analytics will be disabled.');
        return;
    }

    mixpanel.init(MIXPANEL_TOKEN, {
        debug: true, // Forced debug to true so we can see it in action
        track_pageview: true,
        persistence: 'localStorage',
        ignore_dnt: true, // Some browsers send Do Not Track which might block it
    });

    console.log('✅ Mixpanel successfully initialized!');
};

// Track an event
export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
    if (!MIXPANEL_TOKEN) return;

    try {
        mixpanel.track(eventName, properties);
        console.log(`📊 Mixpanel Event: [${eventName}]`, properties || {});
    } catch (error) {
        console.error('❌ Mixpanel track error:', error);
    }
};

// Identify a user
export const identifyUser = (userId: string, traits?: Record<string, any>) => {
    if (!MIXPANEL_TOKEN) return;

    try {
        mixpanel.identify(userId);
        if (traits) {
            mixpanel.people.set(traits);
        }
        console.log(`👤 Mixpanel User Identified: [${userId}]`, traits || {});
    } catch (error) {
        console.error('❌ Mixpanel identify error:', error);
    }
};
