import React from "react";
import ReactDOM from "react-dom";

import Fragment from "./fragments";

import registerServiceWorker from "./registerServiceWorker";

let elements = document.getElementsByTagName('cm-fragment');

for (let item of elements) {
  ReactDOM.render(<Fragment {...item.dataset}/>, item);
}

registerServiceWorker();
