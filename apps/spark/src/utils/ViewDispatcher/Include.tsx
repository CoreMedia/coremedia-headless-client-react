import React from "react";
import ViewDispatcher, { defaultView } from "@coremedia-labs/view-dispatcher";
import IncludeProps from "./IncludeProps";
import typeHierarchy from "./Interfaces";

type ViewComponent = React.FunctionComponent | React.ComponentClass;

export const viewDispatcher = new ViewDispatcher<ViewComponent>(typeHierarchy);

const Include: React.FC<IncludeProps> = (props) => {
  const { self, type, view = defaultView, viewType } = props;
  const resolvedType = type || self.__typename;

  if (!resolvedType) {
    console.error("View Dispatcher: can't resolve type", self);
    return null;
  }

  const resolvedViewType = self.viewtype || viewType || null;

  const Component = viewDispatcher.lookupView(resolvedType, view, resolvedViewType);
  if (!Component) {
    console.error("ViewDispatcher: No view found", resolvedType, view);
    return null;
  }

  return <Component viewType={resolvedViewType} {...props} />;
};

export default Include;
