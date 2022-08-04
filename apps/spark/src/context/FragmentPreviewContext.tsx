import React, { createContext, useReducer } from "react";

type Payload = any;

export interface FragmentPreviewEntry {
  title: string;
}

export interface FragmentPreviewContextData {
  items: Array<FragmentPreviewEntry>;
  type?: string;
}

export interface FragmentPreviewContextDataAndFunctions extends FragmentPreviewContextData {
  toggleEntry: (payload: Payload) => void;
}

const storage: Array<FragmentPreviewEntry> = localStorage.getItem("previewConfiguration")
  ? JSON.parse(localStorage.getItem("previewConfiguration") || "")
  : [];

const updateLocalStorage = (items: Array<FragmentPreviewEntry>) => {
  localStorage.setItem("previewConfiguration", JSON.stringify(items.length > 0 ? items : []));
};

const initialState = { items: storage, type: "" };

export type FragmentPreviewAction = {
  type: FragmentPreviewActionTypes;
  payload?: Payload;
};

const FragmentPreviewContext = createContext<FragmentPreviewContextDataAndFunctions>({
  toggleEntry(): void {
    return;
  },
  type: "",
  items: [],
});

export enum FragmentPreviewActionTypes {
  TOGGLE_ENTRY = "TOGGLE_ENTRY",
}

export const FragmentPreviewReducer = (
  state: FragmentPreviewContextData,
  action: FragmentPreviewAction
): FragmentPreviewContextData => {
  if (action.payload) {
    switch (action.type) {
      case FragmentPreviewActionTypes.TOGGLE_ENTRY:
        let entriesAfterToggle = [...state.items];
        if (entriesAfterToggle.find((item) => item.title === action.payload)) {
          entriesAfterToggle = [...state.items.filter((item: FragmentPreviewEntry) => item.title !== action.payload)];
        } else {
          entriesAfterToggle = [...entriesAfterToggle, { title: action.payload }];
        }
        updateLocalStorage(entriesAfterToggle);
        return {
          ...state,
          items: entriesAfterToggle,
        };

      default:
        return state;
    }
  }
  return { items: [], type: "" };
};

interface Props {
  type?: string;
}

export const FragmentPreviewContextProvider: React.FC<Props> = ({ type, children }) => {
  const [state, dispatch] = useReducer(FragmentPreviewReducer, initialState);

  const toggleEntry = (payload: Payload) => {
    dispatch({ type: FragmentPreviewActionTypes.TOGGLE_ENTRY, payload });
  };

  const fragmentPreviewContextValue: FragmentPreviewContextDataAndFunctions = {
    toggleEntry,
    ...state,
    type: type,
  };
  return (
    <FragmentPreviewContext.Provider value={fragmentPreviewContextValue}>{children}</FragmentPreviewContext.Provider>
  );
};

export const useFragmentPreviewContextState = (): FragmentPreviewContextDataAndFunctions => {
  const context = React.useContext(FragmentPreviewContext);
  if (context === undefined) {
    throw new Error("useFragmentPreviewContextState must be used within a FragmentPreviewContextProvider");
  }
  return context;
};
