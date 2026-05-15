import { create } from "zustand";
import { createJSONStorage, persist, type StateStorage } from "zustand/middleware";
import {
  addCartItem,
  clearBackendCart,
  createCart,
  getOrCreateCart,
  normalizeBackendCart,
  removeCartItem,
  seedCartFromLocalItems,
  type StorefrontCartItem,
  updateCartItemQuantity,
} from "../services/cartApi";

type SyncStatus = "idle" | "syncing" | "error";

interface CartSnapshot {
  items: StorefrontCartItem[];
  backendCartId: string | null;
}

export interface CartStoreState {
  items: StorefrontCartItem[];
  backendCartId: string | null;
  isOpen: boolean;
  isHydrating: boolean;
  isSyncing: boolean;
  syncStatus: SyncStatus;
  syncError: string | null;
  count: number;
  total: number;
  fetchCart: () => Promise<void>;
  addToCart: (item: StorefrontCartItem) => Promise<void>;
  removeFromCart: (item: Pick<StorefrontCartItem, "id" | "variantId">) => Promise<void>;
  updateQuantity: (item: Pick<StorefrontCartItem, "id" | "variantId"> & { quantity: number }) => Promise<void>;
  clearCart: () => Promise<void>;
  toggleCart: (open?: boolean) => void;
  dispatch: (action: { type: string; payload?: any }) => void;
}

const noopStorage: StateStorage = {
  getItem: () => null,
  setItem: () => undefined,
  removeItem: () => undefined,
};

const storage = createJSONStorage<CartStoreState>(() =>
  typeof window === "undefined" ? noopStorage : window.localStorage,
);

function cartItemKey(item: Pick<StorefrontCartItem, "id" | "variantId">) {
  return `${item.id}__${item.variantId ?? "default"}`;
}

function countItems(items: StorefrontCartItem[]) {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}

function totalItems(items: StorefrontCartItem[]) {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function withDerived(partial: Partial<CartStoreState>) {
  const items = partial.items;
  if (!items) return partial;
  return {
    ...partial,
    count: countItems(items),
    total: totalItems(items),
  };
}

function optimisticAdd(items: StorefrontCartItem[], item: StorefrontCartItem) {
  const key = cartItemKey(item);
  const existing = items.find((candidate) => cartItemKey(candidate) === key);
  if (!existing) {
    return [...items, { ...item, quantity: item.quantity ?? 1 }];
  }

  return items.map((candidate) =>
    cartItemKey(candidate) === key
      ? { ...candidate, quantity: candidate.quantity + (item.quantity ?? 1) }
      : candidate,
  );
}

function snapshot(state: CartStoreState): CartSnapshot {
  return {
    items: state.items,
    backendCartId: state.backendCartId,
  };
}

function rollback(error: unknown, previous: CartSnapshot) {
  return withDerived({
    ...previous,
    isHydrating: false,
    isSyncing: false,
    syncStatus: "error",
    syncError: error instanceof Error ? error.message : "Cart sync failed",
  });
}

export const useCartStore = create<CartStoreState>()(
  persist(
    (set, get) => ({
      items: [],
      backendCartId: null,
      isOpen: false,
      isHydrating: true,
      isSyncing: false,
      syncStatus: "idle",
      syncError: null,
      count: 0,
      total: 0,

      fetchCart: async () => {
        const local = snapshot(get());
        set({ isHydrating: true, syncError: null });

        try {
          const backendCart = await getOrCreateCart(local.backendCartId);
          let authoritativeCart = backendCart;

          if (backendCart.items.length === 0 && local.items.length > 0 && backendCart.id !== local.backendCartId) {
            authoritativeCart = await seedCartFromLocalItems(backendCart.id, local.items);
          }

          const normalized = normalizeBackendCart(authoritativeCart);
          set(withDerived({
            ...normalized,
            isHydrating: false,
            isSyncing: false,
            syncStatus: "idle",
            syncError: null,
          }));
        } catch (error) {
          set({
            isHydrating: false,
            isSyncing: false,
            syncStatus: "error",
            syncError: error instanceof Error ? error.message : "Unable to restore cart",
          });
        }
      },

      addToCart: async (item) => {
        const previous = snapshot(get());
        const optimisticItems = optimisticAdd(previous.items, item);
        set(withDerived({
          items: optimisticItems,
          isSyncing: true,
          syncStatus: "syncing",
          syncError: null,
        }));

        try {
          const backendCart = await getOrCreateCart(previous.backendCartId);
          const updatedCart = await addCartItem(backendCart.id, item);
          set(withDerived({
            ...normalizeBackendCart(updatedCart),
            isHydrating: false,
            isSyncing: false,
            syncStatus: "idle",
            syncError: null,
          }));
        } catch (error) {
          set(rollback(error, previous));
        }
      },

      removeFromCart: async (item) => {
        const previous = snapshot(get());
        const target = previous.items.find((candidate) => cartItemKey(candidate) === cartItemKey(item));
        const optimisticItems = previous.items.filter((candidate) => cartItemKey(candidate) !== cartItemKey(item));

        set(withDerived({
          items: optimisticItems,
          isSyncing: true,
          syncStatus: "syncing",
          syncError: null,
        }));

        try {
          if (!previous.backendCartId || !target?.backendLineId) {
            const backendCart = await createCart();
            set(withDerived({
              ...normalizeBackendCart(backendCart),
              isHydrating: false,
              isSyncing: false,
              syncStatus: "idle",
              syncError: null,
            }));
            return;
          }

          const updatedCart = await removeCartItem(previous.backendCartId, target.backendLineId);
          set(withDerived({
            ...normalizeBackendCart(updatedCart),
            isHydrating: false,
            isSyncing: false,
            syncStatus: "idle",
            syncError: null,
          }));
        } catch (error) {
          set(rollback(error, previous));
        }
      },

      updateQuantity: async (item) => {
        if (item.quantity <= 0) {
          await get().removeFromCart(item);
          return;
        }

        const previous = snapshot(get());
        const target = previous.items.find((candidate) => cartItemKey(candidate) === cartItemKey(item));
        const optimisticItems = previous.items.map((candidate) =>
          cartItemKey(candidate) === cartItemKey(item)
            ? { ...candidate, quantity: item.quantity }
            : candidate,
        );

        set(withDerived({
          items: optimisticItems,
          isSyncing: true,
          syncStatus: "syncing",
          syncError: null,
        }));

        try {
          if (!previous.backendCartId || !target?.backendLineId) {
            await get().fetchCart();
            return;
          }

          const updatedCart = await updateCartItemQuantity(previous.backendCartId, target.backendLineId, item.quantity);
          set(withDerived({
            ...normalizeBackendCart(updatedCart),
            isHydrating: false,
            isSyncing: false,
            syncStatus: "idle",
            syncError: null,
          }));
        } catch (error) {
          set(rollback(error, previous));
        }
      },

      clearCart: async () => {
        const previous = snapshot(get());
        set(withDerived({
          items: [],
          isSyncing: true,
          syncStatus: "syncing",
          syncError: null,
        }));

        try {
          if (!previous.backendCartId) {
            const backendCart = await createCart();
            set(withDerived({
              ...normalizeBackendCart(backendCart),
              isHydrating: false,
              isSyncing: false,
              syncStatus: "idle",
              syncError: null,
            }));
            return;
          }

          const updatedCart = await clearBackendCart(previous.backendCartId, previous.items);
          set(withDerived({
            ...normalizeBackendCart(updatedCart),
            isHydrating: false,
            isSyncing: false,
            syncStatus: "idle",
            syncError: null,
          }));
        } catch (error) {
          set(rollback(error, previous));
        }
      },

      toggleCart: (open) => set((state) => ({ isOpen: open ?? !state.isOpen })),

      dispatch: (action) => {
        const state = get();
        if (action.type === "ADD_ITEM") void state.addToCart(action.payload);
        else if (action.type === "REMOVE_ITEM") void state.removeFromCart(action.payload);
        else if (action.type === "UPDATE_QTY") void state.updateQuantity(action.payload);
        else if (action.type === "CLEAR") void state.clearCart();
        else if (action.type === "TOGGLE_CART") state.toggleCart(action.payload);
      },
    }),
    {
      name: "commit-conquer-cart",
      storage,
      partialize: (state) => ({
        items: state.items,
        backendCartId: state.backendCartId,
        count: state.count,
        total: state.total,
      }) as CartStoreState,
      onRehydrateStorage: () => (state) => {
        if (!state) return;
        const derived = withDerived({
          items: state.items ?? [],
          isHydrating: true,
          isSyncing: false,
          syncStatus: "idle",
          syncError: null,
        });
        useCartStore.setState(derived);
      },
    },
  ),
);

export const selectCartState = (state: CartStoreState) => ({
  items: state.items,
  backendCartId: state.backendCartId,
  isOpen: state.isOpen,
  isHydrating: state.isHydrating,
  isSyncing: state.isSyncing,
  syncStatus: state.syncStatus,
  syncError: state.syncError,
  count: state.count,
  total: state.total,
});
