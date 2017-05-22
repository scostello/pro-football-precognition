import qs from 'query-string';

const getResource = (endPoint) => {
    return fetch(endPoint)
        .then((response) => response.json());
};

export const CALL_API = 'CALL_API';

export default store => next => action => {
    const callApi = action[CALL_API];

    if (!callApi) return next(action);

    const {endpoint, types, query} = callApi;
    const [requestType, successType, failureType] = types;


    return getResource('http://localhost:3001/' + endpoint)
        .then((results) => {
            return next({
                type: successType,
                payload: {
                    results,
                }
            });
        })
        .catch((err) => {
            return next({
                type: failureType,
                payload: {
                    error: err,
                }
            });
        });
};
