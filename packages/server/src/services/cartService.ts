export interface CartItem {
  id: string;
  product_id: string;
  variant_id: string;
  title: string;
  variant_title?: string;
  thumbnail?: string;
  price: number;
  quantity: number;
}

export interface Cart {
  id: string;
  items: CartItem[];
  subtotal: number;
  shipping_total: number;
  tax_total: number;
  total: number;
  discount_amount: number;
  created_at: string;
  updated_at: string;
}

export class CartService {
  private carts: Map<string, Cart> = new Map();

  constructor() {
    // Initialize cart service
  }

  /**
   * Create a new empty cart
   */
  createCart(): Cart {
    const cartId = `cart_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const now = new Date().toISOString();

    const cart: Cart = {
      id: cartId,
      items: [],
      subtotal: 0,
      shipping_total: 0,
      tax_total: 0,
      total: 0,
      discount_amount: 0,
      created_at: now,
      updated_at: now,
    };

    this.carts.set(cartId, cart);
    return cart;
  }

  /**
   * Get cart by ID
   */
  getCart(cartId: string): Cart | null {
    return this.carts.get(cartId) || null;
  }

  /**
   * Add item to cart
   */
  addItemToCart(cartId: string, item: CartItem): Cart {
    const cart = this.carts.get(cartId);
    if (!cart) {
      throw new Error('Cart not found');
    }

    // Check if item already exists
    const existingItem = cart.items.find(
      (i) => i.product_id === item.product_id && i.variant_id === item.variant_id
    );

    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      cart.items.push({
        ...item,
        id: `line_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      });
    }

    this.recalculateCart(cart);
    cart.updated_at = new Date().toISOString();

    return cart;
  }

  /**
   * Remove item from cart
   */
  removeItemFromCart(cartId: string, lineId: string): Cart {
    const cart = this.carts.get(cartId);
    if (!cart) {
      throw new Error('Cart not found');
    }

    const itemIndex = cart.items.findIndex((i) => i.id === lineId);
    if (itemIndex === -1) {
      throw new Error('Item not found in cart');
    }

    cart.items.splice(itemIndex, 1);
    this.recalculateCart(cart);
    cart.updated_at = new Date().toISOString();

    return cart;
  }

  /**
   * Update item quantity in cart
   */
  updateItemQuantity(cartId: string, lineId: string, quantity: number): Cart {
    const cart = this.carts.get(cartId);
    if (!cart) {
      throw new Error('Cart not found');
    }

    if (quantity <= 0) {
      return this.removeItemFromCart(cartId, lineId);
    }

    const item = cart.items.find((i) => i.id === lineId);
    if (!item) {
      throw new Error('Item not found in cart');
    }

    item.quantity = quantity;
    this.recalculateCart(cart);
    cart.updated_at = new Date().toISOString();

    return cart;
  }

  /**
   * Clear all items from cart
   */
  clearCart(cartId: string): Cart {
    const cart = this.carts.get(cartId);
    if (!cart) {
      throw new Error('Cart not found');
    }

    cart.items = [];
    this.recalculateCart(cart);
    cart.updated_at = new Date().toISOString();

    return cart;
  }

  /**
   * Seed cart from local items (for migration from localStorage)
   */
  seedCartFromItems(cartId: string, items: CartItem[]): Cart {
    const cart = this.carts.get(cartId);
    if (!cart) {
      throw new Error('Cart not found');
    }

    // Clear existing items
    cart.items = [];

    // Add items
    for (const item of items) {
      cart.items.push({
        ...item,
        id: `line_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      });
    }

    this.recalculateCart(cart);
    cart.updated_at = new Date().toISOString();

    return cart;
  }

  /**
   * Recalculate cart totals
   */
  private recalculateCart(cart: Cart): void {
    cart.subtotal = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    cart.shipping_total = 0; // Will be calculated later based on rules
    cart.tax_total = 0; // Will be calculated later based on rules
    cart.total = cart.subtotal + cart.shipping_total + cart.tax_total - cart.discount_amount;
  }
}
