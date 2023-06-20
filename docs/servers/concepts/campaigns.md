# CoreMedia Headless Stitching Server Documentation

[Documentation](../../README.md) / CoreMedia Campaigns

---

# CoreMedia Campaigns

A campaign is a way to schedule content from CoreMedia Content Cloud to be 
visible on different, predefined slots on a website for a specific event.

"CoreMedia Campaigns" is a cloud-native SaaS application available via GraphQL. 
It's a perfect fit for the GraphQL endpoint of CoreMedia Content Cloud Headless 
Server and can easily be integrated into the stitching server.

## Configuration

The stitching server supports CoreMedia Campaigns out of the box, if the 
following environment variables are defined:

```
CAMPAIGN_ENDPOINT=https://api.campaigns.coremedia.io/
CAMPAIGN_AUTHORIZATION_ID=<your-campaign-delivery-preview-token or your-campaign-delivery-token>
```

Please be aware, preview queries are only available if you use a
preview authorization token. Otherwise, you will get an "Unauthorized" error.

Starting the stitching server via `pnpm start` will merge all three endpoints 
together and the output should look like the following example:

```
[INFO]  Fetching schemas from GraphQL endpoints
[INFO]  Loading schema from https://<your-cmcc-headless-server>/graphql (Headless Server).
[INFO]  Successfully loaded schema from coreMediaHeadlessServerEndpoint.
[INFO]  Loading schema from http://localhost:5000/graphql (Headless Commerce Server).
[INFO]  Successfully loaded schema from commerceCatalogEndpoint.
[INFO]  Campaign Service enabled.
[INFO]  Loading schema from https://api.campaigns.coremedia.io/ (Campaign Service).
[INFO]  Successfully loaded schema from campaignServiceEndpoint.
[INFO]  Stitching server started on: http://localhost:4000/graphql
```

## Usage

The Delivery GraphQL API of CoreMedia Campaigns returns assignment objects 
containing a list of content items, which only hold the UUID of the referenced 
CoreMedia content. The content UUID is stitched via field `content` to the 
real content data in [resolvers.ts](../../../servers/stitching/src/resolvers.ts).

Example query for CoreMedia Campaigns including content as CMTeasable via stitching:
```
query example($siteId: String!, $channelType: String!, $refinements: [String!]) {
  campaignContent(site: $siteId, channelType: $channelType, refinements: $refinements) {
    slots {
      assignment {
        items {
          id
          content {
            ...CMTeasable
          }
        }
      }
    }
  }
}
```

For detailed usage in the client app, please check the [campaign docs for Spark](../../apps/concepts/campaigns.md).
