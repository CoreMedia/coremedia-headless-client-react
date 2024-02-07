import { CartAction, CartActionTypes, CartContextData, CartEntry } from "./CartContext";

const updateLocalStorage = (cartItems: Array<CartEntry>) => {
  localStorage.setItem("cart", JSON.stringify(cartItems.length > 0 ? cartItems : []));
};

export const updateCalculations = (cartItems: Array<CartEntry>) => {
  const itemCount = cartItems.reduce((total: number, product: CartEntry) => total + product.quantity, 0);
  const total = cartItems.reduce(
    (total: number, product: CartEntry) => total + product.product.offerPrice * product.quantity,
    0
  );
  return { itemCount, total };
};

const updateQuantity = (purchases: Array<CartEntry>, index: number, increment = 1) => {
  return [
    ...purchases.slice(0, index),
    { ...purchases[index], quantity: purchases[index].quantity + increment },
    ...purchases.slice(index + 1),
  ];
};

export const CartReducer = (state: CartContextData, action: CartAction): CartContextData => {
  const payloadId = action.payload && action.payload.metadata && action.payload.metadata.root.id;
  if (payloadId || CartActionTypes.CHECKOUT === action.type || CartActionTypes.CLEAR === action.type) {
    switch (action.type) {
      case CartActionTypes.ADD_ITEM:
        const cartItemsAfterAdd = [...state.cartItems];
        if (action.payload && payloadId && !cartItemsAfterAdd.find((item: CartEntry) => item.id === payloadId)) {
          const itemToAdd: CartEntry = {
            id: payloadId,
            quantity: 1,
            product: action.payload,
          };
          cartItemsAfterAdd.push(itemToAdd);
          updateLocalStorage(cartItemsAfterAdd);
        }
        return {
          ...state,
          ...updateCalculations(cartItemsAfterAdd),
          cartItems: cartItemsAfterAdd,
        };

      case CartActionTypes.REMOVE_ITEM:
        const cartItemsAfterRemove = [...state.cartItems.filter((item: CartEntry) => item.id !== payloadId)];
        updateLocalStorage(cartItemsAfterRemove);
        return {
          ...state,
          ...updateCalculations(cartItemsAfterRemove),
          cartItems: cartItemsAfterRemove,
        };

      case CartActionTypes.INCREASE:
        const cartItemsAfterIncrease = updateQuantity(
          state.cartItems,
          state.cartItems.findIndex((item: CartEntry) => item.id === payloadId)
        );
        updateLocalStorage(cartItemsAfterIncrease);
        return {
          ...state,
          ...updateCalculations(cartItemsAfterIncrease),
          cartItems: cartItemsAfterIncrease,
        };

      case CartActionTypes.DECREASE:
        const cartItemsAfterDecrease = updateQuantity(
          state.cartItems,
          state.cartItems.findIndex((item: CartEntry) => item.id === payloadId),
          -1
        );
        updateLocalStorage(cartItemsAfterDecrease);
        return {
          ...state,
          ...updateCalculations(cartItemsAfterDecrease),
          cartItems: cartItemsAfterDecrease,
        };

      case CartActionTypes.CHECKOUT:
        updateLocalStorage([]);
        return {
          cartItems: [],
          checkout: true,
          ...updateCalculations([]),
        };

      case CartActionTypes.CLEAR:
        updateLocalStorage([]);
        return {
          checkout: false,
          cartItems: [],
          ...updateCalculations([]),
        };

      default:
        return state;
    }
  }
  return { checkout: false, cartItems: [], ...updateCalculations([]) };
};
