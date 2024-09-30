import { group, req, samples, start } from "./setup.ts";

group(
    '/', 
    samples().map(() => req('/'))
);

group(
    '/user/:id', 
    samples().map(() => req(`/user/${Math.random()}`))
);

group(
    '/time', 
    samples().map(() => req('/time'))
);

start();