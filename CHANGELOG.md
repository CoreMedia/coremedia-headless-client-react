# Changelog

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
- Updated `schema.json`, and `interfaces.json` to CoreMedia Content Cloud v11 - 2207.1
- Updated package manager "pnpm" tp version 7

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
- Updated `nodejs` to 16
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
