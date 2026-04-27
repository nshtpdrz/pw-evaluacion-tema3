// ==========================================
//  XOCHIQUE — Mini E-commerce
//  evalprac.js
// ==========================================

// Arreglo de productos: cada uno con imagen específica de moda mexicana
const productos = [
  {
    id: 1,
    nombre: "Vestido Nocheztli",
    precio: 1850,
    imagen: "https://images.unsplash.com/photo-1565104552787-dd863a0cf5d6?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?W=600",
    badge: "Nuevo",
    descripcion: "Vestido largo de lino con bordado floral"
  },
  {
    id: 2,
    nombre: "Blusa Quetzal",
    precio: 890,
    imagen: "https://images.unsplash.com/photo-1695051153743-c5e76bc5011f?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?w=600",
    badge: "Bestseller",
    descripcion: "Blusa de algodón con bordado artesanal"
  },
  {
    id: 3,
    nombre: "Falda Xipe",
    precio: 1250,
    imagen: "https://images.unsplash.com/photo-1754244575428-8123e0d27ef3?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?w=600",
    badge: null,
    descripcion: "Falda midi plisada con cintura tejida"
  },
  {
    id: 4,
    nombre: "Vestido Tonatiuh",
    precio: 2100,
    imagen: "https://images.unsplash.com/photo-1743080331401-b5164105b070?q=80&w=765&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?w=600",
    badge: "Edición Limitada",
    descripcion: "Kimono de seda con estampado solar"
  },
  {
    id: 5,
    nombre: "Conjunto Citlali",
    precio: 3200,
    imagen: "https://images.unsplash.com/photo-1762827646148-4f2229937ded?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?w=600",
    badge: "Colección SS25",
    descripcion: "Conjunto dos piezas con detalles bordados"
  }
];

// Arreglo del carrito
let carrito = [];

// ==========================================
//  NAVBAR FUNCIONALIDAD
// ==========================================

// Menú hamburguesa para móvil
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  menuToggle.classList.toggle("active");
  document.body.classList.toggle("menu-open");
});

// Cerrar menú al hacer click en un enlace
document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    menuToggle.classList.remove("active");
    document.body.classList.remove("menu-open");
  });
});

// Scroll suave para los enlaces internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    const targetId = this.getAttribute("href");
    if (targetId === "#") return;
    
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      const navHeight = document.getElementById("navbar").offsetHeight;
      const targetPosition = target.offsetTop - navHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      });
    }
  });
});

// Scroll spy: activar enlace según sección visible
window.addEventListener("scroll", () => {
  const navbar = document.getElementById("navbar");
  const sections = document.querySelectorAll("section[id], header[id], footer[id]");
  const navLinksAll = document.querySelectorAll(".nav-link");
  
  // Navbar scrolled
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
  
  // Scroll spy
  let currentSection = "";
  const navHeight = navbar.offsetHeight;
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop - navHeight - 100;
    if (window.scrollY >= sectionTop) {
      currentSection = section.getAttribute("id");
    }
  });
  
  navLinksAll.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active");
    }
  });
});

// Actualizar contador del carrito en navbar
function actualizarContadorCarrito() {
  const cartCount = document.getElementById("cartCount");
  const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
  cartCount.textContent = totalItems;
  if (totalItems > 0) {
    cartCount.style.display = "flex";
  } else {
    cartCount.style.display = "none";
  }
}

// ==========================================
//  mostrarProductos()
// ==========================================
function mostrarProductos() {
  const contenedor = document.getElementById("productosGrid");
  contenedor.innerHTML = "";

  productos.forEach((producto, index) => {
    contenedor.innerHTML += `
      <div class="producto-card reveal" style="animation-delay: ${index * 0.1}s">
        <div class="producto-img-wrap">
          <img 
            src="${producto.imagen}" 
            alt="${producto.nombre} - ${producto.descripcion}" 
            loading="lazy"
            onerror="this.src='https://via.placeholder.com/600x800/5A3E2B/F4EFEA?text=XOCHIQUE'"
          >
          ${producto.badge ? `<span class="producto-badge">${producto.badge}</span>` : ""}
        </div>
        <div class="producto-info">
          <p class="producto-nombre">${producto.nombre}</p>
          <p class="producto-descripcion">${producto.descripcion}</p>
          <p class="producto-precio">$${producto.precio.toLocaleString("es-MX", { minimumFractionDigits: 2 })} MXN</p>
          <div class="cantidad-wrap">
            <label for="cantidad-${producto.id}">Cant.</label>
            <input
              type="number"
              id="cantidad-${producto.id}"
              class="cantidad-input"
              value="1"
              min="1"
              max="99"
            >
          </div>
          <button class="btn-agregar" onclick="agregarCarrito(${producto.id})">
            <i class="fas fa-plus"></i> Agregar al carrito
          </button>
        </div>
      </div>
    `;
  });

  activarReveal();
}

// ==========================================
//  agregarCarrito(id)
// ==========================================
function agregarCarrito(id) {
  const producto = productos.find(p => p.id === id);
  const cantidadInput = document.getElementById(`cantidad-${id}`);
  const cantidad = parseInt(cantidadInput.value);

  if (isNaN(cantidad) || cantidad <= 0) {
    mostrarToast("⚠ Ingresa una cantidad válida");
    return;
  }

  const productoEnCarrito = carrito.find(item => item.id === id);

  if (productoEnCarrito) {
    productoEnCarrito.cantidad += cantidad;
  } else {
    carrito.push({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      imagen: producto.imagen,
      cantidad: cantidad
    });
  }

  cantidadInput.value = 1;
  mostrarToast(`✓ ${producto.nombre} agregado al carrito`);
  mostrarCarrito();
  actualizarContadorCarrito();
}

// ==========================================
//  eliminarProducto(id)
// ==========================================
function eliminarProducto(id) {
  const producto = carrito.find(item => item.id === id);
  carrito = carrito.filter(item => item.id !== id);
  mostrarCarrito();
  actualizarContadorCarrito();
  mostrarToast(`✕ ${producto.nombre} eliminado del carrito`);
}

// ==========================================
//  mostrarCarrito()
// ==========================================
function mostrarCarrito() {
  const lista = document.getElementById("carrito");
  const totalHTML = document.getElementById("total");

  lista.innerHTML = "";
  let total = 0;

  if (carrito.length === 0) {
    lista.innerHTML = `
      <div class="carrito-vacio">
        <i class="fas fa-shopping-bag" style="font-size: 2rem; margin-bottom: 15px; display: block;"></i>
        <p>Tu carrito está vacío</p>
        <span>¡Añade algo hermoso!</span>
      </div>`;
    totalHTML.innerText = "0.00";
    return;
  }

  carrito.forEach(item => {
    const subtotal = item.precio * item.cantidad;
    total += subtotal;

    lista.innerHTML += `
      <li class="carrito-item">
        <div class="carrito-item-img">
          <img src="${item.imagen}" alt="${item.nombre}" loading="lazy" style="width:50px;height:65px;object-fit:cover;border-radius:2px;">
        </div>
        <div class="carrito-item-info">
          <strong>${item.nombre}</strong>
          <span>Cant: ${item.cantidad} &nbsp;|&nbsp; $${item.precio.toLocaleString("es-MX", { minimumFractionDigits: 2 })} c/u</span>
        </div>
        <div class="carrito-item-right">
          <span class="carrito-item-subtotal">$${subtotal.toLocaleString("es-MX", { minimumFractionDigits: 2 })}</span>
          <button class="btn-eliminar" onclick="eliminarProducto(${item.id})">
            <span>✕ Eliminar</span>
          </button>
        </div>
      </li>
    `;
  });

  totalHTML.innerText = total.toLocaleString("es-MX", { minimumFractionDigits: 2 });
}

// ==========================================
//  vaciarCarrito()
// ==========================================
function vaciarCarrito() {
  if (carrito.length === 0) return;
  carrito = [];
  mostrarCarrito();
  actualizarContadorCarrito();
  mostrarToast("🗑 Carrito vaciado");
}

// ==========================================
//  comprar()
// ==========================================
function comprar() {
  if (carrito.length === 0) {
    mostrarToast("⚠ Agrega productos antes de comprar");
    return;
  }
  const total = carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
  mostrarToast(`🛍 ¡Gracias por tu compra en XOCHIQUE! Total: $${total.toLocaleString("es-MX", { minimumFractionDigits: 2 })} MXN`);
  carrito = [];
  mostrarCarrito();
  actualizarContadorCarrito();
}

// ==========================================
//  mostrarToast(mensaje)
// ==========================================
function mostrarToast(mensaje) {
  const anterior = document.querySelector(".toast");
  if (anterior) anterior.remove();

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = mensaje;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transition = "opacity 0.4s ease";
    setTimeout(() => toast.remove(), 400);
  }, 2800);
}

// ==========================================
//  activarReveal()
// ==========================================
function activarReveal() {
  const elementos = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

  elementos.forEach(el => observer.observe(el));
}

// ==========================================
//  INIT
// ==========================================
mostrarProductos();
mostrarCarrito();
actualizarContadorCarrito();
activarReveal();