# CoreMedia Headless Client Documentation

[Documentation](../../README.md) / [Concepts](README.md) / CoreMedia Engagement Cloud Integration

---

# CoreMedia Engagement Cloud Integration

To enable features of CoreMedia Engagement Cloud, you need to add the CoreMedia Tag 
to all pages. The Spark app has a built-in support since release 2310.0.0.
The language will be configured automatically based on the given site.

## Configuration

To enable the CoreMedia Tag in the Spark app you have two options:

### Settings in Content

With support of Coremedia Engagement Cloud via Personalization Hub, a setting 
with a struct "engagement" has been introduced. This includes both properties 
`webcareId` and `urls.tag`. If they are available and defined, the tag will be 
configured and loaded automatically.

Please check the [Personalization Hub manual](https://documentation.coremedia.com/cmcc-12/artifacts/2404/webhelp/personalization-en/content/clientSideConfiguration.html) for details.

### Environment Variables

If the configuration via setting is not available, the app will look up for 
environment variable as fallback. Add the following environment variable to 
the [.env file](../../../apps/spark/.env.example).

```
VITE_ENGAGEMENT_CLOUD_ID=<your-webcare-id>
```

If you're not using the script url `https://bywe2.byside.com/agent/bwc_we2.js`,
please add your custom URL as environment variable too.

```
VITE_ENGAGEMENT_CLOUD_TAG_URL=<your-custom-tag-url>
```
