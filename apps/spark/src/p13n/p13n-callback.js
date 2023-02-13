cm_p13n = {
  ap: [],
  sc: [],
  _cm_p13n: undefined,
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
