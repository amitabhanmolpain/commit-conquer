

import { createContext, useContext, useReducer, useState, useEffect } from "react";
import { Outlet, Link, NavLink, useNavigate } from "react-router-dom";



const CartStateCtx    = createContext(null);
const CartDispatchCtx = createContext(null);

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const key = (i) => `${i.id}__${i.variantId ?? "default"}`;
      const exists = state.items.find((i) => key(i) === key(action.payload));
      if (exists) {
        return {
          ...state,
          items: state.items.map((i) =>
            key(i) === key(action.payload)
              ? { ...i, quantity: i.quantity + (action.payload.quantity ?? 1) }
              : i
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: action.payload.quantity ?? 1 }],
      };
    }
    case "REMOVE_ITEM": {
      const key = `${action.payload.id}__${action.payload.variantId ?? "default"}`;
      return { ...state, items: state.items.filter((i) => `${i.id}__${i.variantId ?? "default"}` !== key) };
    }
    case "UPDATE_QTY": {
      const key = `${action.payload.id}__${action.payload.variantId ?? "default"}`;
      if (action.payload.quantity <= 0)
        return { ...state, items: state.items.filter((i) => `${i.id}__${i.variantId ?? "default"}` !== key) };
      return {
        ...state,
        items: state.items.map((i) =>
          `${i.id}__${i.variantId ?? "default"}` === key ? { ...i, quantity: action.payload.quantity } : i
        ),
      };
    }
    case "CLEAR":
      return { ...state, items: [] };
    case "TOGGLE_CART":
      return { ...state, isOpen: action.payload ?? !state.isOpen };
    default:
      return state;
  }
}

function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], isOpen: false });
  const derived = {
    ...state,
    count: state.items.reduce((n, i) => n + i.quantity, 0),
    total: state.items.reduce((s, i) => s + i.price * i.quantity, 0),
  };
  return (
    <CartStateCtx.Provider value={derived}>
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