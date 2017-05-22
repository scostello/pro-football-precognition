import {CALL_API} from 'middleware/api';

// ------------------------------------
// Constants
// ------------------------------------
export const FETCH_REQUEST = 'FETCH_REQUEST';
export const FETCH_SUCCESS = 'FETCH_SUCCESS';
export const FETCH_FAILURE = 'FETCH_FAILURE';

export const COUNTER_INCREMENT = 'COUNTER_INCREMENT';
export const COUNTER_DOUBLE_ASYNC = 'COUNTER_DOUBLE_ASYNC';

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

export function increment (value = 1) {
    return {
        type    : COUNTER_INCREMENT,
        payload : value
    };
}

/*  This is a thunk, meaning it is a function that immediately
 returns a function for lazy evaluation. It is incredibly useful for
 creating async actions, especially when combined with redux-thunk! */

export const doubleAsync = () => {
    return (dispatch, getState) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                dispatch({
                    type    : COUNTER_DOUBLE_ASYNC,
                    payload : getState().counter
                });
                resolve();
            }, 200);
        });
    };
};

export const actions = {
    increment,
    doubleAsync
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
    [COUNTER_INCREMENT]    : (state, action) => state + action.payload,
    [COUNTER_DOUBLE_ASYNC] : (state, action) => state * 2,
    [FETCH_SUCCESS]        : (state, action) => {
        debugger;
        return state;
    },
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = 0;
export default function counterReducer (state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}
