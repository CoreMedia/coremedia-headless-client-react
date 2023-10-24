# CoreMedia Headless Client Documentation

[Documentation](../../README.md) / [Concepts](README.md) / CoreMedia Byside Integration

---

# CoreMedia Byside Integration

To enable features of CoreMedia Byside, you need to add a Javascript tag to all
pages. The Spark app has a built-in support since release 2310.0.0. All you need,
is to add your **webcare id** and optionally the URL to your script file to the
environment variables.
The language will be configured automatically based on the given site.

## Configuration

To enable the Byside tag in the Spark app, add the following environment 
variable to the [.env file](../../../apps/spark/.env.example).

```
VITE_BYSIDE_WEBCARE_ID=<your-webcare-id>
```

If you're not using the script url `https://bywe2.byside.com/agent/bwc_we2.js`,
please add your custom URL as environment variable too.

```
VITE_BYSIDE_WEBCARE_SCRIPT_URL=<your-custom-tag-url>
```
