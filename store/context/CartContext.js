import { createContext, useReducer } from 'react';
import Cookies from 'js-cookie';

export const ACTIONS = {
  ADDITEM: 'add_item',
  DELETEITEM: 'delete_item',
  ADDQUANTITY: 'add_quantity',
  FAVOURITE: 'add_favourite',
};

function reducer(cart, action) {
  const product = action.payload.product;
  switch (action.type) {
    case ACTIONS.ADDITEM:
      const entry = cart.find((item) => item.id === product.id);
      if (entry) {
        return cart.map((item) => {
          if (item.id === product.id) {
            item.amount += 1;
          }
          return item;
        });
      }
      return [...cart, newItem(product)];
  }
}

function newItem(product) {
  Cookies.set('item', {
    id: product.id,
    title: product.attributes.Title,
    price: product.attributes.price,
  });

  return {
    id: product.id,
    title: product.attributes.Title,
    price: product.attributes.price,
    amount: Number(1),
  };
}

export const CartContext = createContext();

export default function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(reducer, []);

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}
