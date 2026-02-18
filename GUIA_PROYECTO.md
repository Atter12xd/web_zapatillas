# AttKia Moda — Guía del Proyecto

Documentación para entender cómo funciona la tienda y cómo agregar o modificar productos.

---

## Estructura del proyecto

```
attkiamoda/
├── index.html          # Página principal
├── css/
│   └── styles.css      # Estilos
├── js/
│   ├── app.js          # Lógica principal (catálogo, carrito, WhatsApp)
│   └── ubicaciones.js  # Departamentos, provincias y distritos de Perú
├── imagenes/
│   ├── hombres/
│   │   ├── modelo1/    # Fotos del modelo 1
│   │   ├── modelo2/    # Fotos del modelo 2
│   │   └── modelo3/    # etc.
│   ├── mujeres/
│   │   ├── modelo1/
│   │   ├── modelo2/
│   │   └── modelo3/
│   └── niños/
│       └── modelo1/
└── vercel.json         # Configuración de despliegue
```

---

## Cómo agregar productos

### 1. Agregar imágenes

Crea una carpeta siguiendo el patrón:

```
imagenes/[categoria]/[modelo]/[archivos].jpeg
```

**Categorías válidas:** `hombres`, `mujeres`, `niños`

**Ejemplo para un nuevo modelo de hombres:**
```
imagenes/hombres/modelo4/
  ├── foto1.jpeg
  ├── foto2.jpeg
  └── foto3.jpeg
```

### 2. Registrar el producto en el catálogo

En `js/app.js` busca el objeto `CATALOGO` y añade el nuevo modelo dentro de la categoría:

```javascript
const CATALOGO = {
  hombre: {
    modelo1: { ... },
    modelo2: { ... },
    // Agregar nuevo:
    modelo4: {
      nombre: 'Zapatilla [Marca] para hombre',
      precio: 80,                    // en soles
      tallas: [38, 39, 40, 41, 42], // array de tallas
      imagenes: [
        'imagenes/hombres/modelo4/foto1.jpeg',
        'imagenes/hombres/modelo4/foto2.jpeg',
        'imagenes/hombres/modelo4/foto3.jpeg',
      ]
    }
  },
  mujer: { ... },
  ninos: { ... }
};
```

**Campos obligatorios:**
- `nombre`: texto que ve el cliente
- `precio`: número (soles)
- `tallas`: array de números
- `imagenes`: array de rutas a las imágenes (la primera se usa como portada)

### 3. Códigos de producto automáticos

El sistema genera códigos según categoría y modelo:

- **Hombre:** H-M1, H-M2, H-M3, …
- **Mujer:** M-M1, M-M2, M-M3, …
- **Niños:** N-M1, N-M2, …

No hace falta configurarlos manualmente.

---

## Testimonios

Los testimonios están en `index.html` dentro de la sección `#testimonios`. Cada tarjeta incluye:

- **Perfil:** imagen circular (`.testimonio-perfil`)
- **Media:** foto(s) o video + foto en carrusel interno
- **Texto:** mensaje del cliente
- **Estrellas:** ★★★★★
- **Cliente:** nombre

**Estructura de carpetas para testimonios:**
```
imagenes/hombres/testimonio1/
  → perfil.jpeg  (foto de la persona, NO del producto)
  → testi1.jpeg  (foto de la zapatilla)

imagenes/hombres/testimonio2/
  → perfil.jpeg  (foto de Calep)
  → testi1.jpeg, testi2.jpeg, testi3.jpeg  (fotos zapatillas)

imagenes/mujeres/testimonio1/
  → perfil.jpeg  (foto de Orfila)
  → testi1.jpeg  (foto zapatilla)
  → video1.mp4   (video de la zapatilla)
```

**Importante:** El perfil debe ser foto de la persona, no del producto. Si falta perfil.jpeg, se usa avatar con iniciales.

Para agregar video: usa `<video src="ruta/video.mp4" controls muted loop playsinline></video>`. Formatos recomendados: MP4, WebM.

---

## Flujo del cliente

1. **Ver productos:** carrusel por categoría (Hombres, Mujeres, Niños) con flechas.
2. **Abrir producto:** clic en una tarjeta → modal con fotos y datos.
3. **Elegir foto de referencia:** miniatura seleccionada para el pedido (se envía a WhatsApp).
4. **Elegir talla:** botones de talla.
5. **Agregar al carrito:** botón "Adquirir producto".
6. **Checkout:** datos de envío (nombre, celular, departamento). Solo departamento — el cliente elige ej. "Junín" y listo.
7. **Enviar a WhatsApp:** el mensaje incluye productos, tallas, foto elegida, departamento y totales. Envío solo por Shalom.

---

## Ubicaciones (Perú)

En `js/ubicaciones.js` está la estructura Departamento > Provincia > Distrito. El checkout solo usa **departamento** (el cliente elige ej. Junín, Lima, Huánuco). Se extraen los departamentos de forma automática para el selector.

---

## Envío a WhatsApp

- **Número:** 933 484 150 (definido en `WHATSAPP_NUMERO` en `app.js`)
- **Contenido del mensaje:**
  - Datos del cliente (nombre, celular, departamento de envío)
  - Productos con código (ej. H-M1), nombre, talla y precio
  - URL de la foto elegida por el cliente
  - Subtotal, envío Shalom (precio normal S/ 10, promocional S/ 5) y total

---

## Cache busting

Para forzar recarga de CSS y JS tras cambios, aumenta el parámetro `?v=` en `index.html`:

```html
<link rel="stylesheet" href="css/styles.css?v=3">
<script src="js/app.js?v=3"></script>
```

Cada cambio relevante → subir el número de versión (v=4, v=5, …).

---

## Tecnologías

- HTML5, CSS3, JavaScript
- Sin frameworks ni base de datos
- Despliegue en Vercel (sitio estático)
- Integración con WhatsApp vía enlace `wa.me`

---

## Archivos importantes

| Archivo | Descripción |
|---------|-------------|
| `js/app.js` | Catálogo, carrito, modal, flujo de compra, envío WhatsApp |
| `js/ubicaciones.js` | Datos de ubicación Perú (dep/prov/dist) |
| `css/styles.css` | Estilos, responsive, carruseles |
| `index.html` | Estructura de la página y modales |

---

## Cómo probar cambios localmente

1. Abrir `index.html` en el navegador, o
2. Usar un servidor local, por ejemplo: `npx serve` en la carpeta del proyecto
