# CoreMedia Headless Client Documentation

[Documentation](../README.md) / [Concepts](README.md) / View Dispatching

---

# View Dispatching

The CoreMedia Content Type Model is a rich and powerful concept to work with 
different kinds of content and structures. It consists of simple content 
types like `CMArticle` but also super types and more complex structures/containers like
`CMCollection` or `PageGrid`. These more complex structures can be composed by 
the editors themselves and - in some cases - the presentation can even easily 
be manipulated via layout variants in CoreMedia Studio.

So a web app has to be able to handle these challenges. It needs a way to
automatically match a content type to the best fitting (rendering) component to 
render the desired content in a web browser.

A naive approach could be to use a big `switch statement` that checks for the 
content type and forwards to a corresponding (rendering) component.
This could look like this:

```
switch(contentType) {
  case "CMArticle":
    // render CMArticle component
    break;
  case "CMCollection":
    // render CMCollection component
    break;
  ...
}
```

But this would need to be updated manually and quickly becomes bloated. So a 
more intelligent and automated approach, similar to the View Dispatching of 
CoreMedia's CAE is the preferred way.

## Preparations and Structure

A View Dispatcher in React needs two essential information. A list of all 
available views and the type hierarchy, to know the order in which to compare 
the given type and view to the available templates. Therefore, these templates 
must follow the naming scheme like in the CAE: `Type.ViewName.tsx`. So for 
example: `CMArticle.asHeroBanner.tsx`. All templates for view dispatching should 
be in folders called `views`. They will be used to redirect to the component or 
container you wish to render a specific content with.

A webpack plugin can gather all this information before each build and dev 
server start up, so an up to date list of all views is available and can be 
handed over to the View Dispatcher. A second important step is to import all 
view templates into React, so they are available to render if chosen. The plugin 
must pass the code into the bundled JavaScript.

The second important information is the type hierarchy. The CoreMedia Headless 
Server offers a list of all types for an interface, from most to least specific, 
via GraphQL. It is downloaded and stored in 
[interfaces.json](../../app/src/__downloaded__/interfaces.json) by the script
`yarn download:interfaces`.

The resulting list looks like this:

```
{
    "CMArticleImpl": [
        "CMArticle",
        "CMTeasable",
        "CMLinkable",
        "CMLocalized",
        "CMObject",
        "Content_"
    ],
    "CMTeaserImpl": [
        "CMTeaser",
        "CMTeasable",
        "CMLinkable",
        "CMLocalized",
        "CMObject",
        "Content_"
    ],
    ...
}
```

## Include component

The View Dispatcher itself is used via a React component, that receives as 
properties the content item as `self` and the desired view or view type:

```
<Include key={key} self={content} view="{view}" />
```

Inside this component the view dispatcher is utilised and identifies the content 
type from the `__typename` property of `self`. Then it gets the first entry in 
the type hierarchy for this type and looks into the list of available views if 
a specific entry for this type and given view is available. If yes, the name of 
the corresponding view component is returned and rendered. If not, the look up 
process iterates over both lists, until a match is found. 

So if the content is a `CMTeaser` and the view `asCarouselBanner`, but there is 
no `CMTeaser.asCarouselBanner.tsx` file available, it tries again for a template 
with the same type, but without the view. If this template is not available, the 
parent type is taken for `CMTeaserImpl` and rendered, if 
a `CMTeasable.asCarouselBanner.tsx` view is available.

## Webpack Configuration

The View dispatcher is extracted as a separate package and is available as 
Webpack plugin. Create-React-App does not allow direct changes to its webpack
configuration. [Craco](https://github.com/gsoft-inc/craco#craco) is a plugin to 
make this possible again and you can use it  to include the `ViewLoaderPlugin`
in the [craco.config.json](../../app/craco.config.js).

The `viewPattern` is the folder pattern where the plugin will look for view 
templates and the `viewDispatcherImportCode` is the import statement for webpack 
to write into the bundled JavaScript.

## Render order

1. Load `App`
2. Routing to the selected `Page` container 
3. Load data with ApolloClient from GraphQL server
3. Render `PageGrid` with `header` and `footer`
4. Iterate over Placements and dispatch the content to existing views
5. Initialize view [models](../../app/src/models)
7. Render components with properties of the models
 
