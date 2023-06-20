# CoreMedia Headless Stitching Server Documentation

[Documentation](../../../../coremedia-headless-stitching/documentation/README.md) / [Concepts](../../../../coremedia-headless-stitching/README.md) / Mocking

---

# Mocking in Detail

## File System Structure

The mocking server uses a base directory to read and record mock files from.

```
mocks/
├── graphql/
    └── site-id-folder/
        └── graphql-query-folder/
            └── post_$id=Dresses.json
            └── post_.json
    
```

- `mocks` is the base directory, you can start the mockings server in any other directory for using
  your own recorded mock files
- `graphql` the request path, in general there could be several subdirectories if the path were longer
- `site-id-folder` the CoreMedia site id, this directory level only exists if a site id
  could be extracted from the GraphQL query
- `graphql-query-folder` the GraphQL query name, this directory level only exists if a query name
  could be extracted from the GraphQL query
- `post_$id=Dresses.json` example of a concrete response mock file for a GraphQL query with parameter 'Dresses',
  if no parameter could be extracted from the GraphQL query a checksum will be used instead
- `post_.json_` example of a template response mock file (identified by thier ending with `_`). 
  This file was created manually. It is used to send the responses for queries with the same name but an
  unknown id (or checksum).
  
## Pre-fabricated Mocks

If you start the mocking server with `pnpm start` the base directory to read the
mocks is set to `mocks`.

With the pre-fabricated mock files at least the homepage of the Calista (en-US) site works.
The products displayed on the homepage have synthetically generated texts. Please note, that their
pictures are delivered by the CMS (CoreMedia Asset Management).

Apart from the homepage you can also navigate to a category page and/or a product detail page. Pure content
pages work anyway. This functionality is intended to be able to try out all essential page types without the need
for a commerce system interaction.

You are free to extend the set of pre-fabricated mocks by record more files in greater depth or to support
other sites. Instructions on how to do this can be found here [Installation and Start (Mock Server)](../installation-mocking.md).
A commerce connection is of course necessary for this.

Btw. the Corporate site can also be used because there is no interaction with the commerce system (no need for mocking).
