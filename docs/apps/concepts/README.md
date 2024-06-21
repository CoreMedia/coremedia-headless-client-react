# CoreMedia Headless Client Documentation

[Documentation](../../README.md) / Concepts

---

# Concepts

The following sections give you some more detailed information about the concepts 
behind the workspace and the Spark app.

## [Workspace Structure](structure.md)

How the source code and files are structured.

## [Apollo Client for GraphQL](apollo.md)

How to use the Apollo client to fetch data from the CoreMedia Headless Server.

## Standard component layout

By default, components in this app consist of:

* React Function Components, also known as React Functional components, 
  responsible for rendering the data. These files are independent 
  of the CoreMedia content type model and only work on properties.
* CSS or SCSS files for styling the components
* An `assets` folder for images and fonts
* A `view` folder containing files required for view dispatching. The only purpose 
  of these files is e.g. to unpack a list of items and to delegate the required 
  properties to the rendering components mentioned above. 

## Responsive Images

CoreMedia Headless Server supports images with different crops and sizes based 
on the Responsive Image Settings.

The easiest way to integrate responsive images is to use a React component to
render an HTML `<picture>` tag with different `<source>` tags. You don't need any 
JavaScript based calculation. The example app specifies separate components like,
[HeroResponsiveImage.tsx](../../../apps/spark/src/components/HeroBanner/HeroResponsiveImage.tsx)
for different usages and adds CSS with the same aspect ratio to avoid flickering 
of the page during the download of the images. It also uses the new `loading="lazy"` 
property, supported by all modern browsers.

The script `pnpm apollo:download-crops` will download the available crops and sizes
to `src/__downloaded__/image-crops.json`. You can use this file as a reference 
for your components.

## SiteContextProvider

The [SiteContextProvider](../../../apps/spark/src/context/SiteContextProvider.tsx) is 
responsible for loading global data and offering this data to child components 
via `React.useContext`.

Currently, the following data is available:

* `rootSegment`: Required to perform Apollo GraphQL calls.
* `navigation`: The navigation tree to be rendered.
* `placements`: Global slots like header and footer.
* `currentNavigation`: The current navigation path.

## [View Dispatching](view_dispatching.md)

How to use the CoreMedia Content Type Model and view types to initialize the view models 
and delegate to the render components.

## [Studio Preview Integration](preview.md)

How to integrate the app into CoreMedia Studio, enable Preview Driven Editing,
show a responsive device slider, highlight placements and render a fragmented
preview for a content item.

## [CoreMedia Campaigns](campaigns.md)

How to integrate CoreMedia campaigns into the app and how to preview campaigns.

## [CoreMedia Engagement Cloud Integration](cmec)

How to integrate CoreMedia Engagement Cloud into the app.
