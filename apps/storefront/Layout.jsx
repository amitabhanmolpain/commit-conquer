import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { Outlet, Link, NavLink, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";


const CartStateCtx    = createContext(null);
const CartDispatchCtx = createContext(null);

const API = "http://localhost:4000/api/store";

function CartProvider({ children }) {
  const qc = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);

  // Initialize or get cart_id from localStorage
  const [cartId, setCartId] = useState(() => localStorage.getItem("cart_id"));

  const { data: cartData, isLoading } = useQuery({
    queryKey: ["cart", cartId],
    queryFn: async () => {
      if (!cartId) return null;
      const res = await fetch(`${API}/carts/${cartId}`);
      if (!res.ok) {
        localStorage.removeItem("cart_id");
        setCartId(null);
        return null;
      }
      return (await res.json()).cart;
    },
    enabled: !!cartId,
    staleTime: 5000, // Small stale time to encourage sync across tabs
  });

  // Mutation to create a cart
  const createCart = useMutation({
    mutationFn: async () => {
      const res = await fetch(`${API}/carts`, { method: "POST", headers: { "Content-Type": "application/json" } });
      return (await res.json()).cart;
    },
    onSuccess: (newCart) => {
      localStorage.setItem("cart_id", newCart.id);
      setCartId(newCart.id);
      qc.setQueryData(["cart", newCart.id], newCart);
    },
  });

  // Mutation to add item
  const addItemMut = useMutation({
    mutationFn: async ({ id, variantId, quantity = 1 }) => {
      let activeCartId = cartId;
      if (!activeCartId) {
        const newCart = await createCart.mutateAsync();
        activeCartId = newCart.id;
      }
      
      let res = await fetch(`${API}/carts/${activeCartId}/items`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product_id: id, variant_id: variantId ?? "default", quantity }),
      });

      // If cart not found (e.g. server restart), create new and retry once
      if (res.status === 404) {
        const newCart = await createCart.mutateAsync();
        res = await fetch(`${API}/carts/${newCart.id}/items`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ product_id: id, variant_id: variantId ?? "default", quantity }),
        });
      }

      if (!res.ok) throw new Error("Failed to add item");
      return (await res.json()).cart;
    },
    onSuccess: (updatedCart) => {
      qc.setQueryData(["cart", cartId], updatedCart);
      qc.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  // Mutation to remove item
  const removeItemMut = useMutation({
    mutationFn: async ({ id }) => {
      const res = await fetch(`${API}/carts/${cartId}/items/${id}`, { method: "DELETE" });
      return (await res.json()).cart;
    },
    onSuccess: (updatedCart) => {
      qc.setQueryData(["cart", cartId], updatedCart);
    },
  });

  // Mutation to update quantity
  const updateQtyMut = useMutation({
    mutationFn: async ({ id, quantity }) => {
      const res = await fetch(`${API}/carts/${cartId}/items/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity }),
      });
      return (await res.json()).cart;
    },
    onSuccess: (updatedCart) => {
      qc.setQueryData(["cart", cartId], updatedCart);
    },
  });

  // Mutation to clear cart
  const clearCartMut = useMutation({
    mutationFn: async () => {
      const res = await fetch(`${API}/carts/${cartId}`, { method: "DELETE" });
      return (await res.json()).cart;
    },
    onSuccess: (updatedCart) => {
      qc.setQueryData(["cart", cartId], updatedCart);
    },
  });

  const state = useMemo(() => ({
    items: cartData?.items ?? [],
    total: cartData?.total ?? 0,
    count: cartData?.items.reduce((n, i) => n + i.quantity, 0) ?? 0,
    isOpen,
    isLoading,
    cart_id: cartId,
  }), [cartData, isOpen, isLoading, cartId]);

  const dispatch = useMemo(() => ({
    addItem: (item) => addItemMut.mutate(item),
    removeItem: (payload) => {
      // Find the line item ID by variantId
      const item = cartData?.items.find(i => i.variant_id === (payload.variantId ?? "default"));
      if (item) removeItemMut.mutate({ id: item.id });
    },
    updateQty: (payload) => {
      const item = cartData?.items.find(i => i.variant_id === (payload.variantId ?? "default"));
      if (item) updateQtyMut.mutate({ id: item.id, quantity: payload.quantity });
    },
    clearCart: () => clearCartMut.mutate(),
    toggleCart: (open) => setIsOpen(open ?? !isOpen),
  }), [addItemMut, removeItemMut, updateQtyMut, clearCartMut, isOpen, cartData]);

  return (
    <CartStateCtx.Provider value={state}>
      <CartDispatchCtx.Provider value={dispatch}>
        {children}
      </CartDispatchCtx.Provider>
    </CartStateCtx.Provider>
  );
}

export function useCartState()    { return useContext(CartStateCtx); }
export function useCartDispatch() { return useContext(CartDispatchCtx); }



function Header({ theme, onThemeToggle }) {
  const cart     = useCartState();
  const dispatch = useCartDispatch();
  const navigate = useNavigate();

  const navStyle = ({ isActive }) => ({
    textDecoration: "none",
    color: isActive ? "#7c6aff" : (theme === 'dark' ? "#999" : "#555"),
    fontSize: 14,
    fontWeight: isActive ? 600 : 500,
    transition: "all 0.2s ease",
    paddingBottom: isActive ? 2 : 0,
    borderBottom: isActive && theme === 'light' ? "2px solid #7c6aff" : "none",
  });

  const headerStyle = theme === 'dark' ? {
    position: "sticky", top: 0, zIndex: 100,
    display: "flex", alignItems: "center", gap: 24,
    padding: "0 32px", height: 60,
    background: "rgba(12,12,14,0.95)", backdropFilter: "blur(12px)",
    borderBottom: "1px solid rgba(42,42,49,0.5)",
  } : {
    position: "sticky", top: 0, zIndex: 100,
    display: "flex", alignItems: "center", gap: 24,
    padding: "0 32px", height: 60,
    background: "linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(250,251,252,0.95) 100%)", 
    backdropFilter: "blur(12px)",
    borderBottom: "1px solid rgba(124,106,255,0.12)",
    boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
  };

  const logoStyle = theme === 'dark' ? { fontWeight: 800, fontSize: 17, textDecoration: "none", color: "#e8e8f0", letterSpacing: "-0.5px", marginRight: "auto" } : { fontWeight: 800, fontSize: 17, textDecoration: "none", color: "#1a1a1e", letterSpacing: "-0.5px", marginRight: "auto" };

  return (
    <header style={headerStyle}>
      <Link to="/" style={logoStyle}>commit&amp;conquer</Link>

      <nav style={s.nav}>
        <NavLink to="/"           end style={navStyle}>Shop</NavLink>
        <NavLink to="/collections"    style={navStyle}>Collections</NavLink>
        <NavLink to="/about"          style={navStyle}>About</NavLink>
        <NavLink to="/account"        style={navStyle}>Account</NavLink>
        {/* Admin link — for hackathon convenience */}
        <NavLink to="/admin"          style={({ isActive }) => ({
          ...navStyle({ isActive }),
          background: isActive ? "rgba(124,106,255,0.15)" : (theme === 'dark' ? "rgba(255,255,255,0.05)" : "rgba(124,106,255,0.08)"),
          padding: "4px 10px", borderRadius: 6, fontSize: 13,
          transition: "all 0.2s ease",
        })}>Admin ↗</NavLink>
      </nav>

      <button
        onClick={onThemeToggle}
        style={{
          background: theme === 'dark' ? "rgba(255,255,255,0.05)" : "linear-gradient(135deg, rgba(124,106,255,0.08) 0%, rgba(124,106,255,0.12) 100%)",
          border: theme === 'dark' ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(124,106,255,0.25)",
          color: theme === 'dark' ? "#e8e8f0" : "#7c6aff",
          cursor: "pointer",
          padding: "6px 10px",
          borderRadius: 8,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
          position: "relative",
          overflow: "hidden",
          boxShadow: theme === 'light' ? "0 2px 8px rgba(124,106,255,0.1)" : "none",
        }}
        onMouseEnter={(e) => {
          e.target.style.background = theme === 'dark' 
            ? "rgba(255,255,255,0.1)" 
            : "linear-gradient(135deg, rgba(124,106,255,0.15) 0%, rgba(124,106,255,0.2) 100%)";
          e.target.style.transform = "scale(1.05)";
          e.target.style.boxShadow = theme === 'light' ? "0 4px 16px rgba(124,106,255,0.2)" : "0 2px 12px rgba(124,106,255,0.2)";
        }}
        onMouseLeave={(e) => {
          e.target.style.background = theme === 'dark' 
            ? "rgba(255,255,255,0.05)" 
            : "linear-gradient(135deg, rgba(124,106,255,0.08) 0%, rgba(124,106,255,0.12) 100%)";
          e.target.style.transform = "scale(1)";
          e.target.style.boxShadow = theme === 'light' ? "0 2px 8px rgba(124,106,255,0.1)" : "none";
        }}
        aria-label="Toggle theme"
        title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
      >
        {theme === 'dark' ? (
          // Sun Icon - for switching to light theme
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>
        ) : (
          // Moon Icon - for switching to dark theme
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        )}
      </button>

      <button
        onClick={() => dispatch({ type: "TOGGLE_CART", payload: true })}
        style={{
          position: "relative",
          background: theme === 'dark' ? "rgba(255,255,255,0.05)" : "linear-gradient(135deg, rgba(124,106,255,0.08) 0%, rgba(124,106,255,0.12) 100%)",
          border: theme === 'dark' ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(124,106,255,0.25)",
          cursor: "pointer",
          color: theme === 'dark' ? "#e8e8f0" : "#7c6aff",
          padding: "6px 10px",
          borderRadius: 8,
          marginLeft: 8,
          display: "flex",
          alignItems: "center",
          transition: "all 0.2s ease",
          boxShadow: theme === 'light' ? "0 2px 8px rgba(124,106,255,0.1)" : "none",
        }}
        onMouseEnter={(e) => {
          e.target.style.background = theme === 'dark' ? "rgba(255,255,255,0.1)" : "linear-gradient(135deg, rgba(124,106,255,0.15) 0%, rgba(124,106,255,0.2) 100%)";
          e.target.style.boxShadow = theme === 'light' ? "0 4px 16px rgba(124,106,255,0.2)" : "0 2px 12px rgba(124,106,255,0.2)";
        }}
        onMouseLeave={(e) => {
          e.target.style.background = theme === 'dark' ? "rgba(255,255,255,0.05)" : "linear-gradient(135deg, rgba(124,106,255,0.08) 0%, rgba(124,106,255,0.12) 100%)";
          e.target.style.boxShadow = theme === 'light' ? "0 2px 8px rgba(124,106,255,0.1)" : "none";
        }}
        aria-label="Open cart"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
          <line x1="3" y1="6" x2="21" y2="6"/>
          <path d="M16 10a4 4 0 01-8 0"/>
        </svg>
        {cart?.count > 0 && <span style={s.badge}>{cart.count > 99 ? "99+" : cart.count}</span>}
      </button>
    </header>
  );
}



function Footer({ theme }) {
  return (
    <footer style={theme === 'dark' ? s.footer : s.footerLight}>
      <div style={s.footerInner}>
        <span style={theme === 'dark' ? { color: "#555", fontSize: 13 } : { color: "#999", fontSize: 13 }}>© {new Date().getFullYear()} Commit &amp; Conquer</span>
        <div style={{ display: "flex", gap: 20 }}>
          <Link to="/about"       style={theme === 'dark' ? s.footerLink : s.footerLinkLight}>About</Link>
          <Link to="/collections" style={theme === 'dark' ? s.footerLink : s.footerLinkLight}>Collections</Link>
          <Link to="/account"     style={theme === 'dark' ? s.footerLink : s.footerLinkLight}>Account</Link>
        </div>
      </div>
    </footer>
  );
}



export default function Layout() {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    // Read theme from localStorage on mount
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const handleThemeToggle = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <CartProvider>
      <div style={theme === 'dark' ? s.root : s.rootLight}>
        <Header theme={theme} onThemeToggle={handleThemeToggle} />
        <main style={theme === 'dark' ? s.main : s.mainLight}>
          <Outlet />   {/* React Router renders child page here */}
        </main>
        <Footer theme={theme} />
      </div>
    </CartProvider>
  );
}



const s = {
  // Dark theme
  root:    { minHeight: "100vh", display: "flex", flexDirection: "column", background: "#0c0c0e", color: "#e8e8f0" },
  rootLight: { minHeight: "100vh", display: "flex", flexDirection: "column", background: "linear-gradient(135deg, #fafbfc 0%, #f5f7fa 100%)", color: "#1a1a1e" },
  nav:     { display: "flex", alignItems: "center", gap: 20 },
  badge:   {
    position: "absolute", top: 0, right: 0,
    background: "linear-gradient(135deg, #7c6aff 0%, #9b88ff 100%)", color: "#fff",
    fontSize: 10, fontWeight: 700, borderRadius: "50%",
    width: 17, height: 17, display: "flex", alignItems: "center", justifyContent: "center",
    boxShadow: "0 2px 8px rgba(124,106,255,0.3)",
  },
  main:    { flex: 1 },
  mainLight: { flex: 1, background: "linear-gradient(135deg, #fafbfc 0%, #f5f7fa 100%)" },
  footer:  { borderTop: "1px solid #1c1c21", padding: "24px 32px", background: "#0c0c0e" },
  footerLight: { 
    borderTop: "1px solid rgba(124,106,255,0.15)", 
    padding: "24px 32px", 
    background: "linear-gradient(180deg, rgba(255,255,255,0.8) 0%, rgba(250,251,252,0.6) 100%)",
    backdropFilter: "blur(8px)",
    boxShadow: "0 -4px 24px rgba(0,0,0,0.03)",
  },
  footerInner: { maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" },
  footerLink: { color: "#555", textDecoration: "none", fontSize: 13, transition: "color 0.2s" },
  footerLinkLight: { 
    color: "#666", 
    textDecoration: "none", 
    fontSize: 13, 
    transition: "all 0.2s ease",
    paddingBottom: 2,
  },
};