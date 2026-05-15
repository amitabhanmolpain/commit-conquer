import{j as e}from"./query-sHCCnIeC.js";import{c as n}from"./router-sZKFYA6z.js";import{a as X,u as Z}from"./index-DY-URvtF.js";const D=[{id:"std",name:"Standard Shipping",price:599,days:"5–7"},{id:"exp",name:"Express Shipping",price:1299,days:"2–3"},{id:"ovn",name:"Overnight Shipping",price:2499,days:"1"}],ee={first_name:"",last_name:"",address_1:"",address_2:"",city:"",state:"",postal_code:"",country_code:"US",phone:""},re={card_number:"",expiry:"",cvc:"",name_on_card:""},m=l=>new Intl.NumberFormat("en-US",{style:"currency",currency:"USD"}).format(l/100),se=l=>l.replace(/\D/g,"").slice(0,16).replace(/(.{4})/g,"$1 ").trim(),ae=l=>{const p=l.replace(/\D/g,"").slice(0,4);return p.length>2?`${p.slice(0,2)}/${p.slice(2)}`:p},I=`
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
    --radius: 6px; --radius-lg: 10px;
    --mono: 'DM Mono', monospace; --sans: 'Syne', sans-serif;
    --transition: 160ms cubic-bezier(0.4,0,0.2,1);
  }

  .checkout-root {
    min-height: 100vh; background: var(--bg); color: var(--text);
    font-family: var(--sans);
    display: flex; flex-direction: column; align-items: center;
    padding: 40px 16px 80px;
  }

  .checkout-inner { width: 100%; max-width: 960px; display: flex; gap: 32px; align-items: flex-start; }

  /* ── Left: form column ── */
  .checkout-form-col { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 24px; }

  /* Breadcrumb steps */
  .steps { display: flex; align-items: center; gap: 0; margin-bottom: 8px; }
  .step-item {
    display: flex; align-items: center; gap: 6px;
    font-family: var(--mono); font-size: 12px; color: var(--text-muted);
    cursor: default;
  }
  .step-item.active { color: var(--accent); font-weight: 600; }
  .step-item.done { color: var(--green); cursor: pointer; }
  .step-item.done:hover { text-decoration: underline; }
  .step-sep { margin: 0 8px; color: var(--border-hover); font-size: 14px; }
  .step-num {
    width: 20px; height: 20px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 10px; font-weight: 700;
    background: var(--surface2); color: var(--text-muted); border: 1px solid var(--border);
  }
  .step-item.active .step-num { background: var(--accent); color: #fff; border-color: var(--accent); }
  .step-item.done .step-num { background: var(--green-dim); color: var(--green); border-color: rgba(61,220,151,0.3); }

  /* Card */
  .card {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: var(--radius-lg); padding: 24px;
  }
  .card-title {
    font-size: 15px; font-weight: 800; color: var(--text);
    margin-bottom: 20px; display: flex; align-items: center; gap: 8px;
  }
  .card-icon { color: var(--accent); }

  /* Form grid */
  .field-grid { display: grid; gap: 14px; }
  .field-grid-2 { grid-template-columns: 1fr 1fr; }
  .field-grid-3 { grid-template-columns: 1fr 1fr 1fr; }
  label { display: flex; flex-direction: column; gap: 5px; }
  .label-text { font-family: var(--mono); font-size: 11px; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.06em; }
  .label-text.required::after { content: ' *'; color: var(--red); }
  input, select {
    padding: 10px 12px; background: var(--surface2); border: 1px solid var(--border);
    border-radius: var(--radius); color: var(--text);
    font-family: var(--mono); font-size: 13px; outline: none;
    transition: border-color var(--transition);
    width: 100%;
  }
  input::placeholder { color: var(--text-muted); }
  input:focus, select:focus { border-color: var(--accent); }
  input.error { border-color: var(--red); }
  .field-error { font-family: var(--mono); font-size: 11px; color: var(--red); margin-top: 3px; }
  select option { background: var(--surface2); }

  /* Shipping options */
  .ship-options { display: flex; flex-direction: column; gap: 10px; }
  .ship-option {
    display: flex; align-items: center; justify-content: space-between;
    padding: 14px 16px; border: 1px solid var(--border);
    border-radius: var(--radius-lg); cursor: pointer;
    transition: all var(--transition); background: var(--surface2);
  }
  .ship-option:hover { border-color: var(--border-hover); }
  .ship-option.selected { border-color: var(--accent); background: var(--accent-dim); }
  .ship-option-left { display: flex; align-items: center; gap: 12px; }
  .ship-radio {
    width: 16px; height: 16px; border-radius: 50%;
    border: 1.5px solid var(--border); flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    transition: all var(--transition);
  }
  .ship-option.selected .ship-radio { border-color: var(--accent); background: var(--accent); }
  .ship-radio-dot { width: 6px; height: 6px; border-radius: 50%; background: #fff; }
  .ship-name { font-size: 14px; font-weight: 600; }
  .ship-days { font-family: var(--mono); font-size: 12px; color: var(--text-muted); }
  .ship-price { font-family: var(--mono); font-size: 14px; color: var(--green); font-weight: 600; }

  /* Payment card input styling */
  .card-number-wrap { position: relative; }
  .card-brand {
    position: absolute; right: 12px; top: 50%; transform: translateY(-50%);
    font-family: var(--mono); font-size: 11px; color: var(--text-muted);
    background: var(--surface2); padding: 2px 6px; border-radius: 4px;
    border: 1px solid var(--border);
  }

  /* Review section */
  .review-items { display: flex; flex-direction: column; gap: 10px; }
  .review-item {
    display: flex; align-items: center; gap: 12px;
    padding: 12px; background: var(--surface2); border: 1px solid var(--border);
    border-radius: var(--radius); font-size: 13px;
  }
  .review-item img { width: 40px; height: 40px; border-radius: 6px; object-fit: cover; flex-shrink: 0; }
  .review-item-info { flex: 1; min-width: 0; }
  .review-item-title { font-weight: 600; }
  .review-item-meta { font-family: var(--mono); font-size: 11px; color: var(--text-muted); margin-top: 2px; }
  .review-item-price { font-family: var(--mono); font-size: 13px; color: var(--green); }

  .review-section { margin-top: 4px; }
  .review-section-label { font-family: var(--mono); font-size: 10px; text-transform: uppercase; letter-spacing: 0.08em; color: var(--text-muted); margin-bottom: 8px; }
  .review-info { font-size: 13px; color: var(--text-dim); font-family: var(--mono); line-height: 1.7; }

  /* CTA button */
  .btn {
    display: inline-flex; align-items: center; justify-content: center; gap: 8px;
    padding: 13px 24px; border-radius: var(--radius-lg); border: none;
    font-family: var(--sans); font-size: 14px; font-weight: 700;
    cursor: pointer; transition: all var(--transition);
  }
  .btn-primary { background: var(--accent); color: #fff; width: 100%; }
  .btn-primary:hover { background: #9080ff; box-shadow: 0 0 24px var(--accent-glow); }
  .btn-primary:disabled { opacity: 0.4; cursor: not-allowed; pointer-events: none; }
  .btn-ghost { background: transparent; color: var(--text-muted); border: 1px solid var(--border); }
  .btn-ghost:hover { background: var(--surface2); color: var(--text); }

  /* ── Right: order summary ── */
  .order-summary {
    width: 320px; flex-shrink: 0;
    background: var(--surface); border: 1px solid var(--border);
    border-radius: var(--radius-lg); padding: 24px;
    position: sticky; top: 40px;
  }
  .summary-title { font-size: 13px; font-weight: 800; color: var(--text); margin-bottom: 16px; text-transform: uppercase; letter-spacing: 0.06em; font-family: var(--mono); }
  .summary-items { display: flex; flex-direction: column; gap: 10px; margin-bottom: 20px; }
  .summary-item { display: flex; align-items: center; gap: 10px; }
  .summary-item img { width: 36px; height: 36px; border-radius: 6px; object-fit: cover; flex-shrink: 0; }
  .summary-item-name { flex: 1; font-size: 12px; font-weight: 600; line-height: 1.3; }
  .summary-item-qty { font-family: var(--mono); font-size: 11px; color: var(--text-muted); }
  .summary-item-price { font-family: var(--mono); font-size: 12px; color: var(--green); flex-shrink: 0; }

  .summary-divider { border: none; border-top: 1px solid var(--border); margin: 16px 0; }
  .summary-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; font-size: 13px; }
  .summary-row-label { color: var(--text-muted); font-family: var(--mono); }
  .summary-row-val { font-family: var(--mono); color: var(--text-dim); }
  .summary-row-total .summary-row-label { font-weight: 700; font-size: 14px; color: var(--text); }
  .summary-row-total .summary-row-val { font-size: 18px; font-weight: 800; color: var(--text); }

  /* Discount input */
  .discount-row { display: flex; gap: 8px; margin-top: 12px; }
  .discount-input {
    flex: 1; padding: 9px 12px; background: var(--surface2); border: 1px solid var(--border);
    border-radius: var(--radius); color: var(--text); font-family: var(--mono); font-size: 13px;
    outline: none; transition: border-color var(--transition);
    text-transform: uppercase;
  }
  .discount-input:focus { border-color: var(--accent); }
  .discount-applied { font-family: var(--mono); font-size: 12px; color: var(--green); margin-top: 6px; }

  /* Spinner */
  .spinner { width: 18px; height: 18px; border: 2px solid rgba(255,255,255,0.3); border-top-color: #fff; border-radius: 50%; animation: spin 0.7s linear infinite; }
  @keyframes spin { to { transform: rotate(360deg); } }

  /* Success state */
  .success-card {
    text-align: center; padding: 48px 32px;
    background: var(--surface); border: 1px solid var(--border);
    border-radius: var(--radius-lg);
  }
  .success-icon { font-size: 52px; margin-bottom: 16px; }
  .success-title { font-size: 22px; font-weight: 800; color: var(--green); margin-bottom: 8px; }
  .success-subtitle { font-size: 14px; color: var(--text-muted); font-family: var(--mono); margin-bottom: 4px; }
  .success-order-id { font-family: var(--mono); font-size: 13px; color: var(--accent); margin-top: 12px; }
  .success-continue { margin-top: 28px; }

  /* Security badge */
  .security-note { display: flex; align-items: center; gap: 6px; font-family: var(--mono); font-size: 11px; color: var(--text-muted); margin-top: 12px; justify-content: center; }

  /* Section nav */
  .section-nav { display: flex; gap: 10px; margin-top: 8px; }

  @media (max-width: 720px) {
    .checkout-inner { flex-direction: column-reverse; }
    .order-summary { width: 100%; position: static; }
    .field-grid-2, .field-grid-3 { grid-template-columns: 1fr; }
  }
`,b=[{key:"address",label:"Address"},{key:"shipping",label:"Shipping"},{key:"payment",label:"Payment"},{key:"review",label:"Review"}];function oe(){const{items:l,total:p}=X()??{items:[],total:0},y=Z(),O=(y==null?void 0:y.clearCart)??(()=>{}),[x,d]=n.useState("address"),[a,B]=n.useState(ee),[u,E]=n.useState(D[0]),[o,R]=n.useState(re),[f,W]=n.useState(""),[C,$]=n.useState(""),[j,F]=n.useState(!1),[s,h]=n.useState({}),[S,z]=n.useState(!1),[U,Y]=n.useState(null),H=.08,N=j?Math.round(p*.1):0,w=p*100,M=u.price,A=Math.round((w-N)*H),q=w-N+M+A,k=b.findIndex(r=>r.key===x),L=n.useCallback(r=>{b.findIndex(t=>t.key===r)<k&&d(r)},[k]),V=()=>{const r={};return f.trim()?/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f)||(r.email="Invalid email"):r.email="Email is required",a.first_name.trim()||(r.first_name="Required"),a.last_name.trim()||(r.last_name="Required"),a.address_1.trim()||(r.address_1="Required"),a.city.trim()||(r.city="Required"),a.state.trim()||(r.state="Required"),a.postal_code.trim()||(r.postal_code="Required"),h(r),Object.keys(r).length===0},K=()=>{const r={};return o.card_number.replace(/\s/g,"").length<16&&(r.card_number="Enter a valid 16-digit card number"),o.expiry.match(/^\d{2}\/\d{2}$/)||(r.expiry="MM/YY format"),o.cvc.length<3&&(r.cvc="3-digit CVC"),o.name_on_card.trim()||(r.name_on_card="Required"),h(r),Object.keys(r).length===0},G=()=>{V()&&(h({}),d("shipping"))},J=()=>{K()&&(h({}),d("review"))},Q=async()=>{z(!0),await new Promise(i=>setTimeout(i,1800));const r=`ORD-${Math.random().toString(36).slice(2,8).toUpperCase()}`;Y(r),O(),d("confirmed"),z(!1)},P=()=>{C.trim().toUpperCase()==="HACKATHON10"&&F(!0)},c=r=>i=>{B(t=>({...t,[r]:i.target.value})),h(t=>{const v={...t};return delete v[r],v})},g=(r,i)=>t=>{const v=i?i(t.target.value):t.target.value;R(_=>({..._,[r]:v})),h(_=>{const T={..._};return delete T[r],T})};return x==="confirmed"?e.jsxs(e.Fragment,{children:[e.jsx("style",{children:I}),e.jsx("div",{className:"checkout-root",children:e.jsx("div",{style:{maxWidth:520,width:"100%"},children:e.jsxs("div",{className:"success-card",children:[e.jsx("div",{className:"success-icon",children:"✅"}),e.jsx("div",{className:"success-title",children:"Order Confirmed!"}),e.jsx("div",{className:"success-subtitle",children:"A confirmation email has been sent to"}),e.jsx("div",{className:"success-subtitle",style:{color:"var(--accent)"},children:f}),e.jsxs("div",{className:"success-order-id",children:["Order ID: ",U]}),e.jsx("div",{className:"success-continue",children:e.jsx("button",{className:"btn btn-ghost",onClick:()=>window.location.reload(),children:"Continue Shopping"})})]})})})]}):e.jsxs(e.Fragment,{children:[e.jsx("style",{children:I}),e.jsxs("div",{className:"checkout-root",children:[e.jsx("div",{style:{width:"100%",maxWidth:960,marginBottom:28},children:e.jsx("h1",{style:{fontSize:26,fontWeight:800,letterSpacing:-.5},children:"Checkout"})}),e.jsxs("div",{className:"checkout-inner",children:[e.jsxs("div",{className:"checkout-form-col",children:[e.jsx("div",{className:"steps",children:b.map((r,i)=>{const t=i<k,v=r.key===x;return e.jsxs("span",{style:{display:"flex",alignItems:"center"},children:[e.jsxs("span",{className:`step-item${v?" active":""}${t?" done":""}`,onClick:()=>t&&L(r.key),children:[e.jsx("span",{className:"step-num",children:t?"✓":i+1}),r.label]}),i<b.length-1&&e.jsx("span",{className:"step-sep",children:"›"})]},r.key)})}),x==="address"&&e.jsxs("div",{className:"card",children:[e.jsxs("div",{className:"card-title",children:[e.jsxs("svg",{className:"card-icon",width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("path",{d:"M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"}),e.jsx("circle",{cx:"12",cy:"10",r:"3"})]}),"Shipping Address"]}),e.jsxs("div",{className:"field-grid",children:[e.jsxs("label",{children:[e.jsx("span",{className:"label-text required",children:"Email"}),e.jsx("input",{type:"email",placeholder:"you@example.com",value:f,onChange:r=>{W(r.target.value),h(i=>{const t={...i};return delete t.email,t})},className:s.email?"error":""}),s.email&&e.jsx("span",{className:"field-error",children:s.email})]}),e.jsxs("div",{className:"field-grid field-grid-2",children:[e.jsxs("label",{children:[e.jsx("span",{className:"label-text required",children:"First name"}),e.jsx("input",{value:a.first_name,onChange:c("first_name"),placeholder:"Jane",className:s.first_name?"error":""}),s.first_name&&e.jsx("span",{className:"field-error",children:s.first_name})]}),e.jsxs("label",{children:[e.jsx("span",{className:"label-text required",children:"Last name"}),e.jsx("input",{value:a.last_name,onChange:c("last_name"),placeholder:"Doe",className:s.last_name?"error":""}),s.last_name&&e.jsx("span",{className:"field-error",children:s.last_name})]})]}),e.jsxs("label",{children:[e.jsx("span",{className:"label-text required",children:"Address"}),e.jsx("input",{value:a.address_1,onChange:c("address_1"),placeholder:"123 Main St",className:s.address_1?"error":""}),s.address_1&&e.jsx("span",{className:"field-error",children:s.address_1})]}),e.jsxs("label",{children:[e.jsx("span",{className:"label-text",children:"Apartment, suite, etc."}),e.jsx("input",{value:a.address_2,onChange:c("address_2"),placeholder:"Apt 4B (optional)"})]}),e.jsxs("div",{className:"field-grid field-grid-3",children:[e.jsxs("label",{children:[e.jsx("span",{className:"label-text required",children:"City"}),e.jsx("input",{value:a.city,onChange:c("city"),placeholder:"San Francisco",className:s.city?"error":""}),s.city&&e.jsx("span",{className:"field-error",children:s.city})]}),e.jsxs("label",{children:[e.jsx("span",{className:"label-text required",children:"State"}),e.jsx("input",{value:a.state,onChange:c("state"),placeholder:"CA",maxLength:2,className:s.state?"error":""}),s.state&&e.jsx("span",{className:"field-error",children:s.state})]}),e.jsxs("label",{children:[e.jsx("span",{className:"label-text required",children:"ZIP"}),e.jsx("input",{value:a.postal_code,onChange:c("postal_code"),placeholder:"94102",className:s.postal_code?"error":""}),s.postal_code&&e.jsx("span",{className:"field-error",children:s.postal_code})]})]}),e.jsxs("label",{children:[e.jsx("span",{className:"label-text",children:"Country"}),e.jsxs("select",{value:a.country_code,onChange:c("country_code"),children:[e.jsx("option",{value:"US",children:"United States"}),e.jsx("option",{value:"CA",children:"Canada"}),e.jsx("option",{value:"GB",children:"United Kingdom"}),e.jsx("option",{value:"IN",children:"India"}),e.jsx("option",{value:"AU",children:"Australia"})]})]}),e.jsxs("label",{children:[e.jsx("span",{className:"label-text",children:"Phone (optional)"}),e.jsx("input",{type:"tel",value:a.phone,onChange:c("phone"),placeholder:"+1 (555) 000-0000"})]})]}),e.jsx("div",{style:{marginTop:24},children:e.jsxs("button",{className:"btn btn-primary",onClick:G,children:["Continue to Shipping",e.jsx("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",children:e.jsx("path",{d:"M5 12h14M12 5l7 7-7 7"})})]})})]}),x==="shipping"&&e.jsxs("div",{className:"card",children:[e.jsxs("div",{className:"card-title",children:[e.jsxs("svg",{className:"card-icon",width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("rect",{x:"1",y:"3",width:"15",height:"13"}),e.jsx("polygon",{points:"16 8 20 8 23 11 23 16 16 16 16 8"}),e.jsx("circle",{cx:"5.5",cy:"18.5",r:"2.5"}),e.jsx("circle",{cx:"18.5",cy:"18.5",r:"2.5"})]}),"Shipping Method"]}),e.jsx("div",{className:"ship-options",children:D.map(r=>e.jsxs("div",{className:`ship-option${u.id===r.id?" selected":""}`,onClick:()=>E(r),children:[e.jsxs("div",{className:"ship-option-left",children:[e.jsx("div",{className:"ship-radio",children:u.id===r.id&&e.jsx("div",{className:"ship-radio-dot"})}),e.jsxs("div",{children:[e.jsx("div",{className:"ship-name",children:r.name}),e.jsxs("div",{className:"ship-days",children:[r.days," business days"]})]})]}),e.jsx("div",{className:"ship-price",children:m(r.price)})]},r.id))}),e.jsxs("div",{className:"section-nav",style:{marginTop:24},children:[e.jsx("button",{className:"btn btn-ghost",onClick:()=>d("address"),style:{flex:1},children:"← Back"}),e.jsxs("button",{className:"btn btn-primary",onClick:()=>d("payment"),style:{flex:2},children:["Continue to Payment",e.jsx("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",children:e.jsx("path",{d:"M5 12h14M12 5l7 7-7 7"})})]})]})]}),x==="payment"&&e.jsxs("div",{className:"card",children:[e.jsxs("div",{className:"card-title",children:[e.jsxs("svg",{className:"card-icon",width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("rect",{x:"1",y:"4",width:"22",height:"16",rx:"2",ry:"2"}),e.jsx("line",{x1:"1",y1:"10",x2:"23",y2:"10"})]}),"Payment Details"]}),e.jsxs("div",{className:"field-grid",children:[e.jsxs("label",{children:[e.jsx("span",{className:"label-text required",children:"Card number"}),e.jsxs("div",{className:"card-number-wrap",children:[e.jsx("input",{value:o.card_number,onChange:g("card_number",se),placeholder:"4242 4242 4242 4242",className:s.card_number?"error":"",inputMode:"numeric"}),e.jsx("span",{className:"card-brand",children:"VISA"})]}),s.card_number&&e.jsx("span",{className:"field-error",children:s.card_number})]}),e.jsxs("label",{children:[e.jsx("span",{className:"label-text required",children:"Name on card"}),e.jsx("input",{value:o.name_on_card,onChange:g("name_on_card"),placeholder:"Jane Doe",className:s.name_on_card?"error":""}),s.name_on_card&&e.jsx("span",{className:"field-error",children:s.name_on_card})]}),e.jsxs("div",{className:"field-grid field-grid-2",children:[e.jsxs("label",{children:[e.jsx("span",{className:"label-text required",children:"Expiry"}),e.jsx("input",{value:o.expiry,onChange:g("expiry",ae),placeholder:"MM/YY",maxLength:5,inputMode:"numeric",className:s.expiry?"error":""}),s.expiry&&e.jsx("span",{className:"field-error",children:s.expiry})]}),e.jsxs("label",{children:[e.jsx("span",{className:"label-text required",children:"CVC"}),e.jsx("input",{value:o.cvc,onChange:g("cvc"),placeholder:"123",maxLength:4,inputMode:"numeric",className:s.cvc?"error":""}),s.cvc&&e.jsx("span",{className:"field-error",children:s.cvc})]})]})]}),e.jsxs("div",{className:"security-note",children:[e.jsxs("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("rect",{x:"3",y:"11",width:"18",height:"11",rx:"2",ry:"2"}),e.jsx("path",{d:"M7 11V7a5 5 0 0 1 10 0v4"})]}),"Payments are encrypted & secure"]}),e.jsxs("div",{className:"section-nav",style:{marginTop:20},children:[e.jsx("button",{className:"btn btn-ghost",onClick:()=>d("shipping"),style:{flex:1},children:"← Back"}),e.jsxs("button",{className:"btn btn-primary",onClick:J,style:{flex:2},children:["Review Order",e.jsx("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",children:e.jsx("path",{d:"M5 12h14M12 5l7 7-7 7"})})]})]})]}),x==="review"&&e.jsxs("div",{className:"card",children:[e.jsxs("div",{className:"card-title",children:[e.jsxs("svg",{className:"card-icon",width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("polyline",{points:"9 11 12 14 22 4"}),e.jsx("path",{d:"M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"})]}),"Review Your Order"]}),e.jsx("div",{className:"review-items",children:l.map(r=>{var i;return e.jsxs("div",{className:"review-item",children:[r.thumbnail&&e.jsx("img",{src:r.thumbnail,alt:r.title}),e.jsxs("div",{className:"review-item-info",children:[e.jsx("div",{className:"review-item-title",children:r.title}),e.jsxs("div",{className:"review-item-meta",children:["Qty ",r.quantity," × $",(i=r.price)==null?void 0:i.toFixed(2)]})]}),e.jsxs("div",{className:"review-item-price",children:["$",((r.price??0)*r.quantity).toFixed(2)]})]},r.id)})}),e.jsxs("div",{style:{marginTop:20,display:"grid",gridTemplateColumns:"1fr 1fr",gap:16},children:[e.jsxs("div",{className:"review-section",children:[e.jsx("div",{className:"review-section-label",children:"Shipping to"}),e.jsxs("div",{className:"review-info",children:[a.first_name," ",a.last_name,e.jsx("br",{}),a.address_1,a.address_2?`, ${a.address_2}`:"",e.jsx("br",{}),a.city,", ",a.state," ",a.postal_code,e.jsx("br",{}),a.country_code]})]}),e.jsxs("div",{className:"review-section",children:[e.jsx("div",{className:"review-section-label",children:"Shipping method"}),e.jsxs("div",{className:"review-info",children:[u.name,e.jsx("br",{}),m(u.price)," · ",u.days," days"]}),e.jsxs("div",{style:{marginTop:12},children:[e.jsx("div",{className:"review-section-label",children:"Payment"}),e.jsxs("div",{className:"review-info",children:["•••• ",o.card_number.replace(/\s/g,"").slice(-4),e.jsx("br",{}),o.name_on_card]})]})]})]}),e.jsxs("div",{className:"section-nav",style:{marginTop:24},children:[e.jsx("button",{className:"btn btn-ghost",onClick:()=>d("payment"),style:{flex:1},children:"← Back"}),e.jsx("button",{className:"btn btn-primary",onClick:Q,disabled:S||l.length===0,style:{flex:2},children:S?e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"spinner"})," Placing order…"]}):e.jsxs(e.Fragment,{children:["Place Order · ",m(q),e.jsx("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",children:e.jsx("path",{d:"M5 12h14M12 5l7 7-7 7"})})]})})]})]})]}),e.jsxs("div",{className:"order-summary",children:[e.jsx("div",{className:"summary-title",children:"Order Summary"}),e.jsx("div",{className:"summary-items",children:l.map(r=>e.jsxs("div",{className:"summary-item",children:[r.thumbnail&&e.jsx("img",{src:r.thumbnail,alt:r.title}),e.jsxs("div",{className:"summary-item-name",children:[r.title,e.jsxs("div",{className:"summary-item-qty",children:["×",r.quantity]})]}),e.jsxs("div",{className:"summary-item-price",children:["$",((r.price??0)*r.quantity).toFixed(2)]})]},r.id))}),e.jsx("hr",{className:"summary-divider"}),j?e.jsx("div",{className:"discount-applied",children:"✓ HACKATHON10 applied — 10% off"}):e.jsxs("div",{className:"discount-row",children:[e.jsx("input",{className:"discount-input",placeholder:"Discount code",value:C,onChange:r=>$(r.target.value),onKeyDown:r=>r.key==="Enter"&&P()}),e.jsx("button",{className:"btn btn-ghost",style:{padding:"9px 14px",fontSize:12},onClick:P,children:"Apply"})]}),e.jsx("hr",{className:"summary-divider"}),e.jsxs("div",{className:"summary-row",children:[e.jsx("span",{className:"summary-row-label",children:"Subtotal"}),e.jsx("span",{className:"summary-row-val",children:m(w)})]}),j&&e.jsxs("div",{className:"summary-row",style:{color:"var(--green)"},children:[e.jsx("span",{className:"summary-row-label",style:{color:"var(--green)"},children:"Discount"}),e.jsxs("span",{children:["−",m(N)]})]}),e.jsxs("div",{className:"summary-row",children:[e.jsx("span",{className:"summary-row-label",children:"Shipping"}),e.jsx("span",{className:"summary-row-val",children:m(M)})]}),e.jsxs("div",{className:"summary-row",children:[e.jsx("span",{className:"summary-row-label",children:"Tax (8%)"}),e.jsx("span",{className:"summary-row-val",children:m(A)})]}),e.jsx("hr",{className:"summary-divider"}),e.jsxs("div",{className:"summary-row summary-row-total",children:[e.jsx("span",{className:"summary-row-label",children:"Total"}),e.jsx("span",{className:"summary-row-val",children:m(q)})]}),e.jsxs("div",{className:"security-note",style:{marginTop:16},children:[e.jsx("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:e.jsx("path",{d:"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"})}),"Protected by 256-bit SSL encryption"]})]})]})]})]})}export{oe as default};
