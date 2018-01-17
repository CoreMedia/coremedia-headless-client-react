![Status: Active](https://documentation.coremedia.com/badges/badge_status_active.png "Status: Active")
![For CoreMedia CMS](https://documentation.coremedia.com/badges/badge_coremedia_cms.png "For CoreMedia CMS")
![Tested: 9.1707.3](https://documentation.coremedia.com/badges/badge_tested_coremedia_9-1707-3.png "Tested: 9.1707.1")
![Supported: Firefox](https://documentation.coremedia.com/badges/badge_supported_by_firefox.png "Supported: Firefox")
![Supported: Chrome](https://documentation.coremedia.com/badges/badge_supported_by_chrome.png "Supported: Chrome")

![CoreMedia Labs Logo](https://documentation.coremedia.com/badges/banner_coremedia_labs_wide.png "CoreMedia Labs Logo Title Text")

# CoreMedia Headless - React Fragments Prototype

> This is a CoreMedia Content as a Service (CaaS) - Prototype Application based on React and bootstrapped with
> [Create React App](https://github.com/facebookincubator/create-react-app).

# Overview

This sample application showcases the inclusion of CoreMedia Content-Fragments into existing webpages using the Headless-API.

This README contains an overview of how to setup and use this example. For more detailed documentation, see the [wiki](https://github.com/CoreMedia/coremedia-headless-client-react/wiki).

Custom elements in the HTML markup define the fragments to include (see [_index.html_](public/index.html)):

```
<cm-fragment data-id="home.hero" data-show="teaser" data-view="hero" data-params='{"color": "blue", "ctaShow": true}'></cm-fragment>
```

Each of these elements is replaced with a React component at runtime, requesting content data from the Headless Server and rendering it with additional HTML
markup to the page.

# Getting started

## CoreMedia Setup

Configure, install and run the [_CoreMedia Headless Server_](https://github.com/CoreMedia/coremedia-headless-server) with the supplied default
configuration.<br> Import the sample content from server's workspace into your CoreMedia repository.

## Application Setup

### Backend configuration

Configure the CoreMedia Headless Server host and port in the appropriate `.env` files.

### Install dependencies

```sh
$ yarn install
```

### Development

`yarn start`

Runs the app in the development mode.<br> Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br> You will also see any lint errors in the console.

### Tests

`yarn test`

Launches the test runner in the interactive watch mode.<br> See the section about [running tests](#running-tests) for more information.

### Build

`yarn build`

Builds the app for production to the `build` folder.<br> It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br> Your app is ready to be deployed!

*******


# CoreMedia Labs

Welcome to [CoreMedia Labs](https://blog.coremedia.com/labs/)! This repository is part of a platform for developers who want to have a look under the hood or get some hands-on understanding of the vast and compelling capabilities of CoreMedia. Whatever your experience level with CoreMedia is, we've got something for you.

Each project in our Labs platform is an extra feature to be used with CoreMedia, including extensions, tools and 3rd party integrations. We provide some test data and explanatory videos for non-customers and for insiders there is open-source code and instructions on integrating the feature into your CoreMedia workspace. 

The code we provide is meant to be example code, illustrating a set of features that could be used to enhance your CoreMedia experience. We'd love to hear your feedback on use-cases and further developments! If you're having problems with our code, please refer to our issues section. 
