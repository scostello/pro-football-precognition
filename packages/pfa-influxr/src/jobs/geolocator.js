import S from 'sanctuary';
import { createClient } from '@google/maps';

const mapsClient = createClient({
  key: process.env.GOOGLE_MAPS_API_KEY,
  Promise: Promise,
});

const getJsonResults = S.props(['json', 'results']);

const getGeomLocation = S.props(['geometry', 'location']);

mapsClient
  .places({ query: 'Arrowhead Stadium' })
  .asPromise()
  .then(response => {
    const results = getJsonResults(response);
    const location = results.map(res => getGeomLocation(res));
  })
  .catch(err => console.log(err));
