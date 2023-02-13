const _cm_p13n = {

  multipleSegments: true,
  segmentSelected: false,

  pushSegment: function (segmentName) {
    const p13n = window.cm_p13n;
    if (this.multipleSegments || !this.segmentSelected) {
      this.segmentSelected = true;
      p13n.pushVariant(segmentName);
    }
  },

  pushVariant: function (variantId) {
    window.postMessage({type: "cm_p13n", body: {variantId: variantId}})
  },

  exchangeVariant: function (variantId, contentId) {
    this.pushVariant(variantId);
  },

  completed: function (providerId) {
    const p13n = window.cm_p13n;
    if (providerId === "ALL") {
      p13n.ap = [];
    } else {
      const index = p13n.ap.indexOf(providerId);
      if (index > -1) {
        p13n.ap.splice(index, 1);
      }
    }
    if (p13n.ap.length > 0) {
      // wait until all providers have finished
      return;
    }

    const fragments = $.find(".cm-experience");
    fragments.forEach(function (f) {
      const $fragment = $(f);

      const state = $fragment.data("cm-state");
      if (state !== "loading") {
        const children = $fragment.children();
        if (children.length === 1) {
          const $child = $(children[0]);
          undecorateNode($fragment);
          experienceTagAttributes.forEach(function (name) {
            $child.attr(name, $fragment.attr(name));
          });
          $fragment.replaceWith($child);
          decorateNode($child);
          $document.trigger(EVENT_NODE_APPENDED, [$child]);
        }
      }
    });
  }
};

cm_p13n = {
  ap: [],
  sc: [],
  _cm_p13n: _cm_p13n,
  registerProvider: function (providerId) {
    cm_p13n.ap.push(providerId);
  },
  pushSegment: function (segmentName) {
    cm_p13n.pushVariant(segmentName);
  },
  pushVariant: function (variantId) {
    cm_p13n.sc.push({m: "v", v: variantId});
    cm_p13n.run();
  },
  completed: function (providerId) {
    cm_p13n.sc.push({m: "c", p: providerId});
    cm_p13n.run();
  },
  exchangeVariant: function (variantId, contentId) {
    const _p13n = cm_p13n._cm_p13n;
    if (_p13n) {
      _p13n.exchangeVariant(variantId, contentId);
    }
  },
  run: function () {
    const _p13n = cm_p13n._cm_p13n;
    if (_p13n) {
      const sc = cm_p13n.sc;
      cm_p13n.sc = [];
      sc.forEach(function (c) {
        if (c.m === "v") {
          _p13n.pushVariant(c.v);
        } else if (c.m === "c") {
          _p13n.completed(c.p);
        }
      });
    }
  }
};
