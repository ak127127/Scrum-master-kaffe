// Bönan & Koppen - Client-side Application

// State
let products = [];
let cart = JSON.parse(localStorage.getItem('bonan-cart')) || [];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  loadProducts();
  updateCartCount();
});

// Load products from API
async function loadProducts() {
  try {
    const response = await fetch('/api/products');
    products = await response.json();
    renderProducts();
  } catch (error) {
    console.error('Kunde inte ladda produkter:', error);
  }
}

// Render products grid
function renderProducts() {
  const grid = document.getElementById('products-grid');
  grid.innerHTML = products.map(product => `
    <article class="product-card" onclick="showProduct('${product.id}')">
      <div class="product-image">
        <img src="${product.image}" alt="${product.name}" loading="lazy">
      </div>
      <div class="product-content">
        <div class="product-roastery">${product.roastery}</div>
        <h3 class="product-name">${product.name}</h3>
        <p class="product-flavor">${product.flavor}</p>
        <div class="product-footer">
          <div class="product-price">${product.price} <span>kr</span></div>
          <button class="btn btn-primary" onclick="event.stopPropagation(); addToCart('${product.id}')">
            + Lägg till
          </button>
        </div>
      </div>
    </article>
  `).join('');
}

// Show product detail
async function showProduct(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const detail = document.getElementById('product-detail');
  detail.innerHTML = `
    <div class="product-detail-image">
      <img src="${product.image}" alt="${product.name}">
    </div>
    <div class="product-detail-info">
      <p class="product-detail-roastery">${product.roastery}</p>
      <h1>${product.name}</h1>
      <p class="product-detail-description">${product.description}</p>
      
      <div class="product-specs">
        <div class="product-spec">
          <span class="product-spec-label">Ursprung</span>
          <span class="product-spec-value">${product.origin}</span>
        </div>
        <div class="product-spec">
          <span class="product-spec-label">Smakprofil</span>
          <span class="product-spec-value">${product.flavor}</span>
        </div>
        <div class="product-spec">
          <span class="product-spec-label">Typ</span>
          <span class="product-spec-value">${product.type}</span>
        </div>
        <div class="product-spec">
          <span class="product-spec-label">Vikt</span>
          <span class="product-spec-value">${product.weight}</span>
        </div>
        <div class="product-spec">
          <span class="product-spec-label">Rostningsdatum</span>
          <span class="product-spec-value">${product.roastDate}</span>
        </div>
      </div>
      
      <div class="product-detail-price">${product.price} kr</div>
      
      <div class="quantity-selector">
        <button class="quantity-btn" onclick="updateProductQuantity(-1)">−</button>
        <span class="quantity-value" id="product-quantity">1</span>
        <button class="quantity-btn" onclick="updateProductQuantity(1)">+</button>
      </div>
      
      <button class="btn btn-primary btn-lg" onclick="addToCartWithQuantity('${product.id}')">
        🛒 Lägg i varukorg
      </button>
    </div>
  `;

  showPage('product');
}

// Product quantity on detail page
let productQuantity = 1;

function updateProductQuantity(delta) {
  productQuantity = Math.max(1, productQuantity + delta);
  document.getElementById('product-quantity').textContent = productQuantity;
}

function addToCartWithQuantity(productId) {
  for (let i = 0; i < productQuantity; i++) {
    addToCart(productId, false);
  }
  productQuantity = 1;
  showToast(`${productQuantity > 1 ? productQuantity + ' st tillagda' : 'Tillagd'} i varukorgen`);
  updateCartCount();
  saveCart();
}

// Cart functions
function addToCart(productId, showMessage = true) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const existingItem = cart.find(item => item.id === productId);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      roastery: product.roastery,
      price: product.price,
      image: product.image,
      quantity: 1
    });
  }

  saveCart();
  updateCartCount();
  if (showMessage) {
    showToast('Tillagd i varukorgen');
  }
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCart();
  updateCartCount();
  renderCart();
}

function updateCartItemQuantity(productId, delta) {
  const item = cart.find(item => item.id === productId);
  if (item) {
    item.quantity += delta;
    if (item.quantity <= 0) {
      removeFromCart(productId);
      return;
    }
  }
  saveCart();
  updateCartCount();
  renderCart();
}

function saveCart() {
  localStorage.setItem('bonan-cart', JSON.stringify(cart));
}

function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById('cart-count').textContent = count;
}

function getCartTotal() {
  return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

// Render cart page
function renderCart() {
  const cartItems = document.getElementById('cart-items');
  const subtotal = getCartTotal();
  const shipping = cart.length > 0 ? 49 : 0;
  const total = subtotal + shipping;

  if (cart.length === 0) {
    cartItems.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">🛒</div>
        <h3>Din varukorg är tom</h3>
        <p>Upptäck våra fantastiska kaffesorter!</p>
        <button class="btn btn-primary" onclick="showPage('home')" style="margin-top: var(--spacing-lg);">
          Se produkter
        </button>
      </div>
    `;
    document.getElementById('cart-summary').style.display = 'none';
  } else {
    cartItems.innerHTML = cart.map(item => `
      <div class="cart-item">
        <div class="cart-item-image"><img src="${item.image}" alt="${item.name}"></div>
        <div class="cart-item-info">
          <h4 class="cart-item-name">${item.name}</h4>
          <p class="cart-item-roastery">${item.roastery}</p>
          <div class="cart-item-actions">
            <div class="quantity-selector">
              <button class="quantity-btn" onclick="updateCartItemQuantity('${item.id}', -1)">−</button>
              <span class="quantity-value">${item.quantity}</span>
              <button class="quantity-btn" onclick="updateCartItemQuantity('${item.id}', 1)">+</button>
            </div>
            <span class="cart-item-price">${item.price * item.quantity} kr</span>
            <button class="remove-btn" onclick="removeFromCart('${item.id}')">Ta bort</button>
          </div>
        </div>
      </div>
    `).join('');

    document.getElementById('cart-summary').style.display = 'block';
  }

  document.getElementById('subtotal').textContent = `${subtotal} kr`;
  document.getElementById('shipping').textContent = cart.length > 0 ? '49 kr' : '0 kr';
  document.getElementById('total').textContent = `${total} kr`;
  document.getElementById('checkout-btn').disabled = cart.length === 0;
}

// Render checkout order summary
function renderOrderSummary() {
  const orderItems = document.getElementById('order-items');
  const subtotal = getCartTotal();
  const total = subtotal + 49;

  orderItems.innerHTML = cart.map(item => `
    <div class="order-item">
      <span class="order-item-name">
        <span class="order-item-qty">${item.quantity}×</span>
        ${item.name}
      </span>
      <span>${item.price * item.quantity} kr</span>
    </div>
  `).join('');

  document.getElementById('order-subtotal').textContent = `${subtotal} kr`;
  document.getElementById('order-total').textContent = `${total} kr`;
}

// Handle checkout
async function handleCheckout(event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);

  const customer = {
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    email: formData.get('email'),
    address: formData.get('address'),
    postalCode: formData.get('postalCode'),
    city: formData.get('city')
  };

  try {
    const response = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: cart, customer })
    });

    const result = await response.json();

    if (result.success) {
      document.getElementById('order-id').textContent = result.orderId;
      cart = [];
      saveCart();
      updateCartCount();
      showPage('success');
    }
  } catch (error) {
    console.error('Checkout failed:', error);
    showToast('Något gick fel. Försök igen.');
  }
}

function continueShopping() {
  showPage('home');
}

// Page navigation
function showPage(pageName) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(page => {
    page.classList.remove('active');
  });

  // Show selected page
  const page = document.getElementById(`page-${pageName}`);
  if (page) {
    page.classList.add('active');
  }

  // Update nav links
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.classList.remove('active');
  });

  if (pageName === 'home') {
    document.querySelector('.nav-links a')?.classList.add('active');
  }

  // Render page-specific content
  if (pageName === 'cart') {
    renderCart();
  } else if (pageName === 'checkout') {
    if (cart.length === 0) {
      showPage('cart');
      return;
    }
    renderOrderSummary();
  }

  // Scroll to top
  window.scrollTo(0, 0);
}

// Toast notification
function showToast(message) {
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');

  toastMessage.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

// Contact form handler
function handleContactForm(event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);

  // Simulate form submission
  console.log('Kontaktformulär:', {
    name: formData.get('name'),
    email: formData.get('email'),
    subject: formData.get('subject'),
    message: formData.get('message')
  });

  // Reset form
  form.reset();

  // Show success message
  showToast('Tack! Vi återkommer så snart vi kan.');
}

// Toggle Mobile Menu
function toggleMenu() {
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  hamburger.classList.toggle("active");
  navLinks.classList.toggle("active");
}

// Close mobile menu when a link is clicked
document.querySelectorAll(".nav-links a").forEach((n) =>
  n.addEventListener("click", () => {
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");
    hamburger.classList.remove("active");
    navLinks.classList.remove("active");
  })
);
