import { injectReducer } from '../../store/reducers';

export default (store) => ({
    path: 'predictions',

    /*  Async getComponent is only invoked when route matches   */
    getComponent (nextState, cb) {
        /*  Webpack - use 'require.ensure' to create a split point
         and embed an async module loader (jsonp) when bundling   */
        require.ensure([], (require) => {
            /*  Webpack - use require callback to define
             dependencies for bundling   */
            const Predictions = require('./containers/PredictionsContainer').default;
            const reducer = require('./modules/predictions').default;

            /*  Add the reducer to the store on key 'counter'  */
            injectReducer(store, { key: 'predictions', reducer });

            /*  Return getComponent   */
            cb(null, Predictions);

            /* Webpack named bundle   */
        }, 'predictions');
    }
})
