## Integration tests

This directory contains a minimal project used as an environment in which to run integration tests.

It's important to isolate this test project from the overall project where the package is built in order to eliminate
assumptions. Specifically, the `package.json` and other configuration files in this directory are meant to include
the minimum requirements and nothing more. Here are a few ways this is set up:

* The `@types/node` dependency is set to a version that corresponds to the lowest supported node version. This enforces
  that the distribution should work in projects who have chosen that particular version, since its the most likely to
  not have types that we accidentally depend on but shouldn't.

* In `tsconfig.json`, ...

### Details

In `package.json`, the `"private"` key must remain set to `true`. This enforces that this project doesn't get
accidentally published.

Also, there are intentionally no `"scripts"` for this package. Scripts usually depend on development dependencies,
which have more transitive dependencies. The more packages that are visible from within this project, the less isolated
it becomes. Therefore, any scripting should be triggered from the outer project directory. An example of this is the
`setup.js` script, which is triggered from the outer directory, but kept in this directory.
