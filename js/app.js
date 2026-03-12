/**
 * AttKia Moda - Tienda de zapatillas
 * Envíos nacionales por Shalom | WhatsApp: 933484150
 */

const WHATSAPP_NUMERO = '51933484150';

// Debug: log 404 en consola para ver recursos que no cargan
function log404(url) {
  console.warn('[AttKia] Recurso no encontrado (404):', url);
  console.warn('→ Verifica que el archivo exista en la carpeta correcta');
}
const ENVIO_SHALOM = 5;        // Precio promocional (cliente paga esto)
const ENVIO_SHALOM_NORMAL = 10; // Precio normal, para mostrar el descuento

// Catálogo dinámico: categoría > modelo > datos del producto
// Para agregar más modelos: solo añadir modelo2, modelo3, etc.
const CATALOGO = {
  hombre: {
    modelo1: {
      nombre: 'Jordan Retro 4',
      precio: 80,
      tallas: [39, 40, 41, 42, 43],
      imagenes: [
        'imagenes/hombres/modelo8/zapatillayordans6.jpeg',
        'imagenes/hombres/modelo8/zapatillayordans7.jpeg',
        'imagenes/hombres/modelo8/zapatillayordans8.jpeg',
        'imagenes/hombres/modelo8/zapatillayordans9.jpeg',
        'imagenes/hombres/modelo8/zapatillayordans10.jpeg'
      ]
    },
    modelo2: {
      nombre: 'Zapatilla Adidas para hombre',
      precio: 65,
      tallas: [38, 39, 40, 41, 42, 43],
      imagenes: [
        'imagenes/hombres/modelo2/zapatillaAdidasH1.jpeg',
        'imagenes/hombres/modelo2/zapatillaAdidasH2.jpeg'
      ]
    },
    modelo3: {
      nombre: 'Zapatilla Reebok para hombre',
      precio: 70,
      tallas: [39, 40, 41, 42, 43],
      imagenes: [
        'imagenes/hombres/modelo3/ZapatillaReebok1.jpeg',
        'imagenes/hombres/modelo3/ZapatillaReebok2.jpeg',
        'imagenes/hombres/modelo3/ZapatillaReebok3.jpeg',
        'imagenes/hombres/modelo3/ZapatillaReebok4.jpeg',
        'imagenes/hombres/modelo3/ZapatillaReebok5.jpeg'
      ]
    },
    modelo4: {
      nombre: 'Zapatilla Reebok',
      precio: 75,
      tallas: [39, 40, 41, 42, 43],
      imagenes: [
        'imagenes/hombres/modelo4/ZapatillaReebok6.jpeg',
        'imagenes/hombres/modelo4/ZapatillaReebok7.jpeg',
        'imagenes/hombres/modelo4/ZapatillaReebok8.jpeg',
        'imagenes/hombres/modelo4/ZapatillaReebok9.jpeg',
        'imagenes/hombres/modelo4/ZapatillaReebok10.jpeg',
        'imagenes/hombres/modelo4/ZapatillaReebok11.jpeg'
      ]
    },
    modelo5: {
      nombre: 'Zapatillas Brixton',
      precio: 70,
      tallas: [39, 40, 41, 42],
      imagenes: [
        'imagenes/hombres/modelo5/zapatillaBRIXTON1.jpeg',
        'imagenes/hombres/modelo5/zapatillaBRIXTON2.jpeg',
        'imagenes/hombres/modelo5/zapatillaBRIXTON3.jpeg',
        'imagenes/hombres/modelo5/zapatillaBRIXTON4.jpeg',
        'imagenes/hombres/modelo5/zapatillaBRIXTON5.jpeg',
        'imagenes/hombres/modelo5/zapatillaBRIXTON6.jpeg',
        'imagenes/hombres/modelo5/zapatillaBRIXTON7.jpeg'
      ]
    },
    modelo6: {
      nombre: 'Zapatilla Yordans',
      precio: 80,
      tallas: [35, 36, 37, 38, 39, 40, 41, 42, 43],
      imagenes: [
        'imagenes/hombres/modelo6/zapatillayordans1.jpeg',
        'imagenes/hombres/modelo6/zapatillayordans2.jpeg',
        'imagenes/hombres/modelo6/zapatillayordans3.jpeg',
        'imagenes/hombres/modelo6/zapatillayordans4.jpeg',
        'imagenes/hombres/modelo6/zapatillayordans5.jpeg'
      ]
    },
    modelo7: {
      nombre: 'Zapatilla Campus',
      precio: 80,
      tallas: [39, 40, 41, 42, 43],
      imagenes: [
        'imagenes/hombres/modelo7/zapatillacampus1.jpeg',
        'imagenes/hombres/modelo7/zapatillacampus2.jpeg',
        'imagenes/hombres/modelo7/zapatillacampus3.jpeg',
        'imagenes/hombres/modelo7/zapatillacampus4.jpeg',
        'imagenes/hombres/modelo7/zapatillacampus5.jpeg',
        'imagenes/hombres/modelo7/zapatillacampus6.jpeg',
        'imagenes/hombres/modelo7/zapatillacampus7.jpeg',
        'imagenes/hombres/modelo7/zapatillacampus8.jpeg',
        'imagenes/hombres/modelo7/zapatillacampus9.jpeg',
        'imagenes/hombres/modelo7/zapatillacampus10.jpeg'
      ]
    },
    modelo8: {
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
    },
    modelo2: {
      nombre: 'Zapatilla Puma para mujer',
      precio: 70,
      tallas: [35, 36, 37, 38, 39],
      imagenes: [
        'imagenes/mujeres/modelo2/zapatillaPumaM1.jpeg',
        'imagenes/mujeres/modelo2/zapatillaPumaM2.jpeg',
        'imagenes/mujeres/modelo2/zapatillaPumaM3.jpeg',
        'imagenes/mujeres/modelo2/zapatillaPumaM4.jpeg'
      ]
    },
    modelo3: {
      nombre: 'Zapatilla Adidas para mujeres',
      precio: 75,
      tallas: [35, 36, 37, 38, 39],
      imagenes: [
        'imagenes/mujeres/modelo3/zapatillaAdidasM1.jpeg',
        'imagenes/mujeres/modelo3/zapatillaAdidasM2.jpeg',
        'imagenes/mujeres/modelo3/zapatillaAdidasM3.jpeg',
        'imagenes/mujeres/modelo3/zapatillaAdidasM4.jpeg',
        'imagenes/mujeres/modelo3/zapatillaAdidasM5.jpeg',
        'imagenes/mujeres/modelo3/zapatillaAdidasM6.jpeg',
        'imagenes/mujeres/modelo3/zapatillaAdidasM7.jpeg'
      ]
    },
    modelo4: {
      nombre: 'Zapatillas Adida',
      precio: 75,
      tallas: [35, 36, 37, 38, 39],
      imagenes: [
        'imagenes/mujeres/modelo4/ZapatillaAdida8.jpeg',
        'imagenes/mujeres/modelo4/ZapatillaAdida9.jpeg',
        'imagenes/mujeres/modelo4/ZapatillaAdida10.jpeg',
        'imagenes/mujeres/modelo4/ZapatillaAdida11.jpeg'
      ]
    },
    modelo5: {
      nombre: 'Zapatilla Yordans',
      precio: 80,
      tallas: [35, 36, 37, 38, 39, 40, 41, 42, 43],
      imagenes: [
        'imagenes/mujeres/modelo5/zapatillayordans1.jpeg',
        'imagenes/mujeres/modelo5/zapatillayordans2.jpeg',
        'imagenes/mujeres/modelo5/zapatillayordans3.jpeg',
        'imagenes/mujeres/modelo5/zapatillayordans4.jpeg',
        'imagenes/mujeres/modelo5/zapatillayordans5.jpeg'
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

// Cargar departamentos (envío solo por Shalom)
function cargarDepartamentos() {
  const depts = Object.keys(UBICACIONES_PERU).sort((a, b) => a.localeCompare(b));
  departamentoSelect.innerHTML = '<option value="">Selecciona tu departamento</option>' +
    depts.map(d => `<option value="${d}">${d}</option>`).join('');
}

// Obtener producto del catálogo
function getProducto(categoria, modelo) {
  return CATALOGO[categoria]?.[modelo] || null;
}

// Generar productos dinámicamente y configurar carrusel con flechas
function renderizarProductos() {
  const secciones = { hombres: 'hombre', mujeres: 'mujer', ninos: 'ninos' };
  for (const [idSeccion, categoria] of Object.entries(secciones)) {
    const track = document.querySelector(`#${idSeccion} .productos-track`);
    const wrap = document.querySelector(`#${idSeccion} .productos-carrusel-wrap`);
    if (!track || !wrap || !CATALOGO[categoria]) continue;
    const modelos = Object.keys(CATALOGO[categoria]);
    track.innerHTML = modelos.map(modelo => {
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
    track.querySelectorAll('.producto-card').forEach(card => {
      card.addEventListener('click', () => {
        const cat = card.dataset.categoria;
        const mod = card.dataset.modelo;
        if (getProducto(cat, mod)) abrirModalProducto(cat, mod);
      });
    });
    track.querySelectorAll('.btn-ver').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const card = btn.closest('.producto-card');
        const cat = card.dataset.categoria;
        const mod = card.dataset.modelo;
        if (getProducto(cat, mod)) abrirModalProducto(cat, mod);
      });
    });
    // Flechas del carrusel de productos
    const btnPrev = wrap.querySelector('.productos-carrusel-btn.prev');
    const btnNext = wrap.querySelector('.productos-carrusel-btn.next');
    if (btnPrev) {
      btnPrev.addEventListener('click', () => {
        const cardWidth = track.querySelector('.producto-card')?.offsetWidth || 300;
        const gap = 32;
        track.scrollBy({ left: -(cardWidth + gap), behavior: 'smooth' });
      });
    }
    if (btnNext) {
      btnNext.addEventListener('click', () => {
        const cardWidth = track.querySelector('.producto-card')?.offsetWidth || 300;
        const gap = 32;
        track.scrollBy({ left: cardWidth + gap, behavior: 'smooth' });
      });
    }
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

  modalTitulo.textContent = prod.nombre;
  modalPrecio.textContent = `S/ ${prod.precio}`;
  carruselImg.src = prod.imagenes[0];
  carruselImg.alt = prod.nombre;

  document.getElementById('carruselContainer')?.classList.remove('zoom-activo');

  // No mostrar selector "Modelo" con otros productos: solo se eligen las fotos del producto actual (thumbnails abajo).
  const modeloSelectorWrap = document.getElementById('modeloSelectorWrap');
  if (modeloSelectorWrap) {
    modeloSelectorWrap.style.display = 'none';
    modeloSelectorWrap.innerHTML = '';
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
  const departamento = departamentoSelect.value;

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
*Departamento (envío Shalom):* ${departamento}

*Productos (código + imagen):*
${items}

*Subtotal:* S/ ${subtotal}
*Envío Shalom (promo):* S/ ${ENVIO_SHALOM} (antes S/ ${ENVIO_SHALOM_NORMAL})
*TOTAL:* S/ ${total}

---
Último paso: comunicarse con nuestro asesor de ventas para confirmar.`;

  const url = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensaje)}`;
  window.open(url, '_blank');

  // Limpiar carrito
  carrito = [];
  actualizarCarrito();
  formCheckout.reset();
  cargarDepartamentos();
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

// Lightbox para fotos/videos de testimonios
const lightboxOverlay = document.getElementById('lightboxTestimonios');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxVideo = document.getElementById('lightboxVideo');
const lightboxClose = document.querySelector('#lightboxTestimonios .lightbox-close');

function abrirLightboxTestimonio(src, tipo) {
  if (!lightboxOverlay || !src) return;
  lightboxImg.classList.add('oculto');
  lightboxVideo.classList.add('oculto');
  if (tipo === 'video') {
    lightboxVideo.src = src;
    lightboxVideo.classList.remove('oculto');
    lightboxVideo.play().catch(() => {});
  } else {
    lightboxImg.src = src;
    lightboxImg.alt = '';
    lightboxImg.classList.remove('oculto');
  }
  lightboxOverlay.classList.add('activo');
  lightboxOverlay.removeAttribute('inert');
  document.body.style.overflow = 'hidden';
}

function cerrarLightboxTestimonio() {
  if (!lightboxOverlay) return;
  lightboxVideo.pause();
  lightboxVideo.src = '';
  lightboxImg.src = '';
  lightboxOverlay.setAttribute('inert', '');
  lightboxOverlay.classList.remove('activo');
  document.body.style.overflow = '';
}

// Clic en cualquier foto o video de testimonio abre el lightbox (área completa clickeable)
document.querySelectorAll('.testimonio-media').forEach(media => {
  media.addEventListener('click', (e) => {
    if (e.target.closest('.testimonio-media-prev, .testimonio-media-next')) return;
    const itemActivo = media.querySelector('.testimonio-media-item.activo');
    if (!itemActivo) return;
    const img = itemActivo.querySelector('img');
    const video = itemActivo.querySelector('video');
    if (video && (e.target === video || video.contains(e.target))) {
      e.preventDefault();
      const src = video.getAttribute('src') || video.src;
      if (src) abrirLightboxTestimonio(src, 'video');
      return;
    }
    if (img) {
      e.preventDefault();
      const src = img.getAttribute('src') || img.src;
      if (src) abrirLightboxTestimonio(src, 'image');
    }
  });
});

lightboxClose?.addEventListener('click', cerrarLightboxTestimonio);

lightboxOverlay?.addEventListener('click', (e) => {
  if (e.target === lightboxOverlay) cerrarLightboxTestimonio();
});

// Carrusel interno en testimonios (varias fotos o video+foto)
document.querySelectorAll('.testimonio-media.carrusel-interno').forEach(wrap => {
  const prev = wrap.querySelector('.testimonio-media-prev');
  const next = wrap.querySelector('.testimonio-media-next');
  const items = wrap.querySelectorAll('.testimonio-media-item');
  let idx = 0;
  function actualizar() {
    items.forEach((it, i) => it.classList.toggle('activo', i === idx));
  }
  prev?.addEventListener('click', () => {
    idx = (idx - 1 + items.length) % items.length;
    actualizar();
  });
  next?.addEventListener('click', () => {
    idx = (idx + 1) % items.length;
    actualizar();
  });
});

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
