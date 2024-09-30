import { summary, bench, run } from 'mitata';

import elysia from './src/elysia.ts';
import hono from './src/hono.ts';
import mapl from './src/mapl.ts';

// Import all stuff here
const fetchers: Record<string, { fetch: (req: Request) => any }> = {
    Hono: hono, 
    Mapl: mapl,
    Elysia: elysia
};

// Warmup
bench('noop', () => {});
bench('noop2', () => {});

for (const key in fetchers) {
    const fetcher = fetchers[key];

    for (let i = 0; i < 100000; i++) 
        fetcher.fetch(req('/'));
}

export function req(path: string, init?: RequestInit) {
    return new Request('http://127.0.0.1' + path, init);
}

export function group(name: string, reqs: Request[]) {
    summary(() => {
        for (const key in fetchers) {
            const fetcher = fetchers[key];
            const fn = (req: Request) => fetcher.fetch(req);

            // Warmup
            const run = () => reqs.map(fn);
            Bun.gc(true);

            bench(`"${name}" - ${key}`, run);
        }
    });
}

export const SAMPLES = 1e5;

export function samples() {
    return new Array(SAMPLES).fill(null);
}

export function start() {
    run();
}