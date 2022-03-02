/**
 * @param {Element} el
 * @param {string} selector
 * @returns {boolean}
 *
 * @see {Element.prototype.matches}
 */
function matches(el, selector) {
  const matchesFn = Element.prototype.matches || Element.prototype["msMatchesSelector"];
  return matchesFn.call(el, selector);
}

/**
 * @param {Element} el
 * @param {string} s
 * @returns {Element | null}
 *
 * @see {Element.prototype.closest}
 */
function closest(el, s) {
  do {
    if (matches(el, s)) {
      return el;
    }
    el = el.parentElement;
  } while (el !== null && el.nodeType === 1);
  return null;
}

/**
 * @param {NodeList} list
 * @param {Function} callback
 *
 * @see {NodeList.prototype.forEach}
 */
function forEach(list, callback) {
  const forEachFn = NodeList.prototype.forEach || Array.prototype.forEach;
  return forEachFn.call(list, callback);
}

/**
 * @param {Object} target
 * @param {...Object} varArgs
 * @return {Object}
 *
 * @see {Object.assign}
 */
function assign(target, varArgs) {
  if (Object.assign) {
    return Object.assign.apply(null, arguments);
  }
  if (target === undefined || target === null) {
    throw new TypeError("Cannot convert undefined or null to object");
  }
  const result = Object(target);
  for (let index = 1; index < arguments.length; index++) {
    const nextSource = arguments[index];
    if (nextSource != null) {
      for (const nextKey in nextSource) {
        if (nextSource.hasOwnProperty(nextKey)) {
          result[nextKey] = nextSource[nextKey];
        }
      }
    }
  }
  return result;
}

function ready(callback) {
  if (document.readyState !== "loading") {
    callback();
  } else {
    document.addEventListener("DOMContentLoaded", callback);
  }
}

ready(function () {
  const DATA_CM_METADATA = "data-cm-metadata";
  const DATA_CM_IDREF = "data-cm-idref";
  const DATA_CM_METADATA_ID = "data-cm-metadata-id";

  // Map: metadata ID --> DOM node where metadata is annotated
  let cmMetadataIdToDomNodeMapping;
  // Map: metadata ID --> partial metadata tree
  let cmMetadataMap;

  // add "cm-preview--studio" CSS Class to root element
  document.documentElement.classList.add("cm-preview--studio");

  /////////////// DISPATCHING POST MESSAGE EVENTS ///////////////

  function postMessageHandler(event) {
    const msg = event.data;
    const origin = event.origin;
    if (origin === window.com_coremedia_pbe_studioUrl || window.com_coremedia_pbe_studioUrl === "*") {
      let msgJson = undefined;
      try {
        msgJson = JSON.parse(msg);
      } catch (err) {}
      if (msgJson) {
        if (msgJson.type === "updateElementsText") {
          directUpdate(msgJson.body.ids, msgJson.body.oldValue, msgJson.body.newValue);
        } else if (msgJson.type === "highlightElements") {
          updateHighlights(msgJson.body.metadataIds);
        } else if (msgJson.type === "secondaryHighlightElements") {
          updateHighlights(msgJson.body.metadataIds, true);
        } else if (msgJson.type === "scrollElementsIntoView") {
          scrollIntoView(msgJson.body.metadataIds);
        } else if (msgJson.type === "setScrollPosition") {
          scrollToPosition(msgJson, event.source);
        } else if (msgJson.type === "retrieveDocumentDimensions") {
          sendDocumentDimensions(msgJson, event.source);
        } else if (msgJson.type === "retrieveScrollPosition") {
          sendScrollPosition(msgJson, event.source);
        } else if (msgJson.type === "retrieveGlobalVariable") {
          sendGlobalVariable(msgJson, event.source);
        } else if (msgJson.type === "retrieveDataAttribute") {
          sendDataAttribute(msgJson, event.source);
        } else if (msgJson.type === "enableDocumentScroll") {
          enableDocumentScroll(msgJson);
        }
      }
    }
  }

  /////////////// GLOBAL REFERENCE TO STUDIO STATE ///////////////

  // Keep reference of Studio state where necessary.
  const studioKnownValues = {
    documentDimensions: {},
    metadataNodeList: [],
    lastHoverNode: undefined,
  };

  /////////////// DIRECT UPDATE FOR TEXT NODES ///////////////

  function directUpdate(ids, oldValue, newValue) {
    if (ids) {
      try {
        oldValue = oldValue ? oldValue.trim() : "";
        for (let i = 0; i < ids.length; i++) {
          const id = ids[i];
          const elem = cmMetadataIdToDomNodeMapping[id];
          // Maybe the preview frame is being reloaded and cannot be found ...
          if (elem) {
            // .. ok, it's there. Check whether the text matches the expected value.
            const firstChild = elem.firstChild;
            // so use "nodeType" to check for Text:
            // Node.TEXT_NODE = 3, does not exist in IE
            let textNode = firstChild && firstChild.nodeType === 3 ? firstChild : null;
            if ((!textNode && !oldValue) || (textNode && (textNode.data ? textNode.data.trim() : "") === oldValue)) {
              if (!textNode) {
                textNode = document.createTextNode(newValue);
                elem.appendChild(textNode);
              } else {
                textNode.data = newValue;
              }
            }
          }
        }
      } catch (e) {
        // just to be robust: if anything fails, fall back to reloading update.
      }
    }
  }

  /////////////// CONTEXT CLICK HANDLING ///////////////

  function handleContextClick(event) {
    const nextUpwardsMetadataNode = findClosestMetadataUpInDomTree(event.target);
    if (nextUpwardsMetadataNode) {
      // IE9 can't handle positions in scaled frames correctly. Use some dirty magic to compensate.
      const ie9Magic = computeIE9Magic();
      const eventCoords = [event.clientX * ie9Magic, event.clientY * ie9Magic];
      sendClickMessage(nextUpwardsMetadataNode.id, "contextClick", eventCoords, null, null);
    }
    event.preventDefault();
  }

  /////////////// MOUSE OVER HANDLING ///////////////

  function handleMouseOver(event) {
    const nextUpwardsMetadataNode = findClosestMetadataUpInDomTree(event.target);
    if (nextUpwardsMetadataNode !== studioKnownValues.lastHoverNode) {
      if (nextUpwardsMetadataNode) {
        sendHoverMessage(nextUpwardsMetadataNode.id);
      } else {
        sendHoverMessage();
      }
      studioKnownValues.lastHoverNode = nextUpwardsMetadataNode;
    }
  }

  /////////////// HIGHLIGHTING ///////////////

  // Chrome does not always draw absolutely positioned elements within a scaled
  // parent (iframe). It helps to force it into gpu rendering.
  if (!!window.chrome) {
    const chromeEnableHWDrawing = document.createElement("div");
    chromeEnableHWDrawing.classList.add("chrome-drawing-workaround");
    window.document.body.appendChild(chromeEnableHWDrawing);
    chromeEnableHWDrawing.style.transform = "translateZ(0)";
  }

  const HIGHLIGHT_BORDER_SIZE = 2;
  const PRIMARY_HIGHLIGHT_CLASS_CSS = "previewIntegrationHighlightCss";
  const PRIMARY_HIGHLIGHT_CLASS_DOM = "previewIntegrationHighlightDom";
  const PRIMARY_HIGHLIGHT_BORDER_COLOR = "#4189DD";

  const SECONDARY_HIGHLIGHT_CLASS_CSS = "secondaryPreviewIntegrationHighlightCss";
  const SECONDARY_HIGHLIGHT_CLASS_DOM = "secondaryPreviewIntegrationHighlightDom";
  const SECONDARY_HIGHLIGHT_BORDER_COLOR = "#8A8686";

  const primaryHighlightedElements = [];
  const secondaryHighlightedElements = [];
  let cssClassDefinitionsInstalled = false;

  function installCSSClassDefinitionsIfNecessary() {
    if (!cssClassDefinitionsInstalled) {
      const rules =
        "." +
        PRIMARY_HIGHLIGHT_CLASS_CSS +
        "{ box-shadow: " +
        PRIMARY_HIGHLIGHT_BORDER_COLOR +
        " 0 0 0 " +
        HIGHLIGHT_BORDER_SIZE +
        "px inset; }" +
        "." +
        SECONDARY_HIGHLIGHT_CLASS_CSS +
        "{ box-shadow: " +
        SECONDARY_HIGHLIGHT_BORDER_COLOR +
        " 0 0 0 " +
        HIGHLIGHT_BORDER_SIZE +
        "px inset; }";
      window.document.head.append('<style type="text/css">' + rules + "</style>");
      cssClassDefinitionsInstalled = true;
    }
  }

  function updateHighlights(metadataIds, isSecondaryHighlight) {
    const currentSetOfHighlightedElements = isSecondaryHighlight
      ? secondaryHighlightedElements
      : primaryHighlightedElements;
    // Only remove highlight borders if there is at least one highlighted element that should not be highlighted.
    if (
      !metadataIds ||
      currentSetOfHighlightedElements.some(function (currentElement) {
        return metadataIds.indexOf(currentElement) === -1;
      })
    ) {
      removeHighlightElements(isSecondaryHighlight);
    }
    if (metadataIds) {
      metadataIds.forEach(function (metadataId) {
        // Only draw rectangle if necessary.
        if (currentSetOfHighlightedElements.indexOf(metadataId) === -1) {
          const metadataElement = cmMetadataIdToDomNodeMapping[metadataId];
          if (metadataElement) {
            const compStyle = window.getComputedStyle(metadataElement);
            const visible =
              metadataElement.offsetWidth > 0 &&
              metadataElement.offsetHeight > 0 &&
              compStyle.display !== "none" &&
              compStyle.visibility !== "hidden" &&
              compStyle.opacity !== "0";
            if (metadataElement.tagName !== "HTML" && visible) {
              const highlightStrategy = findMetadataProperty(cmMetadataMap[metadataId], "cm_highlightStrategy");
              if (highlightStrategy === "CSS") {
                installCSSClassDefinitionsIfNecessary();
                const cssClass = isSecondaryHighlight ? SECONDARY_HIGHLIGHT_CLASS_CSS : PRIMARY_HIGHLIGHT_CLASS_CSS;
                metadataElement.classList.add(cssClass);
              } else {
                const boundingClientRect = metadataElement.getBoundingClientRect();
                const scrollPosition = getScrollPosition();
                drawRectangle(
                  boundingClientRect.left + scrollPosition.scrollLeft,
                  boundingClientRect.top + scrollPosition.scrollTop,
                  boundingClientRect.width,
                  boundingClientRect.height,
                  isSecondaryHighlight
                );
              }
              currentSetOfHighlightedElements.push(metadataId);
            }
          }
        }
      });
    }
  }

  function redrawAllHighlights() {
    const primaryElements = primaryHighlightedElements.concat();
    const secondaryElements = secondaryHighlightedElements.concat();
    removeHighlightElements(false);
    removeHighlightElements(true);
    updateHighlights(primaryElements, false);
    updateHighlights(secondaryElements, true);
  }

  // Remove all primary or secondary highlight elements and update state.
  function removeHighlightElements(isSecondaryHighlight) {
    // Do not handle dom mutation events caused by highlighting changes.
    pauseMetadataObservation();

    // Remove absolute positioned frame elements.
    let cssClass = isSecondaryHighlight ? SECONDARY_HIGHLIGHT_CLASS_DOM : PRIMARY_HIGHLIGHT_CLASS_DOM;
    const borderElements = document.querySelectorAll("." + cssClass);
    forEach(borderElements, function (borderElement) {
      borderElement.parentNode.removeChild(borderElement);
    });

    // Remove alternate highlight styles.
    cssClass = isSecondaryHighlight ? SECONDARY_HIGHLIGHT_CLASS_CSS : PRIMARY_HIGHLIGHT_CLASS_CSS;
    forEach(document.querySelectorAll("." + cssClass), function (element) {
      element.classList.remove(cssClass);
    });

    // Empty the current set of metadata ids.
    const metadataIds = isSecondaryHighlight ? secondaryHighlightedElements : primaryHighlightedElements;
    while (metadataIds.length > 0) {
      metadataIds.pop();
    }

    startMetadataObservation();
  }

  // Draw permeable rectangle of given size at given position.
  function drawRectangle(posX, posY, width, height, isSecondaryHighlight) {
    pauseMetadataObservation();

    const cssClass = isSecondaryHighlight ? SECONDARY_HIGHLIGHT_CLASS_DOM : PRIMARY_HIGHLIGHT_CLASS_DOM;
    const borderColor = isSecondaryHighlight ? SECONDARY_HIGHLIGHT_BORDER_COLOR : PRIMARY_HIGHLIGHT_BORDER_COLOR;

    // IE9 can't handle positions in scaled frames correctly. Use some dirty magic to compensate.
    const ie9Magic = computeIE9Magic();
    if (ie9Magic > 1) {
      // For some unknown reasons in IE9 the position also needs some offset correction.
      const boundingClientRect = document.body.getBoundingClientRect();
      const scrollPosition = getScrollPosition();
      const bodyOffsetX = boundingClientRect.left + scrollPosition.scrollLeft;
      const bodyOffsetY = boundingClientRect.top + scrollPosition.scrollTop;
      posX = (posX - bodyOffsetX) * ie9Magic;
      posY = (posY - bodyOffsetY) * ie9Magic;
      width = width * ie9Magic;
      height = height * ie9Magic;
    }

    width = Math.round(width);
    height = Math.round(height);
    const documentHeight = getDocumentDimensions().documentHeight;
    const documentWidth = getDocumentDimensions().documentWidth;

    function createEdgeElement() {
      const result = document.createElement("div");
      result.classList.add(cssClass);
      window.document.body.appendChild(result);
      return result;
    }

    const topElement = createEdgeElement();
    const bottomElement = createEdgeElement();
    const leftElement = createEdgeElement();
    const rightElement = createEdgeElement();

    forEach(document.querySelectorAll("." + cssClass), function (element) {
      element.style.backgroundColor = borderColor;
      element.style.position = "absolute";
      element.style.zIndex = 2147483647;
      element.style.pointerEvents = "none";
      element.style.display = "none";
    });
    const positionElement = function (element, left, top, width, height) {
      element.style.left = left + "px";
      element.style.top = top + "px";
      element.style.width = width + "px";
      element.style.height = height + "px";
    };

    positionElement(topElement, posX, Math.max(posY, 0), width, HIGHLIGHT_BORDER_SIZE);
    positionElement(
      bottomElement,
      posX,
      Math.min(posY + height, documentHeight) - HIGHLIGHT_BORDER_SIZE,
      width,
      HIGHLIGHT_BORDER_SIZE
    );
    positionElement(leftElement, Math.max(posX, 0), posY, HIGHLIGHT_BORDER_SIZE, height);
    positionElement(
      rightElement,
      Math.min(posX + width, documentWidth) - HIGHLIGHT_BORDER_SIZE,
      posY,
      HIGHLIGHT_BORDER_SIZE,
      height
    );
    forEach(document.querySelectorAll("." + cssClass), function (element) {
      element.style.display = "";
    });

    startMetadataObservation();
  }

  /////////////// SCROLLING ///////////////

  function scrollIntoView(metadataIds) {
    const scrollTarget = getScrollTarget(metadataIds);
    if (scrollTarget) {
      doScrollIntoView(scrollTarget);
    }
  }

  let lastScrollLeft = NaN;
  let lastScrollTop = NaN;

  function scrollToPosition(msgJson, sourceWindow) {
    const scrollLeft = msgJson.body.scrollLeft;
    const scrollTop = msgJson.body.scrollTop;
    const replyWith = msgJson.replyWith;

    // Round the scroll values so that they can be reliably transferred
    // to attribute values. This avoid spurious scroll events because
    // rounding errors are mistaken for manual scrolling.
    lastScrollLeft = Math.round(scrollLeft);
    lastScrollTop = Math.round(scrollTop);
    setScrollPosition(lastScrollLeft, lastScrollTop);

    const message = {
      inReplyTo: replyWith,
    };
    sourceWindow.postMessage(JSON.stringify(message), window.com_coremedia_pbe_studioUrl);
  }

  // Current heuristic: Return undefined if at least one element is in viewport or none of the elements are visible.
  // Otherwise: Return first element that can be scrolled into view.
  function getScrollTarget(metadataIds) {
    let visibleMetadataElement = undefined;
    metadataIds.reverse().every(function (metadataId) {
      const metadataElement = cmMetadataIdToDomNodeMapping[metadataId];
      if (metadataElement && metadataElement.clientHeight > 0) {
        if (elementInViewport(metadataElement)) {
          // IDEA does not detect the outer scope usage correctly!
          //noinspection JSUnusedAssignment
          visibleMetadataElement = undefined;
          return false;
        }
        visibleMetadataElement = metadataElement;
      }
      return true;
    });
    return visibleMetadataElement;
  }

  // Return true if the given element is fully visible in the viewport.
  function elementInViewport(el) {
    return elementInViewportX(el) && elementInViewportY(el);
  }

  function elementInViewportX(el) {
    const viewportLeft = window.pageXOffset;
    const viewportWidth = document.documentElement.clientWidth;
    if (!viewportWidth) {
      return false;
    }
    const elOffset = getElementOffset(el);
    const elWidth = el.clientWidth;

    const completelyVisible =
      elOffset.left >= viewportLeft && elOffset.left + elOffset.width <= viewportLeft + viewportWidth;

    const visiblePart = Math.max(
      0,
      Math.min(elOffset.left + elWidth, viewportLeft + viewportWidth) - Math.max(elOffset.left, viewportLeft)
    );

    // Either return true if (1) element is completely visible (in width) or (2) it makes up at least 30% of the viewport (in width)
    return completelyVisible || visiblePart / viewportWidth > 0.3;
  }

  function elementInViewportY(el) {
    const viewportTop = window.pageYOffset;
    const viewportHeight = document.documentElement.clientHeight;
    if (!viewportHeight) {
      return false;
    }
    const elOffset = getElementOffset(el);
    const elHeight = el.clientHeight;

    const completelyVisible =
      elOffset.top >= viewportTop && elOffset.top + elOffset.height <= viewportTop + viewportHeight;

    const visiblePart = Math.max(
      0,
      Math.min(elOffset.top + elHeight, viewportTop + viewportHeight) - Math.max(elOffset.top, viewportTop)
    );

    // Either return true if (1) element is completely visible (in height) or (2) it makes up at least 30% of the viewport (in height)
    return completelyVisible || visiblePart / viewportHeight > 0.3;
  }

  function getElementOffset(el) {
    let top = el.offsetTop;
    let left = el.offsetLeft;
    const width = el.offsetWidth;
    const height = el.offsetHeight;

    while (el.offsetParent) {
      el = el.offsetParent;
      top += el.offsetTop;
      left += el.offsetLeft;
    }

    return { top: top, left: left, width: width, height: height };
  }

  function doScrollIntoView(el) {
    const elOffset = getElementOffset(el);
    window.scrollTo(elementInViewportX(el) ? 0 : elOffset.left, elementInViewportY(el) ? 0 : elOffset.top);
  }

  /////////////// RETRIEVE DOCUMENT DIMENSIONS ///////////////

  function sendDocumentDimensions(msgJson, sourceWindow) {
    // From now on the Studio is expected to know the new values
    // This is a bit simplified as the message protocol is asynchronous.
    studioKnownValues.documentDimensions = getDocumentDimensions();

    const message = {
      inReplyTo: msgJson.replyWith,
      body: studioKnownValues.documentDimensions,
    };
    sourceWindow.postMessage(JSON.stringify(message), window.com_coremedia_pbe_studioUrl);
  }

  function getDocumentDimensions() {
    return {
      documentHeight: document.body.scrollHeight,
      documentWidth: document.body.scrollWidth,
    };
  }

  /////////////// RETRIEVE SCROLL POSITION ///////////////

  function sendScrollPosition(msgJson, sourceWindow) {
    const message = {
      inReplyTo: msgJson.replyWith,
      body: getScrollPosition(),
    };
    sourceWindow.postMessage(JSON.stringify(message), window.com_coremedia_pbe_studioUrl);
  }

  function getScrollPosition() {
    return {
      scrollLeft: document.documentElement.scrollLeft,
      scrollTop: document.documentElement.scrollTop,
    };
  }

  function setScrollPosition(scrollLeft, scrollTop) {
    document.documentElement.scrollLeft = scrollLeft;
    document.documentElement.scrollTop = scrollTop;
  }

  /////////////// CM METADATA GATHERING ///////////////

  // Counter for unique metadata IDs
  let metadataKeyCounter = 0;
  const METADATA_ID_PREFIX = "CM_METADATA_";

  // Let's start and collect some metadata
  initMetadata();

  function initMetadata() {
    // move metadata of nodes with data-cm-idref:
    forEach(selectElementsWithAttribute(DATA_CM_IDREF), moveMetadataOfProxyNode);

    // Start metadata gathering with HTML root
    const documentHtml = document.documentElement;

    cmMetadataMap = {
      root: {
        id: "root",
        children: [],
      },
    };

    cmMetadataIdToDomNodeMapping = {
      root: documentHtml,
    };

    // Start breadth-first gathering of metadata throughout the DOM tree
    gatherCmMetadata();
  }

  function moveMetadataOfProxyNode(proxyNode) {
    const idRef = proxyNode.getAttribute(DATA_CM_IDREF);
    const metadata = proxyNode.getAttribute(DATA_CM_METADATA);
    if (idRef && metadata) {
      const targetElement = document.querySelector("#" + idRef);
      targetElement.setAttribute(DATA_CM_METADATA, metadata);
    }
    proxyNode.parentNode.removeChild(proxyNode);
  }

  // Breadth-first gathering of metadata throughout the DOM tree. In each step, the DOM node from the
  // front of the 'nodeQueue' parameter is visited and checked for metadata. the children DOM nodes to
  // visit are added to the rear of the queue.
  function gatherCmMetadata() {
    forEach(selectElementsWithAttribute(DATA_CM_METADATA), function (domNode) {
      const rawMetadataArrayString = domNode.getAttribute(DATA_CM_METADATA);
      let metadataArray;
      try {
        metadataArray = rawMetadataArrayString && JSON.parse(rawMetadataArrayString);
      } catch (e) {
        console.warn("Ignoring invalid metadata string: '" + rawMetadataArrayString + "'", e);
      }

      // The DOM node holds metadata if it has a CM metadata array
      if (metadataArray && metadataArray.length > 0) {
        // ID of the metadata parent element.
        let parentElement = domNode.parentElement;
        let metadataNodeParent = parentElement ? findClosestMetadataUpInDomTree(parentElement) : null;
        metadataNodeParent = metadataNodeParent || cmMetadataMap.root;

        // Include array elements as branch into metadata tree
        for (let i = 0; i < metadataArray.length; i++) {
          metadataNodeParent = addMetadataNodeToMetadataTree(metadataArray[i], metadataNodeParent, domNode);
        }
        domNode.setAttribute(DATA_CM_METADATA_ID, metadataNodeParent.id);
      } else {
        domNode.removeAttribute(DATA_CM_METADATA_ID);
      }
    });
  }

  // Returns the raw metadata string for the given dom node.

  // Add given metadata node to metadata tree.
  function addMetadataNodeToMetadataTree(metadataNode, parent, domNode) {
    const metadata = assign({}, metadataNode, {
      id: METADATA_ID_PREFIX + ++metadataKeyCounter,
      parentId: parent.id,
      children: [],
    });

    // Filling the CM metadata map
    cmMetadataMap[metadata.id] = metadata;
    // CM metadata tree construction
    parent.children.push(metadata);
    // Filling the metadata ID to DOM node map
    cmMetadataIdToDomNodeMapping[metadata.id] = domNode;
    return metadata;
  }

  /////////////// CM METADATA QUERYING ///////////////

  // Find next DOM node with metadata attached upwards in DOM tree, beginning
  // from given node. Return metadata node or undefined.
  function findClosestMetadataUpInDomTree(currentDomElement) {
    const parentElement = closest(currentDomElement, "[" + DATA_CM_METADATA + "]");
    return parentElement ? getMetadataFromWrapper(parentElement) : undefined;
  }

  // If a property is given, the first parent metadata node defining this property is returned or undefined.
  function findMetadataProperty(metadataNode, property) {
    for (
      let currentMetadataNode = metadataNode;
      currentMetadataNode;
      currentMetadataNode = cmMetadataMap[currentMetadataNode.parentId]
    ) {
      if (property in currentMetadataNode) {
        return currentMetadataNode[property];
      }
    }
    return undefined;
  }

  // Get metadata IDs for given DOM node if there are attached metadata. Otherwise return empty array.
  function getMetadataFromWrapper(domNode) {
    return cmMetadataMap[domNode.getAttribute(DATA_CM_METADATA_ID)];
  }

  /////////////// SUMMARIZE AND SEND METADATA ///////////////

  function getMetadata() {
    return {
      url: document.location.href,
      cmMetadata: cmMetadataMap.root,
    };
  }

  /////////////// GLOBAL VARIABLES ///////////////

  function sendGlobalVariable(msgJson, sourceWindow) {
    const messageBody = {
      value: window[msgJson.body.variableName],
    };
    const message = {
      inReplyTo: msgJson.replyWith,
      body: messageBody,
    };
    sourceWindow.postMessage(JSON.stringify(message), window.com_coremedia_pbe_studioUrl);
  }

  /////////////// SCROLLING ///////////////

  function enableDocumentScroll(msgJson) {
    // Required for IE browsers. Setting iframe height for responsive preview still
    // shows scroll bars from time to time. This can result in an endless responsive
    // view adjustment loop.
    const enable = msgJson.body.enable;
    document.body.style.overflowY = enable ? "auto" : "hidden";
    document.body.style.overflowX = enable ? "auto" : "hidden";
  }

  /////////////// DATA ATTRIBUTES ///////////////

  function sendDataAttribute(msgJson, sourceWindow) {
    const dataAttributeName = msgJson.body.dataAttributeName;
    const data = [];
    forEach(document.querySelectorAll("[data-" + dataAttributeName + "]"), function (element) {
      data.push(element.getAttribute("data-" + dataAttributeName));
    });
    const messageBody = {
      value: data,
    };
    const message = {
      inReplyTo: msgJson.replyWith,
      body: messageBody,
    };
    sourceWindow.postMessage(JSON.stringify(message), window.com_coremedia_pbe_studioUrl);
  }

  /////////////// TOOLS ///////////////

  function sendClickMessage(metadataNodeId, clickType, eventCoords, elementCoords, elementDimensions) {
    const msg = JSON.stringify({
      type: "click",
      body: {
        clickedMetadataNodeId: metadataNodeId,
        clickType: clickType,
        eventCoords: eventCoords,
        elementCoords: elementCoords,
        elementDimensions: elementDimensions,
        scrollX: window.scrollX,
        scrollY: window.scrollY,
      },
    });
    window.parent.postMessage(msg, window.com_coremedia_pbe_studioUrl);
  }

  function sendHoverMessage(metadataNodeId) {
    const msg = JSON.stringify({
      type: "hover",
      body: {
        hoveredMetadataNodeId: metadataNodeId,
      },
    });
    window.parent.postMessage(msg, window.com_coremedia_pbe_studioUrl);
  }

  function computeIE9Magic() {
    const documentElement = document.documentElement;
    const boundingClientRect = documentElement.getBoundingClientRect();
    if (boundingClientRect.width > boundingClientRect.height) {
      return Math.max(1, documentElement.offsetWidth / boundingClientRect.width);
    } else {
      return Math.max(1, documentElement.offsetHeight / boundingClientRect.height);
    }
  }

  ///////////////////////////////////////////////////
  /////////////// MAIN INITIALIZATION ///////////////
  ///////////////////////////////////////////////////

  // Attach local listeners
  document.body.addEventListener("contextmenu", handleContextClick);
  document.body.addEventListener("mouseover", handleMouseOver);
  window.addEventListener("resize", redrawAllHighlights);

  // Enable post message handling
  window.addEventListener("message", postMessageHandler);

  // Load all stylesheets and JS specific for the Studio preview (eg. to disable animations)
  loadAdditionalStudioStylesAndJs();

  // Register at parent window
  const msg = JSON.stringify({
    type: "ready",
    body: getMetadata(),
  });

  // Remember initial list of metadata nodes.
  studioKnownValues.metadataNodeList = selectElementsWithAttribute(DATA_CM_METADATA);
  window.parent.postMessage(msg, window.com_coremedia_pbe_studioUrl);

  /////////////// PROGRAMMATIC SCROLLING /////////////////

  window.document.addEventListener("wheel", wheel, { passive: false });

  function wheel(event) {
    const deltaX = getDeltaX(event);
    const deltaY = getDeltaY(event);
    if (deltaX || deltaY) {
      window.scrollBy(deltaX, deltaY);
    }
    if (event.preventDefault) {
      event.preventDefault();
    }
    event.returnValue = false;
  }

  function getDeltaY(event) {
    if (event.deltaY) {
      return event.deltaY * (event.deltaMode ? event.deltaMode * 14 : 1);
    }
    return 0;
  }

  function getDeltaX(event) {
    if (event.deltaX) {
      return event.deltaX * (event.deltaMode ? event.deltaMode * 14 : 1);
    }
    return 0;
  }

  /////////////// ADDITIONAL CSS AND JS FOR STUDIO PREVIEW /////////////////

  function loadAdditionalStudioStylesAndJs() {
    let i;
    let studioStyleSheets = [];
    let studioJSFiles = [];
    const headMetadata = getMetadataFromWrapper(document.head);
    if (headMetadata) {
      studioStyleSheets = headMetadata["cm_studioPreviewCss"];
      studioJSFiles = headMetadata["cm_studioPreviewJs"];
    }
    if (studioStyleSheets && studioStyleSheets.length > 0) {
      for (i = 0; i < studioStyleSheets.length; i++) {
        const link = document.createElement("link");
        link.href = studioStyleSheets[i];
        link.type = "text/css";
        link.rel = "stylesheet";
      }
    }

    if (studioJSFiles && studioJSFiles.length > 0) {
      for (i = 0; i < studioJSFiles.length; i++) {
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src = studioJSFiles[i];
      }
    }
  }

  /////////////// UPDATE MANAGEMENT /////////////////

  let metadataObserver;
  let heightObserver;
  startMetadataObservation();

  function startMetadataObservation() {
    MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
    if (MutationObserver) {
      if (!metadataObserver) {
        metadataObserver = new MutationObserver(deferProcessMetadataChange);
      }
      metadataObserver.observe(document.documentElement, {
        childList: true,
        subtree: true,
      });

      if (!heightObserver) {
        heightObserver = new MutationObserver(deferProcessDimensionChange);
      }
      heightObserver.observe(document.documentElement, {
        attributes: true,
        childList: true,
        characterData: true,
        subtree: true,
      });
    } else {
      document.body.addEventListener("DOMSubtreeModified", deferProcessMetadataChange, false);
      document.body.addEventListener("DOMSubtreeModified", deferProcessDimensionChange, false);
    }
  }

  function pauseMetadataObservation() {
    if (metadataObserver) {
      metadataObserver.disconnect();
      heightObserver.disconnect();
    } else {
      document.body.removeEventListener("DOMSubtreeModified", deferProcessMetadataChange, false);
      document.body.removeEventListener("DOMSubtreeModified", deferProcessDimensionChange, false);
    }
  }

  // Buffer some events before further action is triggered
  let metadataChangeTimer;

  function deferProcessMetadataChange() {
    window.clearTimeout(metadataChangeTimer);
    metadataChangeTimer = window.setTimeout(processMetadataChange, 200);
  }

  // Compare list of metadata nodes to reference list. Try not to compare complete
  // metadata trees as the tree generation is rather expensive.
  function processMetadataChange() {
    const newMetadataNodes = selectElementsWithAttribute(DATA_CM_METADATA);
    let updated = studioKnownValues.metadataNodeList.length !== newMetadataNodes.length;
    if (!updated) {
      forEach(studioKnownValues.metadataNodeList, function (element, index) {
        updated = updated || element !== newMetadataNodes.item(index);
        return !updated;
      });
    }
    if (updated) {
      // Remember new Studio state.
      studioKnownValues.metadataNodeList = newMetadataNodes;
      initMetadata();
      sendUpdateMessage(getMetadata());
    }
  }

  function sendUpdateMessage(body) {
    const msg = JSON.stringify({
      type: "update",
      body: body,
    });
    window.parent.postMessage(msg, window.com_coremedia_pbe_studioUrl);
  }

  function selectElementsWithAttribute(attributeName) {
    return document.querySelectorAll("[" + attributeName + "]");
  }

  // Buffer some events before further action is triggered
  let dimensionChangeTimer;

  function deferProcessDimensionChange() {
    window.clearTimeout(dimensionChangeTimer);
    dimensionChangeTimer = window.setTimeout(processDimensionChange, 200);
  }

  // Compare new document dimensions to reference dimensions and
  // send update message if necessary.
  function processDimensionChange() {
    const oldDocumentDimensions = studioKnownValues.documentDimensions;
    const newDocumentDimensions = getDocumentDimensions();
    for (const property in newDocumentDimensions) {
      if (newDocumentDimensions.hasOwnProperty(property)) {
        if (newDocumentDimensions[property] !== oldDocumentDimensions[property]) {
          sendResizeMessage({
            oldDimensions: oldDocumentDimensions,
            newDimensions: newDocumentDimensions,
          });
          redrawAllHighlights();
          return;
        }
      }
    }
  }

  function sendResizeMessage(body) {
    const msg = JSON.stringify({
      type: "resize",
      body: body,
    });
    window.parent.postMessage(msg, window.com_coremedia_pbe_studioUrl);
  }

  document.addEventListener("scroll", sendScrollMessage);

  function sendScrollMessage() {
    // Make sure not to feed back scroll position if the current
    // scroll position was set by the parent frame.
    const scrollPosition = getScrollPosition();
    if (lastScrollTop !== scrollPosition.scrollTop || lastScrollLeft !== scrollPosition.scrollLeft) {
      const msg = JSON.stringify({
        type: "scroll",
        body: {},
      });
      window.parent.postMessage(msg, window.com_coremedia_pbe_studioUrl);

      // Forget last scroll position so that a new event is sent when
      // returning to the programmatically established scroll position.
      lastScrollLeft = NaN;
      lastScrollTop = NaN;
    }
  }
});
