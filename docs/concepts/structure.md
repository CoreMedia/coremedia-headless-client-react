# CoreMedia Headless Client Documentation

[Documentation](../README.md) / [Concepts](README.md) / Workspace Structure

---

# Workspace Structure

The workspace contains four main folders.

```
headless-client-workspace/
├── app/
├── app-standalone-fragment/
├── docs/
└── packages/
    ├── preview-*/
    └── view-dispatcher/
```

## [app](../../app)

This folder includes the Spark app based on React and Apollo.

```
app/
├── bin/
├── build/
├── docs/
├── nginx/
├── public/
└── src/
    ├── __downloaded__/
    ├── __generated__/
    ├── components/
    ├── container/
    ├── context/
    ├── models/
    ├── queries/
    └── utils
```

- `bin` includes the scrips to download and generate the json files, used by the 
  app, like the schema, the interfaces or types for the apollo cache.
- `build` is the target folder for the minified production build.
- `docs` includes the Typedoc documentation for the app.
- `nginx` includes a simple example configuration for the [Dockerfile](../../Dockerfile).

The source code is separated into different folder based on the functionality of 
the code.

- `components` - All React render components as functional components, 
  see https://reactjs.org/docs/components-and-props.html
- `container` - Page components as entrypoints. They query the GraphQL API to 
  retrieve the data from CoreMedia Headless Server.
- `context` - React Context provider, see https://reactjs.org/docs/context.html
- `models` - the view models used in the components
- `queries` - GraphQL queries and fragments
- `utils` - Utility and Helper functions

## [app-standalone-fragment](../../app-standalone-fragment)

This folder includes the standalone fragment application. This can be used to
integrate content from CoreMedia as a Javascript snippet into another 
website. For example via Google Tag Manager.

## [docs](../../docs)

This folder includes the documentation for this workspace.

## [packages](../../packages)

This folder includes the libraries as packages, which can be used in the app.

