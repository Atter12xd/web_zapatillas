/**
 * AttKia Moda - Tienda de zapatillas
 * Envíos nacionales por Shalom | WhatsApp: 933484150
 */

const WHATSAPP_NUMERO = '51933484150';
const ENVIO_SHALOM = 5;

// Catálogo de productos (hombre, mujer, niños - rutas modelo1)
const CATALOGO = {
  hombre: {
    nombre: 'Zapatilla Cat para hombre',
    precio: 180,
    tallas: [38, 39, 40, 41, 42],
    imagenes: [
      'imagenes/hombres/modelo1/zapatilla_Cat1.jpeg',
      'imagenes/hombres/modelo1/zapatilla_Cat2.jpeg',
      'imagenes/hombres/modelo1/zapatilla_Cat3.jpeg',
      'imagenes/hombres/modelo1/zapatilla_Cat4.jpeg',
      'imagenes/hombres/modelo1/zapatilla_Cat5.jpeg'
    ]
  },
  mujer: {
    nombre: 'Zapatilla Nike para mujer',
    precio: 75,
    tallas: [38, 39, 40, 41, 42],
    imagenes: [
      'imagenes/mujeres/modelo1/ZapatillaNikeMujer1.jpeg',
      'imagenes/mujeres/modelo1/ZapatillaNikeMujer2.jpeg',
      'imagenes/mujeres/modelo1/ZapatillaNikeMujer3.jpeg',
      'imagenes/mujeres/modelo1/ZapatillaNikeMujer4.jpeg',
      'imagenes/mujeres/modelo1/ZapatillaNikeMujer5.jpeg'
    ]
  },
  ninos: {
    nombre: 'Zapatilla Jordans para niños',
    precio: 70,
    tallas: [22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32],
    imagenes: [
      'imagenes/niños/modelo1/ZapatillaNiños1.jpeg',
      'imagenes/niños/modelo1/ZapatillaNiños2.jpeg',
      'imagenes/niños/modelo1/ZapatillaNiños3.jpeg',
      'imagenes/niños/modelo1/ZapatillaNiños4.jpeg',
      'imagenes/niños/modelo1/ZapatillaNiños5.jpeg',
      'imagenes/niños/modelo1/ZapatillaNiños6.jpeg'
    ]
  }
};

// Estado
let carrito = [];
let carruselIndex = 0;
let productoActual = null;
let tallaSeleccionada = null;

// DOM
const modalProducto = document.getElementById('modalProducto');
const modalCarrito = document.getElementById('modalCarrito');
const modalClose = document.getElementById('modalClose');
const carritoClose = document.getElementById('carritoClose');
const cartBtn = document.getElementById('cartBtn');
const cartCount = document.getElementById('cartCount');
const carruselImg = document.getElementById('carruselImg');
const carruselDots = document.getElementById('carruselDots');
const modalTitulo = document.getElementById('modalTitulo');
const modalPrecio = document.getElementById('modalPrecio');
const tallasWrap = document.getElementById('tallasWrap');
const btnAddCart = document.getElementById('btnAddCart');
const carritoItems = document.getElementById('carritoItems');
const subtotalEl = document.getElementById('subtotal');
const totalCarritoEl = document.getElementById('totalCarrito');
const formCheckout = document.getElementById('formCheckout');
const departamentoSelect = document.getElementById('departamento');
const provinciaSelect = document.getElementById('provincia');
const distritoSelect = document.getElementById('distrito');

// Cargar departamentos
function cargarDepartamentos() {
  const depts = Object.keys(UBICACIONES_PERU);
  departamentoSelect.innerHTML = '<option value="">Selecciona departamento</option>' +
    depts.map(d => `<option value="${d}">${d}</option>`).join('');
}

// Cargar provincias al cambiar departamento
function cargarProvincias() {
  const dep = departamentoSelect.value;
  provinciaSelect.disabled = !dep;
  provinciaSelect.innerHTML = '<option value="">Selecciona provincia</option>';
  distritoSelect.disabled = true;
  distritoSelect.innerHTML = '<option value="">Primero selecciona provincia</option>';

  if (dep && UBICACIONES_PERU[dep]) {
    const provs = Object.keys(UBICACIONES_PERU[dep]);
    provinciaSelect.innerHTML += provs.map(p => `<option value="${p}">${p}</option>`).join('');
  }
}

// Cargar distritos al cambiar provincia
function cargarDistritos() {
  const dep = departamentoSelect.value;
  const prov = provinciaSelect.value;
  distritoSelect.disabled = !prov;
  distritoSelect.innerHTML = '<option value="">Selecciona distrito</option>';

  if (dep && prov && UBICACIONES_PERU[dep] && UBICACIONES_PERU[dep][prov]) {
    const dists = UBICACIONES_PERU[dep][prov];
    distritoSelect.innerHTML += dists.map(d => `<option value="${d}">${d}</option>`).join('');
  }
}

departamentoSelect.addEventListener('change', cargarProvincias);
provinciaSelect.addEventListener('change', cargarDistritos);

// Abrir modal producto
document.querySelectorAll('.producto-card').forEach(card => {
  card.addEventListener('click', (e) => {
    const cat = card.dataset.categoria;
    if (!CATALOGO[cat]) return;
    abrirModalProducto(cat);
  });
});

document.querySelectorAll('.btn-ver').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const card = btn.closest('.producto-card');
    const cat = card.dataset.categoria;
    if (CATALOGO[cat]) abrirModalProducto(cat);
  });
});

function abrirModalProducto(categoria) {
  productoActual = categoria;
  tallaSeleccionada = null;
  carruselIndex = 0;
  const prod = CATALOGO[categoria];
  if (!prod) return;

  modalTitulo.textContent = prod.nombre;
  modalPrecio.textContent = `S/ ${prod.precio}`;
  carruselImg.src = prod.imagenes[0];
  carruselImg.alt = prod.nombre;

  // Tallas
  tallasWrap.innerHTML = prod.tallas.map(t => `
    <button type="button" class="talla-btn" data-talla="${t}">${t}</button>
  `).join('');

  tallasWrap.querySelectorAll('.talla-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      tallasWrap.querySelectorAll('.talla-btn').forEach(b => b.classList.remove('seleccionada'));
      btn.classList.add('seleccionada');
      tallaSeleccionada = parseInt(btn.dataset.talla);
    });
  });

  // Dots carrusel
  carruselDots.innerHTML = prod.imagenes.map((_, i) =>
    `<button type="button" class="carrusel-dot ${i === 0 ? 'activo' : ''}" data-index="${i}" aria-label="Ver imagen ${i + 1}"></button>`
  ).join('');

  carruselDots.querySelectorAll('.carrusel-dot').forEach(dot => {
    dot.addEventListener('click', () => {
      const idx = parseInt(dot.dataset.index);
      carruselIndex = idx;
      actualizarCarrusel();
    });
  });

  modalProducto.classList.add('activo');
  document.body.style.overflow = 'hidden';
}

// Carrusel
function actualizarCarrusel() {
  const prod = CATALOGO[productoActual];
  if (!prod) return;
  carruselImg.src = prod.imagenes[carruselIndex];
  carruselDots.querySelectorAll('.carrusel-dot').forEach((d, i) => {
    d.classList.toggle('activo', i === carruselIndex);
  });
}

document.querySelector('.carrusel .prev')?.addEventListener('click', () => {
  const prod = CATALOGO[productoActual];
  if (!prod) return;
  carruselIndex = (carruselIndex - 1 + prod.imagenes.length) % prod.imagenes.length;
  actualizarCarrusel();
});

document.querySelector('.carrusel .next')?.addEventListener('click', () => {
  const prod = CATALOGO[productoActual];
  if (!prod) return;
  carruselIndex = (carruselIndex + 1) % prod.imagenes.length;
  actualizarCarrusel();
});

// Cerrar modales
function cerrarModal(el) {
  el.classList.remove('activo');
  document.body.style.overflow = '';
}

modalClose?.addEventListener('click', () => cerrarModal(modalProducto));
carritoClose?.addEventListener('click', () => cerrarModal(modalCarrito));

modalProducto?.addEventListener('click', (e) => {
  if (e.target === modalProducto) cerrarModal(modalProducto);
});
modalCarrito?.addEventListener('click', (e) => {
  if (e.target === modalCarrito) cerrarModal(modalCarrito);
});

// Agregar al carrito
btnAddCart?.addEventListener('click', () => {
  if (!tallaSeleccionada) {
    alert('Por favor selecciona una talla.');
    return;
  }
  const prod = CATALOGO[productoActual];
  if (!prod) return;
  carrito.push({
    categoria: productoActual,
    nombre: prod.nombre,
    precio: prod.precio,
    talla: tallaSeleccionada
  });
  actualizarCarrito();
  cerrarModal(modalProducto);
  // Abrir carrito
  modalCarrito.classList.add('activo');
  document.body.style.overflow = 'hidden';
});

// Quitar producto del carrito
function quitarDelCarrito(index) {
  carrito.splice(index, 1);
  actualizarCarrito();
}

// Actualizar carrito
function actualizarCarrito() {
  cartCount.textContent = carrito.length;
  const subtotal = carrito.reduce((s, i) => s + i.precio, 0);
  const total = subtotal + ENVIO_SHALOM;

  carritoItems.innerHTML = carrito.map((item, i) => `
    <div class="carrito-item" data-index="${i}">
      <span>${item.nombre} - Talla ${item.talla}</span>
      <div class="carrito-item-right">
        <span>S/ ${item.precio}</span>
        <button type="button" class="btn-quitar" aria-label="Quitar producto" data-index="${i}">✕</button>
      </div>
    </div>
  `).join('') || '<p class="carrito-vacio">Carrito vacío</p>';

  carritoItems.querySelectorAll('.btn-quitar').forEach(btn => {
    btn.addEventListener('click', () => quitarDelCarrito(parseInt(btn.dataset.index)));
  });

  subtotalEl.textContent = `S/ ${subtotal}`;
  totalCarritoEl.textContent = `S/ ${total}`;
}

cartBtn?.addEventListener('click', () => {
  if (carrito.length === 0) {
    alert('Tu carrito está vacío. Agrega productos primero.');
    return;
  }
  modalCarrito.classList.add('activo');
  document.body.style.overflow = 'hidden';
});

// Enviar a WhatsApp
formCheckout?.addEventListener('submit', (e) => {
  e.preventDefault();
  if (carrito.length === 0) {
    alert('Tu carrito está vacío. Agrega productos primero.');
    return;
  }
  const nombre = document.getElementById('nombre').value.trim();
  const celular = document.getElementById('celular').value.trim();
  const dep = departamentoSelect.value;
  const prov = provinciaSelect.value;
  const dist = distritoSelect.value;
  const direccion = document.getElementById('direccion').value.trim();

  const items = carrito.map(i => `• ${i.nombre} - Talla ${i.talla} - S/ ${i.precio}`).join('\n');
  const subtotal = carrito.reduce((s, i) => s + i.precio, 0);
  const total = subtotal + ENVIO_SHALOM;

  const mensaje = `*ATTKIA MODA* - Nuevo pedido

*Cliente:* ${nombre}
*Celular:* ${celular}
*Lugar de envío:* ${dist}, ${prov}, ${dep}
*Dirección:* ${direccion}

*Productos:*
${items}

*Subtotal:* S/ ${subtotal}
*Envío Shalom:* S/ ${ENVIO_SHALOM}
*TOTAL:* S/ ${total}

---
Último paso para adquirir el producto: comunicarse con nuestro asesor de ventas.`;

  const url = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensaje)}`;
  window.open(url, '_blank');

  // Limpiar carrito
  carrito = [];
  actualizarCarrito();
  formCheckout.reset();
  provinciaSelect.disabled = true;
  distritoSelect.disabled = true;
  cerrarModal(modalCarrito);
});

// Hero carrusel - inicializar cuando el DOM esté listo
function initHeroCarrusel() {
  const heroSlides = document.querySelectorAll('.hero-slide');
  const heroDotsContainer = document.getElementById('heroDots');
  let heroIndex = 0;

  if (!heroSlides.length || !heroDotsContainer) return;

  heroDotsContainer.innerHTML = Array.from(heroSlides).map((_, i) =>
    `<button type="button" class="hero-dot ${i === 0 ? 'activo' : ''}" data-index="${i}" aria-label="Slide ${i + 1}"></button>`
  ).join('');

  function actualizarHero() {
    heroSlides.forEach((s, i) => s.classList.toggle('activo', i === heroIndex));
    const dots = heroDotsContainer.querySelectorAll('.hero-dot');
    dots.forEach((d, i) => d.classList.toggle('activo', i === heroIndex));
  }

  const btnPrev = document.querySelector('.hero-carrusel .hero-carrusel-btn.prev');
  const btnNext = document.querySelector('.hero-carrusel .hero-carrusel-btn.next');

  if (btnPrev) {
    btnPrev.addEventListener('click', () => {
      heroIndex = (heroIndex - 1 + heroSlides.length) % heroSlides.length;
      actualizarHero();
    });
  }
  if (btnNext) {
    btnNext.addEventListener('click', () => {
      heroIndex = (heroIndex + 1) % heroSlides.length;
      actualizarHero();
    });
  }

  heroDotsContainer.querySelectorAll('.hero-dot').forEach(dot => {
    dot.addEventListener('click', () => {
      heroIndex = parseInt(dot.dataset.index, 10);
      actualizarHero();
    });
  });

  setInterval(() => {
    heroIndex = (heroIndex + 1) % heroSlides.length;
    actualizarHero();
  }, 4500);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initHeroCarrusel);
} else {
  initHeroCarrusel();
}

// Testimonios carrusel
const testimoniosTrack = document.querySelector('.testimonios-track');
const testimonioCards = document.querySelectorAll('.testimonio-card');
const testimoniosDotsContainer = document.getElementById('testimoniosDots');
let testimonioIndex = 0;

if (testimonioCards.length && testimoniosTrack && testimoniosDotsContainer) {
  testimoniosDotsContainer.innerHTML = Array.from(testimonioCards).map((_, i) =>
    `<button type="button" class="testimonio-dot ${i === 0 ? 'activo' : ''}" data-index="${i}"></button>`
  ).join('');

  function scrollTestimonio() {
    const card = testimonioCards[testimonioIndex];
    if (card) card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    testimoniosDotsContainer.querySelectorAll('.testimonio-dot').forEach((d, i) => d.classList.toggle('activo', i === testimonioIndex));
  }

  document.querySelector('.testimonio-btn.prev')?.addEventListener('click', () => {
    testimonioIndex = Math.max(0, testimonioIndex - 1);
    scrollTestimonio();
  });
  document.querySelector('.testimonio-btn.next')?.addEventListener('click', () => {
    testimonioIndex = Math.min(testimonioCards.length - 1, testimonioIndex + 1);
    scrollTestimonio();
  });
  testimoniosDotsContainer.querySelectorAll('.testimonio-dot').forEach(dot => {
    dot.addEventListener('click', () => {
      testimonioIndex = parseInt(dot.dataset.index);
      scrollTestimonio();
    });
  });
}

// Inicialización
cargarDepartamentos();
actualizarCarrito();
