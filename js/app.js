/**
 * AttKia Moda - Tienda de zapatillas
 * Envíos nacionales por Shalom | WhatsApp: 933484150
 */

const WHATSAPP_NUMERO = '51933484150';
const ENVIO_SHALOM = 5;

// Catálogo dinámico: categoría > modelo > datos del producto
// Para agregar más modelos: solo añadir modelo2, modelo3, etc.
const CATALOGO = {
  hombre: {
    modelo1: {
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
    }
  },
  mujer: {
    modelo1: {
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
    }
  },
  ninos: {
    modelo1: {
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
  }
};

// Código de producto para WhatsApp: H-M1 (Hombre Modelo 1), M-M1, N-M1
const CODIGO_PREFIJO = { hombre: 'H', mujer: 'M', ninos: 'N' };
function getCodigoProducto(categoria, modelo) {
  const pref = CODIGO_PREFIJO[categoria] || 'X';
  const num = (modelo || '').replace(/\D/g, '') || '1';
  return `${pref}-M${num}`;
}

// Estado
let carrito = [];
let carruselIndex = 0;
let fotoElegidaIndex = 0; // foto que el cliente elige para su pedido (envío WhatsApp)
let productoActual = { categoria: null, modelo: null };
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

// Obtener producto del catálogo
function getProducto(categoria, modelo) {
  return CATALOGO[categoria]?.[modelo] || null;
}

// Generar grid de productos dinámicamente desde el catálogo
function renderizarProductos() {
  const secciones = { hombres: 'hombre', mujeres: 'mujer', ninos: 'ninos' };
  for (const [idSeccion, categoria] of Object.entries(secciones)) {
    const grid = document.querySelector(`#${idSeccion} .productos-grid`);
    if (!grid || !CATALOGO[categoria]) continue;
    const modelos = Object.keys(CATALOGO[categoria]);
    grid.innerHTML = modelos.map(modelo => {
      const prod = CATALOGO[categoria][modelo];
      const codigo = getCodigoProducto(categoria, modelo);
      return `
        <article class="producto-card" data-categoria="${categoria}" data-modelo="${modelo}">
          <div class="producto-imagen-wrap">
            <img src="${prod.imagenes[0]}" alt="${prod.nombre}" class="producto-imagen">
            <div class="producto-overlay">
              <button class="btn-ver">Ver más</button>
            </div>
          </div>
          <h3 class="producto-nombre">${prod.nombre}</h3>
          <p class="producto-precio-visible">S/ ${prod.precio}</p>
          <span class="producto-codigo">Cód. ${codigo}</span>
        </article>
      `;
    }).join('');
    grid.querySelectorAll('.producto-card').forEach(card => {
      card.addEventListener('click', () => {
        const cat = card.dataset.categoria;
        const mod = card.dataset.modelo;
        if (getProducto(cat, mod)) abrirModalProducto(cat, mod);
      });
    });
    grid.querySelectorAll('.btn-ver').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const card = btn.closest('.producto-card');
        const cat = card.dataset.categoria;
        const mod = card.dataset.modelo;
        if (getProducto(cat, mod)) abrirModalProducto(cat, mod);
      });
    });
  }
}

// Abrir modal producto
function abrirModalProducto(categoria, modelo) {
  productoActual = { categoria, modelo };
  tallaSeleccionada = null;
  carruselIndex = 0;
  fotoElegidaIndex = 0;
  const prod = getProducto(categoria, modelo);
  if (!prod) return;

  const codigo = getCodigoProducto(categoria, modelo);
  const modelosDisponibles = Object.keys(CATALOGO[categoria] || {});

  modalTitulo.textContent = prod.nombre;
  modalPrecio.textContent = `S/ ${prod.precio}`;
  carruselImg.src = prod.imagenes[0];
  carruselImg.alt = prod.nombre;

  document.getElementById('carruselContainer')?.classList.remove('zoom-activo');

  // Selector de modelo (si hay más de uno)
  const modeloSelectorWrap = document.getElementById('modeloSelectorWrap');
  if (modeloSelectorWrap) {
    modeloSelectorWrap.style.display = modelosDisponibles.length > 1 ? 'block' : 'none';
    modeloSelectorWrap.innerHTML = modelosDisponibles.length > 1 ? `
      <label>Modelo:</label>
      <div class="modelo-btns">
        ${modelosDisponibles.map(m => {
          const p = CATALOGO[categoria][m];
          const cod = getCodigoProducto(categoria, m);
          return `<button type="button" class="modelo-btn ${m === modelo ? 'seleccionado' : ''}" data-modelo="${m}" data-categoria="${categoria}">${cod} - ${p.nombre}</button>`;
        }).join('')}
      </div>
    ` : '';
    modeloSelectorWrap.querySelectorAll('.modelo-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const mod = btn.dataset.modelo;
        const cat = btn.dataset.categoria;
        abrirModalProducto(cat, mod);
      });
    });
  }

  const modalCodigoEl = document.getElementById('modalCodigo');
  if (modalCodigoEl) modalCodigoEl.textContent = `Cód. ${codigo}`;

  // Elige la foto de referencia (thumbnails)
  const fotoThumbnails = document.getElementById('fotoThumbnails');
  if (fotoThumbnails) {
    fotoThumbnails.innerHTML = prod.imagenes.map((src, i) => `
      <button type="button" class="foto-thumb ${i === 0 ? 'seleccionada' : ''}" data-index="${i}" aria-label="Elegir foto ${i + 1}">
        <img src="${src}" alt="">
      </button>
    `).join('');
    fotoThumbnails.querySelectorAll('.foto-thumb').forEach(thumb => {
      thumb.addEventListener('click', () => {
        const idx = parseInt(thumb.dataset.index, 10);
        fotoElegidaIndex = idx;
        carruselIndex = idx;
        actualizarCarrusel();
        fotoThumbnails.querySelectorAll('.foto-thumb').forEach(t => t.classList.remove('seleccionada'));
        thumb.classList.add('seleccionada');
      });
    });
  }

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
      fotoElegidaIndex = idx;
      actualizarCarrusel();
      const thumbs = document.querySelectorAll('.foto-thumb');
      thumbs.forEach((t, i) => t.classList.toggle('seleccionada', i === idx));
    });
  });

  // Zoom al tocar (móvil) en la imagen del carrusel
  const carruselContainer = document.getElementById('carruselContainer');
  if (carruselContainer) {
    carruselContainer.onclick = (e) => {
      if (e.target.closest('.carrusel-btn')) return;
      carruselContainer.classList.toggle('zoom-activo');
    };
  }

  modalProducto.classList.add('activo');
  document.body.style.overflow = 'hidden';
}

// Carrusel
function actualizarCarrusel() {
  const prod = getProducto(productoActual.categoria, productoActual.modelo);
  if (!prod) return;
  carruselImg.src = prod.imagenes[carruselIndex];
  carruselDots.querySelectorAll('.carrusel-dot').forEach((d, i) => {
    d.classList.toggle('activo', i === carruselIndex);
  });
  const thumbs = document.querySelectorAll('.foto-thumb');
  thumbs.forEach((t, i) => t.classList.toggle('seleccionada', i === fotoElegidaIndex));
}

document.querySelector('.carrusel .prev')?.addEventListener('click', (e) => {
  e.stopPropagation();
  const prod = getProducto(productoActual.categoria, productoActual.modelo);
  if (!prod) return;
  carruselIndex = (carruselIndex - 1 + prod.imagenes.length) % prod.imagenes.length;
  fotoElegidaIndex = carruselIndex;
  actualizarCarrusel();
});

document.querySelector('.carrusel .next')?.addEventListener('click', (e) => {
  e.stopPropagation();
  const prod = getProducto(productoActual.categoria, productoActual.modelo);
  if (!prod) return;
  carruselIndex = (carruselIndex + 1) % prod.imagenes.length;
  fotoElegidaIndex = carruselIndex;
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

// Agregar al carrito (usa la foto elegida por el cliente)
btnAddCart?.addEventListener('click', () => {
  if (!tallaSeleccionada) {
    alert('Por favor selecciona una talla.');
    return;
  }
  const prod = getProducto(productoActual.categoria, productoActual.modelo);
  if (!prod) return;
  const codigo = getCodigoProducto(productoActual.categoria, productoActual.modelo);
  const imagenElegida = prod.imagenes[fotoElegidaIndex] ?? prod.imagenes[0];
  carrito.push({
    categoria: productoActual.categoria,
    modelo: productoActual.modelo,
    codigo,
    nombre: prod.nombre,
    precio: prod.precio,
    talla: tallaSeleccionada,
    imagenPrincipal: imagenElegida
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
      <span><strong>${item.codigo || ''}</strong> ${item.nombre} - Talla ${item.talla}</span>
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

  const esUrlAbsoluta = typeof window !== 'undefined' && window.location.protocol?.startsWith('http');
  const pathBase = window.location?.pathname?.replace(/\/[^/]*$/, '') || '';
  const baseUrl = esUrlAbsoluta ? (window.location.origin + pathBase) : '';
  const items = carrito.map(i => {
    const linea = `• *${i.codigo || ''}* ${i.nombre} - Talla ${i.talla} - S/ ${i.precio}`;
    const imgUrl = baseUrl ? `${baseUrl}/${i.imagenPrincipal}` : i.imagenPrincipal;
    return `${linea}\n   📷 ${imgUrl}`;
  }).join('\n');
  const subtotal = carrito.reduce((s, i) => s + i.precio, 0);
  const total = subtotal + ENVIO_SHALOM;

  const mensaje = `*ATTKIA MODA* - Nuevo pedido

*Cliente:* ${nombre}
*Celular:* ${celular}
*Lugar de envío:* ${dist}, ${prov}, ${dep}
*Dirección:* ${direccion}

*Productos (código + imagen):*
${items}

*Subtotal:* S/ ${subtotal}
*Envío Shalom:* S/ ${ENVIO_SHALOM}
*TOTAL:* S/ ${total}

---
Último paso: comunicarse con nuestro asesor de ventas para confirmar.`;

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

// Navegación móvil (hamburguesa)
const navToggle = document.getElementById('navToggle');
const nav = document.getElementById('nav');
const navBackdrop = document.getElementById('navBackdrop');

function cerrarNav() {
  nav?.classList.remove('activo');
  navBackdrop?.classList.remove('activo');
  navToggle?.setAttribute('aria-expanded', 'false');
}

function abrirNav() {
  nav?.classList.add('activo');
  navBackdrop?.classList.add('activo');
  navToggle?.setAttribute('aria-expanded', 'true');
}

navToggle?.addEventListener('click', () => {
  if (nav?.classList.contains('activo')) cerrarNav();
  else abrirNav();
});

navBackdrop?.addEventListener('click', cerrarNav);

nav?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', cerrarNav);
});

// Inicialización
renderizarProductos();
cargarDepartamentos();
actualizarCarrito();
