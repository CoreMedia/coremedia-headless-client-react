# CoreMedia Headless Stitching Server Documentation

[Documentation](../README.md) / Workspace Structure

---

# Workspace Structure

The `servers` folder contains two sub-workspaces: `mocking` and `stitching`.

```
servers/
├── mocking/
└── stitching/
```

- `mocking` includes the mock server.
- `stitching` includes the stitching server based on Apollo express.
 
## [mocking](../../../servers/mocking)

This folder includes the mock server based on [smoke](https://github.com/sinedied/smoke) / Apollo express.

```
mocking/
├── bin/
├── lib/
├── mocks/
├── test/
```

- `bin` includes the scrips to start the [smoke](https://github.com/sinedied/smoke) server and the smoke-conv tool.
- `lib` is the source code folder (JavaScript sources).
- `mocks` includes the pre-fabricated mock files to support the default mocking mode.
- `test` includes test scripts and mocks that comes with the original [smoke](https://github.com/sinedied/smoke) distribution.

## [stitching](../../../servers/stitching)

This folder includes the stitching server based on Apollo express.

```
stitching/
├── dist/
├── src/
```

- `dist` is the distribution folder where the JavaScript files are built.
- `src` is the source code folder (TypeScript sources).
