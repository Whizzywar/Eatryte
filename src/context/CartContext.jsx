import { createContext, useContext, useState } from "react";

const CartContext = createContext({ count: 0, add: () => {} });

export function CartProvider({ children }) {
  const [count, setCount] = useState(0);
  return (
    <CartContext.Provider value={{ count, add: () => setCount((c) => c + 1) }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
