# CoreMedia Headless Client Documentation

[Documentation](README.md) / Development

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

- Node.js 14.x (LTS) or higher
- Yarn 1.22.x

## Development environment

This project uses data from a CoreMedia Headless service. The endpoint needs to 
be set by duplicating and renaming the file [.env.example](../app/.env.example) to `.env` 
and configuring the corresponding values. 

```js
REACT_APP_API_ENDPOINT=https://<headless-server.example.com>
```

## Installation

To complete the setup, run the following commands from the project directory once.

```
yarn install
yarn build
```

You need to build the workspace once before you can start it. The build script 
builds the necessary packages, and it runs `yarn apollo:prepare` to 
download and generate the type definitions for the GraphQL queries.

## Workflow

Run `yarn start` and open [http://localhost:3000](http://localhost:3000) to view 
the app in a browser. It will run in Preview Mode by default.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

## Available Scripts

In the project directory [app](../app), you can run the following commands:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn apollo:prepare`

Apollo downloads and generates all required resources like schema, metadata and 
type definitions and save them to the `__downloaded__` and  `__generated__` folders. 
If no Headless Server is defined for `REACT_APP_API_ENDPOINT`, the script will only
generate the interfaces and skips the download.

### `yarn apollo:codegen`

Apollo generates all required type definitions in `__generated__` folders. You
should generate them everytime you change the GraphQL queries or fragments. 

### `yarn build`

Builds the app for production to the `build` folder.<br />
See the section about [deployment](deployment.md) for more information.

### `yarn lint`

Runs just the Typescript linting and formatting (based on eslint and prettier) on the repository.

### `yarn docs`

Generates TypeDoc documentation and places it into [/docs](../app/docs).

## IDE Support

Using IntelliJ Idea with the JS GraphQL Plugin enables Code Completion for the
GraphQL Queries. Duplicate and rename the file [.graphqlconfig.example](../.graphqlconfig.example) 
to `.graphqlconfig` and configure the corresponding values like `url`.
