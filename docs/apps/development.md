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

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Prerequisites

The project can be loaded on any environment supporting Node.js development. 
We recommend:

- Node.js 16.x (LTS) or higher
- pnpm 6.x

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
builds the necessary packages, and it runs `pnpm apollo:prepare` to 
download and generate the type definitions for the GraphQL queries.

## Workflow

Run `pnpm start` and open [http://localhost:3000](http://localhost:3000) to view 
the app in a browser. It will run in Preview Mode by default.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

## Available Scripts

In the project directory [apps/spark](../../apps/spark), you can run the following commands:

### `pnpm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `pnpm download`

Apollo downloads and generates all required resources like schema, metadata and 
type definitions and saves them to the `__downloaded__` folder. 
If no Headless Server is defined for `REACT_APP_API_ENDPOINT`, the script will 
skip the download.

### `pnpm apollo:codegen`

Apollo generates all required type definitions in `__generated__` folders. You
should generate them everytime you change the GraphQL queries or fragments. 

### `pnpm build`

Builds the app for production to the `build` folder. It calls `pnpm apollo:codegen`
as prebuild step. See the section about [deployment](deployment.md) for more information.

### `pnpm lint`

Runs just the Typescript linting and formatting (based on eslint and prettier) on the repository.

### `pnpm docs`

Generates TypeDoc documentation and places it into [/docs](../../apps/spark/docs).

## IDE Support

Using IntelliJ Idea with the JS GraphQL Plugin enables Code Completion for the
GraphQL Queries. Duplicate and rename the file [.graphqlconfig.example](../../.graphqlconfig.example) 
to `.graphqlconfig` and configure the corresponding values like `url`.
