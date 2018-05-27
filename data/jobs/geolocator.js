const R = require('ramda');
const Maybe = require('ramda-fantasy').Maybe;
const googleMapsClient = require('@google/maps').createClient({
    key: process.env.GOOGLE_MAPS_API_KEY
});

googleMapsClient.places({
    query: 'Arrowhead Stadium'
}, (err, response) => {
    if (err) {
        console.error('Something went wrong!');
    }

    const m = Maybe(response)
        .map(R.path(['json', 'results']));

    //console.log(m.getOrElse([]));
    if (m.getOrElse([]).length === 1) {
        console.log(m.getOrElse([])[0])
    }
});
