import { expectTypeOf } from '@japa/expect-type';
import 'reflect-metadata';
import { Ignitor, prettyPrintError } from '@adonisjs/core';
import { configure, processCLIArgs, run } from '@japa/runner';
import { apiClient } from '@japa/api-client';
import { assert } from '@japa/assert';
import env from '#start/env';
process.env.NODE_ENV = 'test';
const APP_ROOT = new URL('../', import.meta.url);
const IMPORTER = (filePath) => {
    if (filePath.startsWith('./') || filePath.startsWith('../')) {
        return import(new URL(filePath, APP_ROOT).href);
    }
    return import(filePath);
};
new Ignitor(APP_ROOT, { importer: IMPORTER })
    .tap((app) => {
    app.booting(async () => {
        await import('#start/env');
    });
    app.listen('SIGTERM', () => app.terminate());
    app.listenIf(app.managedByPm2, 'SIGINT', () => app.terminate());
})
    .testRunner()
    .configure(async (app) => {
    const { runnerHooks, ...config } = await import('../tests/bootstrap.js');
    processCLIArgs(process.argv.splice(2));
    configure({
        ...app.rcFile.tests,
        ...config,
        ...{
            setup: runnerHooks.setup,
            teardown: runnerHooks.teardown.concat([() => app.terminate()]),
        },
        plugins: [
            expectTypeOf(),
            apiClient({ baseURL: `http://${env.get('HOST')}:${env.get('PORT')}` }),
            assert(),
        ],
    });
})
    .run(() => run())
    .catch((error) => {
    process.exitCode = 1;
    prettyPrintError(error);
});
//# sourceMappingURL=test.js.map