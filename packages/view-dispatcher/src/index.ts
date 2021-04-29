interface ViewMapping<P> {
  [view: string]: P;
}

export interface TypeHierarchy {
  [name: string]: string[];
}

interface ViewMap<P> {
  [type: string]: ViewMapping<P>;
}

export const defaultView = "";

export default class ViewDispatcher<P> {
  private typeHierarchy: TypeHierarchy = {};
  private views: ViewMap<P> = {};

  constructor(typeHierarchy: TypeHierarchy) {
    Object.keys(typeHierarchy).forEach((child: string) => {
      this.typeHierarchy[child] = [...typeHierarchy[child]];
    });
  }

  lookup(type: string, view: string, originalType: string, originalView: string): P | null {
    const typeToView = this.views[type];

    const viewComponent = typeToView && typeToView[view];

    if (viewComponent) {
      return viewComponent;
    }

    const parentTypes = this.typeHierarchy[type];
    if (!parentTypes) {
      return null;
    }

    for (const parentType of parentTypes) {
      const viewComponent = this.lookup(parentType, view, originalType, originalView); //todo breath first search
      if (viewComponent) {
        return viewComponent;
      }
    }
    return null;
  }

  lookupView(type: string, view: string, viewType: string | null): P | null {
    if (viewType) {
      const viewWithViewType = view + "[" + viewType + "]";
      const viewComponent = this.lookup(type, viewWithViewType, type, viewWithViewType);
      return viewComponent || this.lookup(type, view, type, viewWithViewType);
    }
    return this.lookup(type, view, type, view);
  }

  addViewComponent(viewComponent: P, type: string, view: string = defaultView): void {
    this.views[type] = this.views[type] || {};
    this.views[type][view] = viewComponent;
  }
}
