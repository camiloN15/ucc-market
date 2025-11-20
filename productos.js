// Base de datos de productos
const productos = {
    // LAPTOPS
    'laptop1': {
        name: 'ASUS ROG Strix G15',
        price: 7592900,
        description: 'Laptop gaming de alto rendimiento con la última tecnología en procesadores y gráficos.',
        images: [
            'https://dlcdnwebimgs.asus.com/gain/480f0742-006b-49f5-b37b-be273dd6a2c0/',
            'https://dlcdnwebimgs.asus.com/gain/480f0742-006b-49f5-b37b-be273dd6a2c0/',
            'https://dlcdnwebimgs.asus.com/gain/480f0742-006b-49f5-b37b-be273dd6a2c0/'
        ],
        specs: {
            'Procesador': 'AMD Ryzen 9 5900HX',
            'Memoria RAM': '16GB DDR4 3200MHz',
            'Almacenamiento': '1TB NVMe SSD',
            'Tarjeta Gráfica': 'NVIDIA RTX 4060 8GB',
            'Pantalla': '15.6" FHD 165Hz',
            'Sistema Operativo': 'Windows 11',
            'Batería': '90WHrs'
        },
        category: 'laptops'
    },
    'laptop2': {
        name: 'MSI Katana 15',
        price: 3997200,
        description: 'Laptop gaming con diseño elegante y potente rendimiento para jugadores exigentes.',
        images: [
            'https://megacomputer.com.co/wp-content/uploads/2023/04/PORTATIL-MSI-KATANA-15-B12UCXK.jpg.webp',
            'https://megacomputer.com.co/wp-content/uploads/2023/04/PORTATIL-MSI-KATANA-15-B12UCXK.jpg.webp'
        ],
        specs: {
            'Procesador': 'Intel Core i7-12650H',
            'Memoria RAM': '16GB DDR5',
            'Almacenamiento': '512GB NVMe SSD',
            'Tarjeta Gráfica': 'NVIDIA RTX 3060 6GB',
            'Pantalla': '15.6" FHD 144Hz',
            'Sistema Operativo': 'Windows 11',
            'Batería': '53.5WHrs'
        },
        category: 'laptops'
    },
    'laptop3': {
        name: 'Lenovo Legion 5',
        price: 4590000,
        description: 'Portátil gaming con tecnología de enfriamiento avanzada y rendimiento excepcional.',
        images: [
            'https://p3-ofp.static.pub//fes/cms/2024/09/12/m1jnssoporjtlmma8zqy3ssoour2yj992790.png',
            'https://p3-ofp.static.pub//fes/cms/2024/09/12/m1jnssoporjtlmma8zqy3ssoour2yj992790.png'
        ],
        specs: {
            'Procesador': 'AMD Ryzen 7 5800H',
            'Memoria RAM': '32GB DDR4',
            'Almacenamiento': '1TB NVMe SSD',
            'Tarjeta Gráfica': 'NVIDIA RTX 3070 8GB',
            'Pantalla': '15.6" QHD 165Hz',
            'Sistema Operativo': 'Windows 11',
            'Batería': '80WHrs'
        },
        category: 'laptops'
    },

    // PERIFÉRICOS
    'headphones1': {
        name: 'Auriculares Gaming RGB',
        price: 56900,
        description: 'Auriculares gaming con sonido envolvente 7.1 y RGB personalizable para una experiencia inmersiva.',
        images: [
            'https://exitocol.vtexassets.com/arquivos/ids/24258217/diadema-gamer-rgb-auriculares-con-microfono-usb-50mm-pc-mac.jpg?v=638603722155500000',
            'https://exitocol.vtexassets.com/arquivos/ids/24258218/diadema-gamer-rgb-auriculares-con-microfono-usb-50mm-pc-mac-1.jpg?v=638603722155500000'
        ],
        specs: {
            'Tipo': 'Over-ear',
            'Conexión': 'USB',
            'Iluminación': 'RGB Personalizable',
            'Sonido': '7.1 Virtual Surround',
            'Micrófono': 'Desmontable con cancelación de ruido',
            'Compatibilidad': 'PC, PS4, PS5',
            'Peso': '350g'
        },
        category: 'perifericos'
    },
    'mouse1': {
        name: 'Logitech G502 HERO',
        price: 299900,
        description: 'Mouse gaming de alto rendimiento con sensor HERO 25K y pesos personalizables.',
        images: [
            'https://resource.logitechg.com/w_692,c_limit,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/gaming/en/products/g502-lightspeed-gaming-mouse/g502-lightspeed-gallery-1.png',
            'https://resource.logitechg.com/w_692,c_limit,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/gaming/en/products/g502-lightspeed-gaming-mouse/g502-lightspeed-gallery-2.png'
        ],
        specs: {
            'Sensor': 'HERO 25K',
            'DPI': '100-25,600',
            'Botones': '11 programables',
            'Peso': '121g - 139g ajustable',
            'Conexión': 'USB / Wireless',
            'Batería': 'Hasta 60 horas',
            'RGB': 'LIGHTSYNC RGB'
        },
        category: 'perifericos'
    },
    'keyboard1': {
        name: 'Teclado Mecánico RGB',
        price: 245900,
        description: 'Teclado mecánico gaming con switches Blue, retroiluminación RGB y reposamuñecas ergonómico.',
        images: [
            'https://www.apcomputadores.com/wp-content/uploads/3-54.jpg',
            'https://www.apcomputadores.com/wp-content/uploads/3-54.jpg'
        ],
        specs: {
            'Tipo': 'Mecánico',
            'Switches': 'Blue',
            'Formato': 'Full size',
            'Retroiluminación': 'RGB personalizable',
            'Conexión': 'USB',
            'Extras': 'Reposamuñecas desmontable',
            'Material': 'Aluminio y plástico ABS'
        },
        category: 'perifericos'
    },
    'chair1': {
        name: 'Silla Gaming Pro',
        price: 1499000,
        description: 'Silla ergonómica para gamers con soporte lumbar, reposabrazos 3D ajustables, respaldo reclinable y tapicería transpirable para largas sesiones de juego.',
        images: [
            'https://sumerlabs.com/default/image-tool-lambda?new-width=800&new-height=800&new-quality=80&url-image=https%3A%2F%2Fsumerlabs.com%2Fsumer-app-90b8f.appspot.com%2Fproduct_photos%252F506a6b55e496e09e85b7ff70904499d7%252F68b7cee0-3290-11ee-8b4f-055b2160f8cb%3Falt%3Dmedia%26token%3D49619453-1b78-4398-b04e-e658c695524f',
            'https://sumerlabs.com/default/image-tool-lambda?new-width=800&new-height=800&new-quality=80&url-image=https%3A%2F%2Fsumerlabs.com%2Fsumer-app-90b8f.appspot.com%2Fproduct_photos%252F506a6b55e496e09e85b7ff70904499d7%252F68b7cee0-3290-11ee-8b4f-055b2160f8cb%3Falt%3Dmedia%26token%3D49619453-1b78-4398-b04e-e658c695524f'
        ],
        specs: {
            'Material': 'Cuero sintético / Malla transpirable',
            'Color': 'Negro/Rojo',
            'Peso máximo': '150kg',
            'Ajustes': 'Reposabrazos 3D, respaldo reclinable 180°',
            'Ruedas': 'PU silenciosas'
        },
        category: 'perifericos'
    },

    // MONITORES
    'monitor1': {
        name: 'ASUS TUF Gaming VG24VQ',
        price: 1421337,
        description: 'Monitor gaming curvo con alta tasa de refresco y tecnología FreeSync Premium.',
        images: [
            'https://gamerscolombia.syg.com.co/img/Monitor-ASUS-Curvo-TUF-Gaming-VG24VQ-236-pulgadas-Full-HD-144Hz-FreeSync-1ms-MPRT/img_5382__1613083792.png',
            'https://dlcdnwebimgs.asus.com/gain/36b65811-d43e-48da-8781-8ebd121fa4c4/'
        ],
        specs: {
            'Tamaño': '23.6"',
            'Resolución': '1920x1080 FHD',
            'Tasa de refresco': '144Hz',
            'Tiempo de respuesta': '1ms MPRT',
            'Panel': 'VA Curvo',
            'Tecnología': 'FreeSync Premium',
            'Puertos': 'HDMI, DisplayPort, DVI'
        },
        category: 'monitores'
    },
    'monitor2': {
        name: 'Samsung Odyssey G3',
        price: 1299900,
        description: 'Monitor gaming plano con G-Sync Compatible y panel VA para negros profundos.',
        images: [
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7eXko7UIt6RghDcIEWA9pfm0IT9T8cdVdrw&s',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7eXko7UIt6RghDcIEWA9pfm0IT9T8cdVdrw&s'
        ],
        specs: {
            'Tamaño': '27"',
            'Resolución': '2560x1440 QHD',
            'Tasa de refresco': '165Hz',
            'Tiempo de respuesta': '1ms GTG',
            'Panel': 'VA',
            'Tecnología': 'G-Sync Compatible',
            'Puertos': 'HDMI, DisplayPort'
        },
        category: 'monitores'
    },
    'monitor3': {
        name: 'LG UltraGear 27GP850',
        price: 1899900,
        description: 'Monitor gaming profesional con panel Nano IPS y HDR400 para colores vibrantes.',
        images: [
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6j9mxykF5E_i3T6x7zPt3MwtBWTLkJjrHfg&s',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6j9mxykF5E_i3T6x7zPt3MwtBWTLkJjrHfg&s'
        ],
        specs: {
            'Tamaño': '27"',
            'Resolución': '2560x1440 QHD',
            'Tasa de refresco': '180Hz',
            'Tiempo de respuesta': '1ms GTG',
            'Panel': 'Nano IPS',
            'HDR': 'VESA HDR400',
            'Puertos': 'HDMI 2.0, DisplayPort 1.4, USB 3.0'
        },
        category: 'monitores'
    }
};


// Función para obtener parámetros de la URL
function getUrlParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        id: params.get('id')
    };
}

// Función para cargar los detalles del producto
function loadProductDetails() {
    const { id } = getUrlParams();
    const product = productos[id];

    if (!product) {
        window.location.href = 'index.html';
        return;
    }

    // Actualizar título de la página
    document.title = `UCCMARKET - ${product.name}`;

    // Actualizar información básica
    document.getElementById('productName').textContent = product.name;
    document.getElementById('productPrice').textContent = `$ ${product.price.toLocaleString()}`;
    document.getElementById('productImage').src = product.images[0];

    // Cargar galería de imágenes
    const thumbnailList = document.getElementById('thumbnailList');
    thumbnailList.innerHTML = '';
    product.images.forEach((img, index) => {
        const thumbnail = document.createElement('div');
        thumbnail.className = 'thumbnail';
        thumbnail.innerHTML = `<img src="${img}" alt="${product.name} ${index + 1}">`;
        thumbnail.onclick = () => document.getElementById('productImage').src = img;
        thumbnailList.appendChild(thumbnail);
    });

    // Cargar descripción
    document.getElementById('productDescription').innerHTML = `
        <p>${product.description}</p>
    `;

    // Cargar especificaciones
    const specsTable = document.getElementById('specsTable');
    specsTable.innerHTML = '';
    Object.entries(product.specs).forEach(([key, value]) => {
        specsTable.innerHTML += `
            <tr>
                <td>${key}</td>
                <td>${value}</td>
            </tr>
        `;
    });

    // Configurar botón de agregar al carrito
    const addToCartButton = document.getElementById('addToCartButton');
    addToCartButton.onclick = () => {
        const quantity = parseInt(document.getElementById('quantity').value) || 1;
        for (let i = 0; i < quantity; i++) {
            // Usar la función global addToCart definida en carrito.js
            if (typeof addToCart === 'function') {
                addToCart(id, product.name, product.price, product.images[0], 1);
            } else {
                // Fallback: guardar manualmente en localStorage si addToCart no está disponible
                const cart = JSON.parse(localStorage.getItem('cart')) || [];
                const existing = cart.find(item => item.id === id);
                if (existing) {
                    existing.quantity = (existing.quantity || 0) + 1;
                } else {
                    cart.push({ id, name: product.name, price: product.price, image: product.images[0], quantity: 1 });
                }
                localStorage.setItem('cart', JSON.stringify(cart));
                // Actualizar contador si existe
                if (typeof updateCartCounter === 'function') updateCartCounter();
            }
        }
    };
}

// Funciones para el selector de cantidad
function incrementQuantity() {
    const input = document.getElementById('quantity');
    input.value = parseInt(input.value) + 1;
}

function decrementQuantity() {
    const input = document.getElementById('quantity');
    if (parseInt(input.value) > 1) {
        input.value = parseInt(input.value) - 1;
    }
}

// Nota: no ejecutar loadProductDetails automáticamente en todas las páginas
// porque `productos.js` se incluye en varias páginas (index, admin, etc.).
// La página `producto.html` ya tiene su propio script que usa `productos`.
// Si quieres que `productos.js` cargue los detalles solo en `producto.html`,
// puedes descomentar la siguiente comprobación (opcional):
// if (window.location.pathname.endsWith('producto.html')) {
//     document.addEventListener('DOMContentLoaded', loadProductDetails);
// }