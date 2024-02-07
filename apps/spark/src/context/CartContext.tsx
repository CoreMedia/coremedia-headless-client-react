import React, { createContext, useReducer, useState } from "react";
import SideCart from "../components/Cart/SideCart";
import { Banner } from "../models/Banner/Banner";
import { CartReducer, updateCalculations } from "./CartReducer";
import { useSiteContextState } from "./SiteContextProvider";

export interface CartEntry {
  id: string;
  quantity: number;
  product: Banner;
}

export interface CartContextData {
  cartItems: Array<CartEntry>;
  itemCount: number;
  total: number;
  checkout: boolean;
}

export interface CartContextDataAndFunctions extends CartContextData {
  addProduct: (payload: Payload) => void;
  increase: (payload: Payload) => void;
  decrease: (payload: Payload) => void;
  removeProduct: (payload: Payload) => void;
  clearCart: () => void;
  handleCheckout: () => void;
  showSideCart: () => void;
  hideSideCart: () => void;
  toggleSideCart: () => void;
}

export enum CartActionTypes {
  INCREASE = "INCREASE",
  DECREASE = "DECREASE",
  ADD_ITEM = "ADD_ITEM",
  REMOVE_ITEM = "REMOVE_ITEM",
  CLEAR = "CLEAR",
  CHECKOUT = "CHECKOUT",
}

export type CartAction = {
  type: CartActionTypes;
  payload?: Banner;
};

const CartContext = createContext<CartContextDataAndFunctions>({
  addProduct(): void {
    return;
  },
  cartItems: [],
  clearCart(): void {
    return;
  },
  decrease(): void {
    return;
  },
  handleCheckout(): void {
    return;
  },
  increase(): void {
    return;
  },
  removeProduct(): void {
    return;
  },
  toggleSideCart(): void {
    return;
  },
  showSideCart(): void {
    return;
  },
  hideSideCart(): void {
    return;
  },
  itemCount: 0,
  total: 0,
  checkout: false,
});

const storage: Array<CartEntry> = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart") || "") : [];
const initialState = { cartItems: storage, ...updateCalculations(storage), checkout: false };

type Payload = Banner;

const CartContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(CartReducer, initialState);
  const { isCommerce } = useSiteContextState();

  const increase = (payload: Payload) => {
    dispatch({ type: CartActionTypes.INCREASE, payload });
  };

  const decrease = (payload: Payload) => {
    dispatch({ type: CartActionTypes.DECREASE, payload });
  };

  const addProduct = (payload: Payload) => {
    dispatch({ type: CartActionTypes.ADD_ITEM, payload });
  };

  const removeProduct = (payload: Payload) => {
    dispatch({ type: CartActionTypes.REMOVE_ITEM, payload });
  };

  const clearCart = () => {
    dispatch({ type: CartActionTypes.CLEAR });
  };

  const handleCheckout = () => {
    dispatch({ type: CartActionTypes.CHECKOUT });
  };

  const [isShowing, setIsShowing] = useState(false);

  function toggleSideCart(): void {
    setIsShowing(!isShowing);
  }

  function showSideCart(): void {
    setIsShowing(true);
  }

  function hideSideCart(): void {
    setIsShowing(false);
  }

  const contextValues: CartContextDataAndFunctions = {
    removeProduct,
    addProduct,
    increase,
    decrease,
    clearCart,
    handleCheckout,
    showSideCart,
    hideSideCart,
    toggleSideCart,
    ...state,
  };

  return (
    <CartContext.Provider value={contextValues}>
      {children}
      {isCommerce && <SideCart isShowing={isShowing} hide={hideSideCart} />}
    </CartContext.Provider>
  );
};

export const useCartContextState = (): CartContextDataAndFunctions => {
  const context = React.useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCartContextState must be used within a CartContextProvider");
  }
  return context;
};

export default CartContextProvider;
