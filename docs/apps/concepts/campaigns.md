# CoreMedia Headless Client Documentation

[Documentation](../../README.md) / [Concepts](README.md) / CoreMedia Campaigns

---

# CoreMedia Campaigns

A campaign is a way to schedule content from CoreMedia Content Cloud to be
visible on different, predefined slots on a website for a specific event.

Campaigns are available via GraphQL. The Spark app supports campaigns via the 
stitching server out of the box on predefined pages.

## Configuration

To enable campaigns in the Spark app, add the following environment variable to
the [.env file](../../../apps/spark/.env.example).

```
VITE_CAMPAIGN_ENABLED=true
```

Don't forget to configure the endpoint and authentication token in the stitching 
server. For more details, check 
[the stitching server campaign docs](../../servers/concepts/campaigns.md). 
Otherwise, the GraphQL queries will fail and the whole app will not work.

## Supported queries

The Spark app supports the following campaign GraphQL queries:

- `campaignContent`: default delivery query, includes only running campaigns
- `previewCampaignContent`: same as `campaignContent` but also includes draft and paused campaigns
- `previewCampaign`: retrieve a single campaign by query string parameter `campaignId`

The property `siteId` from `SiteContext` is used for the parameter `site`,
`channelType` for the type page, and the navigation breadcrumb of categories and
products, or the UUID of a content page as `refinements`.

For example the category "Men" on the site "Calista" uses the following GraphQL
variables for the query `campaignContent`:

```json
{
  "site": "ced8921aa7b7f9b736b90e19afc2dd2a",
  "channelType": "category-page",
  "refinements": [
    "apparel",
    "men"
  ]
}
```

## Supported types and slots

Campaigns can be configured for different pages and slots. Not all are
preconfigured. The following table shows, which slots of campaigns are
displayed in the app:

| Channel-Type, Page                                                                     | Refinements                    | Slots                                                                                | Layout                                                                         |
|----------------------------------------------------------------------------------------|--------------------------------|--------------------------------------------------------------------------------------|--------------------------------------------------------------------------------|
| `content-page`<br/>[Page.tsx](../../../apps/spark/src/pages/Page.tsx)                  | UUID of the content            | `hero` above the "hero" placement<br/>`placement1` above the  "placement1" placement | "hero" as `HeroBanner`<br/>"placement1" as `LeftRightBanner`                   |
| `category-page`<br/>[CategoryPage.tsx](../../../apps/spark/src/pages/CategoryPage.tsx) | Navigation Breadcrumb as Array | `main` below category title,<br/>`sidebar` below filters on the left                 | "main" as `HeroBanner`<br/>"sidebar" as `SquareBanner`                         |
| `product-page`<br/>[ProductPage.tsx](../../../apps/spark/src/pages/ProductPage.tsx)    | Navigation Breadcrumb as Array | `banner` above the product,<br/>`tab`, and <br/>`additional` below the product       | "banner" as `HeroBanner`<br/>"tab", and <br/>"additional" as `LeftRightBanner` |

The following slot and channel-type are not supported:

- slot `header` for channel-type `content-page`
- channel-type `transactional-page`

## Preview

During development Spark is running automatically in the preview mode. So it
uses the campaign preview queries too, until you explicitly disable it with an
environment variable `VITE_PREVIEW=false`.

In preview mode you can also use time travel to test content and campaigns for
future dates. All you need to do, is to add a preview date as an ISO String to the 
URL via `previewDateISO`, like `https://localhost:5173/calista/?previewDateISO=<YYYY-MM-DD>T00:00:00.000Z`.

You can also preview a single campaign by adding a campaign ID as a query string 
parameter `campaignId` to the URL, like `https://localhost:5173/calista/?campaignId=<UUID-of-the-campaign>`.

If you configure the "Multi Preview Settings" for Spark, the same features will 
work in CoreMedia Studio Preview and in the Campaign App Preview. You can enable 
the preconfigured "SPA Preview" setting (below `All Content/Settings/Options/Settings/Multi Preview/`) 
in the blueprint content.
