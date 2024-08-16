# Changelog

## v2406.0.1

*Released 13.08.2024*

### Bugfixes and Changes:

- Fixed peer dependency of @apollo/client in @coremedia-labs/graphql-layer

---

## v2406.0.0

*Released 20.06.2024*

### Breaking Changes:

- Updated pnpm to version 9
- Updated `schema.json` to CoreMedia Content Cloud v12 - 2604.0


### Features:

- Changed `.graphqlconfig` to new format `graphql.config.yml`
- Added `schema.graphql` into the workspace for code completion
- Added support for CoreMedia Engagement Cloud configuration from settings.
- Optimized stitching server (logging, code cleanup)
- Updated storybook to v8

### Bugfixes and Changes:

- Updated minor versions of dependencies

---

## v2404.1.0

*Released 25.04.2024*

### Features:

- Added default `.graphqlconfig` and graphql schema for code completion

### Bugfixes and Changes:

- Updated `schema.json` and `interfaces.json` to CoreMedia Content Cloud v12 - 2404.2
  (fixing inheritance order of the interfaces)
- Fixed fragmented preview
- Fixed umlauts in GraphQL queries, re #210
- Added script "clean" to @coremedia-labs/graphql-layer for code generation
- Updated minor versions of dependencies

## v2404.0.0

*Released 02.04.2024*

### Breaking Changes:

- Updated `schema.json` to CoreMedia Content Cloud v12 - 2404.1

### Bugfixes and Changes:

- Updated minor versions of dependencies

---

## v2401.0.0

*Released 07.02.2024*

### Breaking Changes:

- Updated `schema.json` to CoreMedia Content Cloud v12 - 2401.1 and to the latest CoreMedia Campaign Service changes
- Updated `node.js` to 20 LTS

### Features:

- Small Design Refresh
  with new logo, white header, and animated image map hotzone icons.
  Enhanced shoppable video, and product detail page and other small adjustments.
- Added localization and translations (i18n)
- Added shopping cart and checkout functionality

### Bugfixes and Changes:

- Updated minor versions of dependencies
- Fix standalone-fragment render error

---

## v2310.0.0

*Released 20.10.2023*

### Breaking Changes:

- Replaced all 3rd-party libs like cross-fetch, and node-fetch with node.js builtin fetch API
- Removed babel from stitching server, using "tsc" for compiling typescript
- Updated `schema.json` to CoreMedia Content Cloud v11 - 2310.1

### Features:

- Added CoreMedia Tag Integration

### Bugfixes and Changes:

- Updated minor versions of dependencies
- Updated eslint and prettier to latest major versions, but keeping the old prettier config "trailingComma": "es5"

---

## v2307.0.0

*Released 27.07.2023*

### Breaking Changes:

- Updated `schema.json` to CoreMedia Content Cloud v11 - 2307.1 and to the latest CoreMedia Campaign Service changes
- Updated apollo server (stitching server) to v4
  - removed "COREMEDIA_STITCHING_ENABLE_GRAPHIQL", because apollo server 4 doesn't support it anymore. Instead, Apollo Studio is available as replacement.

### Features:

- Updated storybook to v7
- Updated graphql to v16
- Updated @graphql-tools/* to latest versions in @coremedia-labs/headless-server-stitching
- Updated @graphql-codegen/* to latest versions in @coremedia-labs/graphql-layer

### Bugfixes and Changes:

- Updated minor versions of dependencies

---

## v2304.1.1

*Released 28.06.2023*

### Bugfixes and Changes:

- Fixed graphql error for production systems
- Added unit-tests for preview and campaign utils
- Updated minor versions of dependencies

---

## v2304.1.0

*Released 20.06.2023*

### Features:

- Updated typescript to version 5
- Added preview time travel for CoreMedia Campaigns

### Bugfixes and Changes:

- Added documentation for CoreMedia Campaigns Integration
- Updated minor versions of dependencies
- Updated vite, fix CVE-2023-34092

---

## v2304.0.0

*Released 24.05.2023*

### Breaking Changes:

- Updated pnpm to version 8
- Updated `schema.json` to CoreMedia Content Cloud v11 - 2304.1 and to the latest CoreMedia Campaign Service changes

### Bugfixes and Changes:

- Mock data now works with all sites and locales, but kept aligned to calista.
- Updated minor versions of dependencies

---

## v2301.1.0

*Released 08.03.2023*

### Features:

- Updated vite to v4 and switch to @vitejs/plugin-react-swc (~20x faster)
- Added support for Preview API of CoreMedia Campaign Service.
  - In preview mode the app can display even drafted and paused campaigns.
  - Add a querystring "previewCampaign=<uuid-of-campaign>" to display just a single campaign
- Add log framework to Spark to set different log levels. defaults are "warn" for PROD and "info" for DEV

### Bugfixes and Changes:

- Updated minor versions of dependencies

---

## v2301.0.0

*Released 15.02.2023*

### Features:

- Added support for new CoreMedia Campaign Service
  - The stitching server will include the campaign schema, if new environment variables
    `CAMPAIGN_ENDPOINT` and `CAMPAIGN_AUTHORIZATION_ID` are set.
  - The Spark app will fetch and render Campaign data on content pages, category pages, and product detail pages,
    if new environment variable `VITE_CAMPAIGN_ENABLED` is set to "true".
- Added rendering of assigned CMDownloads on product detail pages
- Added support for CMImageMap inline overlays

### Breaking Changes:

- Updated `schema.json`, and `interfaces.json` to CoreMedia Content Cloud v11 - 2301.1 and new CoreMedia Campaign Service

### Bugfixes and Changes:

- Fixed possibly wrong vite chunk splitting, if the workspace path included one
  of the keywords. This could lead to an empty page.
- Updated minor versions of dependencies

---

## v2210.0.1

*Released 11.11.2022*

### Bugfixes:

- Fixed relative base path for Spark in the vite.config.ts
- Fixed missed out `VITE_` environment variables changes for preview
- Updated minor versions of dependencies to fix security vulnerability

---

## v2210.0.0

*Released 03.11.2022*

### Features:

- Replaced `react-scripts`, and `craco` with `vite`. [vite](https://vitejs.dev/) is faster and a modern way to build and develop apps. Used for spark and storybook.
  Environment variables for Spark are now prefixed with `VITE_` instead of `REACT_APP_`.

### Breaking Changes:

- Updated `schema.json`, and `metadata.json`, to CoreMedia Content Cloud v11 - 2210.1
- Updated `node.js` to 18 LTS
- Renamed folder `container` to `pages`, because it describes the purpose better
- Removed webpack `ViewLoaderPlugin` from `@coremedia-labs/view-dispatcher`, because we moved to vite and removed webpack. If you need to load views for lookup, import them manually.
- Removed `react-flagpack`, because it is not maintained, is not compatible with react 18 and vite, and has bad typescript support.
- Updated `jest` to version 29 and replaced it with `vitest` in Spark app

### Bugfixes and Changes:

- Fixed layout of search
- Updated `eslint` to version 8
- Updated minor versions of dependencies

---

## v2207.0.1

*Released 09.08.2022*

### Bugfixes and Changes:

- Downgraded `graphql` to v15 in stitching server. v16 is not compatible with server components
- Fix output folder `dist` for app Spark

---

## v2207.0.0

*Released 04.08.2022*

### Features:

- Use the latest endpoint for categories based on a faceted product search. This will enable a proper category listing view.
- Added environment variable `COREMEDIA_CLOUD_ACCESS_TOKEN` for stitching server to run with protected cloud instances

### Breaking Changes:

- Changed codegen tooling from `apollo` to `@graphql-codegen/cli`. The new tooling is faster and generates gql and React Hooks automatically. All queries and fragments in the package `coremedia-labs/graphql-layer` have been changed to `.graphql` files. Therefore, we changed the version to 2.0.0.
- Updated `schema.json` to CoreMedia Content Cloud v11 - 2207.1
- Updated package manager "pnpm" to version 7

### Bugfixes and Changes:

- Updated `graphql` to version 16
- Updated `dotenv` to v16
- Updated minor versions of dependencies

---

## v2204.0.1

*Released 04.08.2022*

### Bugfixes:

- Fixing docker builds for spark and stitching server

---

## v2204.0.0

*Released 31.05.2022*

### Features:

- Introduced View Model Layer. This layer is an abstraction between the GraphQL model and the components model.
- Introduced `styled-components` for styling the Spark app. All `scss` have been removed.
- Added the faceted search feature of headless server and added search suggestions

### Breaking Changes:

- Updated `schema.json`, `interfaces.json`, `metadata.json`, `possibleTypes.json` to CoreMedia Content Cloud v11 - 2204.1

### Bugfixes and Changes:

- Fixing standalone fragment app
- Updated minor versions of dependencies

---

## v2201.0.0

*Released 02.03.2022*

### Features:

- Added a new package "coremedia-labs/graphql-layer". This package includes all GraphQL queries and fragments, which have been part of the Spark app before.
- Simplified navigation components with replacing view dispatching logic with view model logic.
- Simplified link building.
- Replaced environment variable `REACT_APP_MEDIA_FQDN` for media urls with local proxy.

### Breaking Changes:

- Updated `schema.json`, `interfaces.json`, `metadata.json`, `possibleTypes.json` to CoreMedia Content Cloud v11 - 2201.1

### Bugfixes and Changes:

- Fixed Time Travel, [CMS-21057]
- Fixed PDP for SFCC, [CMS-20860]
- Updated minor versions of dependencies

---

## v2110.0.0

*Released 10.12.2021*

### Features:

- Switched from plain express stitching server to Apollo Server 3 to support Automatic Persisted Queries (APQ)
- Added link to Apollo Studio in Stitching Server for GraphQL development
- Added support for doctype `CMHTML`
- Added support for tags and topic pages

### Breaking Changes:

- Switched package manager from `yarn` to `pnpm`
- Updated `schema.json`, `interfaces.json`, `metadata.json`, `possibleTypes.json` to CoreMedia Content Cloud v11 - 2110.1
- Updated mocks and schema to Headless Commerce Server v2
- Adapted `teaserText` and `detailText` to new RichText API to include embed content into the queries

### Bugfixes and Changes:

- Fixed unwanted page reload in search
- Optimized fragmented preview for Studio Integration
- Updated `node.js` to 16
- Updated all other minor dependencies
- Removed empty scripts with `exit 0`, since `pnpm` workspace script don't need them

---

## v2107.1.0

*Released 21.07.2021*

### Features:

- Changed augmentation queries to work without commerce connection for faster responses
- Added support for automatic persisted queries
- Simplified and enhanced RootQuery to show CMTeasables in collections in the navigation and to reduce the payload of the request
- Added CSS based text shortening for banners
- Added support for non-responsive images
- Added view-dispatchers for Products
- Added SEO Header component for `title`, `description`, and `keywords`
- Added optional environment variable `REACT_APP_MEDIA_FQDN` for media urls
- Store collapsed status of fragment preview in localStorage
- Enhanced `Preview Driven Editing` in CoreMedia Studio

### Breaking Changes:

- Updated `schema.json`, `interfaces.json`, `metadata.json` `possibleTypes.json` to CoreMedia Content Cloud v10 - 2107.1
- Updated commerce mocks to schema changes

### Bugfixes and Changes:

- Updated `Typescript` to 4.3
- Updated `dotenv` to 10
- Updated all other minor dependencies
- Removed dependency `fs-extra` in mocking server

---

## v2104.1.0

*Released 29.04.2021*

### Features:

- Added new server components `stichting` and `mocking`. Forwarded Commerce data
  calls have been removed from headless server and are replaced by mocked data
  from the `mocking` server.
  To have one endpoint, the `stitching` server aggregates both schemas.
- All components can be started concurrently in the root folder with `pnpm start`.
- Added new component ShoppableVideo.

### Breaking Changes:

- Updated `schema.json`, `interfaces.json`, `metadata.json` `possibleTypes.json` to CoreMedia Content Cloud v10 - 2104.1
- Renamed `@scope` of packages from `@coremedia` to `@coremedia-labs`
- Restructured workspace. Both apps moved to folder `apps`.
- It is mandatory to run the app with the `stitching` server as endpoint.

### Bugfixes and Changes:

- Fixed links to product detail pages for popups and CTAs
- Switched from `node-sass` to `dart-sass`
- Updated `Typescript` to 4.1
- Updated all other minor dependencies

---

## v2101.1.0

*Released 29.01.2021*

### Breaking Changes:

- Updated `schema.json`, `interfaces.json`, `metadata.json` `possibleTypes.json` to CoreMedia Content Cloud v10 - 2101.1

### Features:

- Added support for `CMExternalLink`
- Added support for `CMProduct` as banner
- Added Time Dependent Visibility for pages
- Added `rootSegment` to Preview (for link building)
- Added a locale / language chooser to header

### Bugfixes:

- Fixed Time Dependent Visibility Preview
- Fixed `z-index` for slideshows and image maps in slideshows
- Updated React to v17
- Updated Jest to v26
- Updated and unify Webpack to v4
- Updated CRA / React Scripts to 4
- Updated CRACO to v6
- Updated all other minor dependencies


## v2010.1.0

*Released 11.12.2020*

- Initial Release of this Application.

## Limitations

There are specific limitations in this application that developers and customers need to be aware of:

1. No support for server side personalization integration as of now.
