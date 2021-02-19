export const ROUTES = {
    AUTH_LOGIN: 'AUTH_LOGIN',
    INITIAL: 'INITIAL',
    REGISTER: 'REGISTER',
    RECCOVERY: 'RECCOVERY',
    SETTINGS_PROFILE: 'SETTINGS_PROFILE',
    
    SETTINGS_ACCOUNT: 'SETTINGS_ACCOUNT',
    SETTINGS_NOTIFICATIONS: 'SETTINGS_NOTIFICATIONS',
    SETTINGS_CONTENT_DISPLAY: 'SETTINGS_CONTENT_DISPLAY',
    SETTINGS_FAQS: 'SETTINGS_FAQS',

    MAIN_HOME: 'MAIN_HOME',
    MAIN_EVENT: 'MAIN_EVENT',
    MAIN_FOLLOW: 'MAIN_FOLLOW',
    MAIN_VENUE: 'MAIN_VENUE',

    SCREEN_FILTER: 'SCREEN_FILTER',
    SCREEN_FAVOURITES: 'SCREEN_FAVOURITES',
    FILTER_FOLLOW: 'FILTER_FOLLOW',

    SCREEN_FEATURED: 'SCREEN_FEATURED',
    SCREEN_FEATURED_EVENTS: 'SCREEN_FEATURED_EVENTS',
    SCREEN_EVENTS_DETAILS: 'SCREEN_EVENTS_DETAILS',

    EVENTS_MAPS: 'EVENTS_MAPS',
};

export const SCREEN = {
    calendar: {
        backgroundColor: '#FFFFFF'
    },
    discover: {
        backgroundColor: '#CFF973'
    },
    notification: {
        backgroundColor: '#FE736C'
    },
    profile: {
        backgroundColor: '#48B8D7'
    },
    auth_login: {
        backgroundColor: '#122C5B'
    },
    register: {
        backgroundColor: '#122C5B'
    }
}

export const MAIN_TABS = [ROUTES.MAIN_HOME, ROUTES.MAIN_EVENT];
