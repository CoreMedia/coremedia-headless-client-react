/**
 * CoreMedia preview module
 *
 * Initializes the communication between Studio and CAE to provide the PBE feature.
 *
 * The script is robust against multiple loading.
 */
let studioUrlWhitelist = window.studioUrlWhitelist || [];

function init() {
  if (!window.PDE_INITIALIZED) {
    // noinspection JSIncompatibleTypesComparison legacy check
    if (window.parent && window.parent !== window) {
      // Enable post message handling
      window.addEventListener("message", initHandler);

      // Register at parent window
      const msg = JSON.stringify({
        type: "init",
        body: {
          windowType: "preview",
        },
      });
      window.parent.postMessage(msg, "*");
    }
    window.PDE_INITIALIZED = true;
  }
}

function initHandler(event) {
  const msg = event.data;
  const origin = event.origin;
  let msgJson = undefined;
  try {
    msgJson = JSON.parse(msg);
  } catch (err) {}

  if (msgJson && msgJson.type === "initConfirm") {
    const parserOrigin = document.createElement("a");
    parserOrigin.href = origin;

    const parser = document.createElement("a");
    if (studioUrlWhitelist.length > 0) {
      for (let i = 0; i < studioUrlWhitelist.length; i++) {
        parser.href = studioUrlWhitelist[i];
        const wlProtocol = parser.protocol;
        const wlHost = parser.hostname;
        const wlPort = parser.port;

        if (wlProtocol === parserOrigin.protocol && wlHost === parserOrigin.hostname && wlPort === parserOrigin.port) {
          window.com_coremedia_pbe_studioUrl = origin;
          break;
        }
      }
    } else {
      window.com_coremedia_pbe_studioUrl = "*";
    }

    if (window.com_coremedia_pbe_studioUrl && msgJson.body.url) {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = msgJson.body.url;
      // assuming that at least one script (this one) will be loaded via script tag
      const firstScript = document.getElementsByTagName("script")[0];
      firstScript.parentNode.insertBefore(script, firstScript);
    } else {
      warn(
        "Preview received initConfirm message from origin " +
          origin +
          ". This does not match any of the given whitelist URLs (see 'cae.preview.pbe.studio-url-whitelist')"
      );
    }

    window.removeEventListener("message", initHandler);
  }
}

function warn(warnString) {
  if (window.console && window.console.warn) {
    window.console.warn(warnString);
  }
}

function ready(callback) {
  if (document.readyState !== "loading") {
    callback();
  } else {
    document.addEventListener("DOMContentLoaded", callback);
  }
}

const hasMultipleInstances = typeof window.PDE_INITIALIZED !== typeof undefined;

// trigger warning if preview is loaded multiple times (checked twice to allow better error reporting)
if (hasMultipleInstances) {
  warn("Preview webresources are attached to DOM multiple times. Consider removing duplicates.");
}

if (!window.JSON) {
  warn("Cannot initialize preview: JSON not supported");
}

if (window.JSON && !hasMultipleInstances) {
  window.PDE_INITIALIZED = false;
  ready(init);
}
