import "./campaign-highlighting.css";

window.addEventListener("message", postMessageHandler);

// Constants
const CAMPAIGN_SLOT_EMPTY_CSS = "cm-campaign-slot-highlighting-green";
const CAMPAIGN_SLOT_HAS_ITEMS_CSS = "cm-campaign-slot-highlighting-purple";
const CAMPAIGN_SLOT_EMPTY_CSS_TEXT = "cm-campaign-slot-highlighting-green-text";
const CAMPAIGN_SLOT_EMPTY_CSS_OVERLAY = "cm-campaign-slot-highlighting-green-overlay";
const CAMPAIGN_SLOT_HAS_ITEMS_CSS_OVERLAY = "cm-campaign-slot-highlighting-purple-overlay";
const BORDER_LEFT_CSS = "cm-campaign-slot-border-left";
const BORDER_RIGHT_CSS = "cm-campaign-slot-border-right";
const BORDER_TOP_CSS = "cm-campaign-slot-border-top";
const BORDER_BOTTOM_CSS = "cm-campaign-slot-border-bottom";

const ADD_HIGHLIGHT_MESSAGE_TYPE = "placements.addHighlight";
const REMOVE_HIGHLIGHT_MESSAGE_TYPE = "placements.removeHighlight";

const EMPTY_CAMPAIGN_SLOT_LOCALIZER = "CampaignSlotHighlighting_emptySlot";
const CAMPAIGN_SLOT_NAME_REPLACER = "(CAMPAIGNSLOTNAME)";

// Variables
let mutationObserver;

/**
 * @param {Element} el
 * @param {string} selector
 * @returns {boolean}
 */
function matches(el, selector) {
  const matchesFn = Element.prototype.matches || Element.prototype["msMatchesSelector"];
  return matchesFn.call(el, selector);
}

/**
 * @param {NodeList} list
 * @param {Function} callback
 */
function forEach(list, callback) {
  const forEachFn = NodeList.prototype.forEach || Array.prototype.forEach;
  return forEachFn.call(list, callback);
}

/**
 * @param {Element} el
 * @returns {Element[]}
 */
function getParentElements(el) {
  const result = [];
  let parent = el && el.parentElement;
  while (parent) {
    result.push(parent);
    parent = parent.parentElement;
  }
  return result;
}

function postMessageHandler(event) {
  const msg = event.data;
  const origin = event.origin;
  if (origin === window.com_coremedia_pbe_studioUrl || window.com_coremedia_pbe_studioUrl === "*") {
    let msgJson = undefined;
    try {
      msgJson = JSON.parse(msg);
    } catch (err) {}
    if (msgJson) {
      if (msgJson.type === ADD_HIGHLIGHT_MESSAGE_TYPE || msgJson.type === REMOVE_HIGHLIGHT_MESSAGE_TYPE) {
        const localizationMap = msgJson.body;

        // in case the add highlighting message comes multiple times, the last wins...
        if (mutationObserver) {
          mutationObserver.disconnect();
          mutationObserver = null;
        }

        if (msgJson.type === ADD_HIGHLIGHT_MESSAGE_TYPE) {
          mutationObserver = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
              if (mutation.type === "childList") {
                // cannot use NodeList#forEach here because of IE11...
                Array.prototype.forEach.call(mutation.addedNodes, function (addedNode) {
                  if (addedNode.nodeType === Node.ELEMENT_NODE) {
                    const relevantItems = getRelevantItems(addedNode);
                    if (relevantItems.length > 0) {
                      addHighlight(localizationMap, relevantItems);
                    }
                  }
                });
              }
            });
          });
          addHighlight(localizationMap, getRelevantItems(document.body));
          mutationObserver.observe(document.body, {
            childList: true,
            subtree: true,
          });
        } else {
          removeHighlight(getRelevantItems(document.body));
        }
      }
    }
  }
}

function removeHighlight(relevantItems) {
  for (let i = 0; i < relevantItems.length; i++) {
    const currentItem = relevantItems[i];
    const classList = currentItem.classList;
    let overlayName;
    let textName;
    if (classList.contains(CAMPAIGN_SLOT_EMPTY_CSS)) {
      classList.remove(CAMPAIGN_SLOT_EMPTY_CSS);
      overlayName = CAMPAIGN_SLOT_EMPTY_CSS_OVERLAY;
      textName = CAMPAIGN_SLOT_EMPTY_CSS_TEXT;
    } else if (classList.contains(CAMPAIGN_SLOT_HAS_ITEMS_CSS)) {
      classList.remove(CAMPAIGN_SLOT_HAS_ITEMS_CSS);
      let borderToRemove = currentItem.getElementsByClassName(BORDER_LEFT_CSS);
      let j;
      for (j = 0; j < borderToRemove.length; j++) {
        currentItem.removeChild(borderToRemove[j]);
      }
      borderToRemove = currentItem.getElementsByClassName(BORDER_TOP_CSS);
      for (j = 0; j < borderToRemove.length; j++) {
        currentItem.removeChild(borderToRemove[j]);
      }
      borderToRemove = currentItem.getElementsByClassName(BORDER_RIGHT_CSS);
      for (j = 0; j < borderToRemove.length; j++) {
        currentItem.removeChild(borderToRemove[j]);
      }
      borderToRemove = currentItem.getElementsByClassName(BORDER_BOTTOM_CSS);
      for (j = 0; j < borderToRemove.length; j++) {
        currentItem.removeChild(borderToRemove[j]);
      }
      overlayName = CAMPAIGN_SLOT_HAS_ITEMS_CSS_OVERLAY;
    }
    // Remove Overlay
    let childsToRemove = currentItem.getElementsByClassName(overlayName);
    let k;
    for (k = 0; k < childsToRemove.length; k++) {
      currentItem.removeChild(childsToRemove[k]);
    }
    // Remove Text
    childsToRemove = currentItem.getElementsByClassName(textName);
    for (k = 0; k < childsToRemove.length; k++) {
      currentItem.removeChild(childsToRemove[k]);
    }
  }
}

function addHighlight(localizationMap, relevantItems) {
  for (let i = 0; i < relevantItems.length; i++) {
    const currentItem = relevantItems[i];
    const attributeList = currentItem.getAttribute("data-cm-metadata");
    const attributes = JSON.parse(attributeList);
    let hasItems;
    let slotName;

    for (const key in attributes) {
      if (attributes.hasOwnProperty(key)) {
        const metadata = attributes[key]["campaignSlotRequest"];
        if (metadata !== undefined) {
          hasItems = Boolean(metadata[0].hasItems);
          slotName = String(metadata[0].slotName);
          break;
        }
      }
    }
    const element = document.createElement("div");

    if (!hasItems) {
      element.classList.add(CAMPAIGN_SLOT_EMPTY_CSS_OVERLAY);
      currentItem.classList.add(CAMPAIGN_SLOT_EMPTY_CSS);
      currentItem.style.paddingLeft = element.width;
      const textElementEmpty = document.createElement("div");
      const textNodeEmpty = document.createTextNode(
        translate(localizationMap, EMPTY_CAMPAIGN_SLOT_LOCALIZER, "This campaign slot is empty")
      );
      textElementEmpty.appendChild(textNodeEmpty);
      textElementEmpty.classList.add(CAMPAIGN_SLOT_EMPTY_CSS_TEXT);
      currentItem.appendChild(textElementEmpty);
    } else {
      const borderLeft = document.createElement("div");
      borderLeft.classList.add(BORDER_LEFT_CSS);
      currentItem.appendChild(borderLeft);
      const borderRight = document.createElement("div");
      borderRight.classList.add(BORDER_RIGHT_CSS);
      currentItem.appendChild(borderRight);
      const borderTop = document.createElement("div");
      borderTop.classList.add(BORDER_TOP_CSS);
      currentItem.appendChild(borderTop);
      const borderBottom = document.createElement("div");
      borderBottom.classList.add(BORDER_BOTTOM_CSS);
      currentItem.appendChild(borderBottom);
      element.classList.add(CAMPAIGN_SLOT_HAS_ITEMS_CSS_OVERLAY);
      currentItem.classList.add(CAMPAIGN_SLOT_HAS_ITEMS_CSS);
    }
    const placementTextNode = document.createTextNode(`📣 Campaign Slot - ${slotName}`);
    element.appendChild(placementTextNode);
    currentItem.appendChild(element);

    if (!hasItems) {
      currentItem.style.paddingLeft = element.offsetWidth + 8 + "px";
    }
  }
}

function translate(localizationMap, key, fallback = undefined) {
  return localizationMap[key] || fallback;
}

// return all items that contain "campaignSlotRequest" metadata, but only if they don't have a parent that does as well.
function getRelevantItems(element) {
  const selector = "[data-cm-metadata*='campaignSlotRequest']";
  const unfilteredItems = [];
  if (matches(element, selector)) {
    unfilteredItems.push(element);
  }
  forEach(element.querySelectorAll(selector), function (currentItem) {
    unfilteredItems.push(currentItem);
  });
  const filteredItems = [];
  for (let i = 0; i < unfilteredItems.length; i++) {
    const checkItem = unfilteredItems[i];
    const checkItemParents = getParentElements(checkItem);
    let hasHighligtedParent = false;
    for (let j = 0; j < checkItemParents.length; j++) {
      const checkParent = checkItemParents[j];
      const attributeList = checkParent.getAttribute("data-cm-metadata");
      if (attributeList) {
        const attributes = JSON.parse(attributeList);
        for (const key in attributes) {
          if (attributes.hasOwnProperty(key)) {
            const metadata = attributes[key]["campaignSlotRequest"];
            if (metadata !== undefined) {
              hasHighligtedParent = true;
              break;
            }
          }
        }
      }
    }
    if (!hasHighligtedParent) {
      filteredItems.push(checkItem);
    }
  }
  return filteredItems;
}
