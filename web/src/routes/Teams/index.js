import { injectReducer } from '../../store/reducers';

export default (store) => ({
    path: 'teams',

    /*  Async getComponent is only invoked when route matches   */
    getComponent (nextState, cb) {
        /*  Webpack - use 'require.ensure' to create a split point
         and embed an async module loader (jsonp) when bundling   */
        require.ensure([], (require) => {
            /*  Webpack - use require callback to define
             dependencies for bundling   */
            const Teams = require('./containers/TeamsContainer').default;
            const reducer = require('./modules/teams').default;

            /*  Add the reducer to the store on key 'counter'  */
            injectReducer(store, { key: 'teams', reducer });

            /*  Return getComponent   */
            cb(null, Teams);

            /* Webpack named bundle   */
        }, 'teams');
    }
})
