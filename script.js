const products = {
    1: { name: "Bluetooth Headset", price: 799, image: "images/bluetooth.jpeg", features: ["Wireless", "Noise Cancellation"] },
    2: { name: "Smartwatch", price: 999, image: "images/watch.jpeg", features: ["Fitness Tracking", "Bluetooth Call"] },
    3: { name: "Wireless Mouse", price: 1299, image: "images/mouse.jpeg", features: ["Ergonomic", "Rechargeable"] },
    4: { name: "Phone Charger", price: 599, image: "images/charger.jpeg", features: ["Fast Charging", "USB-C Support"] },
    5: { name: "Electric Kettle", price: 899, image: "images/Electric-Kettle.jpeg", features: ["1.5L", "Auto Cut-Off"] },
    6: { name: "Induction Cooktop", price: 1499, image: "images/Induction-Cooktop.jpeg", features: ["2000W", "Touch Panel"] }
  };
  
  
  // Cart functionality
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  
  // Save name
  function login() {
    const name = document.getElementById("username").value.trim();
    if (name) {
      localStorage.setItem("username", name);
      window.location.href = "index.html";
    } else {
      alert("Please enter your name.");
    }
  }
  
  // Greet user
  function displayName() {
    const name = localStorage.getItem("username") || "Guest";
    document.getElementById("greeting").innerText = `Hi, ${name}`;
    updateCartCount();
  }
  
  // Add to cart from homepage
  function addToCart(e, id) {
    e.stopPropagation();
    cart.push(id);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
  }
  
  // Add to cart from detail
  function addToCartFromDetail() {
    const id = parseInt(localStorage.getItem("currentProduct"));
    cart.push(id);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    alert("Added to cart!");
  }
  
  function updateCartCount() {
    const cartCount = document.getElementById("cart-count");
    if (cartCount) cartCount.innerText = cart.length;
  }
  
  // Navigate to product detail page
  function viewProduct(id) {
    localStorage.setItem("currentProduct", id);
    window.location.href = "product.html";
  }
  
  // Load detail page
  function loadProductDetail() {
    displayName();
    updateCartCount();
    const id = localStorage.getItem("currentProduct");
    if (!id || !products[id]) return;
  
    const p = products[id];
    document.getElementById("detail-img").src = p.image;
    document.getElementById("detail-title").innerText = p.name;
    document.getElementById("detail-price").innerText = `₹${p.price}`;
    const list = document.getElementById("detail-features");
    list.innerHTML = "";
    p.features.forEach(f => {
      const li = document.createElement("li");
      li.innerText = f;
      list.appendChild(li);
    });
  }
  
  function loadCart() {
    displayName();
    updateCartCount();
    const container = document.getElementById("cart-items");
    const totalBox = document.getElementById("total-price");
  
    if (!container) return;
  
    container.innerHTML = "";
    let total = 0;
  
    if (cart.length === 0) {
      container.innerHTML = "<p>Your cart is empty.</p>";
      totalBox.innerText = 0;
      return;
    }
  
    cart.forEach(id => {
      const p = products[id];
      if (!p) return;
  
      total += p.price;
  
      const div = document.createElement("div");
      div.classList.add("cart-item");
      div.innerHTML = `
        <img src="${p.image}" />
        <div class="cart-item-details">
          <h3>${p.name}</h3>
          <p>Price: ₹${p.price}</p>
        </div>
      `;
      container.appendChild(div);
    });
  
    totalBox.innerText = total;
  }
  
  function checkout() {
    alert("Thank you for your purchase!");
    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
    window.location.href = "index.html";
  }
  