import { jitc, router } from '@mapl/app';

const app = router()
    .get('/', {
        type: 'text',
        fn: () => 'Hi'
    })
    .get('/user/*', {
        type: 'text',
        fn: (c) => c.params[0]
    })
    .get('/time', {
        type: 'json',
        fn: () => ({ time: performance.now() })
    })

export default { fetch: jitc(app) };