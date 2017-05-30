// ------------------------------------
// Constants
// ------------------------------------
export const MENU_FETCH_REQUEST = 'MENU_FETCH_REQUEST';
export const MENU_FETCH_SUCCESS = 'MENU_FETCH_SUCCESS';
export const MENU_FETCH_FAILURE = 'MENU_FETCH_FAILURE';

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
    [MENU_FETCH_SUCCESS] : (state, action) => state + action.payload,
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
    navItems: [
        {
            name: 'league',
            display: 'League',
            icon: 'league',
            path: '/league',
        },
        {
            name: 'teams',
            display: 'Teams',
            icon: 'teams',
            path: '/teams',
        },
        {
            name: 'players',
            display: 'Players',
            icon: 'players',
            path: '/players',
        },
        {
            name: 'predictions',
            display: 'Predictions',
            icon: 'prediction',
            path: '/predictions',
        },
    ]
};
export default function mainReducer (state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}
