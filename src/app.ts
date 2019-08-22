import 'reflect-metadata';
import * as express from 'express';
import * as path from 'path';
import { useExpressServer } from 'routing-controllers';
import { createConnection, useContainer } from 'typeorm';
import { Container } from 'typedi';

const ormconfig = require('./ormconfig');

async function run(port: number): Promise<void> {
    useContainer(Container);

    await createConnection(ormconfig);

    const app = express();

    useExpressServer(app, {
        routePrefix: '/api',
        controllers: [__dirname + '/controllers/*'],
        middlewares: [__dirname + '/middlewares/*'],
    });
    app.use('/static', express.static(path.resolve(__dirname, '..', 'uploads')));

    app.listen(port, () => console.log(`Server started on port ${port}`));
}

run(3000);
