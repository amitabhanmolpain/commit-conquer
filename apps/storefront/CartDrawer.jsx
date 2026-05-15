

import { useCartState, useCartDispatch } from "./Layout";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function CartDrawer() {
  const cart     = useCartState();
  const dispatch = useCartDispatch();
  const navigate = useNavigate();
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
  }, []);

  const close = () => dispatch({ type: "TOGGLE_CART", payload: false });

  const goCheckout = () => {
    close();
    navigate("/checkout");
  };

  if (!cart) return null;

  const drawerStyle = theme === 'dark' ? s.drawer : s.drawerLight;
  const headStyle = theme === 'dark' ? s.head : s.headLight;
  const bodyStyle = theme === 'dark' ? s.body : s.bodyLight;
  const footStyle = theme === 'dark' ? s.foot : s.footLight;
  const emptyStyle = theme === 'dark' ? s.empty : s.emptyLight;

  return (
    <>
      {cart.isOpen && (
        <div onClick={close} style={s.backdrop} />
      )}
      <aside style={{ ...drawerStyle, transform: cart.isOpen ? "translateX(0)" : "translateX(100%)" }}>
        <div style={headStyle}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: theme === 'dark' ? "#e8e8f0" : "#1a1a1e" }}>Cart ({cart.count})</h2>
          <button onClick={close} style={s.closeBtn} aria-label="Close">✕</button>
        </div>

        <div style={bodyStyle}>
          {cart.items.length === 0 ? (
            <div style={emptyStyle}>
              <p style={{ fontSize: 36 }}>🛒</p>
              <p style={{ color: theme === 'dark' ? "#666" : "#999", marginTop: 12 }}>Your cart is empty</p>
              <button onClick={close} style={s.ctaBtn}>Browse Products</button>
            </div>
          ) : (
            cart.items.map((item) => <CartItem key={`${item.id}__${item.variantId}`} item={item} theme={theme} />)
          )}
        </div>

        {cart.items.length > 0 && (
          <div style={footStyle}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
              <span style={{ color: theme === 'dark' ? "#aaa" : "#666", fontSize: 14 }}>Subtotal</span>
              <span style={{ fontWeight: 700, fontSize: 18, color: theme === 'dark' ? "#e8e8f0" : "#1a1a1e" }}>${cart.total.toFixed(2)}</span>
            </div>
            <p style={{ color: theme === 'dark' ? "#555" : "#999", fontSize: 12, marginBottom: 16, textAlign: "center" }}>
              Shipping &amp; taxes calculated at checkout
            </p>
            <button onClick={goCheckout} style={s.ctaBtn}>Checkout →</button>
            <button onClick={close} style={s.ghostBtn}>Continue Shopping</button>
          </div>
        )}
      </aside>
      <style>{`@keyframes fadeIn{from{opacity:0}to{opacity:1}}`}</style>
    </>
  );
}

function CartItem({ item, theme }) {
  const dispatch = useCartDispatch();
  const key = { id: item.id, variantId: item.variantId };
  const itemStyle = theme === 'dark' ? s.item : s.itemLight;

  return (
    <div style={itemStyle}>
      <img src={item.thumbnail} alt={item.title} style={s.thumb}
        onError={(e) => { e.target.src = "https://placehold.co/80x96?text=img"; }} />
      <div style={{ flex: 1 }}>
        <p style={{ fontWeight: 600, fontSize: 14, marginBottom: 2, color: theme === 'dark' ? "#e8e8f0" : "#1a1a1e" }}>{item.title}</p>
        {item.size  && <p style={{ ...s.meta, color: theme === 'dark' ? "#888" : "#666" }}>Size: {item.size}</p>}
        {item.color && <p style={{ ...s.meta, color: theme === 'dark' ? "#888" : "#666" }}>Color: {item.color}</p>}
        <p style={{ fontWeight: 700, fontSize: 14, marginTop: 4, color: theme === 'dark' ? "#e8e8f0" : "#1a1a1e" }}>
          ${(item.price * item.quantity).toFixed(2)}
        </p>
        <div style={s.qtyRow}>
          <button style={theme === 'dark' ? s.qtyBtn : s.qtyBtnLight} onClick={() => dispatch({ type: "UPDATE_QTY", payload: { ...key, quantity: item.quantity - 1 } })}>−</button>
          <span style={{ minWidth: 20, textAlign: "center", fontSize: 14, fontWeight: 600, color: theme === 'dark' ? "#e8e8f0" : "#1a1a1e" }}>{item.quantity}</span>
          <button style={theme === 'dark' ? s.qtyBtn : s.qtyBtnLight} onClick={() => dispatch({ type: "UPDATE_QTY", payload: { ...key, quantity: item.quantity + 1 } })}>+</button>
          <button style={theme === 'dark' ? s.removeBtn : s.removeBtnLight} onClick={() => dispatch({ type: "REMOVE_ITEM", payload: key })}>Remove</button>
        </div>
      </div>
    </div>
  );
}

const s = {
  backdrop: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 200, animation: "fadeIn 0.2s ease" },
  drawer: {
    position: "fixed", top: 0, right: 0, bottom: 0,
    width: "min(420px,100vw)", background: "#141417",
    zIndex: 300, display: "flex", flexDirection: "column",
    boxShadow: "-8px 0 40px rgba(0,0,0,0.5)",
    transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1)",
    borderLeft: "1px solid #2a2a31",
  },
  drawerLight: {
    position: "fixed", top: 0, right: 0, bottom: 0,
    width: "min(420px,100vw)", 
    background: "linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(250,251,252,0.95) 100%)",
    zIndex: 300, display: "flex", flexDirection: "column",
    boxShadow: "-12px 0 48px rgba(0,0,0,0.12), -2px 0 8px rgba(124,106,255,0.08)",
    transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1)",
    borderLeft: "1px solid rgba(124,106,255,0.15)",
  },
  head: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 24px", borderBottom: "1px solid #2a2a31" },
  headLight: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 24px", borderBottom: "1px solid rgba(124,106,255,0.12)", background: "rgba(255,255,255,0.7)" },
  closeBtn: { background: "none", border: "none", cursor: "pointer", color: "#888", fontSize: 18, padding: 4, transition: "all 0.2s ease" },
  body: { flex: 1, overflowY: "auto", padding: "12px 0" },
  bodyLight: { flex: 1, overflowY: "auto", padding: "12px 0", background: "transparent" },
  empty: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", textAlign: "center" },
  emptyLight: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", textAlign: "center", color: "#1a1a1e" },
  item: { display: "flex", gap: 12, padding: "16px 24px", borderBottom: "1px solid #1c1c21" },
  itemLight: { display: "flex", gap: 12, padding: "16px 24px", borderBottom: "1px solid rgba(124,106,255,0.1)", transition: "all 0.2s ease" },
  thumb: { width: 80, height: 96, objectFit: "cover", borderRadius: 6 },
  meta: { fontSize: 12, marginTop: 4 },
  qtyRow: { display: "flex", gap: 8, alignItems: "center", marginTop: 8 },
  qtyBtn: { width: 24, height: 24, border: "1px solid #444", background: "none", color: "#aaa", borderRadius: 2, cursor: "pointer", fontSize: 12 },
  qtyBtnLight: { 
    width: 24, height: 24, 
    border: "1px solid rgba(124,106,255,0.25)", 
    background: "rgba(124,106,255,0.06)",
    color: "#7c6aff", 
    borderRadius: 4, 
    cursor: "pointer", 
    fontSize: 12,
    transition: "all 0.2s ease",
    fontWeight: 600,
  },
  removeBtn: { fontSize: 11, background: "none", border: "none", color: "#888", cursor: "pointer", textDecoration: "underline" },
  removeBtnLight: { fontSize: 11, background: "none", border: "none", color: "#7c6aff", cursor: "pointer", textDecoration: "underline", transition: "opacity 0.2s ease" },
  foot: { padding: "24px", borderTop: "1px solid #2a2a31", background: "rgba(12,12,14,0.5)" },
  footLight: { 
    padding: "24px", 
    borderTop: "1px solid rgba(124,106,255,0.12)", 
    background: "rgba(255,255,255,0.6)",
    backdropFilter: "blur(8px)",
  },
  ctaBtn: {
    width: "100%", padding: "12px 16px", 
    background: "linear-gradient(135deg, #7c6aff 0%, #9b88ff 100%)", 
    color: "#fff", border: "none",
    borderRadius: 8, fontWeight: 600, cursor: "pointer", marginBottom: 8, 
    transition: "all 0.2s ease",
    boxShadow: "0 4px 12px rgba(124,106,255,0.25)",
  },
  ghostBtn: {
    width: "100%", padding: "12px 16px", 
    background: "rgba(124,106,255,0.08)", 
    color: "#7c6aff", 
    border: "1px solid rgba(124,106,255,0.2)",
    borderRadius: 8, fontWeight: 600, cursor: "pointer", transition: "all 0.2s ease",
  },
};