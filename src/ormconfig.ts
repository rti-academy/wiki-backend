import { ConnectionOptions } from 'typeorm';

export const config: ConnectionOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'wiki',
    password: '123qwe',
    database: 'wiki',
    entities: [__dirname + '/entities/*'],
    migrations: [__dirname + '/migrations/*'],
    cli: {
        migrationsDir: 'src/migrations',
    },
}

module.exports = config;
