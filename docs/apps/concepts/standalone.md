# CoreMedia Headless Client Documentation

[Documentation](../../README.md) / [Concepts](README.md) / Standalone Fragment Application

---

# Standalone Fragment Application

Given that you have configured the Multi Preview as described [here](preview.md#studio-preview-integration), 
open the CoreMedia Studio and navigate to the content which you wish to integrate 
into the external website. Choose "Standalone Fragment Preview". You should now
see the fragment preview and a JavaScript snippet that can be copied to a Tag 
Manager Solution and adjusted to your needs.

```
<script>
  var hfs = document.createElement('script')
  hfs.src = 'https://<prod-app-domain>/standalone/cm-headless-fragment.js'
  hfs.onload = function() { headlessFragment.render("<contentId>", "cm-headless-fragment", "https://<prod-app-domain>");}
  document.head.append(hfs)
</script>
<div id="cm-headless-fragment"></div> 
```

You will probably have to change the following values:

* You can either use the built-in DOM placeholder or you can skip the 
`<div id="cm-headless-fragment"></div>` element and supply your own identifier 
in the script.
* `<prod-app-domain>` has to be replaced with the domain where you hosted the app
and its scripts.

## Deployment and Development

This app is build into the library `headlessFragment` and is copied next to the 
`index.html` for the Studio Preview into the `dist` folder. It is also copied to 
the Dockerfile and is available below the path `standalone/`.

This app does not include a development server at the moment. Just run 
`pnpm build` and open the html file and adjust the parameters to get a quick preview.
