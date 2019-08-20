import { ConnectionOptions } from 'typeorm';

export const config: ConnectionOptions = {
    type: 'sqlite',
    database: './data/line.sqlite',
    entities: [__dirname + '/entities/*'],
    migrations: [__dirname + '/migrations/*']
}

module.exports = config;
