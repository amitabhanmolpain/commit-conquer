import { Link, useNavigate } from "react-router-dom";
import { useCart, useCartActions } from "../hooks/useCart";

const fmt = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);

const cartKey = (item: any) => `${item.id}__${item.variantId ?? "default"}`;

export default function CartPage() {
  const cart = useCart();
  const { clearCart, removeFromCart, updateQuantity: setCartQuantity } = useCartActions();
  const navigate = useNavigate();

  const shipping = cart.total >= 100 || cart.count === 0 ? 0 : 8.95;
  const tax = cart.total * 0.08;
  const orderTotal = cart.total + shipping + tax;
  const isRestoring = cart.isHydrating && cart.items.length === 0;

  const updateQty = (item: any, quantity: number) => {
    void setCartQuantity({ id: item.id, variantId: item.variantId, quantity });
  };

  const removeItem = (item: any) => {
    void removeFromCart({ id: item.id, variantId: item.variantId });
  };

  return (
    <>
      <style>{css}</style>
      <div className="cart-page">
        <section className="cart-head">
          <div>
            <p className="cart-kicker">Shopping Cart</p>
            <h1>Your Cart</h1>
          </div>
          <Link to="/" className="cart-link">
            Continue Shopping
          </Link>
        </section>

        {cart.isSyncing && (
          <div className="sync-strip">
            <span className="sync-pulse" />
            Syncing cart
          </div>
        )}

        {cart.syncError && (
          <div className="sync-strip sync-error">
            Cart changes are saved locally. Backend sync will retry on your next cart action.
          </div>
        )}

        {isRestoring ? (
          <section className="cart-items cart-skeleton" aria-label="Restoring cart">
            <div className="cart-items-head">
              <span>Restoring cart</span>
            </div>
            {[0, 1, 2].map((item) => (
              <div className="cart-row skeleton-row" key={item}>
                <span className="sk sk-img" />
                <span className="sk sk-body" />
                <span className="sk sk-price" />
              </div>
            ))}
          </section>
        ) : cart.items.length === 0 ? (
          <section className="cart-empty">
            <div className="empty-icon" aria-hidden="true">
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <path d="M3 6h18" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
            </div>
            <h2>Your cart is empty</h2>
            <p>Build a stack from the collection, then come back here to check out.</p>
            <Link to="/" className="primary-action">
              Shop Products
            </Link>
          </section>
        ) : (
          <div className="cart-layout">
            <section className="cart-items" aria-label="Cart items">
              <div className="cart-items-head">
                <span>{cart.count} item{cart.count === 1 ? "" : "s"}</span>
                <button onClick={() => void clearCart()} className="text-action">
                  Clear Cart
                </button>
              </div>

              {cart.items.map((item: any) => (
                <article className="cart-row" key={cartKey(item)}>
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    onError={(event) => {
                      event.currentTarget.src = "https://placehold.co/160x192?text=img";
                    }}
                  />
                  <div className="row-main">
                    <div>
                      <h2>{item.title}</h2>
                      <div className="row-meta">
                        {item.size && <span>Size {item.size}</span>}
                        {item.color && <span>Color {item.color}</span>}
                        {!item.size && !item.color && <span>Standard</span>}
                      </div>
                    </div>
                    <button onClick={() => removeItem(item)} className="remove-action">
                      Remove
                    </button>
                  </div>
                  <div className="row-controls">
                    <div className="qty-control" aria-label={`Quantity for ${item.title}`}>
                      <button onClick={() => updateQty(item, item.quantity - 1)} aria-label="Decrease quantity">
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQty(item, item.quantity + 1)} aria-label="Increase quantity">
                        +
                      </button>
                    </div>
                    <strong>{fmt((item.price ?? 0) * item.quantity)}</strong>
                  </div>
                </article>
              ))}
            </section>

            <aside className="cart-summary" aria-label="Order summary">
              <h2>Order Summary</h2>
              <div className="summary-lines">
                <div>
                  <span>Subtotal</span>
                  <strong>{fmt(cart.total)}</strong>
                </div>
                <div>
                  <span>Shipping</span>
                  <strong>{shipping === 0 ? "Free" : fmt(shipping)}</strong>
                </div>
                <div>
                  <span>Estimated tax</span>
                  <strong>{fmt(tax)}</strong>
                </div>
              </div>
              <div className="summary-total">
                <span>Total</span>
                <strong>{fmt(orderTotal)}</strong>
              </div>
              <button onClick={() => navigate("/checkout")} className="primary-action">
                Checkout
              </button>
              <p className="summary-note">Shipping and discounts can be finalized at checkout.</p>
            </aside>
          </div>
        )}
      </div>
    </>
  );
}

const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Syne:wght@400;500;600;700;800&display=swap');

  .cart-page {
    width: min(1180px, calc(100% - 48px));
    margin: 0 auto;
    padding: 56px 0 80px;
    font-family: 'Syne', sans-serif;
  }

  .cart-head {
    display: flex;
    align-items: end;
    justify-content: space-between;
    gap: 20px;
    margin-bottom: 28px;
  }

  .cart-kicker {
    margin: 0 0 8px;
    color: #7c6aff;
    font-family: 'DM Mono', monospace;
    font-size: 12px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  .cart-head h1 {
    margin: 0;
    color: #e8e8f0;
    font-size: clamp(34px, 5vw, 58px);
    line-height: 1;
  }

  .cart-link,
  .text-action,
  .remove-action {
    color: #9999aa;
    background: transparent;
    border: 0;
    cursor: pointer;
    font: inherit;
    text-decoration: none;
  }

  .cart-link:hover,
  .text-action:hover,
  .remove-action:hover {
    color: #7c6aff;
  }

  .cart-layout {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 360px;
    gap: 24px;
    align-items: start;
  }

  .sync-strip {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 18px;
    padding: 8px 12px;
    border: 1px solid rgba(124, 106, 255, 0.22);
    border-radius: 8px;
    background: rgba(124, 106, 255, 0.1);
    color: #9999aa;
    font-family: 'DM Mono', monospace;
    font-size: 12px;
  }

  .sync-error {
    border-color: rgba(255, 92, 92, 0.28);
    background: rgba(255, 92, 92, 0.1);
    color: #ff9b9b;
  }

  .sync-pulse {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #7c6aff;
    animation: pulse 1s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 0.35; transform: scale(0.85); }
    50% { opacity: 1; transform: scale(1); }
  }

  .cart-items,
  .cart-summary,
  .cart-empty {
    background: #141417;
    border: 1px solid #2a2a31;
    border-radius: 8px;
  }

  .cart-items-head {
    display: flex;
    justify-content: space-between;
    padding: 18px 20px;
    border-bottom: 1px solid #2a2a31;
    color: #9999aa;
    font-family: 'DM Mono', monospace;
    font-size: 12px;
  }

  .cart-row {
    display: grid;
    grid-template-columns: 112px minmax(0, 1fr) auto;
    gap: 18px;
    padding: 20px;
    border-bottom: 1px solid #1c1c21;
  }

  .cart-row:last-child {
    border-bottom: 0;
  }

  .cart-skeleton {
    overflow: hidden;
  }

  .skeleton-row {
    align-items: center;
  }

  .sk {
    display: block;
    border-radius: 6px;
    background: linear-gradient(90deg, #1c1c21 0%, #24242b 50%, #1c1c21 100%);
    background-size: 220% 100%;
    animation: shimmer 1.2s ease-in-out infinite;
  }

  .sk-img {
    width: 112px;
    height: 136px;
  }

  .sk-body {
    height: 74px;
  }

  .sk-price {
    width: 108px;
    height: 34px;
  }

  @keyframes shimmer {
    from { background-position: 100% 0; }
    to { background-position: -100% 0; }
  }

  .cart-row img {
    width: 112px;
    height: 136px;
    object-fit: cover;
    border-radius: 6px;
    background: #0c0c0e;
  }

  .row-main {
    min-width: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 18px;
  }

  .row-main h2,
  .cart-summary h2,
  .cart-empty h2 {
    margin: 0;
    color: #e8e8f0;
  }

  .row-main h2 {
    font-size: 18px;
  }

  .row-meta {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    margin-top: 8px;
    color: #6b6b80;
    font-family: 'DM Mono', monospace;
    font-size: 12px;
  }

  .row-controls {
    min-width: 132px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-between;
    gap: 18px;
  }

  .row-controls strong {
    color: #3ddc97;
    font-family: 'DM Mono', monospace;
    font-size: 15px;
  }

  .qty-control {
    display: grid;
    grid-template-columns: 32px 38px 32px;
    height: 34px;
    border: 1px solid #2a2a31;
    border-radius: 6px;
    overflow: hidden;
  }

  .qty-control button,
  .qty-control span {
    display: flex;
    align-items: center;
    justify-content: center;
    background: #1c1c21;
    color: #e8e8f0;
    border: 0;
    font-family: 'DM Mono', monospace;
  }

  .qty-control button {
    cursor: pointer;
  }

  .qty-control button:hover {
    background: rgba(124, 106, 255, 0.18);
    color: #7c6aff;
  }

  .cart-summary {
    position: sticky;
    top: 84px;
    padding: 22px;
  }

  .cart-summary h2 {
    font-size: 18px;
    margin-bottom: 22px;
  }

  .summary-lines {
    display: grid;
    gap: 12px;
    padding-bottom: 18px;
    border-bottom: 1px solid #2a2a31;
  }

  .summary-lines div,
  .summary-total {
    display: flex;
    justify-content: space-between;
    gap: 16px;
    color: #9999aa;
    font-family: 'DM Mono', monospace;
    font-size: 13px;
  }

  .summary-lines strong {
    color: #e8e8f0;
  }

  .summary-total {
    padding: 18px 0;
    align-items: center;
    color: #e8e8f0;
    font-family: 'Syne', sans-serif;
    font-size: 16px;
    font-weight: 800;
  }

  .summary-total strong {
    font-family: 'DM Mono', monospace;
    font-size: 22px;
  }

  .primary-action {
    width: 100%;
    min-height: 46px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: 0;
    border-radius: 8px;
    background: linear-gradient(135deg, #7c6aff 0%, #9b88ff 100%);
    color: #fff;
    cursor: pointer;
    font: 800 14px 'Syne', sans-serif;
    text-decoration: none;
    box-shadow: 0 12px 28px rgba(124, 106, 255, 0.24);
  }

  .primary-action:hover {
    filter: brightness(1.06);
  }

  .summary-note {
    margin: 14px 0 0;
    color: #6b6b80;
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    line-height: 1.6;
    text-align: center;
  }

  .cart-empty {
    min-height: 420px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 48px 20px;
  }

  .empty-icon {
    width: 68px;
    height: 68px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 18px;
    border-radius: 8px;
    background: rgba(124, 106, 255, 0.12);
    color: #7c6aff;
    border: 1px solid rgba(124, 106, 255, 0.24);
  }

  .cart-empty h2 {
    font-size: 24px;
  }

  .cart-empty p {
    max-width: 420px;
    margin: 10px 0 24px;
    color: #9999aa;
    line-height: 1.6;
  }

  .cart-empty .primary-action {
    width: auto;
    padding: 0 24px;
  }

  @media (max-width: 860px) {
    .cart-page {
      width: min(100% - 32px, 680px);
      padding-top: 36px;
    }

    .cart-head {
      align-items: start;
      flex-direction: column;
    }

    .cart-layout {
      grid-template-columns: 1fr;
    }

    .cart-summary {
      position: static;
    }
  }

  @media (max-width: 560px) {
    .cart-row {
      grid-template-columns: 84px minmax(0, 1fr);
    }

    .cart-row img {
      width: 84px;
      height: 104px;
    }

    .row-controls {
      grid-column: 1 / -1;
      min-width: 0;
      flex-direction: row;
      align-items: center;
    }
  }
`;
