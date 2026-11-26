
import React, { useMemo, useState } from "react";
import "./App.css";

const WHATSAPP = "923264288346";
const EMAIL = "haramarshad804@gmail.com";

const products = [
  { id: 1, name: "Fit Me Matte Foundation", brand: "Maybelline", category: "Foundation", price: 1850, old: 2300, rating: 4.8, tag: "Best Seller", image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=700" },
  { id: 2, name: "Velvet Matte Lipstick", brand: "MAC", category: "Lipstick", price: 1450, old: 1800, rating: 4.9, tag: "Popular", image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=700" },
  { id: 3, name: "Lash Sensational Mascara", brand: "Maybelline", category: "Mascara", price: 1200, old: 1500, rating: 4.7, tag: "Trending", image: "https://images.unsplash.com/photo-1631214540242-5f4a8f5e?auto=format&fit=crop&w=700" },
  { id: 4, name: "Soft Glow Blush", brand: "e.l.f.", category: "Blush", price: 950, old: 1200, rating: 4.8, tag: "Affordable", image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=700" },
  { id: 5, name: "Nude Eyeshadow Palette", brand: "NYX", category: "Eyeshadow", price: 2100, old: 2600, rating: 4.9, tag: "New", image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=700" },
  { id: 6, name: "True Match Foundation", brand: "L'Oréal", category: "Foundation", price: 2450, old: 2900, rating: 4.8, tag: "Best Seller", image: "https://images.unsplash.com/photo-1596704017254-9b121068fb31?w=700" },
  { id: 7, name: "Hydrating Lip Gloss", brand: "NYX", category: "Lipstick", price: 850, old: 1100, rating: 4.6, tag: "Trending", image: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=700" },
  { id: 8, name: "Liquid Highlighter", brand: "e.l.f.", category: "Highlighter", price: 1150, old: 1450, rating: 4.7, tag: "Glow", image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=700" },
  { id: 9, name: "Rose Gold Makeup Kit", brand: "Huda Beauty", category: "Makeup Kit", price: 3200, old: 3900, rating: 4.9, tag: "Premium", image: "https://images.unsplash.com/photo-1599733589046-8331c3e5c3e4?w=700" },
  { id: 10, name: "Daily Glow Skincare Set", brand: "The Ordinary", category: "Skincare", price: 1950, old: 2400, rating: 4.8, tag: "Self Care", image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=700" },
  { id: 11, name: "Waterproof Eyeliner", brand: "Maybelline", category: "Eyeliner", price: 750, old: 950, rating: 4.6, tag: "Affordable", image: "https://images.unsplash.com/photo-1512207846876-bb54ef5056fe?w=700" },
  { id: 12, name: "Luxury Makeup Brushes", brand: "Real Techniques", category: "Brushes", price: 1650, old: 2100, rating: 4.9, tag: "Must Have", image: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=700" }
];

const categories = ["All", "Lipstick", "Foundation", "Mascara", "Blush", "Eyeshadow", "Highlighter", "Skincare", "Makeup Kit", "Eyeliner", "Brushes"];

const money = (amount) => `Rs. ${amount.toLocaleString("en-PK")}`;

function App() {
  const [cart, setCart] = useState([]);
  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState("home");
  const [cartOpen, setCartOpen] = useState(false);
  const [notice, setNotice] = useState("");

  const [customer, setCustomer] = useState({
    name: "", phone: "", city: "", address: "", notes: ""
  });

  const filtered = useMemo(() => products.filter((p) =>
    (category === "All" || p.category === category) &&
    (brand === "All" || p.brand === brand) &&
    `${p.name} ${p.brand} ${p.category}`.toLowerCase().includes(search.toLowerCase())
  ), [category, brand, search]);

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  function addToCart(product) {
    setCart(current => {
      const existing = current.find(item => item.id === product.id);
      return existing
        ? current.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item)
        : [...current, { ...product, qty: 1 }];
    });
    setNotice(`${product.name} added to your bag!`);
    setTimeout(() => setNotice(""), 2500);
  }

  function changeQty(id, amount) {
    setCart(current => current
      .map(item => item.id === id ? { ...item, qty: item.qty + amount } : item)
      .filter(item => item.qty > 0)
    );
  }

  function removeItem(id) {
    setCart(current => current.filter(item => item.id !== id));
  }

  function buyNow(product) {
    addToCart(product);
    setPage("order");
    setCartOpen(false);
  }

  function openWhatsApp(message) {
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`, "_blank");
  }

  function submitOrder(e) {
    e.preventDefault();

    if (!cart.length) {
      setNotice("Please add products to your bag first.");
      return;
    }

    const orderItems = cart.map(item =>
      `${item.name} (${item.brand}) x ${item.qty} = ${money(item.price * item.qty)}`
    ).join("\n");

    const message = `Hello H❤H Luxe Beauty! I want to place an order.\n\nCustomer: ${customer.name}\nPhone: ${customer.phone}\nCity: ${customer.city}\nAddress: ${customer.address}\n\nProducts:\n${orderItems}\n\nTotal: ${money(total)}\nNotes: ${customer.notes || "None"}\n\nPlease confirm my order.`;

    openWhatsApp(message);
    setNotice("Your order message is ready on WhatsApp!");
  }

  const brands = ["All", "Maybelline", "L'Oréal", "NYX", "MAC", "e.l.f.", "Huda Beauty", "The Ordinary", "Real Techniques"];

  return (
    <div className="app">
      <div className="top-strip">✨ BEAUTY THAT FITS YOUR BUDGET | SPECIAL OFFERS JUST FOR YOU ✨</div>

      <header className="navbar">
        <a className="logo" href="#home" onClick={() => setPage("home")}>
          H<span>❤</span>H <small>LUXE BEAUTY</small>
        </a>

        <nav>
          <button onClick={() => { setPage("home"); setCategory("All"); }}>Home</button>
          <button onClick={() => { setPage("shop"); setCategory("All"); }}>Shop</button>
          <button onClick={() => { setPage("shop"); setBrand("All"); }}>Brands</button>
          <button onClick={() => setPage("about")}>About Us</button>
          <button onClick={() => setPage("contact")}>Contact</button>
        </nav>

        <div className="nav-actions">
          <button className="cart-button" onClick={() => setCartOpen(true)}>
            🛍️ Bag <span>{totalItems}</span>
          </button>
          <button className="menu-order" onClick={() => setPage("order")}>Order Now</button>
        </div>
      </header>

      {notice && <div className="toast">{notice}</div>}

      {page === "home" && (
        <>
          <section className="hero" id="home">
            <div className="hero-content">
              <p className="eyebrow">WELCOME TO YOUR BEAUTY DESTINATION</p>
              <h1>Beauty is an art.<br /><span>Make it yours.</span></h1>
              <p>Discover your favorite makeup brands, beautiful shades and luxury beauty essentials at prices you'll love.</p>
              <div className="hero-buttons">
                <button className="primary-btn" onClick={() => setPage("shop")}>Explore Collection →</button>
                <button className="outline-btn" onClick={() => setPage("about")}>Discover Our Story</button>
              </div>
              <div className="hero-stats">
                <div><strong>12+</strong><small>Beauty Picks</small></div>
                <div><strong>09</strong><small>Beauty Brands</small></div>
                <div><strong>100%</strong><small>Love & Care</small></div>
              </div>
            </div>
            <div className="hero-image">
              <img src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1100" alt="Luxury makeup collection" />
              <div className="floating-card">💗 Your beauty, your rules</div>
              <div className="round-label">LUXE<br />BEAUTY</div>
            </div>
          </section>

          <section className="promo">
            <div>💄 Premium Beauty</div><div>♡ Affordable Prices</div><div>🎀 Your Favorite Brands</div><div>✨ Easy Online Ordering</div>
          </section>

          <section className="section">
            <div className="section-heading">
              <p className="eyebrow">SHOP YOUR FAVORITES</p>
              <h2>Explore <span>Categories</span></h2>
              <p>Everything you need to feel beautiful and confident.</p>
            </div>
            <div className="category-grid">
              {categories.slice(1, 9).map((item, i) => (
                <button className="category-card" key={item} onClick={() => { setCategory(item); setPage("shop"); }}>
                  <span>{["💋", "🧴", "👁️", "🌸", "🎨", "✨", "🫧", "🎁"][i]}</span>
                  <strong>{item}</strong>
                  <small>Explore Collection →</small>
                </button>
              ))}
            </div>
          </section>

          <section className="section featured">
            <div className="section-heading">
              <p className="eyebrow">HANDPICKED FOR YOU</p>
              <h2>Our <span>Best Sellers</span></h2>
              <p>Beauty essentials that deserve a place in your collection.</p>
            </div>
            <div className="product-grid">
              {products.slice(0, 4).map(product => (
                <ProductCard key={product.id} product={product} addToCart={addToCart} buyNow={buyNow} />
              ))}
            </div>
            <button className="primary-btn centered" onClick={() => setPage("shop")}>View All Products →</button>
          </section>

          <section className="quote-banner">
            <p>“Invest in your skin. It is going to represent you for a very long time.”</p>
            <span>— H❤H Luxe Beauty</span>
          </section>
        </>
      )}

      {page === "shop" && (
        <section className="section shop-page">
          <div className="section-heading">
            <p className="eyebrow">YOUR BEAUTY COLLECTION</p>
            <h2>Shop <span>All Products</span></h2>
            <p>Find your favorite beauty essentials at affordable prices.</p>
          </div>
          <div className="filters">
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍 Search makeup products..." />
            <select value={category} onChange={e => setCategory(e.target.value)}>
              {categories.map(c => <option key={c}>{c}</option>)}
            </select>
            <select value={brand} onChange={e => setBrand(e.target.value)}>
              {brands.map(b => <option key={b}>{b}</option>)}
            </select>
          </div>
          <p className="result-count">{filtered.length} products found</p>
          <div className="product-grid">
            {filtered.map(product => <ProductCard key={product.id} product={product} addToCart={addToCart} buyNow={buyNow} />)}
          </div>
          {filtered.length === 0 && <p className="empty">No products found. Try another search.</p>}
        </section>
      )}

      {page === "order" && (
        <section className="section order-page">
          <div className="section-heading">
            <p className="eyebrow">JUST A FEW MORE STEPS</p>
            <h2>Complete Your <span>Order</span></h2>
            <p>Fill in your details and place your order through WhatsApp.</p>
          </div>
          <div className="order-layout">
            <form className="order-form" onSubmit={submitOrder}>
              <h3>Customer Information</h3>
              <label>Full Name *</label>
              <input required value={customer.name} onChange={e => setCustomer({...customer, name: e.target.value})} placeholder="Enter your full name" />
              <label>Phone Number *</label>
              <input required type="tel" pattern="[0-9+() -]{7,20}" value={customer.phone} onChange={e => setCustomer({...customer, phone: e.target.value})} placeholder="03XXXXXXXXX" />
              <label>City *</label>
              <input required value={customer.city} onChange={e => setCustomer({...customer, city: e.target.value})} placeholder="Your city" />
              <label>Complete Delivery Address *</label>
              <textarea required rows="4" value={customer.address} onChange={e => setCustomer({...customer, address: e.target.value})} placeholder="House number, street, area, city..." />
              <label>Additional Notes (Optional)</label>
              <textarea rows="2" value={customer.notes} onChange={e => setCustomer({...customer, notes: e.target.value})} placeholder="Any special instructions?" />
              <button type="submit" className="primary-btn full">💗 Place Order on WhatsApp</button>
              <p className="form-note">Your WhatsApp will open with your order details ready to send.</p>
            </form>
            <div className="order-summary">
              <h3>Your Shopping Bag</h3>
              {cart.length === 0 ? (
                <div className="empty">Your bag is empty.<br /><button className="text-btn" onClick={() => setPage("shop")}>Shop Products →</button></div>
              ) : cart.map(item => (
                <div className="summary-item" key={item.id}>
                  <img src={item.image} alt={item.name} />
                  <div><strong>{item.name}</strong><small>{item.brand} · Qty: {item.qty}</small><b>{money(item.price * item.qty)}</b></div>
                  <button onClick={() => removeItem(item.id)}>✕</button>
                </div>
              ))}
              <div className="total-row"><span>Total</span><strong>{money(total)}</strong></div>
              <small className="form-note">Delivery charges, if any, will be confirmed with you.</small>
            </div>
          </div>
        </section>
      )}

      {page === "about" && (
        <section className="section about-page">
          <div className="section-heading">
            <p className="eyebrow">OUR LITTLE BEAUTY WORLD</p>
            <h2>About <span>H❤H Luxe Beauty</span></h2>
          </div>
          <div className="about-content">
            <img src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=900" alt="Beauty products" />
            <div>
              <h2>Every woman deserves to feel <span>beautiful.</span></h2>
              <p>H❤H Luxe Beauty is an online makeup shopping destination created with love by Haram. Our goal is to bring together beautiful makeup essentials from different beauty brands at affordable prices.</p>
              <p>From everyday makeup to glamorous looks, discover products that help you express your own style.</p>
              <button className="primary-btn" onClick={() => setPage("shop")}>Explore Our Products →</button>
            </div>
          </div>
        </section>
      )}

      {page === "contact" && (
        <section className="section contact-page">
          <div className="section-heading">
            <p className="eyebrow">WE WOULD LOVE TO HEAR FROM YOU</p>
            <h2>Get In <span>Touch</span></h2>
            <p>Questions about products or orders? Contact us anytime.</p>
          </div>
          <div className="contact-grid">
            <div className="contact-card"><span>💬</span><h3>WhatsApp</h3><p>Chat with us for easy orders.</p><a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noreferrer">03264288346</a></div>
            <div className="contact-card"><span>✉️</span><h3>Email Us</h3><p>Send us your questions.</p><a href={`mailto:${EMAIL}`}>{EMAIL}</a></div>
            <div className="contact-card"><span>🛍️</span><h3>Online Orders</h3><p>Shop your favorite beauty products.</p><button className="primary-btn" onClick={() => setPage("shop")}>Shop Now</button></div>
          </div>
        </section>
      )}

      <footer>
        <div className="footer-main">
          <div><a className="logo footer-logo" href="#home" onClick={() => setPage("home")}>H<span>❤</span>H <small>LUXE BEAUTY</small></a><p>Your beauty, our passion. Discover affordable luxury with every purchase.</p></div>
          <div><h4>Quick Links</h4><button onClick={() => setPage("home")}>Home</button><button onClick={() => setPage("shop")}>Shop</button><button onClick={() => setPage("about")}>About</button></div>
          <div><h4>Contact</h4><a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noreferrer">WhatsApp: 03264288346</a><a href={`mailto:${EMAIL}`}>{EMAIL}</a></div>
        </div>
        <div className="copyright">© 2026 H❤H Luxe Beauty | Created with 💗 by Haram</div>
      </footer>

      {cartOpen && (
        <div className="drawer-backdrop" onClick={() => setCartOpen(false)}>
          <div className="cart-drawer" onClick={e => e.stopPropagation()}>
            <div className="drawer-heading"><h2>My Shopping Bag 🛍️</h2><button onClick={() => setCartOpen(false)}>✕</button></div>
            {cart.length === 0 ? <p className="empty">Your shopping bag is empty.</p> : cart.map(item => (
              <div className="cart-item" key={item.id}>
                <img src={item.image} alt={item.name} />
                <div className="cart-info"><strong>{item.name}</strong><small>{money(item.price)}</small><div className="quantity"><button onClick={() => changeQty(item.id, -1)}>−</button><span>{item.qty}</span><button onClick={() => changeQty(item.id, 1)}>+</button></div></div>
                <button className="remove" onClick={() => removeItem(item.id)}>🗑️</button>
              </div>
            ))}
            <div className="drawer-total"><span>Subtotal</span><strong>{money(total)}</strong></div>
            <button className="primary-btn full" disabled={!cart.length} onClick={() => { setPage("order"); setCartOpen(false); }}>Proceed to Order →</button>
            <button className="outline-btn full" onClick={() => setCartOpen(false)}>Continue Shopping</button>
          </div>
        </div>
      )}
    </div>
  );
}

function ProductCard({ product, addToCart, buyNow }) {
  return (
    <article className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.name} loading="lazy" />
        <span className="product-tag">{product.tag}</span>
        <button className="quick-add" onClick={() => addToCart(product)}>＋</button>
      </div>
      <div className="product-info">
        <div className="product-brand">{product.brand}</div>
        <h3>{product.name}</h3>
        <div className="rating">★★★★★ <small>{product.rating}</small></div>
        <div className="price-row"><strong>{money(product.price)}</strong><del>{money(product.old)}</del></div>
        <div className="product-actions">
          <button className="add-btn" onClick={() => addToCart(product)}>Add to Bag</button>
          <button className="buy-btn" onClick={() => buyNow(product)}>Buy Now</button>
        </div>
      </div>
    </article>
  );
}

export default App;

function submitEmailOrder() {
  if (!cart.length) {
    setNotice("Please add products to your bag first.");
    return;
  }

  const items = cart.map(item =>
    `${item.name} x ${item.qty} - ${money(item.price * item.qty)}`
  ).join("\n");

  const subject = "New H❤H Luxe Beauty Order";
  const body = `Customer: ${customer.name}
Phone: ${customer.phone}
City: ${customer.city}
Address: ${customer.address}

Products:
${items}

Total: ${money(total)}
Notes: ${customer.notes}`;

  window.location.href =
    `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

<button
  type="button"
  className="outline-btn full"
  onClick={submitEmailOrder}
>
  ✉️ Place Order via Email
</button>
