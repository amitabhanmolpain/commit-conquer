import{j as e,u as U}from"./query-sHCCnIeC.js";import{c as l}from"./router-sZKFYA6z.js";import{a as J,u as K}from"./index-DY-URvtF.js";import{C as Q}from"./CartDrawer-B8B1eQFJ.js";function Z({onGetStarted:i,onSkip:n,theme:x}){const[a,g]=l.useState(!1);l.useEffect(()=>{localStorage.getItem("commit-conquer-onboarding-seen")||g(!0)},[]);const o=()=>{localStorage.setItem("commit-conquer-onboarding-seen","true"),g(!1),i()},c=()=>{localStorage.setItem("commit-conquer-onboarding-seen","true"),g(!1),n()};if(!a)return null;const s=x==="dark";return e.jsxs(e.Fragment,{children:[e.jsx("div",{onClick:c,style:{position:"fixed",inset:0,background:s?"rgba(0,0,0,0.7)":"rgba(0,0,0,0.5)",zIndex:999,animation:"fadeIn 0.4s ease",backdropFilter:"blur(4px)"}}),e.jsx("div",{style:{position:"fixed",top:"50%",left:"50%",transform:"translate(-50%, -50%)",zIndex:1e3,animation:"scaleIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)"},children:e.jsxs("div",{style:{background:s?"linear-gradient(135deg, rgba(20,20,23,0.95) 0%, rgba(12,12,14,0.95) 100%)":"linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(250,251,252,0.95) 100%)",border:s?"1px solid rgba(124,106,255,0.2)":"1px solid rgba(124,106,255,0.15)",borderRadius:20,padding:48,maxWidth:500,width:"calc(100% - 48px)",backdropFilter:"blur(10px)",boxShadow:s?"0 20px 60px rgba(0,0,0,0.6), 0 0 40px rgba(124,106,255,0.1)":"0 20px 60px rgba(0,0,0,0.1), 0 0 40px rgba(124,106,255,0.15)",textAlign:"center"},children:[e.jsx("div",{style:{fontSize:56,marginBottom:24,animation:"bounce 2s infinite"},children:"🚀"}),e.jsx("h1",{style:{fontSize:28,fontWeight:700,marginBottom:16,color:s?"#e8e8f0":"#1a1a1e",letterSpacing:"-0.5px"},children:"Welcome to Commit Conquer"}),e.jsx("p",{style:{fontSize:16,lineHeight:1.6,color:s?"#aaa":"#666",marginBottom:32},children:"Discover collections, explore products, and shop effortlessly with our modern storefront experience."}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:32,textAlign:"left"},children:[{icon:"🎨",label:"Browse"},{icon:"🔍",label:"Search"},{icon:"⭐",label:"Explore"},{icon:"🛒",label:"Shop"}].map((r,d)=>e.jsxs("div",{style:{padding:16,borderRadius:12,background:s?"rgba(124,106,255,0.08)":"rgba(124,106,255,0.06)",border:s?"1px solid rgba(124,106,255,0.15)":"1px solid rgba(124,106,255,0.1)",display:"flex",alignItems:"center",gap:12},children:[e.jsx("span",{style:{fontSize:20},children:r.icon}),e.jsx("span",{style:{color:s?"#e8e8f0":"#1a1a1e",fontWeight:600},children:r.label})]},d))}),e.jsxs("div",{style:{display:"flex",gap:12,justifyContent:"center"},children:[e.jsx("button",{onClick:c,style:{padding:"12px 28px",borderRadius:10,border:s?"1px solid rgba(255,255,255,0.1)":"1px solid rgba(124,106,255,0.15)",background:s?"rgba(255,255,255,0.05)":"rgba(124,106,255,0.05)",color:s?"#aaa":"#888",fontSize:14,fontWeight:600,cursor:"pointer",transition:"all 0.2s ease"},onMouseEnter:r=>{r.currentTarget.style.background=s?"rgba(255,255,255,0.1)":"rgba(124,106,255,0.1)"},onMouseLeave:r=>{r.currentTarget.style.background=s?"rgba(255,255,255,0.05)":"rgba(124,106,255,0.05)"},children:"Skip"}),e.jsx("button",{onClick:o,style:{padding:"12px 28px",borderRadius:10,border:"none",background:"linear-gradient(135deg, #7c6aff 0%, #9b88ff 100%)",color:"#fff",fontSize:14,fontWeight:600,cursor:"pointer",transition:"all 0.2s ease",boxShadow:"0 4px 16px rgba(124,106,255,0.3)"},onMouseEnter:r=>{r.currentTarget.style.transform="translateY(-2px)",r.currentTarget.style.boxShadow="0 6px 24px rgba(124,106,255,0.4)"},onMouseLeave:r=>{r.currentTarget.style.transform="translateY(0)",r.currentTarget.style.boxShadow="0 4px 16px rgba(124,106,255,0.3)"},children:"Get Started →"})]})]})}),e.jsx("style",{children:`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `})]})}const w=[{target:"[data-tour='categories']",title:"Browse by Category",description:"Explore products by category. Click any category to filter the product grid.",position:"bottom"},{target:"[data-tour='search']",title:"Search Products",description:"Instantly search for products by name or category.",position:"bottom"},{target:"[data-tour='sort']",title:"Sort Products",description:"Sort products by newest, price, or rating.",position:"bottom"},{target:"[data-tour='products']",title:"Explore Products",description:"Click any product to view details, images, and add to cart.",position:"top"}];function ee({isActive:i,onFinish:n,theme:x}){const[a,g]=l.useState(0),[o,c]=l.useState(null),s=l.useRef(null),r=x==="dark";if(l.useEffect(()=>{if(!i)return;const p=()=>{const m=w[a],u=document.querySelector(m.target);u&&(u.scrollIntoView({behavior:"smooth",block:"center"}),setTimeout(()=>{const f=u.getBoundingClientRect();c(f)},100))};return p(),window.addEventListener("resize",p),()=>window.removeEventListener("resize",p)},[a,i]),!i)return null;const d=w[a],h=a===w.length-1,v=()=>{h?S():g(a+1)},j=()=>{a>0&&g(a-1)},S=()=>{localStorage.setItem("commit-conquer-walkthrough-done","true"),n()};return e.jsxs(e.Fragment,{children:[e.jsx("div",{style:{position:"fixed",inset:0,background:r?"rgba(0,0,0,0.7)":"rgba(0,0,0,0.5)",zIndex:1001,pointerEvents:"none"}}),o&&e.jsx("div",{style:{position:"fixed",top:o.top-8,left:o.left-8,width:o.width+16,height:o.height+16,border:"2px solid #7c6aff",borderRadius:12,boxShadow:"0 0 30px rgba(124,106,255,0.4), inset 0 0 30px rgba(124,106,255,0.1)",zIndex:1002,pointerEvents:"none",animation:"pulse 2s infinite"}}),o&&e.jsx("div",{ref:s,style:{position:"fixed",top:(()=>{const u=window.innerHeight-o.bottom,f=o.top;return u>280?o.bottom+20:f>280?o.top-240-20:Math.max(20,o.top+o.height/2-240/2)})(),left:(()=>{const u=o.left+o.width/2-320/2,f=20,y=window.innerWidth-320-20;return Math.max(f,Math.min(u,y))})(),zIndex:1003,animation:"slideIn 0.3s ease"},children:e.jsxs("div",{style:{width:320,background:r?"linear-gradient(135deg, rgba(20,20,23,0.98) 0%, rgba(12,12,14,0.98) 100%)":"linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(250,251,252,0.98) 100%)",border:r?"1px solid rgba(124,106,255,0.3)":"1px solid rgba(124,106,255,0.2)",borderRadius:12,padding:20,backdropFilter:"blur(10px)",boxShadow:r?"0 10px 40px rgba(0,0,0,0.6), 0 0 30px rgba(124,106,255,0.1)":"0 10px 40px rgba(0,0,0,0.1), 0 0 30px rgba(124,106,255,0.15)"},children:[e.jsx("h3",{style:{fontSize:16,fontWeight:700,color:r?"#e8e8f0":"#1a1a1e",marginBottom:8},children:d.title}),e.jsx("p",{style:{fontSize:13,lineHeight:1.5,color:r?"#aaa":"#666",marginBottom:16},children:d.description}),e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16},children:[e.jsx("div",{style:{display:"flex",gap:4},children:w.map((p,m)=>e.jsx("div",{style:{width:6,height:6,borderRadius:"50%",background:m===a||m<a?"#7c6aff":r?"rgba(255,255,255,0.1)":"rgba(124,106,255,0.1)",transition:"all 0.2s ease"}},m))}),e.jsxs("span",{style:{fontSize:12,color:r?"#666":"#aaa"},children:[a+1," of ",w.length]})]}),e.jsxs("div",{style:{display:"flex",gap:8},children:[e.jsx("button",{onClick:j,disabled:a===0,style:{flex:1,padding:10,borderRadius:8,border:r?"1px solid rgba(255,255,255,0.1)":"1px solid rgba(124,106,255,0.15)",background:r?"rgba(255,255,255,0.05)":"rgba(124,106,255,0.05)",color:r?a===0?"#444":"#aaa":a===0?"#ddd":"#888",fontSize:12,fontWeight:600,cursor:a===0?"not-allowed":"pointer",opacity:a===0?.5:1,transition:"all 0.2s ease"},children:"← Back"}),e.jsx("button",{onClick:S,style:{flex:1,padding:10,borderRadius:8,border:"none",background:r?"rgba(255,255,255,0.1)":"rgba(124,106,255,0.1)",color:r?"#aaa":"#888",fontSize:12,fontWeight:600,cursor:"pointer",transition:"all 0.2s ease"},onMouseEnter:p=>{p.currentTarget.style.background=r?"rgba(255,255,255,0.15)":"rgba(124,106,255,0.15)"},onMouseLeave:p=>{p.currentTarget.style.background=r?"rgba(255,255,255,0.1)":"rgba(124,106,255,0.1)"},children:"Skip"}),e.jsxs("button",{onClick:v,style:{flex:1,padding:10,borderRadius:8,border:"none",background:"linear-gradient(135deg, #7c6aff 0%, #9b88ff 100%)",color:"#fff",fontSize:12,fontWeight:600,cursor:"pointer",transition:"all 0.2s ease"},onMouseEnter:p=>{p.currentTarget.style.transform="translateY(-1px)",p.currentTarget.style.boxShadow="0 4px 12px rgba(124,106,255,0.3)"},onMouseLeave:p=>{p.currentTarget.style.transform="translateY(0)",p.currentTarget.style.boxShadow="none"},children:[h?"Done":"Next"," →"]})]})]})}),e.jsx("style",{children:`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse {
          0%, 100% {
            box-shadow: 0 0 30px rgba(124, 106, 255, 0.4), inset 0 0 30px rgba(124, 106, 255, 0.1);
          }
          50% {
            box-shadow: 0 0 50px rgba(124, 106, 255, 0.6), inset 0 0 30px rgba(124, 106, 255, 0.15);
          }
        }
      `})]})}const te=Array.from({length:60},(i,n)=>{const x=["Obsidian Crew Neck","Slate Cargo Pant","Onyx Hoodie","Granite Bomber","Ash Trench Coat","Carbon Jogger","Basalt Windbreaker","Charcoal Denim","Iron Fleece","Flint Overshirt","Coal Polo","Cinder Vest"],a=["Tops","Bottoms","Outerwear","Accessories"],g=[["new"],["sale"],[],["bestseller"],["limited"]][n%5],o=parseFloat((29+n*17%200).toFixed(2));return{id:`prod_${String(n+1).padStart(3,"0")}`,handle:x[n%12].toLowerCase().replace(/\s+/g,"-")+`-${n+1}`,title:x[n%12],category:a[n%4],status:n%5===1?"draft":"published",thumbnail:`https://picsum.photos/seed/${n+10}/400/500`,price:o,originalPrice:g.includes("sale")?parseFloat((o*1.3).toFixed(2)):void 0,inventory:200-n*13%180,tags:g,rating:parseFloat((3.5+n*7%15/10).toFixed(1)),reviewCount:4+n*11%120}}).filter(i=>i.status==="published");async function re({pageParam:i=0,search:n,category:x,sortBy:a,tags:g}){await new Promise(r=>setTimeout(r,400));const o=12;let c=[...te];n&&(c=c.filter(r=>r.title.toLowerCase().includes(n.toLowerCase())||r.category.toLowerCase().includes(n.toLowerCase()))),x!=="all"&&(c=c.filter(r=>r.category===x)),g.length&&(c=c.filter(r=>g.some(d=>r.tags.includes(d)))),a==="price-lo"?c.sort((r,d)=>r.price-d.price):a==="price-hi"?c.sort((r,d)=>d.price-r.price):a==="rating"?c.sort((r,d)=>d.rating-r.rating):a==="newest"&&c.sort((r,d)=>parseInt(d.id.split("_")[1])-parseInt(r.id.split("_")[1]));const s=i*o;return{products:c.slice(s,s+o),nextPage:s+o<c.length?i+1:void 0,total:c.length}}const ae=`
  @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Syne:wght@400;500;600;700;800&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #0c0c0e; --surface: #141417; --surface2: #1c1c21;
    --border: #2a2a31; --border-hover: #404050;
    --text: #e8e8f0; --text-muted: #6b6b80; --text-dim: #9999aa;
    --accent: #7c6aff; --accent-dim: rgba(124,106,255,0.15); --accent-glow: rgba(124,106,255,0.3);
    --green: #3ddc97; --green-dim: rgba(61,220,151,0.12);
    --amber: #f5a623; --amber-dim: rgba(245,166,35,0.12);
    --red: #ff5c5c; --red-dim: rgba(255,92,92,0.12);
    --radius: 6px; --radius-lg: 10px; --radius-xl: 16px;
    --mono: 'DM Mono', monospace; --sans: 'Syne', sans-serif;
    --transition: 160ms cubic-bezier(0.4,0,0.2,1);
  }

  html { scroll-behavior: smooth; }
  body { background: var(--bg); color: var(--text); font-family: var(--sans); min-height: 100vh; }

  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 4px; }
  ::-webkit-scrollbar-thumb:hover { background: var(--border-hover); }

  /* ── Navbar ── */
  .nav {
    position: sticky; top: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 40px; height: 60px;
    background: rgba(12,12,14,0.85); backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--border);
  }
  .nav-logo {
    font-size: 18px; font-weight: 800; letter-spacing: -0.5px;
    color: var(--text); text-decoration: none; display: flex; align-items: center; gap: 8px;
  }
  .nav-logo-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--accent); }
  .nav-links { display: flex; gap: 28px; }
  .nav-link {
    font-size: 13px; font-weight: 600; color: var(--text-dim);
    text-decoration: none; transition: color var(--transition);
  }
  .nav-link:hover { color: var(--text); }
  .nav-link.active { color: var(--accent); }
  .nav-actions { display: flex; align-items: center; gap: 12px; }
  .cart-btn {
    display: flex; align-items: center; gap: 8px;
    padding: 8px 16px; background: var(--surface2);
    border: 1px solid var(--border); border-radius: 99px;
    color: var(--text); font-family: var(--sans); font-size: 13px; font-weight: 600;
    cursor: pointer; transition: all var(--transition);
  }
  .cart-btn:hover { border-color: var(--accent); background: var(--accent-dim); color: var(--accent); }
  .cart-badge {
    display: inline-flex; align-items: center; justify-content: center;
    width: 18px; height: 18px; background: var(--accent); color: #fff;
    border-radius: 50%; font-size: 10px; font-weight: 800; font-family: var(--mono);
  }

  /* ── Hero ── */
  .hero {
    padding: 72px 40px 56px;
    background: radial-gradient(ellipse 80% 60% at 50% -20%, rgba(124,106,255,0.12) 0%, transparent 70%);
    text-align: center; border-bottom: 1px solid var(--border);
  }
  .hero-eyebrow {
    display: inline-flex; align-items: center; gap: 6px;
    font-family: var(--mono); font-size: 11px; color: var(--accent);
    text-transform: uppercase; letter-spacing: 0.12em;
    background: var(--accent-dim); padding: 4px 12px; border-radius: 99px;
    border: 1px solid rgba(124,106,255,0.25); margin-bottom: 18px;
  }
  .hero-title {
    font-size: clamp(36px, 5vw, 64px); font-weight: 800;
    letter-spacing: -2px; line-height: 1.05;
    background: linear-gradient(135deg, var(--text) 0%, var(--text-dim) 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    background-clip: text; margin-bottom: 16px;
  }
  .hero-sub { font-size: 16px; color: var(--text-muted); max-width: 480px; margin: 0 auto 32px; line-height: 1.6; }
  .hero-cta { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
  .btn-cta-primary {
    padding: 12px 28px; background: var(--accent); color: #fff;
    border: none; border-radius: 99px; font-family: var(--sans);
    font-size: 14px; font-weight: 700; cursor: pointer;
    transition: all var(--transition); text-decoration: none; display: inline-flex; align-items: center; gap: 8px;
  }
  .btn-cta-primary:hover { background: #9080ff; box-shadow: 0 0 32px var(--accent-glow); transform: translateY(-1px); }
  .btn-cta-ghost {
    padding: 12px 28px; background: transparent; color: var(--text-dim);
    border: 1px solid var(--border); border-radius: 99px; font-family: var(--sans);
    font-size: 14px; font-weight: 600; cursor: pointer;
    transition: all var(--transition); text-decoration: none;
  }
  .btn-cta-ghost:hover { border-color: var(--border-hover); color: var(--text); }

  /* ── Category pills ── */
  .cat-strip {
    display: flex; gap: 8px; padding: 20px 40px;
    border-bottom: 1px solid var(--border);
    overflow-x: auto; scrollbar-width: none; background: var(--surface);
  }
  .cat-strip::-webkit-scrollbar { display: none; }
  .cat-pill {
    flex-shrink: 0; padding: 7px 16px;
    background: transparent; border: 1px solid var(--border);
    border-radius: 99px; color: var(--text-muted);
    font-family: var(--mono); font-size: 12px; font-weight: 500;
    cursor: pointer; transition: all var(--transition); white-space: nowrap;
  }
  .cat-pill:hover { border-color: var(--border-hover); color: var(--text); }
  .cat-pill.active { background: var(--accent-dim); border-color: var(--accent); color: var(--accent); }

  /* ── Main layout ── */
  .shop-layout { display: flex; min-height: calc(100vh - 60px); }

  /* ── Sidebar filters ── */
  .sidebar {
    width: 220px; flex-shrink: 0;
    border-right: 1px solid var(--border);
    padding: 24px 20px;
    position: sticky; top: 60px; height: calc(100vh - 60px);
    overflow-y: auto;
  }
  .sidebar-section { margin-bottom: 28px; }
  .sidebar-label {
    font-family: var(--mono); font-size: 10px; text-transform: uppercase;
    letter-spacing: 0.1em; color: var(--text-muted); margin-bottom: 10px;
  }
  .filter-check {
    display: flex; align-items: center; gap: 8px;
    padding: 6px 0; cursor: pointer; color: var(--text-dim);
    font-size: 13px; transition: color var(--transition);
  }
  .filter-check:hover { color: var(--text); }
  .filter-check input[type="checkbox"] {
    width: 14px; height: 14px; accent-color: var(--accent); cursor: pointer;
    flex-shrink: 0; background: none; border: none; padding: 0;
  }
  .price-range { display: flex; flex-direction: column; gap: 8px; }
  .price-range input[type="range"] {
    width: 100%; accent-color: var(--accent); background: none; border: none; padding: 0;
  }
  .price-range-labels { display: flex; justify-content: space-between; font-family: var(--mono); font-size: 11px; color: var(--text-muted); }
  .clear-filters {
    width: 100%; padding: 8px; background: var(--red-dim); color: var(--red);
    border: 1px solid rgba(255,92,92,0.2); border-radius: var(--radius);
    font-family: var(--mono); font-size: 12px; cursor: pointer;
    transition: all var(--transition); margin-top: 4px;
  }
  .clear-filters:hover { background: rgba(255,92,92,0.2); }

  /* ── Product grid ── */
  .grid-col { flex: 1; min-width: 0; }

  .toolbar {
    display: flex; align-items: center; gap: 12px;
    padding: 16px 24px; border-bottom: 1px solid var(--border);
    background: var(--surface); flex-wrap: wrap;
  }
  .search-wrap { position: relative; flex: 1; min-width: 200px; max-width: 360px; }
  .search-icon { position: absolute; left: 11px; top: 50%; transform: translateY(-50%); color: var(--text-muted); pointer-events: none; }
  .search-input {
    width: 100%; padding: 9px 12px 9px 34px;
    background: var(--bg); border: 1px solid var(--border);
    border-radius: var(--radius); color: var(--text);
    font-family: var(--mono); font-size: 13px; outline: none;
    transition: border-color var(--transition);
  }
  .search-input::placeholder { color: var(--text-muted); }
  .search-input:focus { border-color: var(--accent); }

  .sort-select {
    padding: 9px 12px; background: var(--bg); border: 1px solid var(--border);
    border-radius: var(--radius); color: var(--text-dim); font-family: var(--mono); font-size: 13px;
    outline: none; cursor: pointer; transition: border-color var(--transition);
  }
  .sort-select:focus { border-color: var(--accent); }

  .result-count { font-family: var(--mono); font-size: 12px; color: var(--text-muted); margin-left: auto; }

  .view-btns { display: flex; gap: 4px; }
  .view-btn {
    width: 32px; height: 32px; display: flex; align-items: center; justify-content: center;
    background: transparent; border: 1px solid var(--border); border-radius: var(--radius);
    color: var(--text-muted); cursor: pointer; transition: all var(--transition);
  }
  .view-btn.active, .view-btn:hover { background: var(--accent-dim); border-color: var(--accent); color: var(--accent); }

  .product-grid {
    display: grid; padding: 24px;
    gap: 20px;
  }
  .product-grid.grid-4 { grid-template-columns: repeat(4, 1fr); }
  .product-grid.grid-3 { grid-template-columns: repeat(3, 1fr); }
  .product-grid.grid-2 { grid-template-columns: repeat(2, 1fr); }
  .product-grid.grid-list { grid-template-columns: 1fr; }

  /* ── Product Card ── */
  .product-card {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: var(--radius-xl); overflow: hidden;
    transition: all var(--transition); cursor: pointer; position: relative;
    display: flex; flex-direction: column;
  }
  .product-card:hover { border-color: var(--border-hover); transform: translateY(-2px); box-shadow: 0 8px 32px rgba(0,0,0,0.3); }
  .product-card.list-card { flex-direction: row; border-radius: var(--radius-lg); }

  .card-img-wrap { position: relative; overflow: hidden; aspect-ratio: 4/5; }
  .list-card .card-img-wrap { width: 140px; flex-shrink: 0; aspect-ratio: auto; }
  .card-img {
    width: 100%; height: 100%; object-fit: cover;
    transition: transform 400ms cubic-bezier(0.4,0,0.2,1);
    display: block;
  }
  .product-card:hover .card-img { transform: scale(1.04); }

  .card-badges {
    position: absolute; top: 10px; left: 10px;
    display: flex; flex-direction: column; gap: 5px;
  }
  .card-badge {
    padding: 3px 9px; border-radius: 99px; font-family: var(--mono);
    font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em;
  }
  .badge-new { background: var(--accent-dim); color: var(--accent); border: 1px solid rgba(124,106,255,0.3); }
  .badge-sale { background: var(--red-dim); color: var(--red); border: 1px solid rgba(255,92,92,0.3); }
  .badge-bestseller { background: var(--amber-dim); color: var(--amber); border: 1px solid rgba(245,166,35,0.3); }
  .badge-limited { background: var(--green-dim); color: var(--green); border: 1px solid rgba(61,220,151,0.3); }

  .card-quick-add {
    position: absolute; bottom: 0; left: 0; right: 0;
    padding: 12px;
    background: linear-gradient(to top, rgba(12,12,14,0.95) 60%, transparent);
    opacity: 0; transform: translateY(4px);
    transition: all 220ms cubic-bezier(0.4,0,0.2,1);
    pointer-events: none;
  }
  .product-card:hover .card-quick-add { opacity: 1; transform: translateY(0); pointer-events: auto; }
  .btn-quick-add {
    width: 100%; padding: 10px; border: none; border-radius: var(--radius);
    background: var(--accent); color: #fff;
    font-family: var(--sans); font-size: 13px; font-weight: 700;
    cursor: pointer; transition: all var(--transition);
    display: flex; align-items: center; justify-content: center; gap: 6px;
  }
  .btn-quick-add:hover { background: #9080ff; }
  .btn-quick-add:disabled { background: var(--surface2); color: var(--text-muted); cursor: not-allowed; }
  .btn-quick-add.added { background: var(--green-dim); color: var(--green); }

  .card-body { padding: 14px 16px 16px; flex: 1; display: flex; flex-direction: column; }
  .list-card .card-body { padding: 20px; }
  .card-category { font-family: var(--mono); font-size: 10px; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 4px; }
  .card-title { font-size: 14px; font-weight: 700; color: var(--text); line-height: 1.3; margin-bottom: 6px; }
  .list-card .card-title { font-size: 16px; }

  .card-rating { display: flex; align-items: center; gap: 5px; margin-bottom: 10px; }
  .stars { color: var(--amber); font-size: 12px; letter-spacing: -1px; }
  .rating-count { font-family: var(--mono); font-size: 11px; color: var(--text-muted); }

  .card-price-row { display: flex; align-items: baseline; gap: 8px; margin-top: auto; }
  .card-price { font-family: var(--mono); font-size: 15px; font-weight: 700; color: var(--green); }
  .card-price-orig { font-family: var(--mono); font-size: 12px; color: var(--text-muted); text-decoration: line-through; }

  .card-inv {
    font-family: var(--mono); font-size: 11px;
    color: var(--text-muted); margin-top: 6px;
  }
  .card-inv.low { color: var(--red); }

  /* List card extra */
  .list-card .btn-quick-add {
    position: static; opacity: 1; transform: none;
    pointer-events: auto; background: transparent;
    border: 1px solid var(--accent); color: var(--accent);
    width: auto; padding: 8px 20px; margin-top: 16px;
    font-size: 13px;
  }
  .list-card .btn-quick-add:hover { background: var(--accent); color: #fff; }

  /* ── Skeleton loader ── */
  .skeleton-card { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-xl); overflow: hidden; }
  .skeleton { background: var(--surface2); animation: shimmer 1.4s infinite; }
  .skeleton-img { aspect-ratio: 4/5; }
  .skeleton-body { padding: 14px 16px; display: flex; flex-direction: column; gap: 8px; }
  .skeleton-line { height: 12px; border-radius: 4px; }
  @keyframes shimmer { 0%,100% { opacity: 0.5; } 50% { opacity: 1; } }

  /* ── End / Empty ── */
  .end-msg { text-align: center; padding: 32px; font-family: var(--mono); font-size: 12px; color: var(--text-muted); }
  .empty-state { text-align: center; padding: 80px 32px; }
  .empty-icon { font-size: 40px; margin-bottom: 12px; opacity: 0.3; }
  .empty-title { font-size: 18px; font-weight: 700; color: var(--text); margin-bottom: 6px; }
  .empty-sub { font-size: 14px; color: var(--text-muted); }

  /* ── Added-to-cart toast ── */
  .toast {
    position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%);
    background: var(--surface2); border: 1px solid var(--green);
    border-radius: var(--radius-lg); padding: 12px 20px;
    font-family: var(--mono); font-size: 13px; color: var(--green);
    display: flex; align-items: center; gap: 8px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.4);
    z-index: 400; animation: toastIn 200ms ease;
  }
  @keyframes toastIn { from { opacity:0; transform: translateX(-50%) translateY(12px); } to { opacity:1; transform: translateX(-50%) translateY(0); } }

  /* ── Sentinel ── */
  .sentinel { height: 60px; }

  @media (max-width: 1100px) { .product-grid.grid-4 { grid-template-columns: repeat(3, 1fr); } }
  @media (max-width: 860px)  { .product-grid.grid-4, .product-grid.grid-3 { grid-template-columns: repeat(2, 1fr); } .sidebar { display: none; } }
  @media (max-width: 540px)  { .product-grid { grid-template-columns: 1fr !important; } .nav { padding: 0 16px; } .hero { padding: 48px 20px 40px; } }
`;function oe({rating:i}){return e.jsx("span",{className:"stars",children:Array.from({length:5},(n,x)=>e.jsx("span",{style:{opacity:x<Math.round(i)?1:.25},children:"★"},x))})}function ie({product:i,listView:n,onAddToCart:x}){const[a,g]=l.useState(!1),[o,c]=l.useState(i.inventory),s=h=>{h.stopPropagation(),!(o<=0)&&(x(i),c(v=>v-1),g(!0),setTimeout(()=>g(!1),1400))},r=o>0&&o<=10,d=o<=0;return e.jsxs("div",{className:`product-card${n?" list-card":""}`,onClick:()=>{window.location.href=`/products/${i.handle}`},children:[e.jsxs("div",{className:"card-img-wrap",children:[e.jsx("img",{src:i.thumbnail,alt:i.title,className:"card-img",loading:"lazy"}),i.tags.length>0&&e.jsx("div",{className:"card-badges",children:i.tags.map(h=>e.jsx("span",{className:`card-badge badge-${h}`,children:h},h))}),!n&&e.jsx("div",{className:"card-quick-add",children:e.jsx("button",{className:`btn-quick-add${a?" added":""}`,disabled:d,onClick:s,children:a?e.jsx(e.Fragment,{children:"✓ Added"}):d?"Out of stock":e.jsxs(e.Fragment,{children:[e.jsxs("svg",{width:"13",height:"13",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",children:[e.jsx("path",{d:"M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"}),e.jsx("line",{x1:"3",y1:"6",x2:"21",y2:"6"}),e.jsx("path",{d:"M16 10a4 4 0 0 1-8 0"})]}),"Add to Cart"]})})})]}),e.jsxs("div",{className:"card-body",children:[e.jsx("div",{className:"card-category",children:i.category}),e.jsx("div",{className:"card-title",children:i.title}),e.jsxs("div",{className:"card-rating",children:[e.jsx(oe,{rating:i.rating}),e.jsxs("span",{className:"rating-count",children:["(",i.reviewCount,")"]})]}),e.jsxs("div",{className:"card-price-row",children:[e.jsxs("span",{className:"card-price",children:["$",i.price.toFixed(2)]}),i.originalPrice&&e.jsxs("span",{className:"card-price-orig",children:["$",i.originalPrice.toFixed(2)]})]}),d?e.jsx("div",{className:"card-inv low",children:"Out of stock"}):r?e.jsxs("div",{className:"card-inv low",children:["Only ",o," left"]}):e.jsxs("div",{className:"card-inv",children:[o," in stock"]}),n&&e.jsx("button",{className:`btn-quick-add${a?" added":""}`,disabled:d,onClick:s,children:a?"✓ Added":d?"Out of stock":"Add to Cart"})]})]})}function R(){return e.jsxs("div",{className:"skeleton-card",children:[e.jsx("div",{className:"skeleton skeleton-img"}),e.jsxs("div",{className:"skeleton-body",children:[e.jsx("div",{className:"skeleton skeleton-line",style:{width:"50%"}}),e.jsx("div",{className:"skeleton skeleton-line",style:{width:"75%"}}),e.jsx("div",{className:"skeleton skeleton-line",style:{width:"40%"}})]})]})}function de(){var q;const{itemCount:i}=J(),{addItem:n}=K(),[x,a]=l.useState("dark"),[g,o]=l.useState(!1),[c,s]=l.useState(!1),[r,d]=l.useState(!1),[h,v]=l.useState(""),[j,S]=l.useState(""),[p,m]=l.useState("all"),[u,f]=l.useState("newest"),[y,A]=l.useState([]),[N,M]=l.useState(250),[C,$]=l.useState("4"),[F,E]=l.useState(null),L=l.useRef(null);l.useEffect(()=>{const t=localStorage.getItem("theme");t&&a(t)},[]),l.useEffect(()=>{const t=setTimeout(()=>S(h),350);return()=>clearTimeout(t)},[h]);const{data:k,fetchNextPage:O,hasNextPage:z,isFetchingNextPage:T,isLoading:W,isFetching:H}=U({queryKey:["storefront-products",{search:j,category:p,sortBy:u,tags:y}],queryFn:({pageParam:t})=>re({pageParam:t,search:j,category:p,sortBy:u,tags:y}),getNextPageParam:t=>t.nextPage,initialPageParam:0});l.useEffect(()=>{const t=L.current;if(!t)return;const b=new IntersectionObserver(([P])=>{P.isIntersecting&&z&&!T&&O()},{rootMargin:"300px"});return b.observe(t),()=>b.disconnect()},[z,T,O]);const I=(k==null?void 0:k.pages.flatMap(t=>t.products))??[],B=((q=k==null?void 0:k.pages[0])==null?void 0:q.total)??0,Y=l.useCallback(t=>{n({id:t.id,title:t.title,price:t.price,thumbnail:t.thumbnail,quantity:1}),E(`${t.title} added to cart`),setTimeout(()=>E(null),2200)},[n]),D=t=>{A(b=>b.includes(t)?b.filter(P=>P!==t):[...b,t])},_=()=>{v(""),m("all"),A([]),M(250),f("newest")},G=h||p!=="all"||y.length||N<250,V=["all","Tops","Bottoms","Outerwear","Accessories"],X=["new","sale","bestseller","limited"];return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:ae}),e.jsxs("nav",{className:"nav",children:[e.jsxs("a",{href:"/",className:"nav-logo",children:[e.jsx("span",{className:"nav-logo-dot"}),"commit&conquer"]}),e.jsxs("div",{className:"nav-links",children:[e.jsx("a",{href:"/",className:"nav-link active",children:"Shop"}),e.jsx("a",{href:"/collections",className:"nav-link",children:"Collections"}),e.jsx("a",{href:"/about",className:"nav-link",children:"About"})]}),e.jsx("div",{className:"nav-actions"})]}),e.jsxs("section",{className:"hero",children:[e.jsxs("div",{className:"hero-eyebrow",children:[e.jsx("svg",{width:"10",height:"10",viewBox:"0 0 24 24",fill:"currentColor",children:e.jsx("circle",{cx:"12",cy:"12",r:"8"})}),"New Season — Drop 01"]}),e.jsxs("h1",{className:"hero-title",children:["Minimal. Functional.",e.jsx("br",{}),"Uncompromising."]}),e.jsx("p",{className:"hero-sub",children:"Clothing built for people who move with purpose. No logos, no excess — just craft."}),e.jsxs("div",{className:"hero-cta",children:[e.jsxs("a",{href:"#products",className:"btn-cta-primary",children:["Shop the Collection",e.jsx("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",children:e.jsx("path",{d:"M5 12h14M12 5l7 7-7 7"})})]}),e.jsx("a",{href:"/about",className:"btn-cta-ghost",children:"Our Story"})]})]}),e.jsx("div",{className:"cat-strip","data-tour":"categories",children:V.map(t=>e.jsx("button",{className:`cat-pill${p===t?" active":""}`,onClick:()=>m(t),children:t==="all"?"All Products":t},t))}),e.jsxs("div",{className:"shop-layout",id:"products",children:[e.jsxs("aside",{className:"sidebar",children:[e.jsxs("div",{className:"sidebar-section",children:[e.jsx("div",{className:"sidebar-label",children:"Sort by"}),[{v:"newest",l:"Newest"},{v:"price-lo",l:"Price: Low → High"},{v:"price-hi",l:"Price: High → Low"},{v:"rating",l:"Top Rated"}].map(({v:t,l:b})=>e.jsxs("label",{className:"filter-check",children:[e.jsx("input",{type:"radio",name:"sort",checked:u===t,onChange:()=>f(t),style:{accentColor:"var(--accent)"}}),b]},t))]}),e.jsxs("div",{className:"sidebar-section",children:[e.jsx("div",{className:"sidebar-label",children:"Tags"}),X.map(t=>e.jsxs("label",{className:"filter-check",children:[e.jsx("input",{type:"checkbox",checked:y.includes(t),onChange:()=>D(t)}),t.charAt(0).toUpperCase()+t.slice(1)]},t))]}),e.jsxs("div",{className:"sidebar-section",children:[e.jsxs("div",{className:"sidebar-label",children:["Max price: $",N]}),e.jsxs("div",{className:"price-range",children:[e.jsx("input",{type:"range",min:0,max:250,step:5,value:N,onChange:t=>M(+t.target.value)}),e.jsxs("div",{className:"price-range-labels",children:[e.jsx("span",{children:"$0"}),e.jsx("span",{children:"$250"})]})]})]}),G&&e.jsx("button",{className:"clear-filters",onClick:_,children:"Clear all filters"})]}),e.jsxs("div",{className:"grid-col",children:[e.jsxs("div",{className:"toolbar",children:[e.jsxs("div",{className:"search-wrap","data-tour":"search",children:[e.jsx("span",{className:"search-icon",children:e.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("circle",{cx:"11",cy:"11",r:"8"}),e.jsx("path",{d:"m21 21-4.35-4.35"})]})}),e.jsx("input",{className:"search-input",placeholder:"Search products…",value:h,onChange:t=>v(t.target.value)})]}),e.jsxs("select",{className:"sort-select",value:u,onChange:t=>f(t.target.value),"data-tour":"sort",children:[e.jsx("option",{value:"newest",children:"Newest"}),e.jsx("option",{value:"price-lo",children:"Price ↑"}),e.jsx("option",{value:"price-hi",children:"Price ↓"}),e.jsx("option",{value:"rating",children:"Top rated"})]}),e.jsx("span",{className:"result-count",children:H&&!W?"…":`${B} products`}),e.jsx("div",{className:"view-btns",children:["4","3","list"].map(t=>e.jsx("button",{className:`view-btn${C===t?" active":""}`,onClick:()=>$(t),title:t==="list"?"List view":`${t}-column grid`,children:t==="list"?e.jsxs("svg",{width:"13",height:"13",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("line",{x1:"8",y1:"6",x2:"21",y2:"6"}),e.jsx("line",{x1:"8",y1:"12",x2:"21",y2:"12"}),e.jsx("line",{x1:"8",y1:"18",x2:"21",y2:"18"}),e.jsx("line",{x1:"3",y1:"6",x2:"3.01",y2:"6"}),e.jsx("line",{x1:"3",y1:"12",x2:"3.01",y2:"12"}),e.jsx("line",{x1:"3",y1:"18",x2:"3.01",y2:"18"})]}):e.jsxs("svg",{width:"13",height:"13",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("rect",{x:"3",y:"3",width:"7",height:"7"}),e.jsx("rect",{x:"14",y:"3",width:"7",height:"7"}),e.jsx("rect",{x:"3",y:"14",width:"7",height:"7"}),e.jsx("rect",{x:"14",y:"14",width:"7",height:"7"})]})},t))})]}),e.jsxs("div",{className:`product-grid grid-${C}`,"data-tour":"products",children:[W?Array.from({length:12},(t,b)=>e.jsx(R,{},b)):I.length===0?e.jsxs("div",{className:"empty-state",style:{gridColumn:"1/-1"},children:[e.jsx("div",{className:"empty-icon",children:"◈"}),e.jsx("div",{className:"empty-title",children:"No products found"}),e.jsx("div",{className:"empty-sub",children:"Try adjusting your filters or search terms"})]}):I.filter(t=>t.price<=N).map(t=>e.jsx(ie,{product:t,listView:C==="list",onAddToCart:Y},t.id)),T&&Array.from({length:4},(t,b)=>e.jsx(R,{},`sk-${b}`))]}),e.jsx("div",{ref:L,className:"sentinel"}),!z&&I.length>0&&e.jsxs("div",{className:"end-msg",children:["— All ",B," products loaded —"]})]})]}),r&&e.jsx(Q,{}),F&&e.jsxs("div",{className:"toast",children:[e.jsx("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",children:e.jsx("polyline",{points:"20 6 9 17 4 12"})}),F]}),e.jsx(Z,{onGetStarted:()=>s(!0),onSkip:()=>{},theme:x}),e.jsx(ee,{isActive:c,onFinish:()=>s(!1),theme:x})]})}export{de as default};
