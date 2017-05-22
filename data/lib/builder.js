const path      = require('path');
const Promise   = require('bluebird');
const fs        = Promise.promisifyAll(require('fs'));
const mkdirp    = Promise.promisifyAll(require('mkdirp')).mkdirpAsync;
const Massive   = require('massive');

const connect = () => {
    return new Promise((resolve, reject) => {
        Massive.connect({db: 'pro_football_precog'}, (err, db) => err ? reject(err) : resolve(db));
    });
};

const loadSqlFiles = (schema) => (filePath) => {
    const glob = require('glob');
    const globPattern = path.join(getSqlObjectsPath(), schema, '**/*.sql');
    const sql = glob.sync(globPattern, {nosort: true})
        .reduce((sql, file) => {
            return sql.concat([fs.readFileSync(file, {encoding: 'utf-8'})]);
        }, [`SET search_path=${schema};`])
        .join('\r\n');

    return {
        filePath,
        sql,
    };
};

const getSqlObjectsPath = () => path.join(__dirname, '../sql');
const getSqlBuildPath = () => path.join(__dirname, '../build');

const getSqlFile = (schema) => () => {
    const filePath = path.join(getSqlBuildPath(), schema + '.sql');

    return new Promise((resolve, reject) => {
        mkdirp(getSqlBuildPath())
            .then(() => {
                resolve(filePath);
            })
            .catch(reject);
    });
};

const directoryExists = (dir) => fs.accessAsync(path.join(getSqlObjectsPath(), dir), fs.constants.R_OK);

const generateSql = (schemas = []) => {
    return schemas.map((schema) => {
        return directoryExists(schema)
            .then(getSqlFile(schema))
            .then(loadSqlFiles(schema))
            .then(({sql, filePath}) => {
                return fs.writeFileAsync(filePath, sql)
                    .then(() => {
                        return sql;
                    })
            });
    });
};

exports.generateSql = generateSql;

const executeSql = (sqlContents) => {
    return connect()
        .then((db) => {
            return sqlContents.map((sql) => db.run(sql))
        });
};

exports.install = (schemas = []) => {
    return Promise.all(generateSql(schemas))
        .then(executeSql);
};