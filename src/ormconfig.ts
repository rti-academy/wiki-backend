import { ConnectionOptions } from 'typeorm';

const environment = process.env.NODE_ENV;

export const config: ConnectionOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'gorod',
    password: '123qwe',
    database: environment === 'prod' ? 'wiki' : 'wiki_dev',
    entities: [__dirname + '/entities/*'],
    migrations: [__dirname + '/migrations/*'],
    cli: {
        migrationsDir: 'src/migrations',
    },
}

module.exports = config;
