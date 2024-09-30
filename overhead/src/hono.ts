import { Hono } from 'hono';
import { RegExpRouter } from 'hono/router/reg-exp-router';
export default new Hono({ router: new RegExpRouter() })
    .get('/', (c) => c.body('Hi'))
    .get('/user/:id', (c) => c.body(c.req.param('id')))
    .get('/time', (c) => c.json({ time: performance.now() }));

