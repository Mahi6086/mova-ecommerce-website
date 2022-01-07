import toast from "react-hot-toast";
import { setCart } from "./LocalStorage";

export const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const newCart = [...state.cart, { ...action.payload, qty: 1 }];
      setCart(newCart);
      toast.success("Successfully Cart Added!");
      return {
        ...state,
        cart: newCart,
      };
    case "CART_PRODUCT_QUANTITY":
      const modifiredQty = [];
      state.cart.forEach((pditem) => {
        if (
          pditem.id === action.payload.id &&
          pditem.size === action.payload.size
        ) {
          pditem.qty = action.payload.qty;
        }
        modifiredQty.push(pditem);
      });
      setCart(modifiredQty);

      return {
        ...state,
        cart: modifiredQty,
      };
    case "LOAD_CART_DATA":
      return {
        cart: action.payload,
      };
    case "REMOVE_FROM_CART":
      const rmCart = state.cart.filter((item) => {
        let status =
          action.payload.id === item.id && action.payload.size === item.size;
        return !status;
      });
      setCart(rmCart);
      toast.success("Successfully Cart Delete!");

      return {
        ...state,
        cart: rmCart,
      };
    case "RESET_CART":
      return {
        ...state,
        cart: [],
      };
    default:
      return state;
  }
};
