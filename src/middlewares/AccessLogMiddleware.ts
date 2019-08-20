import * as morgan from 'morgan';
import { Stream } from 'stream';
import { Middleware, ExpressMiddlewareInterface } from 'routing-controllers';

const format = '[:date[iso]] :method :url :status :res[content-length] ":user-agent" - :response-time ms';

const stream = new Stream.Writable({
    write(chunk, encoding, next) {
        console.log(chunk.toString());
        next();
    },
});

@Middleware({ type: 'before' })
export class AccessLogMiddleware implements ExpressMiddlewareInterface {
    public use = morgan(format, { stream });
}
