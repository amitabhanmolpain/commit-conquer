import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";
import { selectCartState, useCartStore } from "../store/cartStore";

export function useCart() {
  return useCartStore(useShallow(selectCartState));
}

export function useCartActions() {
  return useCartStore(
    useShallow((state) => ({
      addToCart: state.addToCart,
      removeFromCart: state.removeFromCart,
      updateQuantity: state.updateQuantity,
      clearCart: state.clearCart,
      fetchCart: state.fetchCart,
      syncCart: state.fetchCart,
      toggleCart: state.toggleCart,
      dispatch: state.dispatch,
    })),
  );
}

export function useHydrateCart() {
  const fetchCart = useCartStore((state) => state.fetchCart);

  useEffect(() => {
    void fetchCart();
  }, [fetchCart]);
}
