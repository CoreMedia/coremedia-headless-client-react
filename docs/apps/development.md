# CoreMedia Headless Client Documentation

[Documentation](../README.md) / Development

---

# Development

The project provides a development environment using React and Apollo
to render an application called Spark. The application heavily relies on common 
React libraries for various capabilities including routing and display.

The application provides a set of foundational libraries to interact with the 
CoreMedia Headless Service that can be used as the basis for creating and managing 
your custom app and allow web developers to focus on customizing and replacing 
the display and view aspects of the app.

This Workspace uses [vite](https://vitejs.dev/) as tooling since version 2210.

## Prerequisites

The project can be loaded on any environment supporting Node.js development. 
We recommend:

- Node.js 20 (LTS) or higher
- pnpm 8

## Development environment

This project uses data from a CoreMedia Headless Stitching server. It will also
use the stitching server as a proxy for images and blobs.

Please remember to start the Stitching Server and keep it running for the app.

## Installation

To complete the setup, run the following commands from the project directory once.

```
pnpm install
pnpm build
```

You need to build the workspace once before you can start it. The build script 
builds the necessary packages, and generates the type definitions for the GraphQL 
queries.

## Workflow

Run `pnpm start` and open [http://localhost:5173](http://localhost:5173) to view 
the app in a browser. It will run in Preview Mode by default with Loglevel "info" 
(and Loglevel "warn" in production mode).

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

To change the log level set an environment variable VITE_LOGLEVEL to the given level.
See https://github.com/pimterry/loglevel#logging-methods

## Available Scripts

In the project directory [apps/spark](../../apps/spark), you can run the following commands:

### `pnpm start`

Runs the app in the development mode.<br />
Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

### `pnpm download`

Apollo downloads and generates all required resources like schema, metadata and 
type definitions and saves them to the `__downloaded__` folder. 
If no Headless Server is defined for `VITE_API_ENDPOINT`, the script will 
skip the download.

### `pnpm build`

Builds the app for production to the `dist` folder.

### `pnpm lint`

Runs just the Typescript linting and formatting (based on eslint and prettier) on the repository.

### `pnpm run docs`

Generates TypeDoc documentation and places it into [/docs](../../apps/spark/docs).

## IDE Support

Using IntelliJ Idea with the JS GraphQL Plugin enables Code Completion for the
GraphQL Queries. The `schema.graphql` is checked into the workspace. To update 
it to your changes, configure and use the `.graphqlconfig`.
