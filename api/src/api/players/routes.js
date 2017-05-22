const router = require('express').Router();
const controller = require('./controller');

router.route('/')
    .get(controller.all);

/*router.route('/:id_player')
 .get(controller.byId);*/

module.exports = router;
