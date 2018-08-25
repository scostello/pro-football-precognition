import program from 'commander';
const { generate, provision } = require('./src/sql-builder');

program
    .command('generate')
    .description('Build the SQL files for our project.')
    .action(generate);

program
    .command('provision')
    .description('Provision a database for our project.')
    .action(provision);

program.parse(process.argv);