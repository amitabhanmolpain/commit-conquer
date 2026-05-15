const API = "/api/store";

export interface BackendCartItem {
  id: string;
  product_id: string;
  variant_id: string;
  title: string;
  variant_title?: string;
  thumbnail?: string;
  price: number;
  quantity: number;
}

export interface BackendCart {
  id: string;
  items: BackendCartItem[];
  subtotal: number;
  shipping_total: number;
  tax_total: number;
  total: number;
  discount_amount: number;
}

export interface StorefrontCartItem {
  id: string;
  variantId?: string;
  backendLineId?: string;
  title: string;
  size?: string;
  color?: string;
  thumbnail?: string;
  price: number;
  quantity: number;
}

interface ProductVariant {
  id: string;
  inventory_quantity: number;
}

interface ProductResponse {
  product?: {
    variants?: ProductVariant[];
  };
}

async function apiJson<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers ?? {}),
    },
    ...options,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const error = new Error(data?.error?.message ?? `Cart request failed (${response.status})`);
    (error as Error & { status?: number }).status = response.status;
    throw error;
  }

  return data as T;
}

export function normalizeBackendCart(cart: BackendCart) {
  return {
    backendCartId: cart.id,
    items: cart.items.map((item): StorefrontCartItem => ({
      id: item.product_id,
      variantId: item.variant_id,
      backendLineId: item.id,
      title: item.title,
      size: item.variant_title,
      thumbnail: item.thumbnail,
      price: item.price / 100,
      quantity: item.quantity,
    })),
  };
}

export async function createCart(): Promise<BackendCart> {
  const data = await apiJson<{ cart: BackendCart }>("/carts", {
    method: "POST",
    body: JSON.stringify({}),
  });
  return data.cart;
}

export async function getCart(cartId: string): Promise<BackendCart> {
  const data = await apiJson<{ cart: BackendCart }>(`/carts/${cartId}`);
  return data.cart;
}

export async function getOrCreateCart(cartId?: string | null): Promise<BackendCart> {
  if (cartId) {
    try {
      return await getCart(cartId);
    } catch (error) {
      if ((error as Error & { status?: number }).status !== 404) throw error;
    }
  }
  return createCart();
}

export async function resolveVariantId(item: StorefrontCartItem): Promise<string> {
  if (item.variantId && item.variantId !== "default") return item.variantId;

  const data = await apiJson<ProductResponse>(`/products/${item.id}`);
  const variant =
    data.product?.variants?.find((candidate) => candidate.inventory_quantity > 0) ??
    data.product?.variants?.[0];

  if (!variant?.id) {
    throw new Error("No purchasable variant found for this product");
  }

  return variant.id;
}

export async function addCartItem(
  cartId: string,
  item: StorefrontCartItem,
): Promise<BackendCart> {
  const variantId = await resolveVariantId(item);
  const data = await apiJson<{ cart: BackendCart }>(`/carts/${cartId}/items`, {
    method: "POST",
    body: JSON.stringify({
      product_id: item.id,
      variant_id: variantId,
      quantity: item.quantity ?? 1,
    }),
  });
  return data.cart;
}

export async function removeCartItem(cartId: string, backendLineId: string): Promise<BackendCart> {
  const data = await apiJson<{ cart: BackendCart }>(`/carts/${cartId}/items/${backendLineId}`, {
    method: "DELETE",
  });
  return data.cart;
}

export async function updateCartItemQuantity(
  cartId: string,
  backendLineId: string,
  quantity: number,
): Promise<BackendCart> {
  const data = await apiJson<{ cart: BackendCart }>(`/carts/${cartId}/items/${backendLineId}`, {
    method: "PATCH",
    body: JSON.stringify({ quantity }),
  });
  return data.cart;
}

export async function seedCartFromLocalItems(
  cartId: string,
  items: StorefrontCartItem[],
): Promise<BackendCart> {
  let cart = await getCart(cartId);

  for (const item of items) {
    try {
      cart = await addCartItem(cartId, item);
    } catch {
      // Ignore stale local items that the backend no longer accepts.
    }
  }

  return cart;
}

export async function clearBackendCart(cartId: string, items: StorefrontCartItem[]): Promise<BackendCart> {
  let cart = await getCart(cartId);
  const lineIds = items.map((item) => item.backendLineId).filter(Boolean) as string[];

  for (const lineId of lineIds) {
    cart = await removeCartItem(cartId, lineId);
  }

  return cart;
}
