'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = app => {
    const orm = app.get('orm');
    const modelName = 'Team';

    orm.model(modelName, {
        tableName: 'reporting.teams'
    });

    return orm.model(modelName);
};