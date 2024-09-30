import { Elysia } from 'elysia';

export default new Elysia()
    .get('/', () => 'Hi')
    .get('/user/:id', (c) => c.params.id)
    .get('/time', () => ({ time: performance.now() }));