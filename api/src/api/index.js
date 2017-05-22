const registerRoutes = (app) => {
    app.use('/players', require('./players/routes'));
};

module.exports = {
    registerRoutes,
};