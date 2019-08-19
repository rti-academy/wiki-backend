import 'reflect-metadata';
import { useExpressServer } from 'routing-controllers';
import * as express from 'express';

const app = express();

useExpressServer(app, {
    routePrefix: '/api',
    controllers: [__dirname + '/controllers/**/*'],
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
