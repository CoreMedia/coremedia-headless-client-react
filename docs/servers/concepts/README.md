# CoreMedia Headless Stitching Server Documentation

[Documentation](../../README.md) / Concepts

---

# Concepts

The following sections give you some more detailed information about the concepts 
behind the mocking and stitching server.

## Introduction

The stitching server provides a unified GraphQL interface (by schema stitching)
with an optional waiver of the otherwise necessary commerce connection.

Two schemas have to be combined and stitched to a single one. Accordingly, two 
GraphQL endpoints can be configured:

1. One for a CoreMedia Headless Server and
2. another one as a demo [Commerce Headless Server](https://github.com/CoreMedia/coremedia-headless-commerce)
   and an example commerce system. In a customer project, this system would be 
   exchanged for a specific customer system.

The mocking server can be configured to replace a Commerce Headless Server. In case a connection to the
Commerce Headless Server is not available, or the commerce system is not present, the mocking server can cover
a quick demo case. For example if you want to run the Spark App without the knowledge on how to provide a
Commerce Headless Server or let alone a commerce system you can use the "mocking mode". At least the commerce
schema must always be available, otherwise the Spark App wouldn't work. In the "mocking mode" some basic
GraphQL queries are also answered, so that at least the homepage of the Calista (en-US) site works.
The Corporate site can also be used because there is no interaction with the commerce system.

If no commerce endpoint is configured, the stitching server connects to a locally running
mocking server on port 5000.

The mocking server can also be started in a "recording mode" to address more advanced scenarios. e.g.
supporting of the Spark App in greater depth or with more sites or record more real life demo data
from underlying commerce systems.

The stitching server must be able to access a running Commerce Headless Server. Otherwise,
it would not start. It is therefore necessary to start the mocking server before the stitching server.

## [GraphQL Schema Changes](schema-changes.md)

Instructions on what to do if the GraphQL schema changes. especially the commerce schema.

## [CoreMedia Campaigns](campaigns.md)

Additional information for CoreMedia Campaign integration.

## [Mocking in Detail](mocking.md)

Concepts behind the mocking solution and use it for advanced use cases.
