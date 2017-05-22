const program  = require('commander');
const builder  = require('./lib/builder');

program
    .command('build [schemas...]')
    .description('Build the SQL files for our project')
    .action((schemas) => {
        console.info('Building...');
        Promise.all(builder.generateSql(schemas))
            .then(() => console.log('Finished!'))
            .catch((err) => console.error(err));

    });

program
    .command('install [schemas...]')
    .description('Build and execute the SQL files for our project')
    .action((schemas) => {
        console.info('Installing...');
        builder.install(schemas)
            .then(() => console.log('Finished!'))
            .catch((err) => console.error(err));
    });

program.parse(process.argv);