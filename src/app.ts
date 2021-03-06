import 'reflect-metadata';
import * as express from 'express';
import * as path from 'path';
import { useExpressServer } from 'routing-controllers';
import { createConnection, useContainer } from 'typeorm';
import { Container } from 'typedi';

const ormconfig = require('./ormconfig');

const PORT = process.env.NODE_ENV === 'prod' ?
    3000 :
    3010;

async function run(port: number): Promise<void> {
    useContainer(Container);

    await createConnection(ormconfig);

    const app = express();

    useExpressServer(app, {
        routePrefix: '/api',
        controllers: [__dirname + '/controllers/*'],
        middlewares: [__dirname + '/middlewares/*'],
    });
    app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

    app.listen(port, () => console.log(`Server started on port ${port}`));
}

run(PORT);
