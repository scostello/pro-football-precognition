const path       = require('path');
const fs         = require('fs');
const { Client } = require('pg');
const glob       = require('glob');

require('dotenv').config({path: path.join(__dirname, '../.env')});

const buildPath = path.join(__dirname, '../build');

const sqlPath = path.join(__dirname, '../sql');
const sqlGlob = '**/*.sql';
const sqlGlobPath = path.join(sqlPath, sqlGlob);

const concatFiles = (files) => {
    return new Promise((resolve) => {
        const contents = files
            .map((file) => fs.readFileSync(file, {encoding: 'utf-8'}))
            .reduce((acc, file) => acc.concat([file]), [])
            .join('\r\n');

        return resolve(contents);
    });
};

const createBuildDir = (buildDir) => {
    return new Promise((resolve, reject) => {
        if (fs.existsSync(buildDir)) return resolve(buildDir);

        fs.mkdir(buildDir, (err) => {
            if (err) {
                return reject(err);
            }

            return resolve(buildDir);
        });
    });
};

const writeFile = (fileName, contents) => () => {
    return new Promise((resolve, reject) => {
        fs.writeFile(fileName, contents, (err) => {
            if (err) {
                return reject(err);
            }

            return resolve(contents);
        });
    });
};

const writeContentsTo = (filePath) => (contents) => {
    return createBuildDir(path.dirname(filePath))
        .then(writeFile(filePath, contents));
};

const generate = () => {
    return concatFiles(glob.sync(sqlGlobPath))
        .then(writeContentsTo(path.join(buildPath, 'pro_football_analytics.sql')));
};

const connect = () => {
    return new Promise((resolve) => {
        const client = new Client();
        client.connect();
        return resolve(client);
    });
};

const runSql = ([sql, client]) => {
    return new Promise((resolve, reject) => {
        client.query(sql, (err, res) => {
            if (err) return reject(err);

            client.end();
            return resolve(res);
        });
    });
};

const provision = () => {
    return Promise.all([generate(), connect()])
        .then(runSql)
        .catch(err => console.error(err));
};

module.exports = {
    generate,
    provision,
};