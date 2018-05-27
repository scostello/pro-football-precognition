import S from 'sanctuary';
import { createClient } from '@google/maps';

const googleMapsClient = createClient({
    key: process.env.GOOGLE_MAPS_API_KEY
});

googleMapsClient.places({
    query: 'Arrowhead Stadium'
}, (err, response) => {
    if (err) {
        console.error('Something went wrong!');
    }

    const results = S.props(['json', 'results'], response);

    console.log(S.map(S.props(['geometry', 'location']), results));
});
