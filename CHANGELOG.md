# Changelog

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
- All components can be started concurrently in the root folder with `yarn start`.
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
