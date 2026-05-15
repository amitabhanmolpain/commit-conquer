import { Request, Response, NextFunction } from 'express';
import { CartService, CartItem } from '../services/cartService';

export class CartController {
  private cartService: CartService;

  constructor(cartService: CartService) {
    this.cartService = cartService;
  }

  /**
   * Create a new cart
   * POST /api/store/carts
   */
  createCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cart = this.cartService.createCart();
      res.status(201).json({ cart });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Get cart by ID
   * GET /api/store/carts/:cartId
   */
  getCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cartId = Array.isArray(req.params.cartId) ? req.params.cartId[0] : req.params.cartId;
      const cart = this.cartService.getCart(cartId);

      if (!cart) {
        // If cart doesn't exist, create a new one
        const newCart = this.cartService.createCart();
        return res.json({ cart: newCart });
      }

      res.json({ cart });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Add item to cart
   * POST /api/store/carts/:cartId/items
   */
  addItemToCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cartId = Array.isArray(req.params.cartId) ? req.params.cartId[0] : req.params.cartId;
      const item: CartItem = req.body;

      const cart = this.cartService.addItemToCart(cartId, item);
      res.json({ cart });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Remove item from cart
   * DELETE /api/store/carts/:cartId/items/:lineId
   */
  removeItemFromCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cartId = Array.isArray(req.params.cartId) ? req.params.cartId[0] : req.params.cartId;
      const lineId = Array.isArray(req.params.lineId) ? req.params.lineId[0] : req.params.lineId;
      const cart = this.cartService.removeItemFromCart(cartId, lineId);
      res.json({ cart });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Update item quantity in cart
   * PATCH /api/store/carts/:cartId/items/:lineId
   */
  updateItemQuantity = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cartId = Array.isArray(req.params.cartId) ? req.params.cartId[0] : req.params.cartId;
      const lineId = Array.isArray(req.params.lineId) ? req.params.lineId[0] : req.params.lineId;
      const { quantity } = req.body;

      if (typeof quantity !== 'number' || quantity < 0) {
        return res.status(400).json({ error: { message: 'Invalid quantity' } });
      }

      const cart = this.cartService.updateItemQuantity(cartId, lineId, quantity);
      res.json({ cart });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Clear cart
   * DELETE /api/store/carts/:cartId
   */
  clearCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cartId = Array.isArray(req.params.cartId) ? req.params.cartId[0] : req.params.cartId;
      const cart = this.cartService.clearCart(cartId);
      res.json({ cart });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Seed cart from local items
   * POST /api/store/carts/:cartId/seed
   */
  seedCartFromItems = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cartId = Array.isArray(req.params.cartId) ? req.params.cartId[0] : req.params.cartId;
      const { items } = req.body;

      if (!Array.isArray(items)) {
        return res.status(400).json({ error: { message: 'Items must be an array' } });
      }

      const cart = this.cartService.seedCartFromItems(cartId, items);
      res.json({ cart });
    } catch (error) {
      next(error);
    }
  };
}
