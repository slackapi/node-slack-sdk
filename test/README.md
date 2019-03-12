## Integration tests

This directory contains a minimal project used as an environment in which to run integration tests.

It's important to isolate this test project from the overall project where the package is built in order to eliminate
assumptions. Specifically, the `package.json` and other configuration files in this directory are meant to include
the minimum requirements and nothing more. Here are a few ways this is set up:

* The `@types/node` dependency is set to a version that corresponds to the lowest supported node version. This enforces
  that the distribution should work in projects who have chosen that particular version, since its the most likely to
  not have types that we accidentally depend on but shouldn't.

* The `typescript` development dependency is set to the most modern version of typescript. It's not important to use the
  oldest supported version because the `dtslint` tool will run the typechecker result integration tests on each
  supported version of TypeScript. It reads the oldest supported version from `types/index.d.ts`.

* The `proxy-test.js` file does depend on packages from the outer project. This decision is a tradeoff between isolation
  and testing performance. Only development dependencies are loaded from the outer project, and since they have no
  place in the runtime behavior, we think this is an acceptable tradeoff. The benefit gained is that less packages are
  installed in the middle of a test run, and therefore testing can be faster and CI servers can cache more of the
  dependencies.

* The `tsconfig.json` file is specifically set to the most strict settings as well as the most minimal requirements.
  This is specifically chosen to verify that the requirements expressed in the documentation are sufficient and
  represent the least amount of configuration needed to get the package working.

* In `package.json`, the `"private"` key must remain set to `true`. This enforces that this project doesn't get
  accidentally published. Also, the `@slack/client` dependency is set to a local filename. This allows the
  `package.json` to remain authoritative about which dependencies are available (important for code editors) and still
  isolated from the version of the package available in the registry.

### Details

You'll notice that this inner project has its own development dependencies. This was done on purpose. Initially, we
tried to install all development dependencies in the top level project (so that there's no need to hit the npm registry
again in the middle of a test run, and so that we can benefit more from module caching in CI systems), but `dtslint` has
some undesirable behavior that preventing us from doing so. Specifically, dependencies of `@slack/client` would be
loaded from the `node_modules` directory at the top-level project, since that was on the module loading path of
`dtslint`, while the `node_modules` directory of the inner project is not.
