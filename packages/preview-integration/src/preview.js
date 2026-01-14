/**
 * CoreMedia preview module
 *
 * Initializes the communication between Studio and CAE to provide the PBE feature.
 *
 * The script is robust against multiple loading.
 *
 * Static Application Security Testing (SAST) tools like Checkmarx may complain
 * about this script, if they assume that it embeds untrusted data without
 * proper sanitization or encoding. Such reports are false positives.
 *
 * @license CoreMedia Open Source License
 */
let studioUrlWhitelist = window.studioUrlWhitelist || [];

const CAPABILITIES_MESSAGE_TYPE = "previewCapabilities";
const REFRESH_MESSAGE_TYPE = "refresh";

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
  } catch (_) {
    //ignored
  }

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

function onRefreshMessage(event) {
  let msgData = event.data;
  if (typeof msgData === "string") {
    msgData = JSON.parse(event.data);
  }

  switch (msgData.type) {
    case REFRESH_MESSAGE_TYPE: {
      const customEvent = new CustomEvent(REFRESH_MESSAGE_TYPE, { detail: msgData });
      window.dispatchEvent(customEvent);
      break;
    }
  }
}

function addPreviewRefreshCapability() {
  const capabilitiesResponse = JSON.stringify({
    type: CAPABILITIES_MESSAGE_TYPE,
    body: {
      capabilities: {
        previewRefresh: true,
      },
    },
  });

  if (window.parent !== window) {
    window.parent.postMessage(capabilitiesResponse, "*");
  }
}

/**
 * Public API endpoint to remove the listener for the refresh rendering.
 * @param listener the listener to remove
 */
window.studioRemoveRefreshListener = (listener) => {
  window.removeEventListener(REFRESH_MESSAGE_TYPE, listener);
  window.removeEventListener("message", onRefreshMessage);
};

let previewRefreshCapabilitySet = false;
/**
 * Public API endpoint to enable the refresh rendering, avoiding full page reloads.
 * @param listener the listener to add
 * @returns a function to unregister the listener
 */
window.studioAddRefreshListener = (listener) => {
  window.addEventListener(REFRESH_MESSAGE_TYPE, listener);
  if (!previewRefreshCapabilitySet) {
    addPreviewRefreshCapability();
    previewRefreshCapabilitySet = true;
  }

  window.removeEventListener("message", onRefreshMessage);
  window.addEventListener("message", onRefreshMessage);
  return () => {
    window.studioRemoveRefreshListener(listener);
  };
};

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
