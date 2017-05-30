import {CALL_API} from 'middleware/api';

// ------------------------------------
// Constants
// ------------------------------------
export const FETCH_REQUEST = 'FETCH_REQUEST';
export const FETCH_SUCCESS = 'FETCH_SUCCESS';
export const FETCH_FAILURE = 'FETCH_FAILURE';

// ------------------------------------
// Actions
// ------------------------------------
export function fetchPlayers(query) {
    return {
        [CALL_API]: {
            endpoint: 'players',
            query,
            types: [FETCH_REQUEST, FETCH_SUCCESS, FETCH_FAILURE],
        }
    };
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
    [FETCH_SUCCESS]        : (state, action) => {
        return state;
    },
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = 0;
export default function predictionsReducer (state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}
