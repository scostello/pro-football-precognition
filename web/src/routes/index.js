// We only need to import the modules necessary for initial render
import MainLayout from 'layouts/MainLayout'
import Dashboard from './Dashboard'
import LeagueRoute from './League'
import TeamsRoute from './Teams'
import PlayersRoute from './Players'
import PredictionsRoute from './Predictions'

/*  Note: Instead of using JSX, we recommend using react-router
    PlainRoute objects to build route definitions.   */

export const createRoutes = (store) => Object.assign({}, MainLayout(store), {
    path        : '/',
    indexRoute  : Dashboard,
    childRoutes : [
        LeagueRoute(store),
        TeamsRoute(store),
        PlayersRoute(store),
        PredictionsRoute(store),
    ]
});

/*  Note: childRoutes can be chunked or otherwise loaded programmatically
    using getChildRoutes with the following signature:

    getChildRoutes (location, cb) {
      require.ensure([], (require) => {
        cb(null, [
          // Remove imports!
          require('./Counter').default(store)
        ])
      })
    }

    However, this is not necessary for code-splitting! It simply provides
    an API for async route definitions. Your code splitting should occur
    inside the route `getComponent` function, since it is only invoked
    when the route exists and matches.
*/

export default createRoutes;
