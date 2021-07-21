# CoreMedia Headless Client Documentation

[Documentation](../../README.md) / [Concepts](README.md) / Apollo Client for GraphQL

---

# Apollo Client for GraphQL

The Apollo client offers a convincing balance between configurability, ease 
of use and powerful features like caching, testing utilities and typescript support.
For more information on Apollo see [the apollo documentation](https://www.apollographql.com/docs/react/).

## Identifying the site

The CoreMedia Content Type Model shows its potential best with a specific structure of 
React components and their queries. To be able to load a page and its content a 
permanent identifier is required, since content IDs in the CMS are prone to change.
We use the `rootSegment` of a site as permanent identifier, like `corporate` or `calista`.

If no `rootSegment` is given, the [app](../../../apps/spark/src/components/App/App.tsx) 
will redirect to `/calista`.

## Utilizing the Apollo Cache

Apollo's cache is clever in the way that every part of a query's response with a 
property called "id" will be cached as an item with a unique identifier.
This can be very helpful and efficient if the app is structured in the right way 
by having a larger query for a page, that loads all its required content and 
consists of query fragments for components, represented in the cache under their 
identifier. The cache needs to be configured with a list of possible types, 
offered by the Headless Server. It is downloaded and stored in 
[possibleTypes.json](../../../apps/spark/src/__downloaded__/possibleTypes.json) by the 
script `yarn download:possible-types`.

Therefore, some presentational components like banners or the navigation 
have their own query fragments, only loading the data needed for this specific 
component. So the query and the fragments are logically and spatially separated from 
the rest of the code in the folder [queries](../../../apps/spark/src/queries). This not 
only keeps the file structure and the page query clean, it also provides the 
possibility to only load some parts of the page, which are initially displayed.
A lazy loading mechanism for example could later query for more content if needed.

A huge advantage is now, that it is not required anymore to pass on the complete 
data from a page query via props into all its child components. But only the IDs 
for components, that are stored in the cache. So for example a component only 
needs an ID and will send its query with this ID to the cache.
This returns the cached content, that has been loaded with the banner's query 
fragment within the page query. Or if the data is not available, loads the 
missing data from the server.

---
**NOTE:**
To avoid redundant calls and to use the data of the cache, it is important to 
have a single instance of the [Apollo Client](../../../apps/spark/src/utils/App/Apollo.ts) 
and a configured InMemoryCache based on the GraphQL endpoint.<br/>
Just reload the browser to refresh the cache.
---

## Automatic persisted queries (APQ)

By default, all GraphQL queries are POST-Requests, which cannot be cached. One 
solution is to use persisted queries, but they have to defined in the server.
An alternative is a feature called "Automatic Persisted Queries". A persisted 
query is a query string that's cached on the server side, along with its unique 
identifier (always its SHA-256 hash). The Apollo client in the Spark app has been
prepared for this. You can enable APQ with the environment variable 
`REACT_APP_APQ_ENABLED=true`. For more information, see the Apollo Server
[documentation](https://www.apollographql.com/docs/apollo-server/performance/apq/).
